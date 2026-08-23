import React from 'react';
import { CatalogTire } from '../types';
import { ShieldCheck, ArrowRight, MessageSquare, Tag, Eye } from 'lucide-react';

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
      className="bg-white rounded-2xl border border-gray-200 hover:border-yellow-500/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
      id={`catalog-tire-${tire.id}`}
    >
      {/* Top badges & Brand */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-gray-900 text-white rounded-md tracking-wider">
            {tire.marca}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 rounded-md">
              Aro {tire.aro}
            </span>
            {tire.categoria && (
              <span className="text-[9px] font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md truncate max-w-[100px]" title={tire.categoria}>
                {tire.categoria}
              </span>
            )}
          </div>
        </div>

        {/* Tire Image with seamless white floating presentation */}
        <div className="relative w-full h-48 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 transition group-hover:scale-102 duration-300">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-white animate-pulse flex items-center justify-center">
              <span className="text-[10px] text-gray-300 font-mono">Carregando imagem...</span>
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
            className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
          />
          {tire.novoModelo && (
            <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
              Novo
            </span>
          )}
        </div>

        {/* Product Title & Measure */}
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-yellow-700 transition leading-snug" title={tire.nome}>
            {tire.nome}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-black text-gray-950 font-mono bg-gray-100 px-2 py-0.5 rounded">
              {tire.medida}
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              {tire.indiceCarga} {tire.indiceVelocidade ? `• ${tire.indiceVelocidade}` : ''}
            </span>
          </div>
        </div>

        {/* Benefits strip */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Montagem Grátis
          </span>
          <span className="text-gray-400 font-medium">Portão, Curitiba</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-2 bg-gray-50/70 border-t border-gray-100 grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => onSelect(tire)}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold py-2 px-2 rounded-xl border border-gray-250 transition flex items-center justify-center gap-1 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-gray-700" />
            <span>Ver</span>
          </button>
          <span className="text-[9px] text-gray-500 font-medium text-center mt-0.5">Ficha técnica completa.</span>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full bg-[#f49e1a] hover:bg-[#d88912] text-black text-xs font-black py-2 px-2 rounded-xl transition flex items-center justify-center gap-1 shadow-2xs group-hover:shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-black" />
            <span>Cotar</span>
          </button>
          <span className="text-[9px] text-gray-500 font-medium text-center mt-0.5">Pedir preço imediato.</span>
        </div>
      </div>
    </article>
  );
}
