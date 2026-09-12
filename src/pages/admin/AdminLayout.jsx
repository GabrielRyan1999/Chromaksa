import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, List, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Calendar', path: '/admin', icon: Calendar },
    { name: 'List View', path: '/admin/list', icon: List },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex w-64 glass-panel border-r border-white/60 flex-col m-4 rounded-3xl overflow-hidden relative shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        <div className="p-6 pb-2 border-b border-white/40 relative z-10">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-green-500">Chromaksa Studio</h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">Internal Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative z-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-md shadow-cyan-200/50 scale-[1.02]' 
                    : 'text-gray-700 hover:bg-white/50 hover:text-cyan-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/40 relative z-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-500 hover:bg-white/50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="p-4 md:p-8 relative min-h-screen">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          {children}
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/60 shadow-[0_-8px_32px_0_rgba(31,38,135,0.05)] z-50 px-6 py-3 flex justify-between items-center safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-md' : ''}`} />
              <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-red-400 hover:text-red-600 transition-all"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  );
}
