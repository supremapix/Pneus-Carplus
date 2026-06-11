import React, { useState } from 'react';
import { Phone, Calendar, ShoppingCart, HelpCircle, FileText, Navigation, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ onScrollToSection, cartCount, onOpenCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatWhatsApp = (text: string) => {
    return `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(text)}`;
  };

  const navLinks = [
    { label: 'Quem Somos', id: 'quem-somos' },
    { label: 'Contato', id: 'contato' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full" id="main-header">
      {/* Dynamic Marquee Letreiro Top Bar */}
      <div className="bg-[#0b0c0e] text-white py-2 border-b border-[#f49e1a]/20 overflow-hidden relative z-50 group hover:bg-[#111215] transition-colors duration-300">
        <div className="max-w-full flex cursor-pointer" title="Passe o mouse para pausar e clique nos links para ligar ou ver endereço!">
          <div className="animate-top-marquee flex items-center gap-16 whitespace-nowrap">
            {/* Array of info items, repeated to ensure loop is completely seamless */}
            {Array.from({ length: 4 }).map((_, repeatIdx) => (
              <React.Fragment key={`marquee-group-${repeatIdx}`}>
                {/* Item 1: Endereço */}
                <a 
                  href="https://maps.google.com/?q=Av.+Presid.+Arthur+da+Silva+Bernardes,+1323+-+Portão,+Curitiba+-+PR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-bold font-sans group/link"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-[#f49e1a] animate-pulse"></span>
                  <span className="text-gray-400">📍 LOJA PORTÃO:</span>
                  <span className="underline decoration-dashed decoration-gray-600 group-hover/link:decoration-[#f49e1a]">
                    Av. Pres. Arthur Bernardes, 1323 - Curitiba, PR
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover/link:text-[#f49e1a]" />
                </a>

                {/* Item 2: Telefone de Atendimento */}
                <a 
                  href="tel:554130827282"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-bold font-mono group/link"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f49e1a]" />
                  <span className="text-gray-400 font-sans">LIGUE JÁ:</span>
                  <span className="underline decoration-dashed decoration-gray-600 group-hover/link:decoration-[#f49e1a]">
                    (41) 3082-7282
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover/link:text-[#f49e1a]" />
                </a>

                {/* Item 3: Horários */}
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 font-mono">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                  <span className="text-gray-400 font-sans">HORÁRIO:</span>
                  <span>Seg-Sex: 08:00 - 18:00 • Sáb: 08:00 - 12:00</span>
                </div>

                {/* Item 4: WhatsApp Solicitar Agendamento */}
                <a 
                  href={formatWhatsApp("Olá Carplus! Gostaria de agendar uma revisão rápida ou solicitar um orçamento de pneus.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-extrabold font-sans group/link"
                >
                  <span className="text-green-500 font-bold animate-pulse">●</span>
                  <span className="text-gray-400">WHATSAPP:</span>
                  <span className="underline decoration-dashed decoration-gray-600 group-hover/link:decoration-[#f49e1a]">
                    Fale Direto com Atendimento
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover/link:text-[#f49e1a]" />
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav className="bg-black border-b border-[#f49e1a]/30 text-white py-3 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo responsive picker */}
          <div className="flex items-center">
            {/* Desktop Logo */}
            <a href="#home" onClick={() => onScrollToSection('home')} className="hidden sm:block">
              <img
                src="https://www.carpluspneuseoficina.com.br/images/logos/logo-horizontal.svg"
                alt="Carplus Pneus Oficina Mecânica"
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            {/* Mobile Header Logo */}
            <a href="#home" onClick={() => onScrollToSection('home')} className="block sm:hidden">
              <img
                src="https://www.carpluspneuseoficina.com.br/carplus-pneus-oficina-mecanica-full-service-horizontal.svg"
                alt="Carplus Pneus Mobile"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Core Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-xs uppercase font-extrabold tracking-wider text-gray-200 hover:text-[#f49e1a] transition duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="bg-[#f49e1a] hover:bg-white hover:text-black hover:border-white text-gray-950 font-black p-2.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all duration-300 relative border border-transparent"
              id="header-cart-btn"
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline text-xs uppercase tracking-wider">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-gray-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-black/50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp direct booking link */}
            <a
              href={formatWhatsApp('Olá Carplus! Gostaria de agendar uma revisão ou orçamento de pneus pela loja do Portão.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-[#f49e1a] hover:bg-white hover:text-black hover:border-white text-gray-950 font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl items-center gap-2 transition border border-transparent"
              id="header-whatsapp-cta"
            >
              <span>WHATSAPP</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-800 space-y-2 pb-2" id="mobile-navigation-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onScrollToSection(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 text-xs uppercase font-extrabold tracking-wider hover:bg-gray-800 text-gray-350 rounded"
              >
                {link.label}
              </button>
            ))}
            <a
              href={formatWhatsApp('Olá, gostaria de agendar serviços na Carplus.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#f49e1a] hover:bg-white hover:text-black text-gray-950 text-xs uppercase font-extrabold py-2.5 rounded mt-3 border border-transparent transition-colors duration-300"
            >
              WhatsApp Agendamentos
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
