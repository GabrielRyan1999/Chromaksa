import { motion } from 'framer-motion';

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-slate-800 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Our Pillars
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Illustration & Animation */}
          <motion.div 
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            tabIndex={0}
            className="bg-white/40 backdrop-blur-2xl border border-white/60 p-6 md:p-10 rounded-[2.5rem] group relative overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all hover:bg-white/60 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          >
            <div className="relative h-56 mb-8 rounded-3xl bg-white/50 border border-white/60 flex items-center justify-center overflow-hidden shadow-inner">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                variants={{
                  hover: { opacity: 0 }
                }}
              >
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Line Art Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-50" /><span className="relative z-10">Illustration: [Line-Art Placeholder]</span>
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-cyan-700 font-bold uppercase tracking-widest text-xs bg-cyan-50/80"
                initial={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1 }
                }}
              >
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Colored Art" className="absolute inset-0 w-full h-full object-cover opacity-80" /><span className="relative z-10">Illustration: [Colored Animation Artwork]</span>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">Illustration & Animation</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Hand-drawn by Aline, every frame tells a story. We transform your ideas into captivating visual narratives that connect with your audience on a human level.
            </p>
          </motion.div>

          {/* Technology & AI */}
          <motion.div 
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            tabIndex={0}
            className="bg-white/40 backdrop-blur-2xl border border-white/60 p-6 md:p-10 rounded-[2.5rem] group relative overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all hover:bg-white/60 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          >
            <div className="relative h-56 mb-8 rounded-3xl bg-white/50 border border-white/60 flex items-center justify-center overflow-hidden shadow-inner">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                variants={{
                  hover: { opacity: 0 }
                }}
              >
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Tech Wireframe" className="absolute inset-0 w-full h-full object-cover opacity-50" /><span className="relative z-10">Illustration: [Tech Wireframe Placeholder]</span>
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-green-700 font-bold uppercase tracking-widest text-xs bg-green-50/80"
                initial={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1 }
                }}
              >
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="AI Conceptual" className="absolute inset-0 w-full h-full object-cover opacity-80" /><span className="relative z-10">Illustration: [AI Conceptual Colored]</span>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">Technology & AI</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Engineered by Ryan. We integrate modern tech stacks and AI safety practices to future-proof your digital presence, ensuring your brand stands out and scales safely.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

