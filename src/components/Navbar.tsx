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
    { label: 'Início', id: 'home' },
    { label: 'Encontrar Pneu', id: 'finder' },
    { label: 'Catálogo de Pneus', id: 'catalog' },
    { label: 'Aros & Marcas', id: 'categories' },
    { label: 'Onde Estacionar (Maps)', id: 'maps-section' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full" id="main-header">
      {/* Top bar with hours and address */}
      <div className="bg-[#111215] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 justify-center text-center sm:text-justify font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#f49e1a] animate-pulse"></span>
            <span>Unidade Portão - Av. Presid. Arthur da Silva Bernardes, 1323 • Curitiba, PR</span>
          </div>
          <div className="flex items-center gap-4 text-gray-350 font-mono">
            <span>Seg-Sex: 08:00 - 18:00 • Sáb: 08:00 - 12:00</span>
            <span className="hidden md:inline font-bold text-[#f49e1a] hover:underline">
              <a href="tel:4130827282" className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                (41) 3082-7282
              </a>
            </span>
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
          <div className="hidden lg:flex items-center gap-6">
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
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-800 space-y-2 pb-2" id="mobile-navigation-links">
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
