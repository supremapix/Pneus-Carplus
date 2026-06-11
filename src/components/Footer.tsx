import React from 'react';
import { Phone, MapPin, Clock, Calendar, CheckSquare, Compass, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#111215] text-[#9ca3af] py-12 px-6 border-t border-gray-800 font-sans" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branch / Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-justify">
          <img 
            src="https://www.carpluspneuseoficina.com.br/images/logos/logo-vertical.svg" 
            alt="Carplus Pneus Vertical Logo" 
            className="w-28 sm:w-32 h-auto object-contain bg-black p-2.5 rounded-xl border border-yellow-500/20 mb-4"
            referrerPolicy="no-referrer"
          />
          <h4 className="text-white font-black text-sm uppercase tracking-wider mb-2">Carplus Pneus & Oficina</h4>
          <p className="text-xs text-gray-500 leading-relaxed text-justify">
            Qualidade, garantia e honestidade no coração do Portão em Curitiba. Trabalhamos com as melhores marcas de pneus nacionais e importados homologados pelas maiores montadoras do país.
          </p>
        </div>

        {/* Contact and Call section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-justify">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-[#f49e1a]">Fale Conosco</h4>
          <div className="space-y-3 text-xs">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="w-4 h-4 text-yellow-500 shrink-0" />
              <span className="font-semibold text-gray-200">(41) 3082-7282</span>
            </p>
            <p className="text-gray-500">Precisa ligar direto do celular?</p>
            <a 
              href="tel:4130827282" 
              className="mt-2 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-black px-4 py-2 rounded-lg text-xs transition uppercase tracking-wider"
              id="footer-call-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              Ligar Agora
            </a>
          </div>
        </div>

        {/* Physical Store Schedule */}
        <div className="flex flex-col items-center md:items-start text-center md:text-justify">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-[#f49e1a]">Horário de Instalação</h4>
          <div className="space-y-2.5 text-xs">
            <p className="flex items-center gap-2 justify-center md:justify-start text-gray-300">
              <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>Segunda a Sexta: 08:00 – 18:00</span>
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start text-gray-300">
              <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>Sábado: 08:00 – 12:00</span>
            </p>
            <span className="bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold px-2 py-1 rounded inline-block mt-1">
              Agende antes para agilizar
            </span>
          </div>
        </div>

        {/* Authorized Location */}
        <div className="flex flex-col items-center md:items-start text-center md:text-justify">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-[#f49e1a]">Endereço Físico</h4>
          <div className="space-y-3.5 text-xs">
            <p className="flex items-start gap-2 justify-center md:justify-start text-gray-300">
              <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <span className="text-justify block">
                Av. Presid. Arthur da Silva Bernardes, 1323 <br />
                Portão – Curitiba – PR <br />
                CEP: 80320-300
              </span>
            </p>
            <a 
              href="#maps-section" 
              className="text-xs text-yellow-500 hover:underline font-bold"
            >
              Ver instruções integradas com Google Maps
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]" id="footer-bottom-bar">
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
          <button onClick={() => { onNavigate('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-yellow-500 transition cursor-pointer">
            Início
          </button>
          <button onClick={() => { onNavigate('quem-somos'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-yellow-500 transition cursor-pointer">
            Quem Somos
          </button>
          <button onClick={() => { onNavigate('politica-privacidades'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-yellow-500 transition cursor-pointer">
            Política de Privacidade
          </button>
          <button onClick={() => { onNavigate('politica-devolucao'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-yellow-500 transition cursor-pointer">
            Política de Devolução
          </button>
          <button onClick={() => { onNavigate('mapa-do-site'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-yellow-500 transition cursor-pointer font-extrabold text-yellow-500">
            Mapa do Site
          </button>
        </div>

        <div className="text-right text-gray-500">
          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} Carplus Pneus Portão. Todos os direitos reservados.
          </p>
          <p className="font-mono text-gray-600 text-center sm:text-right mt-1">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-neutral-800 flex justify-center items-center">
      <div className="bg-black border border-neutral-800 rounded-full px-6 py-2.5 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,158,26,0.15)]">
        <p className="text-white hover:text-white transition-colors duration-200 text-sm sm:text-base font-bold flex flex-wrap items-center justify-center gap-2">
          <span className="opacity-90">Desenvolvido com</span> 
          
          {/* Coração pulsante com efeito de sombra */}
          <Heart 
            size={14} 
            className="text-red-500 animate-[pulse_1.5s_infinite] shrink-0 filter drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]" 
          /> 
          
          <span className="opacity-90">por</span>
          
          {/* Link para o site da Suprema */}
          <a 
            id="developer-suprema-link"
            href="https://supremasite.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#f49e1a] hover:text-white transition-all font-black inline-flex items-center gap-2 cursor-pointer border-b border-dashed border-[#f49e1a]/50 hover:border-white"
          >
            Suprema Sites Express
            
            {/* Logotipo oficial com efeito de iluminação */}
            <img 
              src="https://img.supremamidia.com/suprema-img.png" 
              alt="Suprema" 
              className="h-[18px] w-auto inline select-none shrink-0 filter drop-shadow-[0_0_2px_rgba(250,204,21,0.5)] transition-transform duration-300 hover:scale-110" 
              referrerPolicy="no-referrer"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
