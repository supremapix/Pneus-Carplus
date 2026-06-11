import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-zinc-950 border-2 border-[#f49e1a] text-[#f49e1a] hover:bg-[#f49e1a] hover:text-black p-3.5 rounded-full shadow-2xl transition duration-350 cursor-pointer group flex items-center justify-center"
          aria-label="Voltar para o topo"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="w-5 h-5 shrink-0 group-hover:-translate-y-1 transition-transform duration-300 animate-[bounce_1.5s_infinite]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
