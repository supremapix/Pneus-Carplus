import React from 'react';
import { CatalogTire } from '../types';
import { ShieldCheck, MessageSquare, Eye } from 'lucide-react';

interface CatalogTireCardProps {
  key?: React.Key;
  tire: CatalogTire;
  onSelect: (tire: CatalogTire) => void;
}

export default function CatalogTireCard({ tire, onSelect }: CatalogTireCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const displayImage = tire.imagemGrande || tire.imagem || 'https://www.carpluspneuseoficina.com.br/images/pneus/pneu-pirelli-p400-evo-600x600.webp';

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Olá Carplus! Gostaria de cotar o pneu ${tire.nome} (${tire.medida}) com montagem grátis no Portão. Link: https://www.carpluscwb.com.br/pneu/${tire.slug}`;
    const url = `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article 
      onClick={() => onSelect(tire)}
      className="bg-white rounded-2xl border-2 border-black hover:border-[#f49e1a] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
      id={`catalog-tire-${tire.id}`}
    >
      {/* Top badges & Brand */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-black text-[#f49e1a] rounded-md tracking-wider border border-black">
            {tire.marca}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black px-2 py-0.5 bg-[#f49e1a] text-black border border-black rounded-md">
              Aro {tire.aro}
            </span>
            {tire.categoria && (
              <span className="text-[9px] font-bold px-2 py-0.5 bg-black text-white rounded-md truncate max-w-[100px]" title={tire.categoria}>
                {tire.categoria}
              </span>
            )}
          </div>
        </div>

        {/* Tire Image with seamless white floating presentation - NO SHADOW */}
        <div className="relative w-full h-48 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 transition group-hover:scale-102 duration-300 border border-black">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-white animate-pulse flex items-center justify-center">
              <span className="text-[10px] text-black font-mono font-bold">Carregando...</span>
            </div>
          )}
          <img
            src={imageError ? 'https://www.carpluspneuseoficina.com.br/images/pneus/pneu-pirelli-p-zero.webp' : displayImage}
            alt={`Pneu ${tire.nome} ${tire.medida} Aro ${tire.aro} em Curitiba`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {tire.novoModelo && (
            <span className="absolute top-1 right-1 bg-black text-[#f49e1a] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black">
              Novo
            </span>
          )}
        </div>

        {/* Product Title & Measure */}
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-black text-black line-clamp-2 group-hover:text-[#f49e1a] transition leading-snug" title={tire.nome}>
            {tire.nome}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-black text-white font-mono bg-black px-2 py-0.5 rounded border border-black">
              {tire.medida}
            </span>
            <span className="text-[11px] text-black font-bold">
              {tire.indiceCarga} {tire.indiceVelocidade ? `• ${tire.indiceVelocidade}` : ''}
            </span>
          </div>
        </div>

        {/* Benefits strip */}
        <div className="mt-3 pt-2.5 border-t-2 border-black flex items-center justify-between text-[11px] text-black">
          <span className="flex items-center gap-1 text-black font-black">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f49e1a]" /> Montagem Grátis
          </span>
          <span className="text-black font-bold">Portão, Curitiba</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-2 bg-white border-t-2 border-black grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => onSelect(tire)}
            className="w-full bg-black hover:bg-white hover:text-black text-white text-xs font-black py-2.5 px-2 rounded-xl border-2 border-black transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#f49e1a]" />
            <span>Ver</span>
          </button>
          <span className="text-[9px] text-black font-bold text-center mt-0.5">Ficha técnica.</span>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full bg-[#f49e1a] hover:bg-black hover:text-[#f49e1a] text-black text-xs font-black py-2.5 px-2 rounded-xl transition flex items-center justify-center gap-1 border-2 border-black cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-black" />
            <span>Cotar</span>
          </button>
          <span className="text-[9px] text-black font-bold text-center mt-0.5">Preço imediato.</span>
        </div>
      </div>
    </article>
  );
}
