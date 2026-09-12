import { useState, useMemo } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  parseISO, 
  isSameDay 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';
import PostModal from '../../components/admin/PostModal';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { posts, addPost, updatePost } = usePosts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getPostsForDay = (date) => {
    return posts.filter(post => post.date && isSameDay(parseISO(post.date), date));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handlePostClick = (post, e) => {
    e.stopPropagation();
    setSelectedPost(post);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  const handleSave = (postData) => {
    if (postData.id) {
      updatePost(postData.id, postData);
    } else {
      addPost(postData);
    }
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedPost(null);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-500 mt-2">Plan your upcoming illustrations and posts.</p>
        </div>
        
        <div className="flex items-center gap-4 glass-panel p-2 rounded-2xl">
          <button onClick={prevMonth} className="p-2 hover:bg-white/50 rounded-xl transition-colors text-cyan-700">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-gray-800 min-w-[140px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-white/50 rounded-xl transition-colors text-cyan-700">
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="w-px h-8 bg-white/60 mx-2"></div>
          
          <button 
            onClick={() => handleDayClick(new Date())}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-x-auto border-white/60 shadow-lg custom-scrollbar">
        <div className="min-w-[700px]">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-white/60 bg-white/40">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 auto-rows-[120px] bg-white/20 gap-px">
            {/* Empty cells for start of month padding */}
            {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-transparent" />
            ))}

          {/* Actual days */}
          {daysInMonth.map((day) => {
            const dayPosts = getPostsForDay(day).sort((a, b) => {
              const timeA = a.time || '00:00';
              const timeB = b.time || '00:00';
              return timeA.localeCompare(timeB);
            });
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <div 
                key={day.toString()}
                onClick={() => handleDayClick(day)}
                className={`bg-white/40 p-2 border border-transparent hover:border-cyan-300 hover:bg-white/60 transition-all cursor-pointer relative group flex flex-col ${
                  !isCurrentMonth ? 'opacity-40' : ''
                }`}
              >
                <div className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
                  isTodayDate ? 'bg-cyan-500 text-white shadow-md shadow-cyan-200' : 'text-gray-700 group-hover:text-cyan-700'
                }`}>
                  {format(day, 'd')}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {dayPosts.map((post, i) => (
                    <div 
                      key={i} 
                      onClick={(e) => handlePostClick(post, e)}
                      className={`cursor-pointer text-[10px] p-1 rounded-lg border backdrop-blur-md flex items-center gap-1.5 shadow-sm transition-transform hover:scale-[1.02] ${
                        post.status === 'Idea' ? 'bg-gradient-to-r from-yellow-200/40 to-yellow-100/40 border-yellow-200/60 text-yellow-900' :
                        post.status === 'Draft' ? 'bg-gradient-to-r from-gray-200/40 to-gray-100/40 border-gray-200/60 text-gray-800' :
                        post.status === 'Scheduled' ? 'bg-gradient-to-r from-cyan-200/40 to-cyan-100/40 border-cyan-200/60 text-cyan-900' :
                        'bg-gradient-to-r from-green-200/40 to-green-100/40 border-green-200/60 text-green-900'
                      }`}
                    >
                      {post.time && (
                        <span className={`px-1.5 py-0.5 rounded-[5px] font-extrabold shrink-0 bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white/80 ${
                          post.status === 'Idea' ? 'text-yellow-700' :
                          post.status === 'Draft' ? 'text-gray-600' :
                          post.status === 'Scheduled' ? 'text-cyan-700' :
                          'text-green-700'
                        }`}>
                          {post.time}
                        </span>
                      )}
                      <span className="truncate font-bold pr-1">{post.title || 'Untitled'}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      <PostModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
          setSelectedPost(null);
        }}
        onSave={handleSave}
        initialDate={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        post={selectedPost}
      />
    </div>
  );
}
