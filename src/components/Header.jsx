import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 md:px-6 flex justify-center pointer-events-none">
      <header className="pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2rem] px-5 md:px-8 py-3 w-full max-w-5xl flex flex-col transition-all">
        <div className="flex justify-between items-center w-full">
          <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center shadow-inner border-2 border-white">
              <span className="text-white text-xs">✨</span>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-green-600 hidden sm:inline">Chromaksa</span>
            <span className="text-slate-800 hidden sm:inline">Studio</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {['Services', 'Portfolio', 'About'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              Contact
            </a>
            <Link 
              to="/admin"
              className="text-xs font-bold uppercase tracking-widest text-cyan-700/60 hover:text-cyan-600 transition-colors ml-4 border-l border-slate-200 pl-4"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-white/60 pb-2">
            {['Services', 'Portfolio', 'About'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-cyan-600 transition-colors text-center"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-xl shadow-md transition-all text-center mt-2"
            >
              Contact
            </a>
            <Link 
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-cyan-700/60 hover:text-cyan-600 transition-colors text-center mt-2"
            >
              Admin Login
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}
