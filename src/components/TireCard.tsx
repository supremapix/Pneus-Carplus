import React, { useState } from 'react';
import { Tire } from '../types';
import { ShoppingCart, Heart, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { getBrandFallbackImage } from '../data';

const BRAND_LOGOS: Record<string, string> = {
  BRIDGESTONE: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg",
  PIRELLI: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg",
  MICHELIN: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg",
  CONTINENTAL: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/continental.svg",
  GOODYEAR: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-goodyear.svg",
  YOKOHAMA: "https://icon2.cleanpng.com/20180516/evq/avr9ddjh0.webp",
  FIRESTONE: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-firestone.svg",
  DELINTE: "https://s19532.pcdn.co/wp-content/uploads/2019/12/Delinte-Logo-1.jpg",
  COMFORSER: "https://www.gtiresinternational.us/wp-content/uploads/2022/10/Comforser-Tires.png",
  XBRI: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/xbri.svg",
  PRINX: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRauciXYNudC8XaeVj_7c3o5urb17rrs_uw&s",
  LINGLONG: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-linglong.svg",
  SPEEDMAX: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6La6GWmZDeZMCxlH4OA8rJcNjLj8mrjpW4A&s"
};

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
        <span className="bg-gray-900/95 backdrop-blur-md text-white text-xs sm:text-sm uppercase font-black px-3 py-1.5 rounded-full shadow font-mono border border-gray-700">
          Aro {tire.rim}
        </span>
        {tire.isOffer && (
          <span className="bg-[#f49e1a] text-gray-950 text-xs sm:text-sm uppercase font-black px-3 py-1.5 rounded-full shadow flex items-center gap-1 border border-black">
            <Tag className="w-3.5 h-3.5 shrink-0" />
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
            // Fallback to same-brand tire image if link fails or blocks hotlinking
            const target = e.target as HTMLImageElement;
            target.src = getBrandFallbackImage(tire.brand, tire.id);
          }}
        />
        <div className="absolute bottom-2 right-2 bg-neutral-900 text-[#f49e1a] text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider shadow">
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
          <div className="flex items-center justify-center md:justify-start gap-1.5 mb-2 h-12">
            {BRAND_LOGOS[tire.brand.toUpperCase()] ? (
              <img 
                src={BRAND_LOGOS[tire.brand.toUpperCase()]} 
                alt={tire.brand} 
                className="h-10 w-auto max-w-[120px] object-contain select-none shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xs sm:text-sm tracking-wider uppercase font-black text-neutral-950 bg-gray-100 px-2.5 py-1 rounded shadow-sm border border-gray-200">
                {tire.brand}
              </span>
            )}
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs sm:text-sm text-gray-600 font-serif font-black">
              Série {tire.model.split(' ')[0]}
            </span>
          </div>

          {/* Catalog name */}
          <h4 className="text-base font-black text-gray-950 leading-snug line-clamp-2 min-h-[44px] hover:text-[#f49e1a] transition" title={tire.name}>
            {tire.name}
          </h4>

          {/* Technical Specs specs badges */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-white text-gray-800 text-xs font-mono font-black border border-gray-300 px-2.5 py-1 rounded shadow-sm">
              Lg. {tire.width}mm
            </span>
            <span className="bg-white text-gray-800 text-xs font-mono font-black border border-gray-300 px-2.5 py-1 rounded shadow-sm">
              Perfil {tire.aspectRatio}%
            </span>
            <span className="bg-white text-gray-800 text-xs font-mono font-black border border-gray-300 px-2.5 py-1 rounded shadow-sm">
              Aro R{tire.rim}
            </span>
          </div>
        </div>

        {/* Pricing tag */}
        <div className="mt-4 border-t border-gray-200 pt-3 flex flex-col items-center md:items-start">
          <p className="text-xs sm:text-sm text-stone-800 font-bold capitalize mb-1 bg-yellow-500/10 px-2 py-0.5 rounded-md w-full text-center md:text-left">
            Instalação inclusa na loja do Portão!
          </p>
          
          <div className="flex items-baseline gap-2 mt-1">
            {hasPromo ? (
              <>
                <span className="text-xs sm:text-sm line-through text-gray-400 font-mono">
                  R$ {tire.price.toFixed(2)}
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#f49e1a] font-mono">
                  R$ {tire.promoPrice!.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl font-black text-gray-950 font-mono">
                R$ {tire.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-700 font-sans mt-1 font-bold">
            ou até <strong className="text-black font-extrabold">10x sem juros</strong> no cartão físico
          </p>
        </div>

        {/* Add Actions row */}
        <div className="mt-4 flex items-center justify-between gap-2.5">
          {/* Quantity selector */}
          <div className="flex items-center border-2 border-gray-400 rounded-xl h-10 overflow-hidden shrink-0">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 hover:bg-gray-200 font-black transition text-gray-800 text-base"
              id={`decrease-qty-${tire.id}`}
            >
              -
            </button>
            <span className="px-4 font-mono font-black text-sm text-gray-900">{qty}</span>
            <button 
              onClick={() => setQty(Math.min(12, qty + 1))}
              className="px-3 hover:bg-gray-200 font-black transition text-gray-800 text-base"
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
            className="flex-1 bg-gray-950 hover:bg-[#f49e1a] text-white hover:text-black font-black h-10 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider transition duration-200 border-2 border-black"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
            id={`add-to-cart-${tire.id}`}
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
