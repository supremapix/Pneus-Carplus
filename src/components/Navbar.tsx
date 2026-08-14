import React, { useState } from 'react';
import { Phone, Calendar, ShoppingCart, HelpCircle, FileText, Navigation, Menu, X, ArrowUpRight, MapPin, Clock, MessageSquare } from 'lucide-react';

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
    { label: 'Início', id: 'home' },
    { label: 'Pneus e Ofertas', id: 'catalog' },
    { label: 'Serviços & Oficina', id: 'alinhamento-3d-curitiba' },
    { label: 'Quem Somos', id: 'quem-somos' },
    { label: 'Blog', id: 'blog' },
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
                  <MapPin className="w-3.5 h-3.5 text-[#f49e1a] shrink-0" />
                  <span className="text-gray-400">LOJA PORTÃO:</span>
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
                <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 font-sans">
                  <Clock className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-gray-400">HORÁRIO:</span>
                  <span className="font-mono">Seg-Sex: 08:00 - 18:00 • Sáb: 08:00 - 12:00</span>
                </div>

                {/* Item 4: WhatsApp Solicitar Agendamento */}
                <a 
                  href={formatWhatsApp("Olá Carplus! Gostaria de agendar uma revisão rápida ou solicitar um orçamento de pneus.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-extrabold font-sans group/link"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-500 shrink-0" />
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
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection('home');
              }} 
              className="hidden sm:block cursor-pointer"
            >
              <img
                src="https://www.carpluspneuseoficina.com.br/images/logos/logo-horizontal.svg"
                alt="Carplus Pneus Oficina Mecânica"
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            {/* Mobile Header Logo */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection('home');
              }} 
              className="block sm:hidden cursor-pointer"
            >
              <img
                src="https://www.carpluspneuseoficina.com.br/carplus-pneus-oficina-mecanica-full-service-horizontal.svg"
                alt="Carplus Pneus Mobile"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Core Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-xs uppercase font-extrabold tracking-wider text-gray-200 hover:text-[#f49e1a] transition duration-150 cursor-pointer"
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
          <div className="md:hidden mt-3 pt-4 border-t-2 border-[#f49e1a]/40 pb-4 scale-in" id="mobile-navigation-links">
            {/* Header with carplus logo & close hint */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 mb-4 flex flex-col items-center text-center">
              <img
                src="https://www.carpluspneuseoficina.com.br/images/logos/logo-horizontal.svg"
                alt="Carplus Pneus e Oficina"
                className="h-10 w-auto object-contain mb-2"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs text-[#f49e1a] font-mono uppercase font-black tracking-widest">
                Portão • Curitiba
              </span>
              <p className="text-xs text-gray-300 mt-2 font-medium">
                Menu adaptado com letras grandes e botões fáceis de tocar para navegação simplificada.
              </p>
            </div>

            {/* List block */}
            <div className="space-y-3">
              <p className="text-xs text-[#f49e1a] uppercase font-black tracking-widest pl-1 mt-1">
                Páginas mais procuradas:
              </p>

              {/* 1. Ver estoque de pneus */}
              <button
                onClick={() => {
                  onScrollToSection('catalog');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border-2 border-neutral-700 hover:border-[#f49e1a] rounded-2xl text-left active:bg-neutral-800 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <ShoppingCart className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Ver Ofertas e Pneus</span>
                    <span className="block text-[11px] text-gray-400 font-medium">Consulta de marcas, aros e preços em promoção</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 shrink-0" />
              </button>

              {/* 2. Simulador */}
              <button
                onClick={() => {
                  onScrollToSection('finder');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border-2 border-neutral-700 hover:border-[#f49e1a] rounded-2xl text-left active:bg-neutral-800 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <HelpCircle className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Descobrir Pneu do Meu Carro</span>
                    <span className="block text-[11px] text-gray-400 font-medium">Guia fácil passo a passo para achar o modelo certo</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 shrink-0" />
              </button>

              {/* 3. Serviços e Oficina */}
              <button
                onClick={() => {
                  onScrollToSection('alinhamento-3d-curitiba');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border-2 border-neutral-700 hover:border-[#f49e1a] rounded-2xl text-left active:bg-neutral-800 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <FileText className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Serviços e Alinhamento 3D</span>
                    <span className="block text-[11px] text-gray-400 font-medium">Suspensão, freios, troca de óleo e revisão geral</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 shrink-0" />
              </button>

              {/* 4. Ligar direto */}
              <a
                href="tel:554130827282"
                className="w-full flex items-center justify-between p-4 bg-green-950 border-2 border-green-700 hover:border-green-400 rounded-2xl text-left active:bg-green-900 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white p-2.5 rounded-xl">
                    <Phone className="w-6 h-6 shrink-0 text-[#0b0c0e]" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-green-300">LIGAR (41) 3082-7282</span>
                    <span className="block text-[11px] text-green-400 font-bold">Toque para telefonar grátis com um clique</span>
                  </div>
                </div>
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
              </a>

              {/* 5. WhatsApp */}
              <a
                href={formatWhatsApp('Olá Carplus! Quero agendar serviços ou orçamento para o meu carro.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 bg-emerald-950 border-2 border-emerald-700 hover:border-emerald-400 rounded-2xl text-left active:bg-emerald-900 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 text-white p-2.5 rounded-xl">
                    <MessageSquare className="w-6 h-6 shrink-0 text-[#0b0c0e]" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-emerald-300">Chamar no WhatsApp</span>
                    <span className="block text-[11px] text-emerald-400 font-bold">Consulte orçamentos por mensagem rápida</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-400 shrink-0" />
              </a>

              {/* 6. Endereço / Localização */}
              <button
                onClick={() => {
                  onScrollToSection('maps-section');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-neutral-900 border-2 border-neutral-700 hover:border-[#f49e1a] rounded-2xl text-left active:bg-neutral-800 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <MapPin className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Como Chegar (Endereço)</span>
                    <span className="block text-[11px] text-gray-400 font-medium">Av. Arthur Bernardes, 1323 - Portão, Curitiba</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 shrink-0" />
              </button>

              {/* Outros links de texto grandes */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-800">
                <button
                  onClick={() => {
                    onScrollToSection('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 border-2 border-neutral-800 hover:border-[#f49e1a] rounded-2xl p-2.5 text-center active:bg-neutral-800 transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#f49e1a]" />
                  <span>Início</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('quem-somos');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 border-2 border-neutral-800 hover:border-[#f49e1a] rounded-2xl p-2.5 text-center active:bg-neutral-800 transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#f49e1a]" />
                  <span>Sobre</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 border-2 border-neutral-800 hover:border-[#f49e1a] rounded-2xl p-2.5 text-center active:bg-neutral-800 transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#f49e1a]" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('contato');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 border-2 border-neutral-800 hover:border-[#f49e1a] rounded-2xl p-2.5 text-center active:bg-neutral-800 transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#f49e1a]" />
                  <span>Contato</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
