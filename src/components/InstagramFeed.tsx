import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Instagram, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="bg-gray-50/50 border-t border-b border-gray-200 py-10 sm:py-12 px-4 select-none relative overflow-hidden" 
      id="carplus-instagram-feed"
    >
      {/* Background soft lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-yellow-100/35 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#f49e1a]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 relative z-10">
        
        {/* Header Section using Neuromarketing layout */}
        <motion.div 
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-[#e1306c] via-[#c13584] to-[#833ab4] text-white font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow">
            <Instagram className="w-3.5 h-3.5 fill-current" />
            Social Real Carplus CWB
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-black uppercase text-gray-950 tracking-tight leading-tight pt-1">
            Siga-nos no Instagram • <span className="text-[#f49e1a]">@carpluscwb</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-650 max-w-2xl mx-auto leading-relaxed text-center font-medium">
            Acompanhe em tempo real as entregas diárias, reviews sinceros de motoristas satisfeitos e dicas quentes de suspensão e freios diretamente nos nossos stories!
          </p>
        </motion.div>

        {/* Embedded Instagram Feed Frame */}
        <motion.div 
          className="bg-white border border-gray-200 rounded-3xl p-2 sm:p-3 shadow-lg overflow-hidden max-w-[480px] w-full mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative w-full h-[410px] sm:h-[430px] rounded-2xl overflow-hidden bg-white">
            <iframe
              src="https://www.instagram.com/carpluscwb/embed"
              className="w-full h-full border-0 block"
              scrolling="no"
              loading="lazy"
              title="Carplus Instagram Feed"
            ></iframe>
          </div>
        </motion.div>

        {/* Dynamic call to action row */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a 
            href="https://www.instagram.com/carpluscwb/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e1306c] via-[#c13584] to-[#fd1d1d] hover:brightness-110 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95 group"
          >
            <Instagram className="w-5 h-5 fill-current" />
            <span>Seguir no Instagram Oficial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Value proposition next to button */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono font-bold uppercase bg-white border border-gray-150 px-3 py-2 rounded-xl shadow-xs">
            <ShieldCheck className="w-4 h-4 text-green-550 shrink-0" />
            <span>Comunidade 100% Organizada de Curitiba</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
