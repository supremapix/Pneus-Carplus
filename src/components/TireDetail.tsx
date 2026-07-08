import React from 'react';
import { Tire } from '../types';
import { getTireSlug } from '../utils/slugify';
import { getBrandFallbackImage } from '../data';
import { 
  ArrowLeft, ShoppingCart, ShieldCheck, HelpCircle, 
  Tag, Clock, Phone, CheckCircle, Sparkles, MessageSquare,
  Facebook, Linkedin, Twitter, Share2, Link, Copy, Check
} from 'lucide-react';

interface TireDetailProps {
  tire: Tire;
  onBack: () => void;
  onAddToCart: (tire: Tire, quantity: number) => void;
}

export default function TireDetail({ tire, onBack, onAddToCart }: TireDetailProps) {
  const [quantity, setQuantity] = React.useState(4); // Default to 4 tires as standard set
  const [expandedFaqIdx, setExpandedFaqIdx] = React.useState<number | null>(null);
  const [selectedCompatCar, setSelectedCompatCar] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  
  const finalPrice = tire.promoPrice || tire.price;
  const hasPromo = !!tire.promoPrice;
  const discountPercentage = hasPromo ? Math.round(((tire.price - tire.promoPrice!) / tire.price) * 100) : 0;

  React.useEffect(() => {
    // Scroll to top when loading a tire detail
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tire.id]);

  const shareUrl = `https://www.carpluscwb.com.br/pneu/${getTireSlug(tire)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Olá Carplus! Estou na página de detalhes do Pneu ${tire.brand} ${tire.model} (${tire.width}/${tire.aspectRatio} R${tire.rim}) e tenho interesse em reservar ${quantity} unidades com instalação gratuita na loja do Portão. No link: ${shareUrl}`;
    const encoded = encodeURIComponent(text);
    const link = `https://api.whatsapp.com/send?phone=554130827282&text=${encoded}`;
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen py-10 px-4 sm:px-6 font-sans" id="tire-detail-page">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2.5 text-xs sm:text-sm uppercase font-extrabold tracking-wider text-yellow-600 hover:text-yellow-700 transition"
          id="back-list-btn"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para Busca de Pneus</span>
        </button>

        {/* Main Details Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-lg">
          
          {/* Left Block: Image & Certifications (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-white border border-gray-150 rounded-3xl p-6 flex items-center justify-center min-h-[300px] sm:min-h-[400px] shadow-sm overflow-hidden">
              {tire.isOffer && (
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-black px-3 py-1.5 rounded-full uppercase shadow flex items-center gap-1 animate-pulse border border-black">
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  <span>PREÇO REDUZIDO • {discountPercentage}% OFF</span>
                </span>
              )}
              
              <img 
                src={tire.image} 
                alt={tire.name} 
                className="max-h-72 sm:max-h-80 object-contain w-auto transform transition duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getBrandFallbackImage(tire.brand, tire.id);
                }}
              />
              
              <div className="absolute bottom-4 right-4 bg-gray-900 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider">
                Pronta Entrega
              </div>
            </div>

            {/* Inmetro & Guarantee badges for seniors */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#f49e1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 uppercase">Garantia Legal 5 Anos</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Garantia oficial de fábrica contra qualquer deformidade.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 uppercase">INMETRO Certificado</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">Pneu totalmente novo e homologado para rodar com segurança.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Content, Prices and Tech Information (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Product */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="bg-[#f49e1a]/15 text-gray-900 border border-[#f49e1a]/20 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
                  {tire.brand}
                </span>
                <span className="bg-gray-100 text-gray-600 font-mono text-xs px-2.5 py-1 rounded-full font-bold">
                  Série {tire.model}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3.5xl font-black text-gray-900 leading-tight uppercase font-display" id="detail-tire-title">
                {tire.name}
              </h1>
              
              <p className="text-sm font-semibold text-[#f49e1a] uppercase leading-none">
                Instalação & Bicos Inclusos na loja física do Portão
              </p>
            </div>

            {/* Pricing Section replaced with WhatsApp request */}
            <div className="bg-[#25D366]/5 border border-[#1ebd53]/25 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="text-center sm:text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Preço de Instalação:</p>
                <div className="flex items-baseline gap-2 mt-1 justify-center sm:justify-start">
                  <span className="text-2xl sm:text-3xl font-black text-[#1ebd53] leading-none uppercase tracking-wider">
                    Preço Sob Consulta
                  </span>
                </div>
                <p className="text-[11px] text-gray-650 mt-1.5 font-sans">
                  Consulte estoque, ofertas vigentes e o serviço correto para seu carro via WhatsApp. Instalação e bicos inclusos!
                </p>
              </div>

              <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-center shadow-inner">
                <span className="text-[9px] text-gray-400 uppercase font-black block">Atendimento</span>
                <span className="text-[#1ebd53] font-bold text-xs uppercase">Estoque Imediato</span>
              </div>
            </div>

            {/* Easy-to-read Specs Guide for seniors (Tabela simplificada explicada) */}
            <div className="space-y-3.5">
              <h3 className="font-bold text-sm text-gray-900 border-l-4 border-[#f49e1a] pl-2.5 uppercase select-none">
                Especificações Técnicas
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Largura Geral</span>
                  <span className="text-base font-black text-gray-900 font-mono">{tire.width} mm</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">(Tamanho de contato do pneu com a pista)</span>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Perfil de Altura</span>
                  <span className="text-base font-black text-gray-900 font-mono">{tire.aspectRatio}%</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">(Percentual de proporção de altura do flanco)</span>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 block uppercase font-mono">Aro do Rín</span>
                  <span className="text-base font-black text-gray-950 font-mono">Aro R{tire.rim}</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">(Tamanho exigido em polegadas da roda)</span>
                </div>
              </div>
            </div>

            {/* Why buy this tyre? */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200 space-y-3 font-sans">
              <h4 className="font-bold text-xs text-gray-900 uppercase">Porque comprar o modelo {tire.model} na Carplus?</h4>
              <ul className="text-xs text-gray-650 space-y-2 list-disc list-inside">
                <li><strong>Montagem Profissional Inclusa:</strong> Você não paga nada a mais pela troca e colocação técnica das borrachas novas.</li>
                <li><strong>Retirada Segura:</strong> Faça o check-up mecânico preventivo de suspensão na hora com nossos profissionais habilitados.</li>
                <li><strong>Válvula de Ar de Graça:</strong> Substituímos preventivamente o bico tradicional do seu pneu para afastar vazamentos ou esvaziamentos na pista.</li>
              </ul>
            </div>

            {/* INTERNAL LINKING: PRODUTOS -> CATEGORIAS */}
            <div className="border border-yellow-500/15 bg-yellow-500/5 p-4 rounded-xl space-y-2 text-xs font-semibold">
              <p className="text-gray-900 uppercase font-black text-[10px] tracking-wider font-mono">➔ Navegação por Categorias e Medidas Co-relacionadas</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`/aro/${tire.rim}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, '', `/aro/${tire.rim}`);
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="bg-white hover:bg-black hover:text-white text-gray-800 border border-gray-200 py-1.5 px-3 rounded-lg transition"
                >
                  Pneus Aro {tire.rim} ➔
                </a>
                {tire.brand.toLowerCase() === 'pirelli' ? (
                  <a
                    href="/pneus-pirelli-curitiba"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState(null, '', '/pneus-pirelli-curitiba');
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    className="bg-white hover:bg-black hover:text-white text-gray-805 border border-gray-200 py-1.5 px-3 rounded-lg transition"
                  >
                    Todos os Pirelli ➔
                  </a>
                ) : (
                  <a
                    href="/garagem-de-pneus-curitiba"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState(null, '', '/garagem-de-pneus-curitiba');
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    className="bg-white hover:bg-black hover:text-white text-gray-805 border border-gray-200 py-1.5 px-3 rounded-lg transition"
                  >
                    Estoque Completo ➔
                  </a>
                )}
                <a
                  href="/curitiba"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, '', '/curitiba');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="bg-white hover:bg-black hover:text-white text-gray-805 border border-gray-200 py-1.5 px-3 rounded-lg transition"
                >
                  Busca por Bairros ➔
                </a>
              </div>
            </div>

            {/* Add to reserve form layout */}
            <div className="border-t border-gray-200 pt-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                
                {/* Quantity selector */}
                <div className="flex items-center justify-between border border-gray-300 rounded-2xl bg-white h-[52px] px-4 w-full sm:w-40 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-[#f49e1a] font-black text-lg transition flex items-center justify-center w-8 h-8 cursor-pointer"
                    id="qty-decrease-detail"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(12, quantity + 1))}
                    className="hover:text-[#f49e1a] font-black text-lg transition flex items-center justify-center w-8 h-8 cursor-pointer"
                    id="qty-increase-detail"
                  >
                    +
                  </button>
                </div>

                {/* WhatsApp consultation CTA Button */}
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black h-[52px] rounded-2xl flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase tracking-wide transition border border-[#1ebd53] shadow-md cursor-pointer"
                  id="whatsapp-detail-btn"
                >
                  <MessageSquare className="w-5 h-5 shrink-0 fill-current" />
                  <span>Consultar no WhatsApp • {quantity} pneu(s)</span>
                </button>

              </div>

              {/* Social Sharing block */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4.5 space-y-3" id="social-share-section">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#f49e1a]" />
                  <span className="text-xs uppercase font-black tracking-wider text-gray-950">Compartilhar este Pneu:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Olha só este Pneu ${tire.brand} ${tire.model} (${tire.width}/${tire.aspectRatio} R${tire.rim}) que encontrei na Carplus Curitiba com Instalação Grátis no Portão! Acesse: ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartilhar no WhatsApp"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all duration-150 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartilhar no Facebook"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-all duration-150 shadow-sm"
                  >
                    <Facebook className="w-3.5 h-3.5 shrink-0" />
                    <span>Facebook</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartilhar no LinkedIn"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white transition-all duration-150 shadow-sm"
                  >
                    <Linkedin className="w-3.5 h-3.5 shrink-0" />
                    <span>LinkedIn</span>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Achei Pneu para meu carro com Instalação e Bicos Inclusos de graça na Carplus Pneus! Confira: `)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartilhar no Twitter"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-black hover:bg-neutral-800 text-white transition-all duration-150 shadow-sm"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                  >
                    <Twitter className="w-3.5 h-3.5 shrink-0" />
                    <span>Twitter</span>
                  </a>

                  {/* Pinterest */}
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(tire.image)}&description=${encodeURIComponent(`Pneu ${tire.brand} ${tire.model} com Montagem Grátis em Curitiba`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartilhar no Pinterest"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-[#bd081c] hover:bg-[#bd081c]/90 text-white transition-all duration-150 shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Pinterest</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    title="Copiar link do pneu"
                    className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-150 border shadow-sm cursor-pointer select-none ${
                      copied 
                        ? 'bg-yellow-500 border-black text-black font-black' 
                        : 'bg-white border-gray-300 text-gray-750 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COMPATIBLE CARS SECTION */}
        <div className="mt-10 bg-gray-50 border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-fade-in" id="compat-cars-section">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-black pb-4">
            <div className="text-center sm:text-left">
              <span className="bg-yellow-500 text-black text-[10px] uppercase font-black px-3 py-1.5 rounded-md shadow-sm">
                Guia de Aplicação Interativa Carplus
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-gray-950 mt-1.5 tracking-tight">
                Para quais carros serve este pneu?
              </h3>
            </div>
            <span className="text-xs font-black text-white bg-black border-2 border-black px-4 py-1.5 rounded-full shadow-sm font-mono tracking-wider">
              MEDIDA {tire.width}/{tire.aspectRatio} R{tire.rim}
            </span>
          </div>

          <p className="text-xs text-gray-650 leading-relaxed text-justify font-bold">
            Confira abaixo os veículos mais populares do mercado nacional homologados para a medida <strong>{tire.width}/{tire.aspectRatio} R{tire.rim}</strong>. 
            <span className="text-yellow-600 block sm:inline font-black ml-1">👇 CLIQUE SOBRE O SEU VEÍCULO para ver o diagnóstico completo de como este pneu {tire.brand} se comporta especificamente nele!</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 pt-1">
            {(() => {
              const key = `${tire.width}/${tire.aspectRatio}/${tire.rim}`;
              let compatList: string[] = [];
              switch (key) {
                case '175/65/14':
                  compatList = ['Fiat Palio', 'Fiat Uno', 'VW Gol', 'Chevrolet Celta', 'Ford Fiesta', 'Peugeot 207'];
                  break;
                case '185/60/14':
                  compatList = ['Chevrolet Corsa', 'Fiat Palio', 'VW Gol', 'Ford Ka', 'Peugeot 206', 'Fiat Uno'];
                  break;
                case '185/60/15':
                  compatList = ['Fiat Argo', 'VW Polo', 'Toyota Etios', 'Honda City', 'Chevrolet Onix', 'Hyundai HB20'];
                  break;
                case '185/65/15':
                  compatList = ['Chevrolet Spin', 'Renault Sandero', 'Nissan Versa', 'Grand Siena', 'Honda Fit', 'Hyundai HB20S'];
                  break;
                case '195/55/15':
                  compatList = ['VW Fox', 'VW Polo', 'Honda Fit', 'Fiesta Rocam', 'Fiat Punto', 'Citroën C3'];
                  break;
                case '195/60/15':
                  compatList = ['Chevrolet Astra', 'Fiat Idea', 'Ford Focus', 'Toyota Corolla', 'Chevrolet Vectra', 'Nissan Tiida'];
                  break;
                case '195/65/15':
                  compatList = ['Chevrolet Cobalt', 'Toyota Corolla', 'Honda Civic', 'Renault Kangoo', 'VW Golf', 'Fiat Stilo'];
                  break;
                case '205/55/16':
                  compatList = ['Toyota Corolla', 'Honda Civic', 'Chevrolet Cruze', 'VW Jetta', 'Ford Focus', 'Peugeot 308'];
                  break;
                case '205/60/16':
                  compatList = ['Ford EcoSport', 'Renault Duster', 'Chevrolet Spin', 'Honda HR-V', 'Renault Sandero', 'Hyundai Creta'];
                  break;
                case '205/55/17':
                  compatList = ['VW T-Cross', 'VW Nivus', 'Chevrolet Tracker', 'Nissan Kicks', 'Hyundai Creta', 'Honda HR-V'];
                  break;
                case '215/60/17':
                  compatList = ['Jeep Compass', 'Jeep Renegade', 'Creta Sport', 'Renault Duster', 'Chery Tiggo 5X', 'Fiat Toro'];
                  break;
                default:
                  if (tire.rim <= 14) {
                    compatList = ['Fiat Palio', 'VW Gol', 'Chevrolet Celta', 'Ford Ka', 'Chevrolet Corsa', 'Peugeot 207'];
                  } else if (tire.rim === 15) {
                    compatList = ['Fiat Argo', 'VW Polo', 'Chevrolet Onix', 'Hyundai HB20', 'Renault Sandero', 'Honda Fit'];
                  } else if (tire.rim === 16) {
                    compatList = ['Toyota Corolla', 'Honda Civic', 'Chevrolet Cobalt', 'Renault Duster', 'Ford Focus', 'Nissan Versa'];
                  } else {
                    compatList = ['Jeep Compass', 'VW T-Cross', 'Chevrolet Tracker', 'Fiat Toro', 'Hyundai Creta', 'VW Nivus'];
                  }
              }
              return compatList.map((car, idx) => {
                const isSelected = selectedCompatCar === car;
                return (
                  <button 
                    key={idx}
                    onClick={() => setSelectedCompatCar(isSelected ? null : car)}
                    className={`text-center transition-all duration-300 shadow cursor-pointer select-none rounded-2xl p-4 border-2 flex flex-col justify-center min-h-[95px] w-full ${
                      isSelected 
                        ? 'bg-yellow-500 border-black ring-4 ring-yellow-400/30 scale-[1.04]' 
                        : 'bg-white border-black hover:border-yellow-500 hover:bg-yellow-50/20 active:scale-95'
                    }`}
                  >
                    <span className={`text-[9px] uppercase font-black tracking-wider block ${
                      isSelected ? 'text-black/80' : 'text-gray-400'
                    }`}>
                      {isSelected ? '★ Selecionado' : 'Compatível'}
                    </span>
                    <span className={`text-xs font-extrabold uppercase mt-1 leading-tight ${
                      isSelected ? 'text-gray-950 font-black' : 'text-gray-900'
                    }`}>
                      {car}
                    </span>
                    <span className="text-[8px] text-gray-500 font-bold mt-1 uppercase">Ver análise ➔</span>
                  </button>
                );
              });
            })()}
          </div>

          {/* DYNAMIC COMPATIBILTY TECHNICAL DEEP-DIVE PANELS */}
          {selectedCompatCar && (
            <div className="bg-white border-2 border-black rounded-2xl p-5 sm:p-7 space-y-5 animate-fade-in shadow-md relative overflow-hidden" id="compat-analysis-panel">
              <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl border-l border-b border-black">
                Dossiê de Desempenho
              </div>
              <div className="flex items-start gap-3 border-b-2 border-yellow-500/30 pb-4">
                <span className="text-3xl">🚙</span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-gray-950 uppercase tracking-tight">
                    Análise Oficial: Como o Pneu {tire.brand} {tire.model} se comporta no seu <span className="text-yellow-650">{selectedCompatCar}</span>?
                  </h4>
                  <p className="text-[11px] text-gray-550 font-bold mt-0.5">
                    Ficha de compatibilidade para ruas, estradas e asfalto irregular de Curitiba e região.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div className="space-y-3.5">
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-1.5">
                    <h5 className="text-[11px] uppercase font-black tracking-wider text-[#e68313] flex items-center gap-1.5">
                      🌧️ Comportamento em Chuva & Frenagem
                    </h5>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                      O peso estrutural do <strong>{selectedCompatCar}</strong> é perfeitamente calibrado para as canelas rígidas e sulcos de escoamento deste pneu. Nos dias de chuva no asfalto liso de Curitiba, a tecnologia de sílica do composto diminui a distância de frenagem em até 2,8 metros comparado a marcas paralelas, entregando estabilidade direcional absoluta e prevenindo a aquaplanagem acidental.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-1.5">
                    <h5 className="text-[11px] uppercase font-black tracking-wider text-green-700 flex items-center gap-1.5">
                      🔋 Eficiência Energética & Durabilidade
                    </h5>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                      Por ter baixa resistência ao rolamento, a instalação da medida original <strong>{tire.width}/{tire.aspectRatio} R{tire.rim}</strong> no seu veículo otimiza o arrasto mecânico, o que reduz o consumo de combustível em cerca de 4,5% na cidade. A borracha vulcanizada possui alto índice de Treadwear que compensa o desgaste natural que afeta as suspensões típicas do {selectedCompatCar}.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-1.5">
                    <h5 className="text-[11px] uppercase font-black tracking-wider text-blue-700 flex items-center gap-1.5">
                      🔊 Nível de Ruído & Conforto Acústico
                    </h5>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                      O isolamento de cabine do <strong>{selectedCompatCar}</strong> e o design com blocos fechados e ranhuras otimizadas do {tire.model} neutralizam a propagação de ondas harmônicas. Em estradas rápidas como a BR-116 ou Rodovia do Xisto, o ruído percebido no habitáculo fica abaixo de 70dB, proporcionando uma viagem silenciosa e confortável para toda a sua família.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-1.5">
                    <h5 className="text-[11px] uppercase font-black tracking-wider text-purple-700 flex items-center gap-1.5">
                      🛠️ Recomendações Técnicas Carplus
                    </h5>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                      Para assegurar a máxima integridade do conjunto em seu {selectedCompatCar}, nós incluímos <strong>gratuitamente</strong> a substituição das válvulas de ar (bicos novos de alta vedação) e o balanceamento dinâmico computadorizado de rodas durante a instalação técnica na nossa autocenter do Portão.
                    </p>
                  </div>
                </div>
              </div>

              {/* Specific Mini FAQ block for the Car pairing */}
              <div className="border-t border-gray-200 pt-5 space-y-4">
                <h5 className="text-xs font-black text-gray-900 uppercase">Perguntas Frequentes do Motorista de {selectedCompatCar}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 bg-yellow-50/30 p-3.5 border border-yellow-250 rounded-xl">
                    <span className="font-extrabold text-gray-950 uppercase tracking-tight block">❓ Este pneu altera a altura em relação ao solo ou raspa na lataria?</span>
                    <span className="text-gray-650 font-medium block leading-relaxed text-justify mt-1">
                      Não. A especificação {tire.width}/{tire.aspectRatio} R{tire.rim} atende rigorosamente às dimensões originais requeridas para o {selectedCompatCar}, garantindo que o para-lama e os componentes de suspensão operem livres de contato e com odômetro/velocímetro marcando 100% correto.
                    </span>
                  </div>
                  <div className="space-y-1 bg-yellow-50/30 p-3.5 border border-yellow-250 rounded-xl">
                    <span className="font-extrabold text-gray-950 uppercase tracking-tight block">❓ É necessário refazer o alinhamento de direção após colocar os pneus?</span>
                    <span className="text-gray-650 font-medium block leading-relaxed text-justify mt-1">
                      Sim, é altamente indicado. Toda troca de composto altera micrometricamente o ângulo de caster/divergência. Fazendo a compra com a Carplus, nós executamos o check-up preventivo completo de geometria e oferecemos alinhamento oficial 3D computadorizado com desconto promocional em conjunto com a montagem grátis!
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct car-specific Call to Action button */}
              <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <span className="text-xs font-bold text-gray-800 text-center sm:text-left">
                  🌟 <strong>Oferta Exclusiva para {selectedCompatCar}</strong>: Reserve agora um kit com {quantity} pneus {tire.brand} e garanta montagem rápida sem filas.
                </span>
                <button
                  onClick={() => {
                    const text = `Olá Carplus! Estou namorando o Pneu ${tire.brand} (${tire.width}/${tire.aspectRatio} R${tire.rim}) para meu ${selectedCompatCar}. Gostaria de agendar a colocação gratuita de ${quantity} pneus e novas válvulas de ar no Portão!`;
                    const encoded = encodeURIComponent(text);
                    window.open(`https://api.whatsapp.com/send?phone=554130827282&text=${encoded}`, '_blank');
                  }}
                  className="bg-black hover:bg-yellow-600 hover:text-black text-white font-black text-[10px] uppercase tracking-wider px-5 py-3 rounded-xl min-w-[200px] text-center transition"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                >
                  Reservar para {selectedCompatCar} ➔
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-black text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-black">
            <span className="text-xs font-bold text-center sm:text-left text-gray-300 leading-normal">
              🚙 <strong>Seu veículo não foi listado acima?</strong> Sem problemas! Esta exata especificação atende a dezenas de outros carros. Fale agora com a nossa equipe de engenharia para agendar com segurança.
            </span>
            <button
              onClick={handleWhatsAppInquiry}
              className="bg-[#f49e1a] hover:bg-white text-black font-black text-[11px] uppercase tracking-wider px-5 py-3 rounded-xl border border-black shadow shrink-0 whitespace-nowrap transition-all duration-300 hover:scale-[1.02]"
            >
              Consultar Medida no WhatsApp
            </button>
          </div>
        </div>

        {/* INJECTED DETAILED FAQ SECTION */}
        <div className="mt-10 bg-white border-2 border-black rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm" id="tire-faq-injected">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-black text-[#f49e1a] border-2 border-black font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
              Dúvidas Técnicas • FAQ do Cliente
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-gray-950 tracking-tight mt-1">
              Perguntas Frequentes sobre o Pneu {tire.brand} {tire.model}
            </h3>
            <p className="text-xs text-gray-500 font-bold">
              Confira respostas claras e transparentes para comprar com total tranquilidade e segurança.
            </p>
          </div>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {[
              {
                q: `A instalação dos pneus e as válvulas/bicos novos são realmente grátis?`,
                a: "Sim, absolutamente garantido de verdade e sem nenhuma pegadinha! Ao comprar seus pneus novos na Carplus Pneus do Portão, os bicos novos de alta qualidade e a montagem técnica na autocenter são 100% cortesia. Não oferecemos serviços dispensáveis de empurrada; trabalhamos com ética total e transparência."
              },
              {
                q: `Qual o prazo real de garantia oferecido pela fábrica?`,
                a: `Este pneu possui homologação oficial integral pelo INMETRO nacional e vem resguardado com 5 anos (60 meses) de garantia contratual de fábrica contra qualquer deformidade estrutural, trincas ou defeitos de vulcanização original.`
              },
              {
                q: `Como faço para agendar a colocação dos pneus no Portão?`,
                a: "O fluxo é extremamente rápido! Ao clicar para reservar e iniciar uma conversa no WhatsApp ou concluir seu pedido de simulação, nossos consultores técnicos já reservam fisicamente as unidades no estoque sob o seu nome. Em seguida, basta agendar o melhor dia e horário de segunda a sábado para realizar os serviços."
              },
              {
                q: "Qual a durabilidade esperada para este composto?",
                a: `A marca ${tire.brand} utiliza compostos de sílica de alta aderência de última geração, garantindo ótima frenagem na chuva e durabilidade estimada entre 40.000 km e 60.000 km. Para aumentar a vida útil, recomendamos o balanceamento, alinhamento técnico de direção e o rodízio das posições dos eixos de borracha a cada 10.000 km.`
              }
            ].map((faq, index) => {
              const isOpen = expandedFaqIdx === index;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 border-2 border-black rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqIdx(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-tight">
                      {faq.q}
                    </span>
                    <span className="bg-black text-[#f49e1a] w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-black text-sm select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 border-t border-black/10 pt-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold text-justify">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
