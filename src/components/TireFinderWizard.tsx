import React, { useState } from 'react';
import { FIAT_CARS, VOLKSWAGEN_CARS, TIRES_DATA } from '../data';
import { CarModel, Tire } from '../types';
import { Car, Search, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface TireFinderWizardProps {
  onSearchMeasure: (measure: string) => void;
  onAddToCart: (tire: Tire, qty: number) => void;
}

export default function TireFinderWizard({ onSearchMeasure, onAddToCart }: TireFinderWizardProps) {
  const [selectedBrand, setSelectedBrand] = useState<'Fiat' | 'Volkswagen'>('Fiat');
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

  const currentCars = selectedBrand === 'Fiat' ? FIAT_CARS : VOLKSWAGEN_CARS;

  // Let's find real tires in our catalog matching this car's recommended ratio
  const getMatchingTires = (ratio: string): Tire[] => {
    // ratio is "175/65/14" or parecido
    const parts = ratio.split('/');
    if (parts.length < 3) return [];
    
    const [w, a, r] = parts.map(Number);
    return TIRES_DATA.filter(t => t.width === w && t.aspectRatio === a && t.rim === r);
  };

  const matchingTires = selectedCar ? getMatchingTires(selectedCar.recommendedTireRatio) : [];

  return (
    <div className="bg-[#1a1c20] text-white p-6 rounded-2xl border border-gray-800 shadow-xl" id="tire-finder-wizard">
      <div className="text-center sm:text-left mb-6">
        <span className="bg-yellow-500/10 text-yellow-500 font-bold text-xs uppercase px-3 py-1 rounded-full inline-block mb-2">
          Guia de Aplicação Oficial
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#f49e1a] tracking-tight">
          Qual pneu vai no seu carro?
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 text-justify">
          Selecione a montadora e depois o modelo para encontrar a medida exata homologada e ver os pneus em estoque com instalação gratuita na loja de Curitiba.
        </p>
      </div>

      {/* Brand Selectors */}
      <div className="grid grid-cols-2 gap-3 mb-6" id="wizard-brand-toggles">
        <button
          onClick={() => {
            setSelectedBrand('Fiat');
            setSelectedCar(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-sm transition-all duration-300 ${
            selectedBrand === 'Fiat'
              ? 'bg-yellow-500 border-yellow-500 text-gray-950 shadow-lg font-black'
              : 'border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-400'
          }`}
          id="select-fiat"
        >
          <Car className="w-5 h-5 shrink-0" />
          <span>FIAT</span>
        </button>

        <button
          onClick={() => {
            setSelectedBrand('Volkswagen');
            setSelectedCar(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-sm transition-all duration-300 ${
            selectedBrand === 'Volkswagen'
              ? 'bg-yellow-500 border-yellow-500 text-gray-950 shadow-lg font-black'
              : 'border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-400'
          }`}
          id="select-volkswagen"
        >
          <Car className="w-5 h-5 shrink-0" />
          <span>VOLKSWAGEN</span>
        </button>
      </div>

      {/* Model Selection Row (Styled Responsive) */}
      <div className="mb-6">
        <p className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3 text-center sm:text-left">
          Selecione o modelo do seu {selectedBrand}:
        </p>
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"
          id="car-models-list"
        >
          {currentCars.map((car) => (
            <button
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`p-2.5 rounded-lg border text-left transition text-xs flex flex-col justify-between ${
                selectedCar?.id === car.id
                  ? 'border-yellow-500 bg-yellow-500/10 text-white'
                  : 'border-gray-800 hover:border-gray-700 bg-gray-900 text-gray-300'
              }`}
              id={`car-model-${car.id}`}
            >
              <div className="font-bold text-xs truncate">{car.name}</div>
              <div className="text-[10px] text-gray-500 mt-1">{car.yearRange}</div>
              <div className="mt-1 text-[11px] font-mono text-yellow-500 font-semibold">
                {car.recommendedTireRatio}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Output */}
      {selectedCar ? (
        <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-5" id="wizard-result-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-800 pb-4 mb-4">
            <div>
              <span className="text-xs text-gray-500 uppercase font-mono">Medida Homologada para {selectedCar.name}:</span>
              <h4 className="text-2xl font-black font-mono tracking-tight text-yellow-500 mt-0.5">
                {selectedCar.recommendedTireRatio.replace('/', '/').replace('/', ' R')}
              </h4>
            </div>
            <button
              onClick={() => onSearchMeasure(selectedCar.recommendedTireRatio)}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1 transition"
              id="search-measure-btn"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Ver no Catálogo</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 mb-3 text-justify leading-relaxed">
            Abaixo estão os pneus equivalentes em estoque com esta medida específica hoje. Você pode encomendar e agendar a instalação na nossa loja do Portão em Curitiba:
          </p>

          {/* Tires list */}
          {matchingTires.length > 0 ? (
            <div className="space-y-3" id="wizard-matched-tires">
              {matchingTires.map(t => (
                <div 
                  key={t.id} 
                  className="flex items-center justify-between gap-3 bg-[#131518] border border-gray-800 p-3 rounded-lg"
                  id={`matched-tire-${t.id}`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-12 h-12 object-contain bg-white rounded p-1 border border-gray-800"
                    />
                    <div>
                      <span className="bg-yellow-500 text-[9px] uppercase font-black text-gray-950 px-1.5 py-0.5 rounded border border-black font-mono">
                        {t.brand}
                      </span>
                      <h5 className="text-xs font-bold text-gray-200 line-clamp-1 mt-0.5">{t.name}</h5>
                      <p className="text-[11px] text-gray-400 font-mono">
                        {t.promoPrice ? (
                          <>
                            <span className="line-through text-gray-600 mr-2">R$ {t.price.toFixed(2)}</span>
                            <span className="text-yellow-500 font-bold">R$ {t.promoPrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-white">R$ {t.price.toFixed(2)}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(t, 2)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition"
                    id={`add-matched-to-cart-${t.id}`}
                  >
                    +2 Pneus
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-950/40 rounded-lg border border-dashed border-gray-800">
              <HelpCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                Sem pneus exatos desta medida no momento, mas podemos encomendar!
              </p>
              <button
                onClick={() => {
                  const query = `Olá! Preciso de pneus na medida ${selectedCar.recommendedTireRatio} para meu ${selectedCar.name}. Vocês conseguem encomendar?`;
                  window.open(`https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(query)}`, '_blank');
                }}
                className="mt-2 text-xs text-yellow-500 underline font-semibold hover:text-yellow-400"
                id="whatsapp-custom-order"
              >
                Solicitar via WhatsApp
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[140px]">
          <Car className="w-10 h-10 text-gray-700 mb-2 animate-pulse" />
          <p className="text-xs">Selecione um veículo acima para ver pneus ideais instantaneamente</p>
        </div>
      )}
    </div>
  );
}
