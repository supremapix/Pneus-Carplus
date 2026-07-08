import React, { useState } from 'react';
import { CAR_MODELS_DATA, TIRES_DATA, getBrandFallbackImage } from '../data';
import { CarModel, Tire } from '../types';
import { Car, Search, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { formatWhatsApp } from '../utils/whatsapp';

const BRANDS = [
  'Fiat', 'Volkswagen', 'Chevrolet', 'Hyundai', 'Toyota', 'Honda', 'Renault', 'Ford', 'Jeep'
] as const;

type AllowedBrands = typeof BRANDS[number];

interface TireFinderWizardProps {
  onSearchMeasure: (measure: string) => void;
  onAddToCart: (tire: Tire, qty: number) => void;
}

export default function TireFinderWizard({ onSearchMeasure, onAddToCart }: TireFinderWizardProps) {
  const [selectedBrand, setSelectedBrand] = useState<AllowedBrands>('Fiat');
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

  const currentCars = CAR_MODELS_DATA.filter(car => car.brand === selectedBrand);

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
    <div className="bg-[#f49e1a] text-black p-6 rounded-3xl border-2 border-black shadow-xl" id="tire-finder-wizard">
      <div className="text-center sm:text-left mb-6">
        <span className="bg-black text-white font-black text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-2 shadow-sm">
          Guia de Aplicação Oficial
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-black uppercase leading-none tracking-tight">
          Qual pneu vai no seu carro?
        </h3>
        <p className="text-sm sm:text-base text-black font-extrabold mt-2 text-justify font-sans leading-relaxed">
          Selecione a montadora e depois o modelo para encontrar a medida exata homologada e ver os pneus em estoque com instalação gratuita na loja de Curitiba.
        </p>
      </div>

      {/* Brand Selectors */}
      <div className="mb-6">
        <p className="block text-xs uppercase tracking-wider font-extrabold text-black mb-2 text-center sm:text-left">
          Selecione a montadora:
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5" id="wizard-brand-toggles">
          {BRANDS.map(brand => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => {
                  setSelectedBrand(brand);
                  setSelectedCar(null);
                }}
                style={isSelected ? { textShadow: '1px 1px 2px rgba(0,0,0,0.9)' } : undefined}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-xl border-2 font-black text-xs uppercase transition-all duration-300 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-black border-black text-white shadow-md'
                    : 'border-black/50 bg-white hover:bg-gray-100 text-black'
                }`}
                id={`select-${brand.toLowerCase()}`}
              >
                <Car className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-[65px]">{brand === 'Volkswagen' ? 'VW' : brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Selection Row (Styled Responsive) */}
      <div className="mb-6">
        <p className="block text-xs uppercase tracking-wider font-extrabold text-black mb-3 text-center sm:text-left">
          Selecione o modelo do seu {selectedBrand}:
        </p>
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin"
          id="car-models-list"
        >
          {currentCars.map((car) => {
            const isSelected = selectedCar?.id === car.id;
            return (
              <button
                key={car.id}
                onClick={() => setSelectedCar(car)}
                style={isSelected ? { textShadow: '1px 1px 2px rgba(0,0,0,0.9)' } : undefined}
                className={`p-3 rounded-xl border-2 text-left transition flex flex-col justify-between h-full ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-black bg-white hover:bg-gray-50 text-black'
                }`}
                id={`car-model-${car.id}`}
              >
                <div className="font-extrabold text-xs sm:text-sm truncate uppercase">{car.name}</div>
                <div className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-600'} font-black mt-1`}>{car.yearRange}</div>
                <div className={`mt-1 text-sm font-mono font-black ${isSelected ? 'text-[#f49e1a]' : 'text-black bg-yellow-500/10 px-1 py-0.5 rounded'}`}>
                  {car.recommendedTireRatio}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendation Output */}
      {selectedCar ? (
        <div className="bg-white border-2 border-black rounded-2xl p-5 text-black" id="wizard-result-box">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-4 mb-4">
            <div>
              <span className="text-xs text-gray-500 uppercase font-mono font-bold">Medida Homologada para {selectedCar.name}:</span>
              <h4 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-black mt-0.5">
                {selectedCar.recommendedTireRatio.replace('/', '/').replace('/', ' R')}
              </h4>
            </div>
            <button
              onClick={() => onSearchMeasure(selectedCar.recommendedTireRatio)}
              className="bg-black hover:bg-neutral-900 text-white font-black px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition uppercase tracking-wider shadow-sm"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
              id="search-measure-btn"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Ver no Catálogo</span>
            </button>
          </div>

          <p className="text-sm text-gray-800 font-extrabold mb-3 text-justify leading-relaxed">
            Abaixo estão os pneus equivalentes em estoque com esta medida específica hoje. Você pode encomendar e agendar a instalação na nossa loja do Portão em Curitiba:
          </p>

          {/* Tires list */}
          {matchingTires.length > 0 ? (
            <div className="space-y-3" id="wizard-matched-tires">
              {matchingTires.map(t => (
                <div 
                  key={t.id} 
                  className="flex items-center justify-between gap-3 bg-white border border-gray-300 p-3.5 rounded-xl"
                  id={`matched-tire-${t.id}`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-12 h-12 object-contain bg-white rounded p-1 border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getBrandFallbackImage(t.brand, t.id);
                      }}
                    />
                    <div>
                      <span className="bg-black text-[10px] sm:text-xs uppercase font-black text-white px-2.5 py-0.5 rounded border border-black font-mono">
                        {t.brand}
                      </span>
                      <h5 className="text-sm font-black text-gray-900 line-clamp-1 mt-0.5">{t.name}</h5>
                      <p className="text-xs sm:text-sm text-[#1ebd53] font-black uppercase">
                        Preço Sob Consulta
                      </p>
                    </div>
                  </div>
                  <a
                    href={formatWhatsApp(
                      `Olá Carplus! Utilizei o recomendador de pneus do site para o meu veículo ${selectedCar?.brand} ${selectedCar?.name}.\n\n` +
                      `O recomendador sugeriu o pneu: ${t.brand} ${t.model} (${t.width}/${t.aspectRatio} R${t.rim}).\n` +
                      `Ggostaria de consultar o valor, estoque e o serviço de instalação correto para meu carro.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white border border-[#1ebd53] font-black px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase transition flex items-center justify-center text-center"
                    id={`whatsapp-matched-${t.id}`}
                  >
                    Consultar WhatsApp
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-black">
              <HelpCircle className="w-8 h-8 text-black mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-black font-black">
                Sem pneus exatos desta medida no momento, mas podemos encomendar!
              </p>
              <button
                onClick={() => {
                  const query = `Olá! Preciso de pneus na medida ${selectedCar.recommendedTireRatio} para meu ${selectedCar.name}. Vocês conseguem encomendar?`;
                  window.open(`https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(query)}`, '_blank');
                }}
                className="mt-2 text-xs sm:text-sm text-black underline font-black hover:text-gray-900 block mx-auto"
                id="whatsapp-custom-order"
              >
                Solicitar via WhatsApp
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border-2 border-black rounded-2xl p-8 text-center text-black flex flex-col items-center justify-center min-h-[140px]" id="wizard-empty-box">
          <Car className="w-10 h-10 text-black mb-2 animate-bounce" />
          <p className="text-xs sm:text-sm text-black font-black uppercase tracking-wide">Selecione um veículo acima para ver pneus ideais instantaneamente</p>
        </div>
      )}
    </div>
  );
}
