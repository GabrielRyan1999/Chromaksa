import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-12 md:p-20 rounded-[3rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] text-center relative z-10 max-w-xl mx-4">
        <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-500 mb-6 tracking-tighter" style={{ fontFamily: 'Archivo, sans-serif' }}>
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 tracking-tight">
          Lost in the Data Stream
        </h2>
        <p className="text-slate-600 text-lg mb-10">
          Looks like we've drifted off the canvas. The page you are looking for has been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold text-sm tracking-widest uppercase py-4 px-10 rounded-full shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

