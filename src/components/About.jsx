import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-6 md:p-16 rounded-[3rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] text-center relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute bottom-0 left-1/2 w-full h-32 bg-green-200/30 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-slate-800 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
            About the Studio
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-16 relative z-10">
            
            {/* Aline - Art */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 w-full flex flex-col items-center bg-white/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/80 shadow-sm relative overflow-hidden group transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-32 h-32 rounded-full bg-white/80 border-[6px] border-cyan-200 mb-6 flex items-center justify-center shadow-inner relative z-10 overflow-hidden">
                <img src="/aline.jpg" loading="lazy" alt="Aline" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-800 relative z-10 tracking-tight">Aline</h4>
              <p className="text-cyan-600 font-bold mb-3 relative z-10 uppercase tracking-widest text-xs">Illustration & Animation</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2 relative z-10">
                <span className="px-3 py-1 bg-white/80 text-cyan-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white">Hand-Drawn</span>
                <span className="px-3 py-1 bg-white/80 text-cyan-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white">Storytelling</span>
              </div>
            </motion.div>

            {/* The Bridge / Data Stream Animation */}
            <div className="w-full md:w-64 h-32 hidden md:flex items-center justify-center relative">
              <svg viewBox="0 0 200 80" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
                    <stop offset="50%" stopColor="#10b981" /> {/* Emerald */}
                    <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
                  </linearGradient>
                </defs>

                {/* Base connection track */}
                <path 
                  d="M 0 40 C 50 10, 150 70, 200 40" 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.8)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeDasharray="4 8"
                />

                {/* Data stream particle 1 */}
                <motion.path 
                  d="M 0 40 C 50 10, 150 70, 200 40" 
                  fill="transparent" 
                  stroke="url(#stream-gradient)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0.15, pathOffset: 0 }}
                  animate={{ pathOffset: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Data stream particle 2 */}
                <motion.path 
                  d="M 0 40 C 50 10, 150 70, 200 40" 
                  fill="transparent" 
                  stroke="url(#stream-gradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0.05, pathOffset: 0.5 }}
                  animate={{ pathOffset: 1.5 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.7 }}
                />
              </svg>
            </div>

            {/* Ryan - Tech */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 w-full flex flex-col items-center bg-white/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/80 shadow-sm relative overflow-hidden group transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-green-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-32 h-32 rounded-full bg-white/80 border-[6px] border-green-200 mb-6 flex items-center justify-center shadow-inner relative z-10 overflow-hidden">
                <img src="/ryan.png" loading="lazy" alt="Ryan" className="w-full h-full object-cover scale-[1.7] origin-[25%_35%]" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-800 relative z-10 tracking-tight">Ryan</h4>
              <p className="text-green-600 font-bold mb-3 relative z-10 uppercase tracking-widest text-xs">Technology & AI</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2 relative z-10">
                <span className="px-3 py-1 bg-white/80 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white">AI Pipelines</span>
                <span className="px-3 py-1 bg-white/80 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white">Web Tech</span>
              </div>
            </motion.div>

          </div>
          
          <div className="bg-white/60 p-8 md:p-10 rounded-[2rem] border border-white/80 shadow-inner relative z-10">
            <p className="text-slate-700 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              We are a creative duo blending the warmth of hand-drawn art with the power of modern technology. 
              We build experiences for personal brands, creators, and those passionate about the future of tech. 
              By keeping the craft human and the technology cutting-edge, we ensure your story is both authentic and impactful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
