import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Handshake,
  Car,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const VIDEOS = [
  {
    id: "TL490QZpGlc",
    tag: "NOVIDADE EXCLUSIVA",
    title: "Agora a Carplus Compra e Vende Veículos com Procedência!",
    desc: "Grande novidade na Carplus de Curitiba! Além de sermos o seu autocenter de confiança para pneus e serviços mecânicos, agora expandimos para a compra e venda de veículos seminovos. Oferecemos um estoque selecionado com rigor absoluto, garantindo procedência indiscutível e vistoria cautelar 100% aprovada.",
    link: "https://www.carplusautos.com.br/",
    linkLabel: "Conhecer Estoque de Veículos",
    bullets: [
      "Procedência Garantida: Carros minuciosamente checados contra leilões, sinistros ou adulterações.",
      "Vistoria Cautelar 100% Aprovada: Certificação completa da saúde estrutural e mecânica.",
      "Negociação Segura: Avaliação justa, documentação rápida e a honestidade tradicional da marca."
    ]
  },
  {
    id: "v72kI13VyAU",
    tag: "PROVA REAL DA LOJA",
    title: "Sua Segurança em Primeiro Lugar: Veja Nossa Troca de Pneus de Alta Performance",
    desc: "Acompanhe de perto a precisão cirúrgica de nossos profissionais na troca e alinhamento de pneus novos de alta durabilidade. Transparência operacional completa de quem é referência em Curitiba!",
    bullets: [
      "Profissionais qualificados com maquinário de fixação pneumática avançada.",
      "Substituição gratuita do bico de borracha contra vazamentos residuais.",
      "Checklist preventivo de suspensão e freios sem custo adicional."
    ]
  },
  {
    id: "1fWqUJdCdRg",
    tag: "TECNOLOGIA RIGOROSA",
    title: "Balanceamento Computadorizado a Laser para Rodar sem Nenhuma Vibração",
    desc: "Sinta o conforto absoluto de uma rodagem perfeitamente lisa sob asfalto irregular. Assista como nossa tecnologia a laser corrige micro-oscilações para economizar combustível do seu carro!",
    bullets: [
      "Mapeamento tridimensional da roda para aplicação precisa de pesos corretivos.",
      "Evita o desgaste irregular prematuro dos pneus e poupa componentes de direção.",
      "Garante estabilidade extrema em alta velocidade nas rodovias."
    ]
  },
  {
    id: "4FpPSM5vYE8",
    tag: "NOSSO SHOWROOM",
    title: "Megaestrutura Carplus no Portão Curitiba: Sua Experiência Conforto VIP",
    desc: "Mais de 800m² dedicados à saúde do seu veículo. Visite nossos boxes de atendimento rápido, desfrute de nossa sala de espera climatizada e experimente o padrão de atendimento premium.",
    bullets: [
      "Sala de espera confortável climatizada com café espresso, Wi-Fi e visão da oficina.",
      "Mais de 10 boxes ativos para atendimento simultâneo rápido, reduzindo esperas.",
      "Localização privilegiada na Arthur Bernardes com pátio amplo e seguro."
    ]
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(null);

  const handleNextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    setIsPlaying(false);
  };

  const handlePrevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setIsPlaying(false);
  };

  const toggleAccordion = (idx: number) => {
    setActiveAccordionIndex((prev) => (prev === idx ? null : idx));
  };

  const activeVideo = VIDEOS[activeVideoIndex];
  const activeThumbnailUrl = `https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`;
  const activeWatchUrl = `https://www.youtube.com/shorts/${activeVideo.id}`;

  return (
    <div className="space-y-12 my-10 select-none" id="neuro-marketing-video-accordion-section">
      
      {/* 1. SLIDER VIDEOS COMPACT (MOBILE + PC SLIDER COMBINED SECTION WITH 2-COL SHOWCASE) */}
      <div className="bg-neutral-900 border-2 border-[#f49e1a]/30 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl" id="carplus-compact-video-slider">
        
        {/* Glowing Header Badge Design */}
        <div className="text-center sm:text-left space-y-2 mb-8">
          <span className="bg-gradient-to-r from-yellow-500 to-[#f49e1a] text-black font-mono font-black text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            OFERTAS EXCLUSIVAS & NOVIDADES IMPORTANTES
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-black uppercase text-white tracking-tight pt-1 leading-snug">
            Agora a Carplus <span className="text-[#f49e1a]">Compra & Vende Veículos!</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed text-justify sm:text-left">
            Grande marco em Curitiba! Além de sermos referência em pneus nacionais e importados com oficina mecânica avançada, agora nós também <strong>compramos e vendemos veículos seminovos com procedência garantida e vistoria 100% aprovada</strong>. Assista aos vídeos explicativos e confira as nossas ofertas exclusivas abaixo!
          </p>
        </div>

        {/* 2-Column Responsive Layout for Desktop Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto" id="video-showcase-grid">
          
          {/* Left Side: Cinematic Video Card (Refined, Sleek, No Amateur Phone Shell) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Subtle Atmospheric Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-amber-500/5 to-transparent blur-[40px] rounded-3xl pointer-events-none" />

            {/* Cinematic Media Card Frame */}
            <div className="relative w-full max-w-[380px] bg-neutral-950 border border-neutral-800 rounded-3xl p-3 shadow-2xl overflow-hidden group/cinematic">
              
              {/* Aspect Ratio Screen (9:16 or cinematic vertical) */}
              <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-inner group/screen">
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key={`player-${activeVideo.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full bg-black"
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                        title={activeVideo.title}
                        className="absolute inset-0 w-full h-full rounded-2xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`thumb-${activeVideo.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 w-full h-full cursor-pointer"
                    >
                      {/* Thumbnail with cinematic gradient */}
                      <img
                        src={activeThumbnailUrl}
                        alt={activeVideo.title}
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover/screen:brightness-[0.85] group-hover/screen:scale-105 transition-all duration-700 rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                      {/* Top Badge Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <span className="bg-[#f49e1a] text-black font-mono font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                          {activeVideo.tag}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-white/90 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                          {activeVideoIndex + 1} / {VIDEOS.length}
                        </span>
                      </div>

                      {/* Central Play Trigger Button (Clean, Elegant, Premium Glass) */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl group-hover/screen:scale-110 group-hover/screen:bg-[#f49e1a] group-hover/screen:text-black group-hover/screen:border-[#f49e1a] transition-all duration-300">
                          <Play className="w-7 h-7 fill-current translate-x-0.5" />
                        </div>
                        <span className="text-[11px] font-medium text-white/95 tracking-wide bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg group-hover/screen:border-yellow-500/40 transition">
                          Reproduzir Apresentação
                        </span>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                        <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                          {activeVideo.title}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Slider Navigation Arrows - Positioned Elegantly */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevVideo();
              }}
              className="absolute left-[-12px] sm:left-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 text-[#f49e1a] shadow-xl flex items-center justify-center hover:bg-neutral-800 hover:border-[#f49e1a] transition cursor-pointer hover:scale-105 z-40"
              title="Vídeo Anterior"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextVideo();
              }}
              className="absolute right-[-12px] sm:right-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 text-[#f49e1a] shadow-xl flex items-center justify-center hover:bg-neutral-800 hover:border-[#f49e1a] transition cursor-pointer hover:scale-105 z-40"
              title="Próximo Vídeo"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

          </div>

          {/* Right Side: Detailed Copy & Call To Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-center lg:text-left">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="bg-[#f49e1a]/20 text-[#f49e1a] font-mono font-black text-[10px] uppercase px-3 py-1 rounded border border-[#f49e1a]/30">
                  {activeVideo.tag}
                </span>
                <span className="bg-white/10 text-gray-300 font-mono font-black text-[10px] uppercase px-3 py-1 rounded border border-white/10">
                  Destaque {activeVideoIndex + 1} de {VIDEOS.length}
                </span>
              </div>
              
              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                {activeVideo.title}
              </h4>
              
              <p className="text-sm text-gray-300 leading-relaxed text-justify lg:text-left">
                {activeVideo.desc}
              </p>
            </div>

            {/* Bullet List for Premium Trust highlights */}
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-4 space-y-3 text-left">
              {activeVideo.bullets?.map((bullet, bIdx) => {
                const [titlePart, contentPart] = bullet.split(': ');
                return (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1ebd53] mt-0.5" />
                    <p className="text-gray-300 leading-relaxed">
                      <strong className="text-white uppercase tracking-wider">{titlePart}:</strong> {contentPart}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Interactive Call to Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              {activeVideo.link ? (
                <a
                  href={activeVideo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-[#f49e1a] hover:from-yellow-400 hover:to-yellow-500 text-black font-black text-xs uppercase py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all border border-[#d68516] shadow-lg shadow-yellow-500/10 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Car className="w-4 h-4 shrink-0 text-black" />
                  <span>{activeVideo.linkLabel}</span>
                  <ArrowRight className="w-4.5 h-4.5 shrink-0 stroke-[3]" />
                </a>
              ) : null}

              <a
                href={activeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto font-black text-xs uppercase py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all border active:scale-95 cursor-pointer ${
                  activeVideo.link 
                    ? 'bg-neutral-900 border-neutral-700 text-gray-300 hover:bg-neutral-800 hover:text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white border-transparent shadow-lg shadow-red-600/10 hover:scale-[1.02]'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Assistir no YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex justify-center lg:justify-start items-center gap-2.5 pt-1">
              {VIDEOS.map((_, dotIdx) => (
                <button
                  key={`dot-filter-${dotIdx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoIndex(dotIdx);
                    setIsPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeVideoIndex ? 'w-8 bg-[#f49e1a]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

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
