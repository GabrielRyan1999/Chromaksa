import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Trash2, Plus } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

export default function PostModal({ isOpen, onClose, onSave, post, initialDate }) {
  const defaultState = {
    title: '',
    summary: '',
    format: 'Carousel Post',
    date: initialDate || '',
    time: '09:00',
    sources: [],
    todoList: [],
    creativeDirection: '',
    status: 'Idea'
  };

  const [formData, setFormData] = useState(defaultState);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiModelUsed, setAiModelUsed] = useState(null);
  const [generationStatus, setGenerationStatus] = useState('');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
    } else {
      setFormData({ ...defaultState, date: initialDate || '' });
    }
    setAiPrompt('');
    setAiError('');
    setAiModelUsed(null);
    setGenerationStatus('');
  }, [post, initialDate, isOpen]);

  const handleGenerateIdea = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiError('');
    setAiModelUsed(null);
    setGenerationStatus('Brainstorming idea with AI...');

    const apiKey = localStorage.getItem('chromaksa_gemini_key');
    if (!apiKey) {
      setAiError('Gemini API key not found. Please add it in Settings.');
      setIsGenerating(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Act as an expert social media manager and creative director. 
      Topic/Idea: "${aiPrompt}"
      Format: "${formData.format || 'Instagram Post'}"
      
      Provide exactly the following in valid JSON format:
      1. title: A catchy title for the post/campaign.
      2. summary: A brief 2-3 sentence summary or caption.
      3. format: The exact format provided above.
      4. sources: An array of 2-3 real, existing research sources. Each object must have a "name", "publisher", and a "searchQuery" (the exact terms to search for this article).
      5. todoList: An array of 4-5 actionable steps for the creator (strings) tailored specifically to creating a ${formData.format || 'post'}.
      6. creativeDirection: A paragraph of creative direction notes.
      
      Respond ONLY with valid JSON.`;

      const generateWithTimeout = async (modelName, timeoutMs) => {
        let timer;
        const timeoutPromise = new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('503: API connection timed out')), timeoutMs);
        });
        return Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: { responseMimeType: 'application/json' }
          }),
          timeoutPromise
        ]).finally(() => clearTimeout(timer));
      };

      const executeGeneration = async () => {
        let attempt = 0;
        const maxRetries = 2;
        
        while (true) {
          try {
            setGenerationStatus(attempt === 0 ? 'Generating... (attempt 1/3)' : `Generating... (attempt ${attempt + 1}/3)`);
            const response = await generateWithTimeout('gemini-3.7-flash', 4500); // 4.5s per attempt
            return { response, usedModel: 'gemini-3.7-flash' };
          } catch (err) {
            const errMsg = err.message || '';
            const is503 = errMsg.includes('503') || errMsg.includes('timed out');
            const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota');

            if (is503 || isQuota) {
              if (is503 && attempt < maxRetries) {
                setGenerationStatus(`Server busy, waiting before retry... (attempt ${attempt + 1}/3)`);
                const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s
                await new Promise(resolve => setTimeout(resolve, waitTime));
                attempt++;
              } else {
                setGenerationStatus(isQuota ? 'Pro quota reached, switching to Lite...' : 'Switching to Lite model...');
                try {
                  const response = await generateWithTimeout('gemini-3.5-flash-lite', 6000);
                  return { response, usedModel: 'gemini-3.5-flash-lite' };
                } catch (liteErr) {
                  const liteMsg = liteErr.message || '';
                  if (liteMsg.includes('503') || liteMsg.includes('timed out')) {
                    throw new Error('Server is busy, please try again in a moment');
                  } else if (liteMsg.includes('429') || liteMsg.includes('RESOURCE_EXHAUSTED') || liteMsg.includes('quota')) {
                    throw new Error('QUOTA_EXCEEDED');
                  } else {
                    throw liteErr;
                  }
                }
              }
            } else {
              throw err;
            }
          }
        }
      };

      const globalTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('TIMEOUT')), 15000)
      );

      const { response, usedModel } = await Promise.race([
        executeGeneration(),
        globalTimeout
      ]);

      const result = JSON.parse(response.text);
      setFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        summary: result.summary || prev.summary,
        format: result.format || prev.format,
        sources: result.sources || [],
        todoList: (result.todoList || []).map((t, i) => ({ id: Date.now() + i, text: t, completed: false })),
        creativeDirection: result.creativeDirection || prev.creativeDirection,
        status: 'Idea'
      }));
      setAiModelUsed(usedModel);
      setAiPrompt('');
    } catch (err) {
      console.error(err);
      const errMsg = err.message || '';
      
      if (errMsg === 'TIMEOUT' || errMsg.includes('503')) {
        setAiError('Server is busy. Please try again in a moment.');
      } else if (errMsg === 'QUOTA_EXCEEDED' || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
        setAiError('You have exceeded your free AI quota. Please wait a minute and try again.');
      } else if (errMsg.startsWith('{')) {
        try {
          const parsed = JSON.parse(errMsg);
          setAiError(parsed.error?.message || 'An unexpected AI error occurred.');
        } catch (e) {
          setAiError(errMsg);
        }
      } else {
        setAiError(errMsg || 'Failed to generate idea. Please check your API key.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleTodo = (id) => {
    setFormData(prev => ({
      ...prev,
      todoList: prev.todoList.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const handleDeleteTodo = (id) => {
    setFormData(prev => ({
      ...prev,
      todoList: prev.todoList.filter(t => t.id !== id)
    }));
  };

  const handleAddTodo = () => {
    if (!newTask.trim()) return;
    setFormData(prev => ({
      ...prev,
      todoList: [...prev.todoList, { id: Date.now(), text: newTask, completed: false }]
    }));
    setNewTask('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed top-[5%] bottom-[5%] left-[50%] translate-x-[-50%] bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] w-[95vw] max-w-2xl z-50 overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-white/40 shrink-0">
            <Dialog.Title className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-green-600 tracking-tight leading-tight pr-8">
              {formData.title || (post ? 'Edit Post' : 'New Post')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2.5 bg-white/50 hover:bg-white border border-white/60 rounded-full shadow-sm transition-colors shrink-0">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </Dialog.Close>
          </div>

          {/* Scrolling Content */}
          <div className="overflow-y-auto px-6 py-6 flex-1 flex flex-col gap-8 custom-scrollbar">
            
            {/* AI Generator Section (Always Visible) */}
            <div className="bg-gradient-to-br from-cyan-100/60 to-green-100/60 rounded-2xl border border-white/60 shadow-sm relative overflow-hidden p-5">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold flex items-center gap-2 text-cyan-900 select-none">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    Format & Idea Generator
                  </label>
                  {aiModelUsed && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border shadow-sm ${
                      aiModelUsed === 'gemini-3.7-flash' 
                        ? 'bg-white/80 border-cyan-200 text-cyan-700' 
                        : 'bg-white/80 border-yellow-200 text-yellow-700'
                    }`}>
                      {aiModelUsed === 'gemini-3.7-flash' ? '✨ Pro Model (3.7)' : '⚡ Lite Model (3.5)'}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-xs text-cyan-800/80 mb-1">Select the format first, then type your idea so the AI can tailor the to-do list.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select 
                        value={formData.format}
                        onChange={e => setFormData({...formData, format: e.target.value})}
                        className="sm:w-1/3 bg-white/80 border border-white/60 rounded-xl px-4 py-2.5 text-sm font-bold text-cyan-900 focus:ring-2 focus:ring-cyan-400 outline-none shadow-sm backdrop-blur-md cursor-pointer appearance-none"
                      >
                        <option value="Carousel Post">Carousel Post</option>
                        <option value="Single Image">Single Image</option>
                        <option value="Reel">Reel</option>
                        <option value="Story">Story</option>
                      </select>

                      <div className="flex-1 flex gap-2">
                        <input 
                          type="text" 
                          value={aiPrompt}
                          onChange={e => setAiPrompt(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleGenerateIdea())}
                          placeholder="e.g. normalizing dystopia in UI..."
                          className="flex-1 bg-white/80 border border-white/60 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-400 outline-none shadow-sm backdrop-blur-md"
                        />
                        <button 
                          type="button"
                          onClick={handleGenerateIdea}
                          disabled={isGenerating || !aiPrompt.trim()}
                          className="bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 min-w-[120px]"
                        >
                          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
                        </button>
                      </div>
                    </div>
                  </div>
                
                {isGenerating && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                    <p className="text-[11px] text-cyan-700 font-bold uppercase tracking-wider">{generationStatus}</p>
                  </div>
                )}
                {aiError && <p className="text-xs text-red-500 font-medium mt-3">{aiError}</p>}
              </div>
            </div>

            {/* Title & Summary */}
            <div className="flex flex-col gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Campaign Title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-transparent text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 focus:border-gray-400 outline-none"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Brief summary or caption..."
                  value={formData.summary}
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full bg-transparent text-gray-600 text-base resize-none focus:outline-none"
                  rows="3"
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/60 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Date</span>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="font-medium text-gray-900 w-full outline-none bg-transparent appearance-none"
                />
              </div>
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/60 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Post At</span>
                <input 
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="font-medium text-gray-900 w-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Research Sources */}
            {formData.sources.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">Research Sources</h4>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 flex flex-col overflow-hidden">
                  {formData.sources.map((source, idx) => {
                    const searchUrl = source.url || `https://www.google.com/search?q=${encodeURIComponent(source.searchQuery || (source.name + ' ' + source.publisher))}`;
                    return (
                      <a 
                        key={idx} 
                        href={searchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-4 border-b border-white/40 last:border-0 hover:bg-white/80 transition-colors group"
                      >
                        <p className="font-bold text-gray-900 text-sm group-hover:text-cyan-600 transition-colors">{source.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{source.publisher}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* To-Do Checklist */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">To-Do Checklist</h4>
              <div className="flex flex-col gap-3">
                {formData.todoList.map((task) => (
                  <div key={task.id} className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-4 flex items-center gap-4">
                    <button 
                      type="button"
                      onClick={() => handleToggleTodo(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${task.completed ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'}`}
                    >
                      {task.completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </button>
                    <span className={`flex-1 text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                    <button type="button" onClick={() => handleDeleteTodo(task.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-2 pl-4">
                  <input 
                    type="text" 
                    placeholder="Add a task..." 
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTodo())}
                    className="flex-1 text-sm outline-none bg-transparent py-2 text-gray-700"
                  />
                  <button type="button" onClick={handleAddTodo} className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider">
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Creative Direction Notes */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">Creative Direction Notes</h4>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-5">
                <textarea 
                  value={formData.creativeDirection}
                  onChange={e => setFormData({...formData, creativeDirection: e.target.value})}
                  className="w-full h-32 bg-transparent text-gray-700 text-sm leading-relaxed resize-none focus:outline-none"
                  placeholder="Add notes, visual references, or style guidelines..."
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">Status</h4>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm px-5 py-4 font-bold text-gray-900 focus:outline-none cursor-pointer appearance-none"
              >
                <option value="Idea">💡 Idea</option>
                <option value="Draft">📝 Draft</option>
                <option value="Scheduled">📅 Scheduled</option>
                <option value="Posted">✅ Posted</option>
              </select>
            </div>

          </div>

          {/* Solid Footer */}
          <div className="p-6 shrink-0 bg-white/40 backdrop-blur-xl border-t border-white/60">
            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={() => post && onSave({...formData, status: 'Trash'})}
                className="px-4 py-2 text-red-500 hover:bg-red-50/50 rounded-xl transition-colors font-bold text-sm"
              >
                Delete Item
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors font-bold text-sm tracking-wide shadow-md"
              >
                START DRAFTING &rarr;
              </button>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
