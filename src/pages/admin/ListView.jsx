import { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostModal from '../../components/admin/PostModal';
import { Edit2, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function ListView() {
  const { posts, addPost, updatePost, deletePost } = usePosts();
  const [filter, setFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const statuses = ['All', 'Idea', 'Draft', 'Scheduled', 'Posted'];

  const filteredPosts = posts
    .filter(p => filter === 'All' || p.status === filter)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  const handleSave = (postData) => {
    if (editingPost) {
      updatePost(editingPost.id, postData);
    } else {
      addPost(postData);
    }
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">List View</h1>
          <p className="text-gray-500 mt-2">Manage and filter your content calendar.</p>
        </div>
        
        <div className="flex gap-2 p-1 glass-panel rounded-2xl">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === status 
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-md shadow-cyan-200' 
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border-white/60">
        <table className="w-full text-left">
          <thead className="bg-white/40 border-b border-white/60">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Campaign Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40">
            {filteredPosts.map(post => (
              <tr key={post.id} className="hover:bg-white/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{post.date ? format(parseISO(post.date), 'MMM d, yyyy') : 'No Date'}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{post.time || 'No Time'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">{post.title || 'Untitled'}</div>
                  <div className="text-xs text-gray-500 line-clamp-1 max-w-md">{post.summary || 'No summary'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    post.status === 'Idea' ? 'bg-yellow-100/80 text-yellow-800' :
                    post.status === 'Draft' ? 'bg-gray-100/80 text-gray-800' :
                    post.status === 'Scheduled' ? 'bg-cyan-100/80 text-cyan-800' :
                    'bg-green-100/80 text-green-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(post)} className="p-2 text-cyan-600 hover:bg-white/50 rounded-lg mr-2 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-white/50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium bg-white/20">
                  No posts found. Try selecting a different filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <PostModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handleSave}
          post={editingPost}
        />
      )}
    </div>
  );
}
