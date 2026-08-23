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
    { label: 'Catálogo de Pneus (1.962)', id: 'catalogo-pneus' },
    { label: 'Ofertas da Semana', id: 'catalog' },
    { label: 'Serviços & Oficina', id: 'alinhamento-3d-curitiba' },
    { label: 'Quem Somos', id: 'quem-somos' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contato', id: 'contato' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full" id="main-header">
      {/* Dynamic Marquee Letreiro Top Bar */}
      <div className="bg-black text-white py-2 border-b border-[#f49e1a] overflow-hidden relative z-50 group">
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
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-bold font-sans group/link text-white"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#f49e1a] shrink-0" />
                  <span className="text-[#f49e1a]">LOJA PORTÃO:</span>
                  <span className="underline decoration-dashed decoration-white group-hover/link:decoration-[#f49e1a]">
                    Av. Pres. Arthur Bernardes, 1323 - Curitiba, PR
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/link:text-[#f49e1a]" />
                </a>

                {/* Item 2: Telefone de Atendimento */}
                <a 
                  href="tel:554130827282"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-bold font-mono group/link text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f49e1a]" />
                  <span className="text-[#f49e1a] font-sans">LIGUE JÁ:</span>
                  <span className="underline decoration-dashed decoration-white group-hover/link:decoration-[#f49e1a]">
                    (41) 3082-7282
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/link:text-[#f49e1a]" />
                </a>

                {/* Item 3: Horários */}
                <div className="inline-flex items-center gap-2 text-xs font-bold text-white font-sans">
                  <Clock className="w-3.5 h-3.5 text-[#f49e1a] shrink-0" />
                  <span className="text-[#f49e1a]">HORÁRIO:</span>
                  <span className="font-mono text-white">Seg-Sex: 08:00 - 18:00 • Sáb: 08:00 - 12:00</span>
                </div>

                {/* Item 4: WhatsApp Solicitar Agendamento */}
                <a 
                  href={formatWhatsApp("Olá Carplus! Gostaria de agendar uma revisão rápida ou solicitar um orçamento de pneus.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#f49e1a] transition-colors text-xs font-extrabold font-sans group/link text-white"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#f49e1a] shrink-0" />
                  <span className="text-[#f49e1a]">WHATSAPP:</span>
                  <span className="underline decoration-dashed decoration-white group-hover/link:decoration-[#f49e1a]">
                    Fale Direto com Atendimento
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/link:text-[#f49e1a]" />
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav className="bg-black border-b border-[#f49e1a] text-white py-3 px-4 shadow-xl">
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
                className="text-xs uppercase font-extrabold tracking-wider text-white hover:text-[#f49e1a] transition duration-150 cursor-pointer"
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
              className="bg-[#f49e1a] hover:bg-white hover:text-black text-black font-black p-2.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all duration-300 relative border border-[#f49e1a]"
              id="header-cart-btn"
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline text-xs uppercase tracking-wider">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-[#f49e1a] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#f49e1a]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#f49e1a]"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 border-t-2 border-[#f49e1a] pb-4 bg-black" id="mobile-navigation-links">
            {/* Header with carplus logo & close hint */}
            <div className="bg-black p-4 rounded-2xl border border-[#f49e1a] mb-4 flex flex-col items-center text-center">
              <img
                src="https://www.carpluspneuseoficina.com.br/images/logos/logo-horizontal.svg"
                alt="Carplus Pneus e Oficina"
                className="h-10 w-auto object-contain mb-2"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs text-[#f49e1a] font-mono uppercase font-black tracking-widest">
                Portão • Curitiba
              </span>
              <p className="text-xs text-white mt-2 font-medium">
                Menu adaptado com letras grandes e botões fáceis de tocar para navegação simplificada.
              </p>
            </div>

            {/* List block */}
            <div className="space-y-3">
              <p className="text-xs text-[#f49e1a] uppercase font-black tracking-widest pl-1 mt-1">
                Páginas mais procuradas:
              </p>

              {/* 0. Catálogo Completo de Pneus (1.962 modelos) */}
              <button
                onClick={() => {
                  onScrollToSection('catalogo-pneus');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-[#f49e1a]/20 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <ShoppingCart className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Catálogo Completo (1.962 Pneus)</span>
                    <span className="block text-[11px] text-[#f49e1a] font-bold">Filtre por marca, aro (13 ao 23) e medidas</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </button>

              {/* 1. Ver estoque de pneus */}
              <button
                onClick={() => {
                  onScrollToSection('catalog');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <ShoppingCart className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Ver Ofertas e Pneus</span>
                    <span className="block text-[11px] text-white font-medium">Consulta de marcas, aros e preços em promoção</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </button>

              {/* 2. Simulador */}
              <button
                onClick={() => {
                  onScrollToSection('finder');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <HelpCircle className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Descobrir Pneu do Meu Carro</span>
                    <span className="block text-[11px] text-white font-medium">Guia fácil passo a passo para achar o modelo certo</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </button>

              {/* 3. Serviços e Oficina */}
              <button
                onClick={() => {
                  onScrollToSection('alinhamento-3d-curitiba');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <FileText className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Serviços e Alinhamento 3D</span>
                    <span className="block text-[11px] text-white font-medium">Suspensão, freios, troca de óleo e revisão geral</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </button>

              {/* 4. Ligar direto */}
              <a
                href="tel:554130827282"
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <Phone className="w-6 h-6 shrink-0 text-black" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-[#f49e1a]">LIGAR (41) 3082-7282</span>
                    <span className="block text-[11px] text-white font-bold">Toque para telefonar grátis com um clique</span>
                  </div>
                </div>
                <Phone className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </a>

              {/* 5. WhatsApp */}
              <a
                href={formatWhatsApp('Olá Carplus! Quero agendar serviços ou orçamento para o meu carro.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <MessageSquare className="w-6 h-6 shrink-0 text-black" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-[#f49e1a]">Chamar no WhatsApp</span>
                    <span className="block text-[11px] text-white font-bold">Consulte orçamentos por mensagem rápida</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </a>

              {/* 6. Endereço / Localização */}
              <button
                onClick={() => {
                  onScrollToSection('maps-section');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-black border-2 border-[#f49e1a] rounded-2xl text-left active:bg-black transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f49e1a] text-black p-2.5 rounded-xl">
                    <MapPin className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-white">Como Chegar (Endereço)</span>
                    <span className="block text-[11px] text-white font-medium">Av. Arthur Bernardes, 1323 - Portão, Curitiba</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#f49e1a] shrink-0" />
              </button>

              {/* Outros links de texto grandes */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#f49e1a]">
                <button
                  onClick={() => {
                    onScrollToSection('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-black border-2 border-[#f49e1a] rounded-2xl p-2.5 text-center transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#f49e1a]" />
                  <span>Início</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('quem-somos');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-black border-2 border-[#f49e1a] rounded-2xl p-2.5 text-center transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#f49e1a]" />
                  <span>Sobre</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('blog');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-black border-2 border-[#f49e1a] rounded-2xl p-2.5 text-center transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#f49e1a]" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('contato');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-black border-2 border-[#f49e1a] rounded-2xl p-2.5 text-center transition text-xs font-black text-white flex flex-col items-center gap-1 cursor-pointer"
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
