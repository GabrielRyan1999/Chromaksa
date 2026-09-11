import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let points = [];
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        age: 0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
          className="glass-panel-strong p-12 max-w-3xl mx-auto flex flex-col items-center"
        >
          <img 
            src="/logo.png" 
            alt="Chromaksa Studio Logo" 
            className="w-48 md:w-80 h-auto object-contain mb-8 drop-shadow-md"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Where Art Meets <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
            Bridging the gap between traditional illustration and cutting-edge AI.
          </p>
          <a href="#contact" className="inline-block bg-gradient-to-r from-blue-400 to-green-400 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
