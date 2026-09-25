import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let points = [];
    let rafId;
    let currentMouse = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      currentMouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (currentMouse) {
        points.push({ ...currentMouse, age: 0 });
        currentMouse = null; // Consume it so we don't push duplicates if mouse stops
      }
      
      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        // Frutiger Aero pencil/brush style
        ctx.strokeStyle = 'rgba(124, 231, 255, 0.7)';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(155, 243, 107, 0.5)';
        ctx.stroke();
      }

      for (let i = 0; i < points.length; i++) {
        points[i].age++;
      }
      points = points.filter((p) => p.age < 30);

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      
      {/* Content Layer */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-3xl border border-white/60 p-8 md:p-16 rounded-[3rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] max-w-4xl mx-auto flex flex-col items-center relative overflow-hidden"
        >
          {/* Inner glowing element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-300/30 blur-3xl pointer-events-none"></div>

          <img 
            src="/logo.png" 
            alt="Chromaksa Studio Logo" 
            className="w-48 md:w-64 h-auto object-contain mb-8 drop-shadow-lg relative z-10"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 text-slate-800 tracking-tight leading-tight relative z-10" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Where Art Meets <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-500">Technology</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 font-medium max-w-2xl relative z-10 px-4 md:px-0">
            Bridging the gap between traditional illustration and cutting-edge AI.
          </p>
          <a href="#contact" className="relative z-10 inline-block bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold text-sm tracking-widest uppercase py-4 px-10 rounded-full shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all">
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
