import { useState, useEffect } from 'react';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px (past the initial Hero CTA)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`md:hidden fixed bottom-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <a 
        href="#contact"
        className="pointer-events-auto w-full max-w-sm bg-gradient-to-r from-cyan-500 to-green-500 text-white font-extrabold text-sm tracking-widest uppercase py-4 px-8 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        Start a Project
      </a>
    </div>
  );
}

