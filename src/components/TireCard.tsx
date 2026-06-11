import React, { useState } from 'react';
import { Tire } from '../types';
import { ShoppingCart, Heart, ShieldCheck, ArrowRight, Tag } from 'lucide-react';

interface TireCardProps {
  key?: string;
  tire: Tire;
  onAddToCart: (tire: Tire, quantity: number) => void;
  onSelectTire?: (tire: Tire) => void;
}

export default function TireCard({ tire, onAddToCart, onSelectTire }: TireCardProps) {
  const [qty, setQty] = useState(2); // Default is set to 2 for a pair

  const finalPrice = tire.promoPrice || tire.price;
  const hasPromo = !!tire.promoPrice;
  const discountPercentage = hasPromo ? Math.round(((tire.price - tire.promoPrice!) / tire.price) * 100) : 0;

  return (
    <div 
      className={`bg-gray-100 rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between h-full group ${
        tire.isOffer 
          ? 'border-[#f49e1a] shadow-xl ring-2 ring-[#f49e1a]/20 relative' 
          : 'border-gray-200 shadow-sm hover:border-gray-300'
      }`}
      id={`tire-card-${tire.id}`}
    >
      {/* Badges row */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <span className="bg-gray-900/90 backdrop-blur-md text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-full shadow font-mono">
          Aro {tire.rim}
        </span>
        {tire.isOffer && (
          <span className="bg-[#f49e1a] text-gray-950 text-[10px] uppercase font-black px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-black">
            <Tag className="w-3 h-3 shrink-0" />
            <span>OFERTA {discountPercentage}% OFF</span>
          </span>
        )}
      </div>

      {/* Image container with totally white background */}
      <div 
        onClick={() => onSelectTire && onSelectTire(tire)}
        className="relative p-6 bg-white flex items-center justify-center min-h-[190px] border-b border-gray-200/80 cursor-pointer"
      >
        <img 
          src={tire.image} 
          alt={tire.name} 
          className="max-h-40 object-contain w-auto transform transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback general tire drawing or placeholder if link blocks hotlink
            const target = e.target as HTMLImageElement;
            target.src = "https://www.carpluspneuseoficina.com.br/images/logos/logo-vertical.svg";
          }}
        />
        <div className="absolute bottom-2 right-2 bg-[#f49e1a] text-gray-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
          Estoque Imediato
        </div>
      </div>

      {/* Content wrapper */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center md:text-justify">
        <div 
          onClick={() => onSelectTire && onSelectTire(tire)}
          className="cursor-pointer"
        >
          {/* Brand & Model */}
          <div className="flex items-center justify-center md:justify-start gap-1.5 mb-1.5">
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-[#f49e1a]">
              {tire.brand}
            </span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-[10px] text-gray-500 font-serif font-semibold">
              Série {tire.model.split(' ')[0]}
            </span>
          </div>

          {/* Catalog name */}
          <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-[40px] hover:text-yellow-600 transition" title={tire.name}>
            {tire.name}
          </h4>

          {/* Technical Specs specs badges */}
          <div className="mt-3 flex flex-wrap gap-1 justify-center md:justify-start">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-mono px-2 py-0.5 rounded">
              Lg. {tire.width}mm
            </span>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-mono px-2 py-0.5 rounded">
              Perfil {tire.aspectRatio}%
            </span>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-mono px-2 py-0.5 rounded">
              Aro R{tire.rim}
            </span>
          </div>
        </div>

        {/* Pricing tag */}
        <div className="mt-4 border-t border-gray-100 pt-3 flex flex-col items-center md:items-start">
          <p className="text-[10px] text-gray-400 capitalize">Instalação inclusa na loja do Portão!</p>
          
          <div className="flex items-baseline gap-2 mt-1">
            {hasPromo ? (
              <>
                <span className="text-xs line-through text-gray-400 font-mono">
                  R$ {tire.price.toFixed(2)}
                </span>
                <span className="text-xl font-black text-[#f49e1a] font-mono">
                  R$ {tire.promoPrice!.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-gray-950 font-mono">
                R$ {tire.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-[10px] text-gray-500 font-sans mt-0.5">
            ou até <strong>10x sem juros</strong> no cartão físico
          </p>
        </div>

        {/* Add Actions row */}
        <div className="mt-4 flex items-center justify-between gap-2.5">
          {/* Quantity selector */}
          <div className="flex items-center border border-gray-250 rounded-xl h-9 overflow-hidden shrink-0">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2.5 hover:bg-gray-100 font-bold transition text-gray-600"
              id={`decrease-qty-${tire.id}`}
            >
              -
            </button>
            <span className="px-3 font-mono font-bold text-xs text-gray-900">{qty}</span>
            <button 
              onClick={() => setQty(Math.min(12, qty + 1))}
              className="px-2.5 hover:bg-gray-100 font-bold transition text-gray-600"
              id={`increase-qty-${tire.id}`}
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => {
              onAddToCart(tire, qty);
              // reset back to default
              setQty(2);
            }}
            className="flex-1 bg-gray-950 hover:bg-gray-800 text-[#f49e1a] hover:text-white font-bold h-9 rounded-xl flex items-center justify-center gap-1.5 text-xs transition"
            id={`add-to-cart-${tire.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
