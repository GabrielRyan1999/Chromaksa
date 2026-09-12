import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <header className="pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[2rem] px-8 py-3 w-full max-w-5xl flex justify-between items-center transition-all">
        <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center shadow-inner border-2 border-white">
            <span className="text-white text-xs">✨</span>
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-green-600">Chromaksa</span>
          <span className="text-slate-800">Studio</span>
        </Link>
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
      </header>
    </div>
  );
}
