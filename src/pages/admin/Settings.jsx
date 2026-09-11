import { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('chromaksa_gemini_key');
    if (stored) setApiKey(stored);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('chromaksa_gemini_key', apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your studio preferences and integrations.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl max-w-2xl border-white/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-100 to-green-100 rounded-2xl">
            <Key className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gemini API Key</h2>
            <p className="text-sm text-gray-500">Required for the AI Idea Generator.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="w-full bg-white/50 border border-white/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none backdrop-blur-sm"
              placeholder="AIzaSy..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Your key is stored locally in your browser and never sent to our servers.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 text-white rounded-xl transition-all shadow-md font-bold"
            >
              Save Key
            </button>
            {saved && <span className="text-sm text-green-600 font-medium">Saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
