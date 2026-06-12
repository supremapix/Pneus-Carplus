import React from 'react';
import { Phone, MapPin, Clock, Compass, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#f49e1a] text-neutral-950 py-16 px-6 border-t-[6px] border-neutral-950 font-sans" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Coluna 1: Logo e Descrição */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img 
            src="https://www.carpluspneuseoficina.com.br/images/logos/logo-vertical.svg" 
            alt="Carplus Pneus Vertical Logo" 
            className="w-36 h-auto object-contain bg-neutral-950 p-4 rounded-2xl shadow-xl mb-2 border border-neutral-800"
            referrerPolicy="no-referrer"
          />
          <h4 className="font-black text-lg uppercase tracking-wide text-black">Carplus Pneus & Oficina</h4>
          <p className="text-sm text-neutral-900 font-bold leading-relaxed">
            Qualidade, garantia e honestidade no coração do Portão em Curitiba. Trabalhamos com as melhores marcas de pneus nacionais e importados com garantia de 5 anos de fábrica.
          </p>
        </div>

        {/* Coluna 2: Fale Conosco - Telefone em Destaque para Idosos */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h4 className="font-extrabold text-xl uppercase tracking-wider text-neutral-950 border-b-4 border-neutral-950 pb-2 w-full">Fale Conosco</h4>
          <div className="space-y-4 w-full">
            <p className="text-sm text-neutral-950 font-extrabold uppercase">Ligue para tirar dúvidas ou agendar:</p>
            <div className="bg-neutral-950 text-white rounded-2xl p-5 shadow-lg flex flex-col items-center md:items-start gap-1 border-2 border-neutral-900">
              <span className="text-xs uppercase tracking-widest text-[#f49e1a] font-extrabold font-mono">Telefone de Atendimento</span>
              <p className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-7 h-7 text-[#f49e1a] shrink-0" />
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#f49e1a]">(41) 3082-7282</span>
              </p>
            </div>
            
            <a 
              href="tel:4130827282" 
              className="w-full flex items-center justify-center gap-3 bg-neutral-950 hover:bg-neutral-900 text-[#f49e1a] hover:text-white font-black py-5 px-6 rounded-2xl text-base transition-all duration-300 shadow-xl hover:-translate-y-1 border-2 border-neutral-950 active:scale-95"
              id="footer-call-btn"
            >
              <Phone className="w-6 h-6 shrink-0" />
              LIGAR PRO TELEFONE COM UM CLIQUE
            </a>
          </div>
        </div>

        {/* Coluna 3: Horários de Atendimento */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h4 className="font-extrabold text-xl uppercase tracking-wider text-neutral-950 border-b-4 border-neutral-950 pb-2 w-full">Horários</h4>
          <div className="space-y-4 text-sm font-extrabold text-neutral-900">
            <div className="space-y-3">
              <p className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="w-5 h-5 text-neutral-950 shrink-0" />
                <span className="text-base text-black font-semibold">Segunda a Sexta: <span className="font-black text-neutral-950 text-lg">08:00 às 18:00</span></span>
              </p>
              <p className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="w-5 h-5 text-neutral-950 shrink-0" />
                <span className="text-base text-black font-semibold">Sábado: <span className="font-black text-neutral-950 text-lg">08:00 às 12:00</span></span>
              </p>
            </div>
            <div className="bg-neutral-950 text-[#f49e1a] text-center font-black text-xs uppercase px-4 py-2 rounded-xl inline-block shadow-md">
              ✨ Atendimento rápido sem filas
            </div>
          </div>
        </div>

        {/* Coluna 4: Endereço do Auto Center */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h4 className="font-extrabold text-xl uppercase tracking-wider text-neutral-950 border-b-4 border-neutral-950 pb-2 w-full">Endereço da Loja</h4>
          <div className="space-y-4 w-full">
            <p className="flex items-start gap-3 justify-center md:justify-start text-sm text-neutral-900 leading-relaxed">
              <MapPin className="w-6 h-6 text-neutral-950 shrink-0 mt-0.5" />
              <span className="text-base font-black text-black text-left block leading-relaxed">
                Av. Pres. Arthur da Silva Bernardes, 1323 <br />
                Bairro Portão – Curitiba – PR <br />
                CEP: 80320-300 <br />
                <span className="text-xs text-neutral-800 font-bold block mt-1">(Oficina mecânica de fácil acesso)</span>
              </span>
            </p>
            <a 
              href="#maps-section" 
              className="inline-flex w-full items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 text-[#f49e1a] hover:text-white font-black py-4 px-5 rounded-2xl text-sm transition-all shadow-xl hover:-translate-y-1 border-2 border-neutral-950 active:scale-95 cursor-pointer"
            >
              <Compass className="w-5 h-5 shrink-0" />
              VER COMO CHEGAR PASSO A PASSO
            </a>
          </div>
        </div>

      </div>

      {/* Links de Auxílio e Navegação Rápida */}
      <div className="max-w-7xl mx-auto border-t-4 border-neutral-950 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6" id="footer-bottom-bar">
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 font-black text-sm uppercase tracking-wide">
          <button 
            onClick={() => { onNavigate('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="hover:underline text-neutral-950 cursor-pointer p-1.5 focus:outline-dotted text-black font-black"
          >
            Início
          </button>
          <button 
            onClick={() => { onNavigate('quem-somos'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="hover:underline text-neutral-950 cursor-pointer p-1.5 focus:outline-dotted text-black font-black"
          >
            Quem Somos
          </button>
          <button 
            onClick={() => { onNavigate('politica-privacidades'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="hover:underline text-neutral-950 cursor-pointer p-1.5 focus:outline-dotted text-black font-black"
          >
            Políticas de Privacidade
          </button>
          <button 
            onClick={() => { onNavigate('politica-devolucao'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="hover:underline text-neutral-950 cursor-pointer p-1.5 focus:outline-dotted text-black font-black"
          >
            Trocas e Garantia
          </button>
          <button 
            onClick={() => { onNavigate('mapa-do-site'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="bg-neutral-950 text-[#f49e1a] hover:text-white px-4 py-2 rounded-xl text-xs font-black shadow-md transition uppercase tracking-wider cursor-pointer"
          >
            Mapa do Site Completo
          </button>
        </div>

        <div className="text-center lg:text-right text-xs font-bold text-neutral-900 space-y-1">
          <p className="font-extrabold text-black">
            &copy; {new Date().getFullYear()} Carplus Pneus Portão. Todos os direitos reservados.
          </p>
          <p className="font-mono text-neutral-900 text-[11px] font-bold">
            Curitiba - PR • Av. Arthur Bernardes, 1323
          </p>
        </div>
      </div>

      <SupremaCredit />
    </footer>
  );
}

export function SupremaCredit() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t-2 border-neutral-900/10 flex justify-center items-center">
      <div className="bg-neutral-950 border border-neutral-900/20 hover:border-[#f49e1a]/30 rounded-2xl sm:rounded-full px-5 py-3 sm:py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] text-center max-w-full">
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-xs text-gray-300 font-bold select-none">
          <span>Desenvolvido com</span>
          <Heart 
            size={12} 
            className="text-[#f49e1a] fill-[#f49e1a] animate-[pulse_1.5s_infinite] shrink-0 filter drop-shadow-[0_0_3px_rgba(244,158,26,0.73)]" 
          /> 
          <span>por</span>
        </div>
        <a 
          id="developer-suprema-link"
          href="https://supremasite.com.br" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#f49e1a] hover:text-white transition-all font-black text-xs sm:text-xs inline-flex items-center gap-2 cursor-pointer border-b border-dashed border-[#f49e1a]/40 hover:border-white pb-0.5 shrink-0"
        >
          <span>Suprema Sites Express</span>
          <img 
            src="https://img.supremamidia.com/suprema-img.png" 
            alt="Suprema" 
            className="h-3.5 sm:h-4 w-auto self-center select-none shrink-0 filter drop-shadow-[0_0_2px_rgba(250,204,21,0.5)] transition-transform duration-300 hover:scale-105" 
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
    </div>
  );
}
