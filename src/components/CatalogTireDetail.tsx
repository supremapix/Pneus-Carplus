import React, { useState, useEffect } from 'react';
import { CatalogTire } from '../types';
import { 
  ArrowLeft, MessageSquare, Phone, MapPin, ShieldCheck, 
  Wrench, CheckCircle, Car, Sparkles, Share2, Copy, Check, 
  ExternalLink, Info, AlertTriangle, SlidersHorizontal, Award
} from 'lucide-react';
import { CATALOGO_PNEUS } from '../data/catalogo-pneus';
import CatalogTireCard from './CatalogTireCard';

interface CatalogTireDetailProps {
  tire: CatalogTire;
  onBack: () => void;
  onSelectTire: (tire: CatalogTire) => void;
  onFilterByCar?: (carName: string) => void;
}

export default function CatalogTireDetail({ 
  tire, 
  onBack, 
  onSelectTire,
  onFilterByCar 
}: CatalogTireDetailProps) {
  const [quantity, setQuantity] = useState(4);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'especificacoes' | 'compatibilidade' | 'servicos'>('especificacoes');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tire.id, tire.slug]);

  const displayImage = tire.imagemGrande || tire.imagem || 'https://www.carpluspneuseoficina.com.br/images/pneus/pneu-pirelli-p400-evo-600x600.webp';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.carpluscwb.com.br/pneu/${tire.slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppQuote = () => {
    const text = `Olá Carplus! Estou na página do Pneu ${tire.nome} (${tire.medida} Aro ${tire.aro}) e gostaria de uma cotação para ${quantity} unidade(s) com montagem grátis na loja do Portão. Link: ${shareUrl}`;
    const url = `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related tires (same rim or same brand)
  const relatedTires = CATALOGO_PNEUS.filter(t => t.id !== tire.id && (t.aro === tire.aro || t.marca === tire.marca)).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 font-sans" id="catalog-tire-detail-view">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-700 hover:text-black transition bg-white px-4 py-2 rounded-xl border border-gray-250 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#f49e1a]" />
            <span>Voltar para o Catálogo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-250 transition shadow-2xs"
              title="Copiar link da página"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
            {tire.urlOriginal && (
              <a
                href={tire.urlOriginal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-250 transition shadow-2xs"
                title="Ver página original"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fonte Original</span>
              </a>
            )}
          </div>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Product Image & Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative bg-gray-50 rounded-2xl border border-gray-200 p-6 flex items-center justify-center min-h-[320px]">
              <img
                src={displayImage}
                alt={`Pneu ${tire.nome} medida ${tire.medida} Aro ${tire.aro} Curitiba`}
                className="max-h-72 w-auto object-contain mx-auto transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="bg-gray-900 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                  {tire.marca}
                </span>
                <span className="bg-[#f49e1a] text-black text-[10px] font-black px-2.5 py-1 rounded-md">
                  Aro {tire.aro}
                </span>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-700 shrink-0" />
                <div>
                  <div className="font-black text-gray-900 text-[11px]">5 Anos Garantia</div>
                  <div className="text-[10px] text-gray-600">Contra defeitos de fábrica</div>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-black text-gray-900 text-[11px]">Montagem Grátis</div>
                  <div className="text-[10px] text-gray-600">Na loja do Portão</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specifications & WhatsApp Order */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
                  {tire.categoria}
                </span>
                {tire.linha && (
                  <span className="text-xs font-bold text-gray-600">
                    Linha {tire.linha}
                  </span>
                )}
                {tire.novoModelo && (
                  <span className="text-xs font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Lançamento
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                {tire.nome}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-lg font-black font-mono bg-gray-900 text-[#f49e1a] px-3.5 py-1 rounded-xl">
                  {tire.medida}
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {tire.indiceCarga} {tire.indiceVelocidade ? `• ${tire.indiceVelocidade}` : ''}
                </span>
              </div>

              {/* Description */}
              {tire.descricao ? (
                <p className="text-sm text-gray-650 leading-relaxed text-justify bg-gray-50 p-4 rounded-2xl border border-gray-150">
                  {tire.descricao}
                </p>
              ) : (
                <p className="text-sm text-gray-650 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-150">
                  O pneu <strong>{tire.nome}</strong> na medida <strong>{tire.medida}</strong> (Aro {tire.aro}) da fabricante <strong>{tire.marca}</strong> entrega alto desempenho, aderência precisa e durabilidade garantida com montagem gratuita na Carplus Portão.
                </p>
              )}
            </div>

            {/* Price match promise */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 rounded-2xl border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-mono font-bold text-[#f49e1a] uppercase flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Menor Preço Garantido em Curitiba
                </div>
                <div className="text-sm font-bold text-white">Cobrimos qualquer orçamento de grandes redes</div>
              </div>
              <span className="text-[11px] font-bold bg-yellow-500/20 text-[#f49e1a] px-3 py-1 rounded-full border border-yellow-500/40 shrink-0">
                Pronta Entrega no Portão
              </span>
            </div>

            {/* Quantity Selector and WhatsApp Purchase */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-800">Quantidade desejada:</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 5].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantity(q)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        quantity === q
                          ? 'bg-gray-900 text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-gray-250 hover:bg-gray-100'
                      }`}
                    >
                      {q} {q === 4 ? '(Jogo)' : q === 1 ? 'un' : 'un'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-[#f49e1a] hover:bg-[#d88912] text-black font-black text-sm py-3.5 px-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <MessageSquare className="w-5 h-5 text-black" />
                  <span>Cotar no WhatsApp ({quantity} pneus)</span>
                </button>

                <a
                  href="tel:4130827282"
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm py-3.5 px-4 rounded-2xl border border-gray-250 transition flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Phone className="w-5 h-5 text-gray-700" />
                  <span>Ligar: (41) 3082-7282</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Tabs: Technical Specs, Compatible Cars, Services Included */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center border-b border-gray-200 gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('especificacoes')}
              className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                activeTab === 'especificacoes'
                  ? 'border-yellow-500 text-black font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
              <span>Ficha Técnica Completa</span>
            </button>

            <button
              onClick={() => setActiveTab('compatibilidade')}
              className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                activeTab === 'compatibilidade'
                  ? 'border-yellow-500 text-black font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Car className="w-4 h-4 text-yellow-600" />
              <span>Veículos Compatíveis ({tire.carros?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('servicos')}
              className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                activeTab === 'servicos'
                  ? 'border-yellow-500 text-black font-black'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Wrench className="w-4 h-4 text-yellow-600" />
              <span>Serviços Inclusos na Loja</span>
            </button>
          </div>

          {/* Tab 1: Ficha Técnica */}
          {activeTab === 'especificacoes' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-gray-900">Especificações Detalhadas de Fábrica</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Marca Fabricante</span>
                  <span className="font-black text-gray-900 text-sm">{tire.marca}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Modelo / Linha</span>
                  <span className="font-black text-gray-900 text-sm">{tire.linha || 'Original'}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Dimensão Oficial</span>
                  <span className="font-black text-gray-900 text-sm font-mono">{tire.medida}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Diâmetro do Aro</span>
                  <span className="font-black text-gray-900 text-sm">Aro {tire.aro}"</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Largura Nominal</span>
                  <span className="font-black text-gray-900 text-sm">{tire.largura} mm</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Perfil / Altura</span>
                  <span className="font-black text-gray-900 text-sm">{tire.perfil}%</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Índice de Carga</span>
                  <span className="font-black text-gray-900 text-sm">{tire.indiceCarga}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Índice de Velocidade</span>
                  <span className="font-black text-gray-900 text-sm">{tire.indiceVelocidade || 'Sob Consulta'}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Categoria de Aplicação</span>
                  <span className="font-black text-gray-900 text-sm">{tire.categoria}</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Tipo de Veículo</span>
                  <span className="font-black text-gray-900 text-sm">
                    {Array.isArray(tire.tipoVeiculo) ? tire.tipoVeiculo.join(', ') : (tire.tipoVeiculo || 'Passeio')}
                  </span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Origem / Selo</span>
                  <span className="font-black text-emerald-700 text-sm">Homologado Inmetro</span>
                </div>
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block text-[11px]">Disponibilidade</span>
                  <span className="font-black text-emerald-700 text-sm">Pronta Entrega CWB</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Veículos Compatíveis */}
          {activeTab === 'compatibilidade' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-gray-900">Carros e Modelos Recomendados para {tire.medida}</h3>
              {tire.carros && tire.carros.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tire.carros.map((car, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-yellow-500/20 text-gray-900 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 transition"
                    >
                      <Car className="w-3.5 h-3.5 text-gray-500" />
                      <span>{car}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl">
                  Esta medida atende a uma ampla gama de veículos no padrão {tire.medida} Aro {tire.aro}. Consulte nosso time de técnicos para confirmar no manual do seu veículo.
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Serviços Inclusos */}
          {activeTab === 'servicos' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-gray-900">Vantagens Exclusivas ao Trocar na Carplus Curitiba</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                  <span className="font-black text-emerald-900 block text-sm">1. Montagem Gratuita</span>
                  <p className="text-emerald-800 leading-relaxed text-[11px]">
                    Equipamentos computadorizados que evitam qualquer arranhão nas rodas de liga leve ou ferro do seu carro.
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-2xl space-y-1">
                  <span className="font-black text-gray-900 block text-sm">2. Alinhamento 3D Laser</span>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    Leitura tridimensional de alta precisão para garantir desgaste uniforme e máxima quilometragem dos seus novos pneus.
                  </p>
                </div>
                <div className="bg-gray-100 border border-gray-200 p-4 rounded-2xl space-y-1">
                  <span className="font-black text-gray-900 block text-sm">3. Balanceamento Eletrônico</span>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    Eliminação total de vibrações no volante e suspensão para rodagem macia e segura na cidade e rodovia.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Tires Section */}
        {relatedTires.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">
                Outras opções em Aro {tire.aro} ou marca {tire.marca}
              </h2>
              <button
                onClick={onBack}
                className="text-xs font-bold text-yellow-700 hover:text-yellow-800"
              >
                Ver todo o catálogo →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTires.map((relTire) => (
                <CatalogTireCard
                  key={`rel-${relTire.id}`}
                  tire={relTire}
                  onSelect={onSelectTire}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
