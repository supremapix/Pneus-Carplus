import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck,
  Lightbulb,
  Fuel,
  Shield,
  Ruler,
  Handshake
} from 'lucide-react';

const VIDEOS = [
  {
    id: "v72kI13VyAU",
    tag: "PROVA REAL DA LOJA",
    title: "Sua Segurança em Primeiro Lugar: Veja Nossa Troca de Pneus de Alta Performance",
    desc: "Acompanhe de perto a precisão cirúrgica de nossos profissionais na troca e alinhamento de pneus novos de alta durabilidade. Transparência operacional completa de quem é referência em Curitiba!"
  },
  {
    id: "1fWqUJdCdRg",
    tag: "TECNOLOGIA RIGOROSA",
    title: "Balanceamento Computadorizado a Laser para Rodar sem Nenhuma Vibração",
    desc: "Sinta o conforto absoluto de uma rodagem perfeitamente lisa sob asfalto irregular. Assista como nossa tecnologia a laser corrige micro-oscilações para economizar combustível do seu carro!"
  },
  {
    id: "4FpPSM5vYE8",
    tag: "NOSSO SHOWROOM",
    title: "Megaestrutura Carplus no Portão Curitiba: Sua Experiência Conforto VIP",
    desc: "Mais de 800m² dedicados à saúde do seu veículo. Visite nossos boxes de atendimento rápido, desfrute de nossa sala de espera climatizada e experimente o padrão de atendimento premium."
  }
];

const SECRET_ACCORDIONS = [
  {
    icon: Lightbulb,
    title: "O Segredo dos Pneuzinhos Novos: Por que Trocar a Válvula (Bico) é 100% Obrigatório?",
    content: "O bico de borracha comum segura dezenas de libras de pressão e resseca continuamente com o calor severo e a força centrífuga das ruas. Bicos velhos sofrem microfissuras que geram perda imperceptível e diária de pressão. Para protegê-lo, na Carplus Pneus você não corre riscos: no agendamento físico, a substituição com bicos novos de alta vedação é inteiramente gratuita e livre de taxa de serviço!"
  },
  {
    icon: Fuel,
    title: "Rodar com Pneu Murcho? Calibragem Inteligente Reduz Consumo de Gasolina em até 12%",
    content: "Pneus abaixo da pressão ideal deformam a banda de rodagem e criam uma enorme resistência física contra o asfalto. Isso força o motor a gastar mais força e combustível desnecessário. Garantir a calibragem semanal pela manhã fria (conforme os níveis exatos de 30 a 34 PSI descritos na tampa do tanque do seu modelo) prolonga o ciclo de vida da borracha em até 15.000 km extras."
  },
  {
    icon: Shield,
    title: "O Mapeamento do INMETRO: Como Decifrar o Selo e Evitar Derrapagens em Dias de Chuva Curitibana?",
    content: "Cada pneu homologado pelo INMETRO carrega classificações cruciais. A aderência em piso molhado (escala de A a G) define quanto o pneu drena e adere. Escolher marcas classificadas de alta aderência comercializadas na Carplus reduz a distância de frenagem de emergência em até 15 metros em asfalto encharcado, protegendo quem você mais ama."
  },
  {
    icon: Ruler,
    title: "Alinhamento Geométrico 3D: impeça o Desgaste Prematuro e Lateral dos Ombros da Borracha",
    content: "Lombadas duras e buracos ocultos desalinham a cambagem e a convergência geométrica da suspensão. Quando isso ocorre, o carro arrasta o pneu de lado, desgastando desigualmente os chamados 'ombros' laterais em poucos meses. Nosso moderno Alinhamento Digital 3D de alta definição mapeia o chassi com exatidão milimétrica para que a banda apoie de forma plana e duradoura."
  },
  {
    icon: Handshake,
    title: "Sem Pegadinhas: Garantia de 5 Anos de Fábrica sem Burocracia na Nossa Recepção",
    content: "Nenhum de nossos pneus novos possui lotes antigos ou recondicionados (venda exclusiva com selo original e NF). Todos possuem 5 anos de garantia oficial estendida de fábrica contra defeitos estruturais e bolhas de moldagem. Se necessitar de perícia técnica, nós cuidamos de toda a validação rápida conosco na loja física Portão, sem formulários cansativos ou demoras."
  }
];

export default function CarplusVideosSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(null);

  const handleNextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleWatchVideo = (id: string) => {
    window.open(`https://www.youtube.com/shorts/${id}`, '_blank', 'noopener,noreferrer');
  };

  const toggleAccordion = (idx: number) => {
    setActiveAccordionIndex((prev) => (prev === idx ? null : idx));
  };

  const activeVideo = VIDEOS[activeVideoIndex];
  const activeThumbnailUrl = `https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`;
  const activeWatchUrl = `https://www.youtube.com/shorts/${activeVideo.id}`;

  return (
    <div className="space-y-12 my-10 select-none" id="neuro-marketing-video-accordion-section">
      
      {/* 1. SLIDER VIDEOS COMPACT (MOBILE + PC SLIDER COMBINED SECTION) */}
      <div className="bg-neutral-900 border-2 border-[#f49e1a]/30 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl" id="carplus-compact-video-slider">
        
        {/* Glowing Badge Design */}
        <div className="text-center sm:text-left space-y-2 mb-8">
          <span className="bg-gradient-to-r from-yellow-500 to-[#f49e1a] text-black font-mono font-black text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            Transparência & Risco Absolutamente Zero
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight pt-1 leading-snug">
            Vídeos Reais da Estrutura: <span className="text-[#f49e1a]">Veja em Ação!</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed text-justify sm:text-left">
            Assista pelas lentes reais a infraestrutura e o rigor técnico que tornaram a Carplus o autocenter mais recomendado de Curitiba. <strong>Nenhum pagamento online é feito hoje</strong>: reserve sem compromisso e pague somente na loja após ver os pneus novos montados!
          </p>
        </div>

        {/* The Compact Interactive Slider Container */}
        <div className="relative max-w-md mx-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-5 shadow-2xl transition duration-300 hover:border-[#f49e1a]/40" id="video-slider-stage">
          
          {/* Main Video Presentation Card */}
          <div 
            className="flex flex-col justify-between cursor-pointer group"
            onClick={() => handleWatchVideo(activeVideo.id)}
          >
            {/* Visual Aspect Screen */}
            <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group/thumb">
              {/* HQ Cover Image */}
              <img
                src={activeThumbnailUrl}
                alt={activeVideo.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] group-hover/thumb:brightness-[0.55] group-hover/thumb:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Dynamic Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              {/* Pulsing Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="bg-red-650 hover:bg-red-600 text-white p-5 rounded-full shadow-2xl scale-95 group-hover/thumb:scale-110 transition-all duration-300 border-2 border-white/40 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-25"></span>
                  <Play className="w-8 h-8 fill-current text-white translate-x-0.5" />
                </div>
                <span className="text-[11px] bg-black/80 text-[#f49e1a] px-3.5 py-1.5 rounded-full font-mono font-black uppercase tracking-widest text-center border border-white/10 shadow-lg group-hover/thumb:border-[#f49e1a]/40 transition">
                  Assistir no YouTube Shorts
                </span>
              </div>

              {/* Tag Overlays */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#f49e1a] text-black font-mono font-black text-[9px] uppercase px-2.5 py-1 rounded shadow">
                  {activeVideo.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="bg-red-600 text-white font-mono font-black text-[9px] uppercase px-2 py-0.5 rounded shadow">
                  Shorts 9:16
                </span>
                <p className="text-xs text-white/95 font-bold mt-1.5 leading-tight">
                  Toque para iniciar a demonstração gravada diretamente do autocenter.
                </p>
              </div>
            </div>

            {/* Video Copy Details (Neuromarketing Triggered) */}
            <div className="mt-5 text-center sm:text-left flex flex-col justify-between flex-1">
              <div>
                <span className="bg-[#f49e1a]/15 text-[#f49e1a] font-mono font-black text-[10px] uppercase px-2.5 py-1 rounded border border-[#f49e1a]/25 inline-block">
                  Vídeo {activeVideoIndex + 1} de {VIDEOS.length}
                </span>
                <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white mt-1.5 leading-snug group-hover:text-[#f49e1a] transition">
                  {activeVideo.title}
                </h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed text-justify">
                  {activeVideo.desc}
                </p>
              </div>

              {/* Instant High Trust Conversion Call to Action */}
              <a
                href={activeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-5 w-full bg-red-650 hover:bg-red-600 text-white font-black text-xs uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border-2 border-transparent hover:border-white/20 shadow-md transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span>Iniciar Vídeo Real no YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Touch-Friendly Slider Arrows inside the Card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevVideo();
            }}
            className="absolute left-[-18px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#f49e1a] text-black border-2 border-neutral-900 shadow-xl flex items-center justify-center hover:bg-yellow-400 transition cursor-pointer hover:scale-105 active:scale-90"
            title="Vídeo Anterior"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextVideo();
            }}
            className="absolute right-[-18px] sm:right-[-24px] top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#f49e1a] text-black border-2 border-neutral-900 shadow-xl flex items-center justify-center hover:bg-yellow-400 transition cursor-pointer hover:scale-105 active:scale-90"
            title="Próximo Vídeo"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Dots Indicators Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {VIDEOS.map((_, dotIdx) => (
              <button
                key={`dot-filter-${dotIdx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVideoIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeVideoIndex ? 'w-6 bg-[#f49e1a]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE 5 ACCORDIONS CURIOUSITY / SECRETS OF TIRES WITH ULTRA PREMIUM MOBILE LAYOUT */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-gray-900 select-none" id="secrets-tires-accordion">
        
        <div className="text-center sm:text-left space-y-2">
          <span className="bg-yellow-500/15 text-gray-950 border border-[#f49e1a]/30 font-mono font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-600" />
            Guia de Segurança Avançado para Condutores
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 pt-1 leading-snug">
            Curiosidades & Segredos Revelados: <span className="text-yellow-600">O que os fabricantes não te contam!</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed text-justify sm:text-left">
            Entenda como pequenas atitudes evitam que seus pneus novos desgastem prematuramente e protegem seu investimento contra buracos severos no asfalto.
          </p>
        </div>

        {/* 5 Accordions Blocks */}
        <div className="space-y-3 cursor-pointer" id="accordion-blocks-wrapper">
          {SECRET_ACCORDIONS.map((acc, idx) => {
            const isOpen = activeAccordionIndex === idx;
            return (
              <div 
                key={`acc-curiosity-${idx}`}
                onClick={() => toggleAccordion(idx)}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#f49e1a] bg-yellow-50/10 ring-1 ring-[#f49e1a]/10 shadow-sm' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Header click strip */}
                <button
                  type="button"
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-gray-950 transition font-sans cursor-pointer focus:outline-hidden"
                >
                  <div className="flex items-center gap-3">
                    <acc.icon className={`w-5 h-5 shrink-0 ${isOpen ? 'text-yellow-600' : 'text-gray-500'}`} />
                    <span className={`${isOpen ? 'text-yellow-700' : 'text-gray-900'} leading-snug font-extrabold uppercase`}>
                      {acc.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-gray-500 bg-gray-100 p-1.5 rounded-full group-hover:bg-gray-200">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-yellow-600 stroke-[3]" /> : <ChevronDown className="w-4 h-4 stroke-[3]" />}
                  </span>
                </button>

                {/* Collapsible Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed text-justify border-t border-gray-100 bg-gray-50/50">
                    {acc.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
