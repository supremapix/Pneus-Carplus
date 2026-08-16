import React from 'react';
import { RIM_SEO_DATA, RimSeoConfig } from '../data/rim-seo-data';
import { ShieldCheck, Zap, Award, CheckCircle2, MessageCircle, ArrowRight, Wrench, Sparkles, Navigation, Layers, ChevronRight } from 'lucide-react';

interface RimAuthoritySectionProps {
  aroName: string;
  onSelectAro?: (aro: string) => void;
}

export default function RimAuthoritySection({ aroName, onSelectAro }: RimAuthoritySectionProps) {
  const cleanAro = aroName.replace(/\D/g, '');
  const rimConfig: RimSeoConfig | undefined = RIM_SEO_DATA[cleanAro] || RIM_SEO_DATA['16'];

  const allAros = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

  const formatWhatsApp = (msg: string) => `https://wa.me/554130827282?text=${encodeURIComponent(msg)}`;

  return (
    <div className="space-y-8 text-gray-900" id={`rim-authority-hub-${cleanAro}`}>
      
      {/* Navegação Rápida de Interlinking Mesh entre Aros 13 ao 23 */}
      <div className="bg-gray-100 border border-gray-250 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#f49e1a]" />
            Rede de Autoridade por Medida (Aros 13 ao 23):
          </span>
          <span className="text-[10px] font-bold text-gray-500 hidden sm:inline">
            Pronta Entrega no Bairro Portão
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allAros.map((aro) => {
            const isActive = aro === cleanAro;
            return (
              <a
                key={aro}
                href={`/aro/${aro}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectAro) {
                    onSelectAro(aro);
                  } else {
                    window.history.pushState(null, '', `/aro/${aro}`);
                    window.dispatchEvent(new Event('popstate'));
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-gray-950 text-[#f49e1a] border-2 border-[#f49e1a] shadow-sm scale-105'
                    : 'bg-white hover:bg-[#f49e1a] hover:text-gray-950 text-gray-800 border border-gray-300'
                }`}
              >
                <span>Aro {aro}</span>
                {parseInt(aro) >= 20 && (
                  <span className="text-[9px] bg-yellow-400/20 text-yellow-800 px-1 rounded-sm font-mono">
                    VIP
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Hero Principal da Medida */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header com Categoria */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2">
            <span className="bg-[#f49e1a] text-gray-950 font-black font-mono text-xs uppercase px-3 py-1 rounded-full shadow-xs">
              Aro {rimConfig.number} Polegadas
            </span>
            <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
              rimConfig.number >= 20 
                ? 'bg-purple-100 text-purple-900 border border-purple-300' 
                : rimConfig.number >= 18 
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              {rimConfig.profileCategory}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-500 uppercase block font-mono">Valores em Curitiba</span>
            <span className="text-sm sm:text-base font-black text-emerald-700">A partir de {rimConfig.priceFrom}</span>
          </div>
        </div>

        {/* Título H1 e Introdução */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 uppercase tracking-tight font-display mb-3 leading-tight">
            {rimConfig.h1}
          </h1>
          <p className="text-xs sm:text-sm text-yellow-600 font-mono font-black uppercase tracking-wider mb-4">
            Av. Presidente Arthur da Silva Bernardes, 1323 (Bairro Portão) • Atendimento Curitiba e Toda RMC
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
            A <strong>Carplus Pneus & Oficina</strong> é a maior autoridade do Sul do Brasil em fornecimento, montagem e alinhamento de <strong>pneus aro {rimConfig.number} em Curitiba</strong>. Mantemos o maior estoque à pronta entrega com menor preço garantido, cobrindo qualquer cotação de concessionárias e grandes redes com montagem computadorizada e bicos 100% gratuitos.
          </p>
        </div>

        {/* Texto Técnico de Performance e Carga */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-gray-950 font-black text-sm uppercase">
            <Wrench className="w-4 h-4 text-[#f49e1a]" />
            <span>Especificações Técnicas: Índice de Carga, Velocidade e Durabilidade</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-650 leading-relaxed text-justify">
            {rimConfig.technicalText}
          </p>
          
          <div className="pt-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase font-mono block mb-2">Marcas Homologadas Disponíveis:</span>
            <div className="flex flex-wrap gap-1.5">
              {rimConfig.recommendedBrands.map((brand, idx) => (
                <span key={idx} className="bg-white border border-gray-300 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                  ✓ {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quebra de Objeção: Montagem Touchless Sem Riscar Rodas */}
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-2xl p-5 sm:p-6 border border-[#f49e1a]/40 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#f49e1a] text-gray-950 flex items-center justify-center shrink-0 shadow-sm font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-[#f49e1a] uppercase tracking-widest font-mono">
                  Garantia Anti-Risco Carplus Portão
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-gray-300">
                  Rodas Diamantadas & Forjadas
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                Maquinário de Última Geração que Não Risca Suas Rodas
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {rimConfig.antiScratchAssurance}
              </p>
            </div>
          </div>
        </div>

        {/* Matriz de Medidas Mais Buscadas (Long Tail Matrix) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-gray-950 uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f49e1a]" />
              Medidas Mais Buscadas de Aro {rimConfig.number} em Curitiba
            </h3>
            <span className="text-[11px] font-mono text-gray-500 hidden sm:inline">
              Filtro por Aplicação
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rimConfig.topDimensions.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 hover:bg-yellow-50/50 border border-gray-200 hover:border-[#f49e1a] rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-black text-gray-950 font-mono bg-white px-2.5 py-0.5 rounded-md border border-gray-250 shadow-2xs">
                      Pneu {item.measure}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-gray-500">
                      {item.loadSpeed}
                    </span>
                  </div>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    <strong className="text-gray-900">Aplicações:</strong> {item.vehicles}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700">✓ Em Estoque</span>
                  <a
                    href={formatWhatsApp(`Olá Carplus! Gostaria de consultar o menor preço e disponibilidade para o pneu ${item.measure} (Aro ${rimConfig.number}) em Curitiba.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-gray-950 hover:text-yellow-600 flex items-center gap-1 transition"
                  >
                    <span>Cotar Medida</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#f49e1a]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner CTA Dinâmico com WhatsApp */}
        <div className="bg-yellow-50 border-2 border-[#f49e1a] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-950 bg-[#f49e1a] px-2.5 py-1 rounded-full font-mono">
              Atendimento Imediato
            </span>
            <h4 className="text-lg sm:text-xl font-black uppercase text-gray-950 font-display">
              Não encontrou sua medida Aro {rimConfig.number}?
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 max-w-xl">
              Temos o maior estoque de aros especiais e grandes de Curitiba. Chame no WhatsApp ou ligue no <strong>(41) 3082-7282</strong> para atendimento ágil com o Matheus, Jocimar e Vinicius.
            </p>
          </div>

          <a
            href={formatWhatsApp(`Olá equipe Carplus! Preciso de cotação para pneus Aro ${rimConfig.number} com o menor preço garantido de Curitiba.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-950 hover:bg-black text-[#f49e1a] hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-md shrink-0 group cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#f49e1a] group-hover:scale-110 transition-transform" />
            <span>Chamar no (41) 3082-7282</span>
            <ArrowRight className="w-4 h-4 text-[#f49e1a] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Links Internos de Apoio SEO */}
        <div className="pt-2 border-t border-gray-200 flex flex-wrap gap-2 text-xs font-semibold">
          <a
            href="/alinhamento-3d-curitiba"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/alinhamento-3d-curitiba');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-800 px-3 py-1.5 rounded-lg border border-gray-300 transition"
          >
            ➔ Alinhamento 3D Computadorizado no Portão
          </a>
          <a
            href="/blog/pneus-para-carro-eletrico-em-curitiba"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/blog/pneus-para-carro-eletrico-em-curitiba');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="bg-yellow-500/15 hover:bg-yellow-400 hover:text-black text-yellow-800 px-3 py-1.5 rounded-lg border border-yellow-500/30 transition"
          >
            ⚡ Pneus Homologados para Carro Elétrico & Híbrido
          </a>
          <a
            href="/pneus-pirelli-em-curitiba-melhor-preco"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/pneus-pirelli-em-curitiba-melhor-preco');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-800 px-3 py-1.5 rounded-lg border border-gray-300 transition"
          >
            🛞 Pneus Pirelli com Menor Preço Garantido
          </a>
        </div>

      </div>

    </div>
  );
}
