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
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Selected Work
        </h2>
        
        {/* Featured: My Face Is Mine */}
        <div className="glass-panel-strong p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="flex-1 w-full aspect-video bg-white/40 rounded-2xl border border-white/60 flex items-center justify-center relative overflow-hidden shadow-inner">
            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-blue-500 opacity-60 absolute" preserveAspectRatio="none">
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
            <div className="relative z-10 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-blue-200 text-blue-900 font-medium">
              Illustration: [My Face Is Mine Showcase]
            </div>
          </div>
          
          <div className="flex-1">
            <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
              Featured Showcase
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">My Face Is Mine</h3>
            <p className="text-gray-700 text-lg mb-6">
              A 2D educational animation on deepfake and AI safety tailored for elementary school children. We break down complex tech concepts into approachable, hand-drawn lessons.
            </p>
            <a href="#contact" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
              Discuss a similar project <span>→</span>
            </a>
          </div>
        </div>

        {/* Horizontal Accordion Gallery */}
        <div className="w-full flex h-96 md:h-[500px] gap-2 md:gap-4 max-w-6xl mx-auto">
          {[
            { id: 1, title: 'Concept Art', color: 'from-blue-200 to-cyan-100' },
            { id: 2, title: 'Character Design', color: 'from-green-200 to-emerald-100' },
            { id: 3, title: 'Storyboarding', color: 'from-purple-200 to-fuchsia-100' },
            { id: 4, title: 'Animation Frames', color: 'from-pink-200 to-rose-100' },
            { id: 5, title: 'Neo-Visuals', color: 'from-yellow-200 to-amber-100' },
            { id: 6, title: 'AI Integrations', color: 'from-teal-200 to-teal-50' },
          ].map((item, i) => (
            <div 
              key={item.id}
              className={`group relative overflow-hidden cursor-pointer rounded-[2.5rem] bg-gradient-to-b ${item.color} border border-white/60 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-1 hover:flex-[6] flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-700 pointer-events-none" />
              
              {/* Number indicator (hidden on hover) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/60 border border-white/80 flex items-center justify-center text-sm font-bold text-gray-600 group-hover:opacity-0 transition-opacity duration-300">
                {i + 1}
              </div>

              {/* Title (shown on hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 absolute">
                <span className="bg-white/80 backdrop-blur-md text-gray-800 px-6 py-3 rounded-full font-bold shadow-sm whitespace-nowrap border border-white/80">
                   Illustration: [{item.title}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
