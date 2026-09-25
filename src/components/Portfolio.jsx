import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Portfolio() {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const [autoScrollProgress, setAutoScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // 1.5 seconds of no scrolling triggers auto carousel
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;
    
    const animateAutoScroll = () => {
      if (!isScrolling) {
        setAutoScrollProgress(prev => (prev + 0.002) % 1);
      }
      animationFrameId = requestAnimationFrame(animateAutoScroll);
    };

    animationFrameId = requestAnimationFrame(animateAutoScroll);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling]);

  // Use the framer-motion scroll progress when scrolling, otherwise use our manual progress
  const displayProgress = isScrolling ? smoothProgress : autoScrollProgress;

  return (
    <section id="portfolio" className="py-24 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-slate-800 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Selected Work
        </h2>
        
        {/* Featured: My Face Is Mine */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-6 md:p-12 rounded-[3rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center mb-16 relative overflow-hidden">
          {/* Decorative glow inside panel */}
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="flex-1 w-full aspect-video bg-white/50 rounded-3xl border border-white/80 flex items-center justify-center relative overflow-hidden shadow-inner z-10">
            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-cyan-500 opacity-60 absolute" preserveAspectRatio="none">
              <motion.path 
                d="M10,80 Q30,20 50,50 T90,20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                pathLength="1"
                style={{ pathLength: displayProgress }}
              />
            </svg>
            <div className="relative z-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-cyan-200 text-cyan-800 font-bold text-xs uppercase tracking-widest shadow-sm">
              Illustration: [My Face Is Mine Showcase]
            </div>
          </div>
          
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-100 to-cyan-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-6 border border-white/60 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Featured Showcase
            </div>
            <h3 className="text-4xl font-extrabold mb-4 text-slate-800 tracking-tight">My Face Is Mine</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              A 2D educational animation on deepfake and AI safety tailored for elementary school children. We break down complex tech concepts into approachable, hand-drawn lessons.
            </p>
            <a href="#contact" className="group inline-flex items-center gap-2 text-cyan-600 font-bold text-sm uppercase tracking-widest hover:text-cyan-800 transition-colors">
              Discuss a similar project <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Horizontal Gallery / Accordion */}
        <div className="w-full flex h-80 md:h-[500px] gap-4 max-w-6xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 1, title: 'Concept Art', color: 'from-blue-200 to-cyan-100', image: '' },
            { id: 2, title: 'Character Design', color: 'from-green-200 to-emerald-100', image: '' },
            { id: 3, title: 'Storyboarding', color: 'from-purple-200 to-fuchsia-100', image: '' },
            { id: 4, title: 'Animation Frames', color: 'from-pink-200 to-rose-100', image: '' },
            { id: 5, title: 'Neo-Visuals', color: 'from-yellow-200 to-amber-100', image: '' },
            { id: 6, title: 'AI Integrations', color: 'from-teal-200 to-teal-50', image: '' },
          ].map((item, i) => (
            <div 
              key={item.id}
              tabIndex={0}
              className={`group relative overflow-hidden cursor-pointer rounded-[2.5rem] bg-gradient-to-b ${item.color} border border-white/60 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-none w-64 snap-center md:w-auto md:flex-1 md:hover:flex-[6] md:focus:flex-[6] focus:outline-none focus:ring-4 focus:ring-cyan-400 flex items-center justify-center`}
            >
              <img 
                src={item.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"} 
                alt={item.title} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-50 group-hover:opacity-100 group-focus:opacity-100" 
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 group-focus:bg-white/10 transition-colors duration-700 pointer-events-none" />
              
              {/* Number indicator (hidden on hover/focus on desktop) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-sm font-bold text-gray-600 md:group-hover:opacity-0 md:group-focus:opacity-0 transition-opacity duration-300">
                {i + 1}
              </div>

              {/* Title (shown by default on mobile, on hover/focus on desktop) */}
              <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 transition-opacity duration-500 delay-200 absolute">
                <span className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-3 rounded-full font-bold shadow-sm whitespace-nowrap border border-white/80">
                   {!item.image && "Illustration: "}[{item.title}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

