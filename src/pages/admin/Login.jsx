import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, Home, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 via-white to-green-50 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-green-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="bg-white/80 backdrop-blur-3xl border border-white/60 p-10 rounded-[32px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] w-full max-w-md relative z-10">
        
        <div className="text-center mb-8 relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-cyan-400 to-green-400 rounded-2xl rotate-12 shadow-lg flex items-center justify-center border-4 border-white">
            <Lock className="w-8 h-8 text-white -rotate-12" strokeWidth={2.5} />
          </div>
          
          <div className="mt-8">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-green-600 tracking-tight">
              Chromaksa
            </h1>
            <p className="text-cyan-900/60 mt-1 font-medium tracking-wide uppercase text-xs">Studio Workspace</p>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-2xl text-sm text-center font-bold shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-700/50" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="studio@chromaksa.com"
                className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl pl-12 pr-4 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-cyan-400 outline-none shadow-sm transition-all"
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-700/50" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl pl-12 pr-12 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-cyan-400 outline-none shadow-sm transition-all"
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-700/50 hover:text-cyan-600 transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="mt-2 group w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            SIGN IN <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-800/60 hover:text-cyan-600 transition-colors uppercase tracking-widest">
            <Home className="w-4 h-4" />
            Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
