import React, { useState, useEffect } from 'react';
import { 
  Building, ShieldCheck, HelpCircle, ArrowLeft, Navigation, 
  Phone, Globe, Sparkles, AlertCircle, Send, CheckCircle2, Star,
  ChevronDown, ChevronUp, Tag, Flame, HelpCircle as InfoIcon,
  ChevronLeft, ChevronRight, Wrench, Users, Clock, Info, X,
  Map, BarChart3, Settings2, FileText, Signal
} from 'lucide-react';
import { 
  OFFICIAL_NEIGHBORHOODS, NON_OFFICIAL_NEIGHBORHOODS, POPULAR_REGIONS, 
  METROPOLITAN_CITIES, getRouteInstructions 
} from '../seo-data';
import { 
  calculateLocalScore, isPageReleased, getSavedGSCRate, saveGSCRate, 
  PRIORITY_NEIGHBORHOODS, PRIORITY_CITIES, getWave2Bairros, getWave2Cidades, 
  getAllNeighborhoods, getAllCities, AROS as WAVE_AROS, CARS as WAVE_CARS
} from '../utils/seoWaves';
import ServiceHistory from './ServiceHistory';
import { TIRES_DATA, CAR_MODELS_DATA } from '../data';
import TireCard from './TireCard';
import CarplusVideosSection from './CarplusVideosSection';
import { motion, AnimatePresence } from 'motion/react';


const WHEEL_SERVICES = [
  {
    id: 1,
    title: "Pintura Eletrostática Especializada",
    badge: "Oxidação severa → pintura eletrostática",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oxidacao%20severa%20%E2%86%92%20pintura%20eletrostatica-x6lyP8nFMo2iNxOXrTbBQR8kGcHI9t.png",
    summary: "Seu automóvel com rodas de liga leve protegidas contra oxidação extrema e com brilho original de fábrica.",
    details: "Nossa equipe utiliza tecnologia de cura térmica por indução eletrostática de alta resistência. Primeiramente, as rodas passam por uma limpeza profunda por banho químico especial para remoção completa de impurezas ferruginosas. O pó polimérico é pulverizado com carga elétrica oposta à roda, garantindo uma aderência perfeita de nível micrométrico. Em seguida, as rodas são curadas em forno especial de estufa a 200ºC. O resultado é um acabamento profissional blindado de alta resistência contra batidas de pedra, poeira ácida de frenagem e produtos químicos, devolvendo o visual original das rodas de marcas esportivas e premium.",
    team: "Executado por pintores metalúrgicos experientes de nossa equipe, dentro de cabine pressurizada e utilizando maquinários de aplicação da mais alta tecnologia da oficina Carplus.",
    time: "Prazo aproximado de execução: 1 a 2 dias úteis."
  },
  {
    id: 2,
    title: "Desempeno de Liga Leve e Reparo Expresso",
    badge: "Roda amassada → restaurada em 2h",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Roda%20amassada%20%E2%86%92%20restaurada%20em%202h-dFTVy6dSoaU0u7xdkPprLwtEJhSajO.png",
    summary: "Ajuste milimétrico de rodas de alumínio ou ferro deformadas por impactos severos em buracos.",
    details: "Rodas amassadas ou empenadas provocam vibrações indesejáveis no volante, desgaste acelerado dos pneus novos e até vazamentos lentos nos talões de borracha. Nosso método premium utiliza gabarito importado e prensa hidráulica de compressão progressiva e pressão controlada para recuperar a concentricidade e integridade radial milimétrica original da liga leve sem aquecimento térmico pernicioso (o que fragilizaria o alumínio, resultando em trincas futuras). Todo o processo é monitorado por relógio comparador centesimal de alta precisão para atingir erro próximo a zero milímetros.",
    team: "Realizado por especialistas de alinhamento com formação técnica e calibrador centesimal de tolerâncias estruturais.",
    time: "Prazo aproximado de execução: em até 2 horas."
  },
  {
    id: 3,
    title: "Restauração de Riscos & Diamantação",
    badge: "Risco profundo → recuperação total",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Risco%20profundo%20%E2%86%92%20recuperacao%20total-U6WANiatYVSBrd9DVnwKajZ3hiA3mk.png",
    summary: "Atendimento estético profissional para curar danos provocados por raspadas profundas em guias.",
    details: "As superfícies usinadas diamantadas de alumínio polido exigem maquinário avançado e sensível. Na Carplus, utilizamos o torno copiador diamantador computadorizado CNC para cortar uma microscópica camada de milímetros no flanco da liga leve, limpando riscos de guias de calçada e reestabelecendo as ranhuras finas exclusivas do acabamento diamantado original. Após o corte de engenharia, aplicamos uma densa cobertura de verniz acrílico automotivo secado sob infravermelho de estufa, selando a liga de alumínio contra poeiras e oxidações indesejáveis.",
    team: "Operado por torneiros CNC dedicados com longa experiência em acabamentos estéticos de alta precisão.",
    time: "Prazo aproximado de execução: 1 dia útil."
  }
];

const CARPLUS_EQUIPE_GALLERY = [
  {
    id: 1,
    title: "Vistoria e Alinhamento Jeep Compass",
    badge: "Diagnóstico de SUVs",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/jeep-compass.webp",
    summary: "Atendimento premium com verificação técnica detalhada na suspensão e no diâmetro do pneu do seu SUV.",
    details: "Pátio Carplus preparado para veículos nacionais e importados utilitários de grande porte como o Jeep Compass. Realizamos uma vistoria tática completa de pivôs, buchas de balança, amortecedores e batentes antes de realizar a montagem de novos pneus, garantindo aos clientes que os pneus novos rodem sem desgaste precoce ou desvio lateral do veículo nas retas.",
    team: "Equipe técnica de suspensões e diagnóstico preventivo da Carplus Pneus."
  },
  {
    id: 2,
    title: "Alinhamento Computadorizado Tridimensional",
    badge: "Geometria 3D de Última Geração",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/alinhamento-jeep.webp",
    summary: "Garras reflexivas realizam a leitura direta do caster, câmber e convergência.",
    details: "Nossos painéis projetores 3D cruzam o posicionamento em tempo real do seu automóvel com as tabelas de tolerâncias e dados técnicos fornecidos pelas montadoras originais europeias, asiáticas e americanas. Com isso, os ângulos de rodagem são fixados com precisão centesimal, reduzindo a folga, o esforço mecânico e mantendo a máxima economia de combustível no trânsito de Curitiba.",
    team: "Alinhadores gabaritados e homologados pela engenharia de suspensão da Carplus."
  },
  {
    id: 3,
    title: "Montagem Técnica & Borracharia Avançada",
    badge: "Troca Técnica e Bicos de Ar",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/troca-pneu.webp",
    summary: "Instalação de pneus, troca preventiva de válvula de ar (bico de borracha) inclusa.",
    details: "Higienizamos os flanges das rodas de liga leve para garantir a selagem hermética no talão do pneu novo. Também substituímos gratuitamente as válvulas por bicos novos macios comuns de borracha premium e aplicamos o torqueamento controlado nos parafusos de roda, preservando as roscas e a segurança dos freios.",
    team: "Borracharia técnica de pista empenhada em alta performance e montagem segura."
  },
  {
    id: 4,
    title: "Check-up Técnico de Motores & Fluidos",
    badge: "Verificação Sob o Capô",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/mecanico-motor.webp",
    summary: "Inspeção de nível de fluidos de freio, filtros de ar do motor e check-up com laudo fotográfico honesto.",
    details: "Na Carplus, cada motorista é tratado com transparência e respeito absoluto. Nossos mecânicos inspecionam o compartimento do motor para identificar vazamentos, pastilhas gastas, fluidos vencidos ou mangueiras ressecadas de forma limpa, baseando-se em fatos visíveis e enviando avisos prévios explicativos, sem surpresas desagradáveis ou empurra-empurra de peças.",
    team: "Mecânicos especializados em motores e injeção do autocenter."
  },
  {
    id: 5,
    title: "Ampla Estrutura e Elevadores de Pista",
    badge: "Oficina Própria Completa",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/oficina-carros.webp",
    summary: "Infraestrutura moderna no bairro Portão com múltiplos boxes de atendimento simultâneo.",
    details: "Nossas amplas instalações no Portão, Curitiba contam com elevadores pantográficos calibrados para erguimento firme e equilibrado, respeitando os pontos de apoio sob a longarina do seu carro para evitar mossas mecânicas. Oferecemos conforto na sala de espera de alto padrão enquanto sua revisão é executada.",
    team: "Atendimento comercial e mecânico unificado para Curitiba e Região Metropolitana (RMC)."
  },
  {
    id: 6,
    title: "Acabamento Seguro & Balanceamento Dinâmico",
    badge: "Calibração e Conforto",
    image: "https://www.carpluspneuseoficina.com.br/images/galeria/montagem-pneu.webp",
    summary: "Montagem macia em maquinário moderno com ferramentas que não estragam o acabamento das rodas.",
    details: "Nosso balanceamento computadorizado mapeia o desbalanceamento dinâmico e estático do conjunto roda/pneu, fixando pesos adesivos discretos com precisão de gramas de forma estratégica. Isso elimina as trepidações irritantes sentidas no painel ou volante em velocidade superior a 80 km/h, trazendo conforto único.",
    team: "Operadores e técnicos de acabamento da Carplus Pneus."
  }
];

interface CompanyPagesProps {
  view: 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho';
  seoTarget: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; } | null;
  onNavigateHome: () => void;
  onNavigateToPage: (page: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho') => void;
  onSelectSeoTarget: (target: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; }) => void;
  onSelectRimFromSeo?: (rim: number | 'Todos') => void;
  onSelectBrandFromSeo?: (brand: string) => void;
  onAddToCart?: (tire: any, quantity: number) => void;
  onSelectTire?: (tire: any) => void;
  cartItems?: any[];
  onUpdateQuantity?: (tireId: string, quantity: number) => void;
  onRemoveFromCart?: (tireId: string) => void;
  onClearCart?: () => void;
}

export default function CompanyPages({ 
  view, 
  seoTarget, 
  onNavigateHome, 
  onNavigateToPage, 
  onSelectSeoTarget,
  onSelectRimFromSeo,
  onSelectBrandFromSeo,
  onAddToCart,
  onSelectTire,
  cartItems = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart
}: CompanyPagesProps) {
  // Aros 13 to 23
  const AROS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const formatWhatsApp = (text: string) => {
    return `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(text)}`;
  };

  const getMostSearchedTires = (name: string, type: string) => {
    const tier1 = TIRES_DATA.find(t => t.rim === 14) || TIRES_DATA[1];
    const tier2 = TIRES_DATA.find(t => t.rim === 15) || TIRES_DATA[2];
    const tier3 = TIRES_DATA.find(t => t.rim === 16 || t.rim === 17) || TIRES_DATA[4];

    return [
      {
        category: 'Hatchbacks & Compactos',
        medida: '175/65R14 ou 185/60R15',
        sugestao: tier1,
        motivo: `Alta eficiência e dirigibilidade macia recomendada para os condutores que trafegam em ${name}.`
      },
      {
        category: 'Sedans & Comerciais Leves',
        medida: '195/55R15 ou 205/55R16',
        sugestao: tier2,
        motivo: `Estabilidade superior nas curvas e durabilidade nas vias rápidas e avenidas de ${name}.`
      },
      {
        category: 'SUVs & Linha Pesada Premium',
        medida: '225/45R17 ou 225/55R18',
        sugestao: tier3,
        motivo: `Aderência máxima sob pista molhada e asfalto de terra, ideal para sua segurança na região.`
      }
    ];
  };

  // State for active rotating offer in SEO pages hero
  const [activeOfferIdx, setActiveOfferIdx] = useState(0);
  
  // State for active FAQ accordion index
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPlate, setContactPlate] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Sliders on Quem Somos page
  const [wheelSlideIdx, setWheelSlideIdx] = useState(0);
  const [selectedWheelService, setSelectedWheelService] = useState<typeof WHEEL_SERVICES[0] | null>(null);

  const [gallerySlideIdx, setGallerySlideIdx] = useState(0);
  const [selectedGalleryStep, setSelectedGalleryStep] = useState<typeof CARPLUS_EQUIPE_GALLERY[0] | null>(null);

  // Offers of tires
  const offersOnSale = TIRES_DATA.filter(t => t.isOffer);

  useEffect(() => {
    if (offersOnSale.length === 0) return;
    const timer = setInterval(() => {
      setActiveOfferIdx((prev) => (prev + 1) % offersOnSale.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [offersOnSale.length]);

  return (
    <div className="bg-white text-gray-900 min-h-screen py-10 px-4 sm:px-6 font-sans select-none" id="company-pages-container">
      
      {/* Header element */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-gray-205 pb-5 mb-8">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-xs sm:text-sm uppercase font-extrabold tracking-wider text-yellow-600 hover:text-yellow-700 cursor-pointer"
          id="back-home-button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar ao Início / Catálogo</span>
        </button>
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-extrabold">
          Carplus Pneus • Unidade Portão Curitiba
        </span>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* VIEW: CARRINHO DE COMPRAS WOOCOMMERCE SIMULADO */}
        {view === 'carrinho' && (() => {
          const total = cartItems.reduce((acc, item) => acc + ((item.tire.promoPrice || item.tire.price) * item.quantity), 0);
          const totalPix = total * 0.95;
          const totalInstallment = total / 10;
          
          const buildCartWhatsAppMessage = () => {
            const listText = cartItems.map(item => {
              const cleanedName = `Pneu ${item.tire.brand} ${item.tire.width}/${item.tire.aspectRatio}R${item.tire.rim} ${item.tire.model}`;
              return `• ${item.quantity}x ${cleanedName} - R$ ${(item.tire.promoPrice || item.tire.price).toFixed(2)} cada (Subtotal: R$ ${((item.tire.promoPrice || item.tire.price) * item.quantity).toFixed(2)})`;
            }).join('\n');
            const message = `Olá equipe Carplus Pneus! Gostaria de agendar a instalação e garantir os bicos de ar grátis para os seguintes pneus do meu carrinho:\n\n${listText}\n\n*Valor Total:* R$ ${total.toFixed(2)}\n*À vista no PIX (com desconto):* R$ ${totalPix.toFixed(2)}\n*Ou no Cartão:* 10x sem juros de R$ ${totalInstallment.toFixed(2)}\n\nPor favor, confirmem o agendamento da montagem computadorizada na loja do Portão!`;
            return `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(message)}`;
          };

          return (
            <div className="space-y-8 animate-fade-in" id="view-carrinho-page">
              <div className="text-center md:text-left">
                <span className="bg-yellow-500/10 text-yellow-700 border border-yellow-500/25 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                  Ambiente Seguro de Compra • Carplus CWB
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-950 mt-3 tracking-tight">
                  Seu Carrinho • <span className="text-yellow-600">Revisão de Compra</span>
                </h2>
                <p className="text-sm max-w-2xl mt-2 text-justify leading-relaxed text-gray-650 font-medium">
                  Confira as quantidades dos pneus novos da sua frota e usufrua do nosso combo de montagem qualificada sem custos: balanceamento calibrado, bicos de ar cortesia e vistoria preventiva de alinhamento incluídos na sede do Portão, Curitiba!
                </p>
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-12 text-center space-y-6" id="empty-cart-view">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Building className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-gray-950 uppercase">Sem pneus no carrinho de compras</h3>
                    <p className="text-xs text-gray-650 max-w-md mx-auto">
                      Seu carrinho de compras está limpo. Navegue pelo nosso mapa do site ou volte ao catálogo para selecionar as melhores marcas (Pirelli, Bridgestone, Goodyear, Michelin) com garantia de 5 anos de fábrica!
                    </p>
                  </div>
                  <button 
                    onClick={onNavigateHome}
                    className="bg-gray-950 hover:bg-[#f49e1a] hover:text-black text-white font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow border border-transparent hover:border-black cursor-pointer"
                  >
                    Voltar ao Catálogo de Pneus
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="active-cart-grid">
                  {/* Cart Items List Table (Left Col - 8 cols span) */}
                  <div className="lg:col-span-8 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                    <h3 className="text-lg font-black uppercase text-gray-950 border-b border-gray-100 pb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-yellow-600" />
                      <span>Seus Itens Selecionados ({cartItems.reduce((s, i) => s + i.quantity, 0)} pneus)</span>
                    </h3>

                    <div className="space-y-4 divide-y divide-gray-100">
                      {cartItems.map((item, idx) => {
                        const originalP = item.tire.price;
                        const finalP = item.tire.promoPrice || originalP;
                        const itemSub = finalP * item.quantity;
                        const cleanedName = `Pneu ${item.tire.brand} ${item.tire.width}/${item.tire.aspectRatio}R${item.tire.rim} ${item.tire.model}`;

                        return (
                          <div 
                            key={`cart-item-${item.tire.id}-${idx}`}
                            className={`pt-4 first:pt-0 flex flex-col sm:flex-row items-center justify-between gap-4`}
                          >
                            {/* Product Thumbnail & Details */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-20 h-20 bg-gray-50 border border-gray-150 rounded-xl p-2 flex items-center justify-center shrink-0">
                                <img 
                                  src={item.tire.image} 
                                  alt={cleanedName} 
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="inline-block text-[9px] bg-gray-100 border border-gray-200 text-gray-700 font-mono font-bold px-2 py-0.5 rounded uppercase">
                                  {item.tire.brand}
                                </span>
                                <h4 className="text-sm font-extrabold text-gray-950 uppercase leading-snug line-clamp-1">
                                  {cleanedName}
                                </h4>
                                <p className="text-xs text-gray-400 font-mono">
                                  Medida: {item.tire.width}/{item.tire.aspectRatio} R{item.tire.rim} • Cód: {item.tire.id}
                                </p>
                              </div>
                            </div>

                            {/* Quantity & Small Totals Controls */}
                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-gray-50 pt-3 sm:pt-0">
                              {/* Quantity selection */}
                              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                                <button
                                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.tire.id, Math.max(1, item.quantity - 1))}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black font-extrabold cursor-pointer hover:bg-gray-200 rounded-lg transition"
                                  disabled={item.quantity <= 1}
                                  aria-label="Diminuir unidade"
                                >
                                  -
                                </button>
                                <span className="w-10 text-center font-mono text-sm font-extrabold text-gray-950">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.tire.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black font-extrabold cursor-pointer hover:bg-gray-200 rounded-lg transition"
                                  aria-label="Aumentar unidade"
                                >
                                  +
                                </button>
                              </div>

                              {/* Price Math block */}
                              <div className="text-right space-y-0.5 min-w-[100px]">
                                <p className="text-[10px] text-gray-400 font-mono">Unitário: R$ {finalP.toFixed(2)}</p>
                                <p className="text-sm font-black text-gray-950 font-mono">R$ {itemSub.toFixed(2)}</p>
                              </div>

                              {/* Remove cross action button */}
                              <button
                                onClick={() => onRemoveFromCart && onRemoveFromCart(item.tire.id)}
                                className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition cursor-pointer shrink-0"
                                aria-label="Remover item"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button 
                        onClick={onNavigateHome}
                        className="text-yellow-600 hover:text-yellow-700 hover:underline font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Adicionar Mais Pneus</span>
                      </button>

                      {onClearCart && (
                        <button 
                          onClick={onClearCart}
                          className="text-gray-400 hover:text-red-500 font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Limpar Todo o Carrinho
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Summary Board panel (Right Col - 4 cols span) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Order summary element */}
                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                      <h3 className="text-lg font-black uppercase text-gray-950 border-b border-gray-200 pb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        <span>Resumo do Pedido</span>
                      </h3>

                      <div className="space-y-3 font-mono text-sm border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-center text-gray-650">
                          <span>Subtotal de Itens</span>
                          <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-650">
                          <span>Montagem e Instalação</span>
                          <span className="text-green-600 font-extrabold uppercase">Grátis</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-650">
                          <span>Bicos de Borracha</span>
                          <span className="text-green-600 font-extrabold uppercase">Cortesia</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-650">
                          <span>Check-up Geometria</span>
                          <span className="text-green-600 font-extrabold uppercase">Incluso</span>
                        </div>
                      </div>

                      {/* Payment Methods Breakdown */}
                      <div className="space-y-4">
                        {/* À Vista PIX */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-1">
                          <span className="text-[10px] text-green-700 font-mono uppercase font-black tracking-wider block">Desconto especial PIX (-5%)</span>
                          <p className="text-2xl font-black text-green-800 font-mono">R$ {totalPix.toFixed(2)}</p>
                          <p className="text-xs text-green-600 font-bold select-none">Economia líquida de R$ {(total * 0.05).toFixed(2)} à vista!</p>
                        </div>

                        {/* Cartão de Crédito */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-1">
                          <span className="text-[10px] text-gray-500 font-mono uppercase font-black tracking-wider block">Parcelamento no Cartão</span>
                          <p className="text-xl font-black text-gray-950 font-mono">10x R$ {totalInstallment.toFixed(2)}</p>
                          <p className="text-xs text-gray-400 font-bold select-none">Sem juros adicionais em bandeiras oficiais.</p>
                        </div>
                      </div>

                      {/* Checkout button linked to WhatsApp */}
                      <a 
                        href={buildCartWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#f49e1a] hover:bg-[#e08b10] border-2 border-black text-gray-950 hover:text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider block text-center shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
                        id="complete-order-button"
                      >
                        Agendar Instalação via WhatsApp
                      </a>

                      <p className="text-[10px] text-gray-400 text-center leading-relaxed font-semibold">
                        Garantimos reserva imediata do estoque com faturamento e instalação em nossa loja física oficial (Av. Arthur Bernardes, 1323 - Portão).
                      </p>
                    </div>

                    {/* Protection assurance certificate */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-3 shadow-inner">
                      <h4 className="text-xs font-black text-gray-950 uppercase flex items-center gap-1.5 font-mono">
                        <ShieldCheck className="w-4 h-4 text-yellow-600" />
                        <span>Garantia de 5 anos Inclusa</span>
                      </h4>
                      <p className="text-[11px] text-gray-650 leading-relaxed text-justify font-medium">
                        Todos os pneus em estoque acompanham o selo de qualidade do Inmetro, nota fiscal e cobertura de garantia total de 5 anos contra defeitos e anomalias de fábrica. Sua compra e rodagem estão amparadas com tranquilidade na Carplus.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* VIEW: QUEM SOMOS */}
        {view === 'quem-somos' && (
          <div className="space-y-8" id="view-quem-somos">
            <div className="text-center md:text-left">
              <span className="bg-yellow-550/10 text-yellow-650 border border-yellow-500/25 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                Tradição de Honestidade & Confiança
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-950 mt-3 tracking-tight">
                Quem Somos • <span className="text-yellow-600">Carplus Pneus & Oficina</span>
              </h2>
              <p className="text-sm max-w-2xl mt-2 text-justify leading-relaxed text-gray-650 font-medium">
                Há 35 anos cuidando da segurança e performance do seu automóvel com total transparência, equipamentos 3D e equipe de engenharia mecânica qualificada em Curitiba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none">
                    Nossa História
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 text-justify leading-relaxed">
                    Fundada no coração do Paraná, a Carplus Pneus nasceu com a proposta de oferecer uma nova experiência na venda e montagem de pneus e revisão mecânica preventiva completa. Longe das práticas abusivas e orçamentos "empurrados" que infelizmente são comuns, construímos nossa reputação baseada na honestidade e laudos fotográficos precisos.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-750 text-justify leading-relaxed font-semibold">
                    Hoje, com 35 anos de atuação comercial na capital curitibana, a nossa unidade na Avenida Presidente Arthur da Silva Bernardes se tornou referência absoluta de satisfação, contando com a maior pontuação em avaliações reais dos clientes no Google Maps.
                  </p>
                </div>
                
                <div className="mt-6 bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3 shadow-inner">
                  <Star className="w-8 h-8 text-yellow-500 shrink-0 fill-yellow-500 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase font-mono">Líder absoluta em Curitiba</h4>
                    <p className="text-[10px] text-gray-500">Milhares de motoristas que rodam no Portão, Água Verde e CIC confiam em nossos técnicos.</p>
                  </div>
                </div>
              </div>

              {/* Core assets column */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="text-yellow-600 bg-yellow-500/10 p-2 rounded-xl w-fit">
                    <Star className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-black text-gray-950 uppercase font-mono">Técnicos Treinados & Habilitados</h4>
                  <p className="text-xs text-gray-650 text-justify leading-relaxed font-semibold">
                    Nossos profissionais passam por certificações trimestrais de fabricantes de pneus e suspensão. Realizamos a troca de bicos com torque controlado e balanceamento dinâmico a laser.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="text-yellow-600 bg-yellow-500/10 p-2 rounded-xl w-fit">
                    <Navigation className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-black text-gray-950 uppercase font-mono">Geometria 3D de Última Geração</h4>
                  <p className="text-xs text-gray-650 text-justify leading-relaxed font-semibold">
                    Utilizamos sensores reflexivos de alta precisão que comparam milimetricamente as especificações de cambagem, convergência e cáster com o banco de dados oficial das montadoras de todo o mundo.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="text-yellow-600 bg-yellow-500/10 p-2 rounded-xl w-fit">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-black text-gray-950 uppercase font-mono">Atendimento Sem Surpresas</h4>
                  <p className="text-xs text-gray-650 text-justify leading-relaxed font-semibold">
                    Você acompanha cada passo da manutenção. Orçamentos detalhados preestabelecidos e pagamento facilitado em até 10x sem juros no cartão de crédito físico na nossa loja.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. SLIDER 1: SERVIÇOS EM DESTAQUE PARA RODAS */}
            <div className="bg-gray-55 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm bg-gray-50 text-gray-900" id="slider-servicos-rodas">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="bg-yellow-500/10 text-yellow-650 border border-yellow-500/20 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                    Alta Performance Comercial para Rodas
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950 uppercase mt-2 select-none">
                    Serviços em Destaque para Rodas de Liga Leve
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 max-w-xl">
                    Tecnologias avançadas de restauração de pintura eletrostática, desempeno hidráulico expresso e diamantação computadorizada.
                  </p>
                </div>
                
                {/* Manual Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWheelSlideIdx((prev) => (prev === 0 ? WHEEL_SERVICES.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-yellow-550/10 hover:border-yellow-550 text-gray-800 hover:text-yellow-600 flex items-center justify-center transition cursor-pointer select-none"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono font-extrabold text-gray-500 select-none">
                    {wheelSlideIdx + 1} / {WHEEL_SERVICES.length}
                  </span>
                  <button 
                    onClick={() => setWheelSlideIdx((prev) => (prev === WHEEL_SERVICES.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-yellow-550/10 hover:border-yellow-550 text-gray-800 hover:text-yellow-600 flex items-center justify-center transition cursor-pointer select-none"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Slider Active Body Container */}
              <div className="relative overflow-hidden bg-white border border-gray-250 rounded-2xl shadow-inner p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-center">
                  
                  {/* Slide Image Panel (Left/Span 2 cols) */}
                  <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-gray-150 h-56 sm:h-64 flex items-center justify-center bg-gray-50">
                    <img 
                      src={WHEEL_SERVICES[wheelSlideIdx].image} 
                      alt={WHEEL_SERVICES[wheelSlideIdx].title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Visual Hover Hint Overlay */}
                    <div 
                      onClick={() => setSelectedWheelService(WHEEL_SERVICES[wheelSlideIdx])}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 cursor-pointer text-white text-xs font-bold uppercase tracking-wider gap-2 select-none"
                    >
                      <Info className="w-5 h-5 text-yellow-550" />
                      <span>Ver Detalhes & Equipe</span>
                    </div>

                    {/* Badge Overlay */}
                    <span className="absolute bottom-3 left-3 bg-gray-950 text-white border border-yellow-500/50 font-mono text-[9px] uppercase tracking-wide px-2.5 py-1 rounded shadow select-none">
                      {WHEEL_SERVICES[wheelSlideIdx].badge}
                    </span>
                  </div>

                  {/* Slide Info panel content (Right/Span 3 cols) */}
                  <div className="md:col-span-3 space-y-4 flex flex-col justify-between h-full py-1 text-center md:text-left">
                    <div className="space-y-2">
                      <span className="text-yellow-600 font-mono font-extrabold text-[10px] uppercase tracking-wider">
                        Serviço com Prazo Rápido
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-950 uppercase tracking-tight">
                        {WHEEL_SERVICES[wheelSlideIdx].title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-semibold">
                        {WHEEL_SERVICES[wheelSlideIdx].summary}
                      </p>
                    </div>

                    {/* Quick Specs List */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-150 text-left">
                      <div>
                        <span className="text-[9px] text-gray-400 font-mono block font-bold uppercase">Tempo estimado</span>
                        <span className="text-xs text-gray-800 font-extrabold flex items-center gap-1.5 mt-0.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-yellow-600" />
                          {WHEEL_SERVICES[wheelSlideIdx].time}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 font-mono block font-bold uppercase">Reserva Online</span>
                        <span className="text-xs text-yellow-600 font-extrabold flex items-center gap-1.5 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Pronta Entrega
                        </span>
                      </div>
                    </div>

                    {/* Interactive Action Button bar */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button 
                        onClick={() => setSelectedWheelService(WHEEL_SERVICES[wheelSlideIdx])}
                        className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2 cursor-pointer border border-black"
                      >
                        <Wrench className="w-4 h-4" />
                        <span>Abrir Informações do Trabalho</span>
                      </button>
                      
                      <a 
                        href={formatWhatsApp(`Olá Carplus! Gostaria de agendar o serviço de rodas de liga leve: "${WHEEL_SERVICES[wheelSlideIdx].title}" para o meu veículo.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto hover:bg-gray-100 border border-gray-300 text-gray-800 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition text-center select-none"
                      >
                        Simular Orçamento
                      </a>
                    </div>
                  </div>

                </div>

                {/* Slider Dot Indicators bar */}
                <div className="flex justify-center items-center gap-1.5 mt-6 border-t border-gray-100 pt-4 select-none">
                  {WHEEL_SERVICES.map((_, idx) => (
                    <button
                      key={`wheel-dot-${idx}`}
                      onClick={() => setWheelSlideIdx(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${wheelSlideIdx === idx ? 'w-8 bg-yellow-600' : 'w-2.5 bg-gray-250 hover:bg-gray-400'}`}
                      aria-label={`Ir para slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 2. SLIDER 2: A CARPLUS POR DENTRO - NOSSA EQUIPE & ESTÚDIO */}
            <div className="bg-gray-55 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm bg-gray-50 text-gray-900" id="slider-equipe-carplus">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="bg-yellow-500/10 text-yellow-650 border border-yellow-500/20 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                    Transparência no Seu Atendimento
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950 uppercase mt-2 select-none">
                    A Carplus por Dentro • Nossa Equipe & Oficina
                  </h3>
                  <p className="text-xs text-gray-650 mt-1 max-w-xl">
                    Veja nossa equipe em ação, os equipamentos de geometria 3D, montagem técnica com torque e balanceamentos de precisão no Portão.
                  </p>
                </div>
                
                {/* Manual Navigation Controls for Slider 2 */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setGallerySlideIdx((prev) => (prev === 0 ? CARPLUS_EQUIPE_GALLERY.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-yellow-550/10 hover:border-yellow-550 text-gray-850 hover:text-yellow-600 flex items-center justify-center transition cursor-pointer select-none"
                    aria-label="Slide anterior equipe"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono font-extrabold text-gray-500 select-none">
                    {gallerySlideIdx + 1} / {CARPLUS_EQUIPE_GALLERY.length}
                  </span>
                  <button 
                    onClick={() => setGallerySlideIdx((prev) => (prev === CARPLUS_EQUIPE_GALLERY.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-yellow-550/10 hover:border-yellow-550 text-gray-850 hover:text-yellow-600 flex items-center justify-center transition cursor-pointer select-none"
                    aria-label="Próximo slide equipe"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Slider 2 Active Body Container */}
              <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-inner p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-center">
                  
                  {/* Image (Left Frame / Span 2 cols) */}
                  <div className="md:col-span-2 relative group overflow-hidden rounded-xl border border-gray-150 h-56 sm:h-64 flex items-center justify-center bg-gray-50 shadow-inner">
                    <img 
                      src={CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].image} 
                      alt={CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive Click Visual Overlay */}
                    <div 
                      onClick={() => setSelectedGalleryStep(CARPLUS_EQUIPE_GALLERY[gallerySlideIdx])}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 cursor-pointer text-white text-xs font-bold uppercase tracking-wider gap-2 select-none"
                    >
                      <Users className="w-5 h-5 text-yellow-500" />
                      <span>Conhecer Equipe & Serviço</span>
                    </div>

                    {/* Info Badge Overlay */}
                    <span className="absolute bottom-3 left-3 bg-gray-950 text-white border border-yellow-500/50 font-mono text-[9px] uppercase tracking-wide px-2.5 py-1 rounded shadow select-none">
                      {CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].badge}
                    </span>
                  </div>

                  {/* Text Details (Right Frame/ Span 3 cols) */}
                  <div className="md:col-span-3 space-y-4 flex flex-col justify-between h-full py-1 text-center md:text-left">
                    <div className="space-y-2">
                      <span className="text-yellow-600 font-mono font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
                        <Users className="w-3.5 h-3.5 text-yellow-604" />
                        Rotas de Trabalho Diário
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-950 uppercase tracking-tight">
                        {CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-semibold">
                        {CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].summary}
                      </p>
                    </div>

                    {/* Quick Specs Board */}
                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150 text-left">
                      <span className="text-[9px] text-gray-400 font-mono block font-bold uppercase">Compromisso do Técnico</span>
                      <p className="text-xs text-gray-800 font-extrabold leading-relaxed mt-1 flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Transparência total nos reparos com laudos justificados de verdade.</span>
                      </p>
                    </div>

                    {/* Controls Footer buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button 
                        onClick={() => setSelectedGalleryStep(CARPLUS_EQUIPE_GALLERY[gallerySlideIdx])}
                        className="w-full sm:w-auto bg-gray-950 hover:bg-gray-850 text-white font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Info className="w-4 h-4 text-yellow-500" />
                        <span>Ler sobre Equipe & Trabalho</span>
                      </button>

                      <a 
                        href={formatWhatsApp(`Olá Equipe Carplus! Vi a foto da oficina sobre "${CARPLUS_EQUIPE_GALLERY[gallerySlideIdx].title}" e gostaria de agendar uma avaliação gratuita do meu automóvel.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-850 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition text-center select-none"
                      >
                        Solicitar Orçamento Geral
                      </a>
                    </div>
                  </div>

                </div>

                {/* Dots indicator index */}
                <div className="flex justify-center items-center gap-1.5 mt-6 border-t border-gray-100 pt-4 select-none">
                  {CARPLUS_EQUIPE_GALLERY.map((_, idx) => (
                    <button
                      key={`gallery-dot-${idx}`}
                      onClick={() => setGallerySlideIdx(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${gallerySlideIdx === idx ? 'w-8 bg-gray-800' : 'w-2.5 bg-gray-250 hover:bg-gray-400'}`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CarplusVideosSection />

            <div className="bg-gray-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow">
              <div className="text-center sm:text-left">
                <h4 className="font-extrabold uppercase text-yellow-500">Agende sua visita na loja física ou tire suas dúvidas!</h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xl">Nossos consultores no Portão estão de plantão para simular fretes, conferir medidas e reservar seus pneus.</p>
              </div>
              <a 
                href={formatWhatsApp('Olá Carplus! Gostaria de falar com um atendente sabendo que vocês trabalham há 35 anos em Curitiba.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shrink-0 border border-black shadow"
                id="whatsapp-about-cta"
              >
                Falar com Atendimento
              </a>
            </div>
          </div>
        )}

        {/* VIEW: PRIVACY POLICY */}
        {view === 'politica-privacidades' && (
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm" id="view-privacy-policy">
            <div className="border-b border-gray-200 pb-4">
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                Segurança Legal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-950 mt-2">
                Política de Privacidade • <span className="text-yellow-600">Carplus Pneus</span>
              </h2>
              <p className="text-[10px] text-gray-400 mt-1 font-mono font-extrabold">Última atualização: 11 de Junho de 2026</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 text-justify leading-relaxed">
              <p>
                A Carplus Pneus está comprometida com a proteção de dados pessoais e privacidade de nossos clientes. Esta Política de Privacidade explica como coletamos, armazenamos e utilizamos as informações no âmbito deste portal e do agendamento comercial físico.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">1. Coleta e Uso de Informações</h4>
              <p>
                Nós não coletamos dados para fins de comercialização com terceiros. As informações inseridas no formulário do Carrinho de Compras e do chat de suporte (como Nome, Placa do Veículo e preferência de pneu) são tratadas voluntariamente e de forma encriptada para agilizar seu atendimento via WhatsApp direto com nosso canal de vendas físico.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">2. Armazenamento Local (Cookies e LocalStorage)</h4>
              <p>
                Este site utiliza a tecnologia de <strong>LocalStorage</strong> em seu navegador web local. Isso garante que os itens adicionados ao seu carrinho de pneus e o seu histórico de registros de placas sejam persistidos localmente de forma privada e exclusiva no seu computador ou celular, sem qualquer envio a bancos de dados externos.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">3. Transações de Pagamento Seguras</h4>
              <p>
                Lembramos que **não realizamos transações digitais de cartões ou boletos online** neste ambiente. Todo o faturamento e pagamento das mercadorias e de mão de obra de oficina mecânica ocorre pessoalmente de forma presencial no ato da entrega técnica na nossa loja física (Av. Presid. Arthur da Silva Bernardes, 1323, Portão, Curitiba - PR).
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">4. Contato Encarregado</h4>
              <p>
                Em caso de dúvidas para remoção ou atualização física de histórico automotivo local, por favor ligue gratuitamente para a gerência da Carplus Portão através do contato telefônico principal: <strong>(41) 3082-7282</strong>.
              </p>
            </div>
          </div>
        )}

        {/* VIEW: RETURN POLICY */}
        {view === 'politica-devolucao' && (
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm" id="view-return-policy">
            <div className="border-b border-gray-250 pb-4">
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                Garantia Certificada
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-950 mt-2 select-none">
                Política de Troca & Devolução • <span className="text-yellow-600">Carplus Pneus</span>
              </h2>
              <p className="text-[10px] text-gray-400 mt-1 font-mono font-extrabold">Em total conformidade com a Lei Federal nº 8.078/1990 (Código de Defesa do Consumidor - CDC).</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 text-justify leading-relaxed">
              <p>
                A Carplus Pneus busca sempre a satisfação total e a integridade preventiva dos condutores de Curitiba e região metropolitana. Veja como funcionam as trocas e garantias em nossa oficina física do Portão:
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">1. Arrependimento e Troca Preventiva</h4>
              <p>
                Conforme o CDC, caso queira substituir ou devolver pneus comprados que ainda não foram montados no veículo, asseguramos um período de até 7 dias corridos após a retirada física para a troca de perfil ou solicitação de devolução, desde que a borracha esteja intacta, com os selos de certificação do INMETRO preservados.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">2. Garantia de 5 Anos Contra Defeitos de Fabricação</h4>
              <p>
                Todos os nossos pneus multimarcas homologados comercializados gozam de **garantia estendida legal de 5 (cinco) anos** fornecida diretamente pelo fabricante oficial nacional (Bridgestone, Michelin, Pirelli, Kumho, Hankook e Dunlop). A garantia cobre problemas estruturais como bolhas térmicas ou descolamento de banda de rolagem decorrentes de defeito de fundição na fabricação.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">3. Exclusão de Coberturas</h4>
              <p>
                A garantia contra defeitos de fabricação **NÃO** cobre rasgos provocados por cortes em guias, furos acidentais de pregos, impactos de buracos decorrentes de más condições asfálticas ou desgaste irregular provocado por falta de vistorias técnicas periódicas de alinhamento e geometria 3D.
              </p>

              <h4 className="text-gray-900 font-extrabold uppercase mt-4">4. Procedimento de Troca</h4>
              <p>
                Traga o carro à nossa sede no endereço <strong>Av. Presidente Arthur da Silva Bernardes, 1323 (Portão)</strong> para análise imediata do engenheiro técnico credenciado. O laudo é emitido e, confirmada a ocorrência de defeito original, efetuamos a substituição imediata sem custos extras.
              </p>
            </div>
          </div>
        )}

        {/* VIEW: MAPA DO SITE */}
        {view === 'mapa-do-site' && (
          <div className="space-y-8" id="view-sitemap-portal">
            <div className="text-center sm:text-left">
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                Diretório de Links & SEO Integrado
              </span>
              <h2 className="text-3xl font-black uppercase text-gray-950 mt-3 select-none">
                Mapa do Site • <span className="text-yellow-600">Sitemap Portal Completo</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl text-justify leading-relaxed">
                Navegue rapidamente de forma integrada por todas as páginas institucionais, guias de pneus novos por aros, regiões populares não oficiais de Curitiba e cidades metropolitanas de fácil conectividade física.
              </p>
            </div>

            {/* CRITICAL INTEGRATION: SERVICE HISTORY */}
            <div className="border border-gray-250 p-1 bg-gray-50 rounded-3xl shadow-sm" id="integrated-service-history">
              <div className="p-4 border-b border-gray-200 bg-white rounded-t-3xl text-center sm:text-justify flex flex-col sm:flex-row justify-between items-center gap-2">
                <div>
                  <span className="bg-yellow-500 text-gray-950 font-mono font-black text-[9px] uppercase px-2.5 py-1 rounded border border-black inline-block">
                    Área Exclusiva do Cliente
                  </span>
                  <h4 className="text-sm font-black text-gray-900 uppercase mt-1">Busque seu Histórico Digital nesta Página</h4>
                </div>
                <div className="text-[10px] text-gray-500 font-mono font-bold">
                  Consultas locais de placa gravadas diretamente no seu aparelho.
                </div>
              </div>
              <div className="p-2 bg-white rounded-b-3xl">
                <ServiceHistory />
              </div>
            </div>

            {/* Sitemap grid index of key links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              
              {/* Box 1: Institutional Core and raw XML link */}
              <div className="bg-gray-55 border border-gray-200 p-5 rounded-2xl space-y-3 shadow-sm bg-gray-50 text-gray-800">
                <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-1.5 font-mono">
                  <Building className="w-4 h-4 text-yellow-600" />
                  <span>Canais Principais</span>
                </h4>
                <ul className="space-y-2 text-xs font-bold text-gray-650">
                  <li><button onClick={onNavigateHome} className="hover:text-yellow-600 transition cursor-pointer text-left">Catálogo de Vendas & Início</button></li>
                  <li><button onClick={() => onSelectSeoTarget({ type: 'bairro', name: 'Portão' })} className="hover:text-yellow-600 transition cursor-pointer text-left">Como Chegar Carplus Portão</button></li>
                  <li><button onClick={() => onSelectSeoTarget({ type: 'bairro', name: 'Água Verde' })} className="hover:text-yellow-600 transition cursor-pointer text-left">Revisão para o Água Verde</button></li>
                  <li><a href="/sitemap.xml" target="_blank" className="hover:text-yellow-600 transition flex items-center gap-1 font-mono text-[10px] text-yellow-650 py-1 border-t border-gray-200 mt-2 font-bold">Ver Sitemap.xml Técnico</a></li>
                </ul>
              </div>

              {/* Box 2: Tire Rims range Aro 13 - 23 */}
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3 shadow-sm text-gray-800">
                <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                  <span>Destaques por Aro</span>
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                  {AROS.map((aro) => (
                    <button
                      key={`aro-link-${aro}`}
                      onClick={() => {
                        if (onSelectRimFromSeo) {
                          onSelectRimFromSeo(aro);
                        } else {
                          onSelectSeoTarget({ type: 'aro', name: `Aro ${aro}` });
                        }
                      }}
                      className="bg-white border border-gray-200 hover:border-yellow-600 py-2 rounded text-gray-700 hover:text-yellow-650 font-black uppercase text-[9px] cursor-pointer shadow-sm transition"
                    >
                      R{aro}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box 3: Regiões Metropolitanas de Curitiba (RMC) */}
              <div className="bg-gray-55 border border-gray-200 p-5 rounded-2xl space-y-3 lg:col-span-2 shadow-sm bg-gray-50 text-gray-800">
                <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-1.5 font-mono">
                  <Globe className="w-4 h-4 text-yellow-600" />
                  <span>Cidades Região Metropolitana (RMC)</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-extrabold">
                  {METROPOLITAN_CITIES.map((cidade) => (
                    <button
                      key={`cidade-link-${cidade}`}
                      onClick={() => onSelectSeoTarget({ type: 'cidade', name: cidade })}
                      className="bg-white border border-gray-200 hover:border-yellow-600 px-2.5 py-1.5 rounded text-gray-700 hover:text-yellow-650 cursor-pointer shadow-sm transition"
                    >
                      {cidade}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bairros de Curitiba SEO list */}
            <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-2xl space-y-4 shadow-sm text-gray-850">
              <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2">
                Páginas de Geolocalização de Bairros Oficiais (75 Bairros Curitiba)
              </h4>
              <p className="text-[11px] text-gray-650 text-justify font-medium">
                Clique sobre qualquer bairro de Curitiba reconhecido para carregar o guia de vantagens e instruções de percurso direto até a nossa unidade de portabilidade mecânica.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-[10px] font-bold text-gray-600">
                {OFFICIAL_NEIGHBORHOODS.map((bairro) => (
                  <button
                    key={`bairro-link-${bairro}`}
                    onClick={() => onSelectSeoTarget({ type: 'bairro', name: bairro })}
                    className="text-left hover:text-yellow-600 transition py-1 cursor-pointer flex items-center gap-1.5 truncate text-gray-805"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block shrink-0"></span>
                    <span className="truncate">{bairro}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bairros Não Oficiais & Vilas de Curitiba */}
            <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-2xl space-y-4 shadow-sm text-gray-850">
              <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2">
                Vilas, Loteamentos & Bairros Não Oficiais (Buscas Populares em Curitiba)
              </h4>
              <p className="text-[11px] text-gray-650 text-justify font-medium">
                Termos regionais e imobiliários muito consultados pelos moradores locais. Conectamos estas micro-regiões de forma rápida:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 text-[10px] font-bold text-gray-600">
                {NON_OFFICIAL_NEIGHBORHOODS.map((v) => (
                  <button
                    key={`non-off-link-${v.name}`}
                    onClick={() => onSelectSeoTarget({ type: 'bairro', name: v.name, region: v.region })}
                    className="text-left hover:text-yellow-600 transition py-1 cursor-pointer flex flex-col bg-white p-2 rounded-lg border border-gray-150 shadow-sm"
                  >
                    <span className="text-gray-900 font-extrabold truncate">{v.name}</span>
                    <span className="text-[8px] text-gray-400 truncate">Região {v.region}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Regions subdivisions Group list */}
            <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-2xl space-y-4 shadow-sm text-gray-850">
              <h4 className="text-gray-900 font-black text-xs uppercase tracking-wide border-b border-gray-200 pb-2">
                Subdivisões e Regiões de Grande Densidade Demográfica
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {POPULAR_REGIONS.map((reg) => (
                  <div key={reg.name} className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col justify-between shadow-inner">
                    <div>
                      <h5 className="text-xs font-black text-[#f49e1a] uppercase">{reg.name}</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">{reg.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-200">
                      {reg.subAreas.map((sa) => (
                        <button
                          key={sa}
                          onClick={() => onSelectSeoTarget({ type: 'bairro', name: sa, region: reg.name })}
                          className="bg-gray-50 border border-gray-150 hover:bg-yellow-500/10 px-2 py-0.5 rounded text-[8px] text-gray-700 hover:text-yellow-650 font-bold transition cursor-pointer"
                        >
                          {sa}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CONTATO COMPLETO */}
        {view === 'contato' && (
          <div className="space-y-8" id="view-contato-completo">
            <div className="text-center md:text-left">
              <span className="bg-black text-white font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full inline-block shadow-sm">
                Atendimento Oficial Carplus
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-gray-950 mt-3 tracking-tight">
                Fale Conosco • <span className="text-[#f49e1a]">Página de Contato Completa</span>
              </h2>
              <p className="text-sm max-w-2xl mt-2 text-justify leading-relaxed text-gray-650 font-semibold">
                Entre em contato conosco para agendamento de suspensão, revisão, freios, serviços sob medida ou para dúvidas de compras e reservas de pneus novos no Portão.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
              {/* Store details and Info cards */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <h3 className="text-lg font-black text-gray-950 uppercase border-b-2 border-black pb-2 select-none">
                    Informações de Contato Físico
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-black text-[#f49e1a] p-2.5 rounded-xl shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Telefone Fixo / WhatsApp</h4>
                        <p className="text-base font-black text-gray-900 mt-0.5">(41) 3082-7282</p>
                        <p className="text-[11px] text-gray-500 font-bold">Fale conosco por ligação ou direct no aplicativo</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-black text-[#f49e1a] p-2.5 rounded-xl shrink-0">
                        <Navigation className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Nosso Endereço</h4>
                        <p className="text-base font-black text-gray-900 mt-0.5">Av. Pres. Arthur da Silva Bernardes, 1323</p>
                        <p className="text-[11px] text-gray-500 font-bold">Portão • Curitiba - PR • CEP: 80320-300</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-black text-[#f49e1a] p-2.5 rounded-xl shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Horários de Atendimento</h4>
                        <p className="text-sm font-black text-gray-900 mt-0.5">Segunda a Sexta: 08:00 – 18:00</p>
                        <p className="text-sm font-black text-gray-900">Sábados: 08:00 – 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-[#f49e1a] uppercase text-sm tracking-widest">Compromisso Carplus</h4>
                    <p className="text-xs text-justify text-gray-300 mt-2 leading-relaxed font-bold">
                      Transparência total e laudos técnicos precisos. Sem taxas embutidas, sem serviços dispensáveis e com instalação de bicos novos gratuita de verdade com a nossa equipe de engenharia mecânica.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://api.whatsapp.com/send?phone=554130827282&text=Olá%20Carplus!%20Desejo%20falar%20diretamente%20com%20a%20gerência%20para%20uma%20consulta."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#f49e1a] hover:bg-white hover:text-black text-black font-black text-[11px] uppercase tracking-wider px-4 py-3 rounded-xl block text-center transition-all duration-300 border-2 border-black shadow"
                    >
                      Falar Direto no WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-lg font-black text-gray-950 uppercase border-b-2 border-black pb-2 select-none">
                  Formulário de Contato e Orçamento
                </h3>

                {isContactSubmitted ? (
                  <div className="bg-gray-50 border-2 border-black p-6 rounded-2xl text-center space-y-4" id="success-contact-box">
                    <CheckCircle2 className="w-12 h-12 text-[#f49e1a] mx-auto animate-pulse" />
                    <h4 className="text-lg font-black uppercase text-black">Mensagem Enviada!</h4>
                    <p className="text-xs text-gray-600 font-bold">
                      Obrigado! Um assistente técnico irá responder você diretamente em instantes ou abrir o WhatsApp para dar continuidade.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setIsContactSubmitted(false)}
                      className="bg-black text-white hover:bg-neutral-900 font-black text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition border-2 border-black"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                    >
                      Enviar Nova Mensagem
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const wpText = `Olá Carplus! Gostaria de falar com vocês.\n\n*Nome:* ${contactName}\n*Telefone:* ${contactPhone}\n*Placa do Veículo:* ${contactPlate || 'Não informada'}\n*Mensagem:* ${contactMessage}`;
                      window.open(`https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(wpText)}`, '_blank');
                      setIsContactSubmitted(true);
                      setContactName('');
                      setContactPhone('');
                      setContactPlate('');
                      setContactMessage('');
                    }} 
                    className="space-y-4" 
                    id="contact-page-form"
                  >
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-700 mb-1">
                        Seu Nome Completo (obrigatório)
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: João da Silva"
                        className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-700 mb-1">
                        Seu Whatsapp ou Telefone (obrigatório)
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Ex: (41) 99999-9999"
                        className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-700 mb-1">
                        Placa do Veículo / Modelo (opcional)
                      </label>
                      <input 
                        type="text" 
                        value={contactPlate}
                        onChange={(e) => setContactPlate(e.target.value)}
                        placeholder="Ex: Fiat Argo - ABC1D23"
                        className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-700 mb-1">
                        Sua Mensagem ou Dúvida (obrigatório)
                      </label>
                      <textarea 
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Diga qual pneu procura ou qual serviço deseja agendar..."
                        className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#f49e1a] hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl border-2 border-black shadow-md transition duration-300"
                      id="contact-form-submit-btn"
                    >
                      Enviar agora pelo WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            <CarplusVideosSection />
          </div>
        )}

        {/* VIEW: CURITIBA HUBS (Always indexable) */}
        {view === 'curitiba' && (() => {
          const rate = getSavedGSCRate();
          const curitibaBairros = getAllNeighborhoods();
          
          return (
            <div className="space-y-8 animate-fade-in text-gray-900 pb-12" id="view-curitiba-hub">
              {/* Breadcrumb List JSON-LD Schema */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.carpluscwb.com.br" },
                    { "@type": "ListItem", "position": 2, "name": "Curitiba", "item": "https://www.carpluscwb.com.br/curitiba" }
                  ]
                })}
              </script>

              {/* Hub Intro */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="text-center sm:text-left space-y-3">
                  <span className="bg-yellow-500/15 text-gray-950 font-mono font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
                    Diretório Municipal de Curitiba
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-950 font-mono">
                    Pneus em Curitiba • <span className="text-yellow-600">Instalação Grátis nos Bairros</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed max-w-4xl">
                    Selecione sua região abaixo para conferir ofertas exclusivas de pneus novos <strong>Pirelli, Goodyear, Michelin, Bridgestone, Delinte</strong> e mais. Compre diretamente online e usufrua de nossa instalação profissional computadorizada e bicos de ar comuns de alto padrão sem custo extra no Portão!
                  </p>
                </div>
              </div>

              {/* Segment 1: Priority Neighborhoods (Wave 1) */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Regiões de Destaque (Fácil Acesso à Sede do Portão)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {PRIORITY_NEIGHBORHOODS.map(name => {
                    return (
                      <button
                        key={name}
                        onClick={() => onSelectSeoTarget({ type: 'bairro', name })}
                        className="bg-white hover:bg-yellow-500/5 border-2 border-gray-200 hover:border-yellow-500 rounded-xl p-3 text-left transition shrink-0 cursor-pointer text-xs font-bold flex flex-col justify-between"
                      >
                        <span className="text-gray-950 block">{name}</span>
                        <span className="text-[9px] text-gray-400 font-mono font-medium mt-1">
                          Score Local: {calculateLocalScore(name, 'bairro')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Segment 2: All Other Neighborhoods */}
              <div className="space-y-4 border-t border-gray-150 pt-8">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2 font-mono">
                  <Navigation className="w-4 h-4 text-gray-400" />
                  Todos os Bairros Cadastrados e Cobertos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {curitibaBairros.filter(n => !PRIORITY_NEIGHBORHOODS.includes(n)).sort().map(name => {
                    return (
                      <button
                        key={name}
                        onClick={() => onSelectSeoTarget({ type: 'bairro', name })}
                        className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-400 rounded-xl p-2.5 text-left transition shrink-0 cursor-pointer text-[11px] font-bold text-gray-750 hover:text-black flex flex-col justify-between"
                      >
                        <span>{name}</span>
                        <span className="text-[8px] text-gray-400 font-mono mt-0.5">
                          Score: {calculateLocalScore(name, 'bairro')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hub FAQ Section */}
              <div className="bg-white border text-gray-900 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-base font-black uppercase text-gray-950 font-mono border-b border-gray-200 pb-3">
                  Dúvidas Frequentes sobre Atendimento em Curitiba
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs uppercase font-extrabold tracking-wider text-gray-500 font-mono">Onde fica localizada a oficina Carplus?</p>
                    <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-bold">Ficamos localizados estrategicamente na Av. Presidente Arthur da Silva Bernardes, 1323, no bairro Portão em Curitiba (PR). Nossas amplas instalações contam com boxes de atendimento expresso, rampa de geometria 3D alemã de última linha e sala de espera climatizada de padrão executivo.</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs uppercase font-extrabold tracking-wider text-gray-500 font-mono">Como faço para reservar pneus novos online?</p>
                    <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-bold">Basta navegar no catálogo desse site, selecionar as borrachas, e clicar no botão de compra. Seus pneus ficarão reservados de graça, e você só paga na recepção física da nossa loja após eles estarem instalados e montados no veículo por nossos mecânicos seniores.</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* VIEW: REGIAO METROPOLITANA HUBS (Always indexable) */}
        {view === 'regiao-metropolitana' && (() => {
          const rate = getSavedGSCRate();
          const rmcCities = getAllCities();

          return (
            <div className="space-y-8 animate-fade-in text-gray-900 pb-12" id="view-rmc-hub">
              {/* Breadcrumb List JSON-LD Schema */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.carpluscwb.com.br" },
                    { "@type": "ListItem", "position": 2, "name": "Região Metropolitana", "item": "https://www.carpluscwb.com.br/regiao-metropolitana" }
                  ]
                })}
              </script>

              {/* Hub Intro */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="text-center sm:text-left space-y-3">
                  <span className="bg-yellow-500/15 text-gray-950 font-mono font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
                    Diretório da Grande Curitiba (RMC)
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-950 font-mono">
                    Pneus na Região Metropolitana • <span className="text-yellow-600">Serviços e Pronta Entrega</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed max-w-4xl">
                    Selecione seu município na Região Metropolitana em que reside. Agende a montagem gratuita e bicos inclusos em nossa loja-sede do Portão, Curitiba. Garantia estendida oficial de 5 anos de fábrica contra avarias ou defeitos estruturais.
                  </p>
                </div>
              </div>

              {/* Segment 1: Priority Cities (Wave 1) */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Cidades com Atendimento Expresso Integrado
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {PRIORITY_CITIES.map(name => {
                    return (
                      <button
                        key={name}
                        onClick={() => onSelectSeoTarget({ type: 'cidade', name })}
                        className="bg-white hover:bg-yellow-500/5 border-2 border-gray-200 hover:border-yellow-500 rounded-xl p-3 text-left transition shrink-0 cursor-pointer text-xs font-bold flex flex-col justify-between"
                      >
                        <span className="text-gray-950 block">{name}</span>
                        <span className="text-[9px] text-gray-400 font-mono mt-1">
                          Score Local: {calculateLocalScore(name, 'cidade')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Segment 2: Other RMC Cities */}
              <div className="space-y-4 border-t border-gray-150 pt-8">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2 font-mono">
                  <Navigation className="w-4 h-4 text-gray-400" />
                  Todos os Municípios da Grande Curitiba Atendidos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {rmcCities.filter(c => !PRIORITY_CITIES.includes(c)).sort().map(name => {
                    return (
                      <button
                        key={name}
                        onClick={() => onSelectSeoTarget({ type: 'cidade', name })}
                        className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-400 rounded-xl p-2.5 text-left transition shrink-0 cursor-pointer text-[11px] font-bold text-gray-750 hover:text-black flex flex-col justify-between"
                      >
                        <span>{name}</span>
                        <span className="text-[8px] text-gray-400 font-mono mt-0.5">
                          Score: {calculateLocalScore(name, 'cidade')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hub Attendance Details */}
              <div className="bg-white border text-gray-900 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-base font-black uppercase text-gray-950 font-mono border-b border-gray-200 pb-3">
                  Instalação Técnica para Clientes da RMC
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-bold bg-gray-50 p-4 rounded-xl border border-gray-150">
                  ⚠️ <strong>Atenção morador da Região Metropolitana:</strong> O agendamento é sincronizado de forma instantânea através do nosso canais digitais do WhatsApp. Devido à alta rotatividade do nosso estoque físico, sugerimos encomendar as borrachas via site para garantir as tarifas e a disponibilidade das medidas ideais para seu modelo de automóvel.
                </p>
              </div>
            </div>
          );
        })()}

        {/* VIEW: ADMINISTRATIVE WAVE INDEXING DASHBOARD (Never indexed) */}
        {view === 'admin-indexacao' && (() => {
          const [simulatedRate, setSimulatedRate] = useState(() => getSavedGSCRate());
          const [copySuccess, setCopySuccess] = useState<string | null>(null);

          const bairrosList = getAllNeighborhoods();
          const cidadesList = getAllCities();

          // Calculate counts based on current slider rate
          const indexableBairros = bairrosList.filter(b => isPageReleased(b, 'bairro', simulatedRate));
          const indexableCidades = cidadesList.filter(c => isPageReleased(c, 'cidade', simulatedRate));
          const indexableCarros = WAVE_CARS.filter(c => isPageReleased(c, 'carro', simulatedRate));
          const indexableAros = WAVE_AROS.filter(a => isPageReleased(a, 'aro', simulatedRate));

          const alwaysIndexedCount = 8; // static core pages + tires
          const totalIndexable = indexableBairros.length + indexableCidades.length + indexableCarros.length + indexableAros.length + alwaysIndexedCount;
          const totalPagesInSystem = bairrosList.length + cidadesList.length + WAVE_CARS.length + WAVE_AROS.length + alwaysIndexedCount;

          let currentPhaseName = "Fase 1 - Indexação Controlada (Bairros & Cidades Prioritários)";
          let phaseColor = "text-yellow-600 bg-yellow-50 border-yellow-250";
          if (simulatedRate >= 90) {
            currentPhaseName = "Fase 3 - Escalabilidade Enterprise Total (Tudo Liberado)";
            phaseColor = "text-green-700 bg-green-50 border-green-250";
          } else if (simulatedRate >= 80) {
            currentPhaseName = "Fase 2 - Liberação Progressiva (Próximos Bairros & Cidades pSEO)";
            phaseColor = "text-blue-700 bg-blue-50 border-blue-250";
          }

          const isAlertTriggered = simulatedRate < 70;

          // GBP Post Copywriter Recommendations Generator
          const [currentGbpPost, setCurrentGbpPost] = useState<{ text: string; pageName: string } | null>(null);

          const generateWeeklyRecommendation = () => {
            // Find currently indexable local pages
            const releasedLocals = [
              ...indexableBairros.map(b => ({ name: b, type: 'bairro' })),
              ...indexableCidades.map(c => ({ name: c, type: 'cidade' }))
            ];
            if (releasedLocals.length === 0) {
              setCurrentGbpPost({ text: "Cadastre bairros prioritários para gerar recomendações.", pageName: "Nenhum" });
              return;
            }
            // Pick a random indexable item
            const randomIndex = Math.floor(Math.random() * releasedLocals.length);
            const selected = releasedLocals[randomIndex];
            
            const cleanSlug = selected.name.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9_-\s]/gi, '')
              .trim().replace(/\s+/g, '-').replace(/-+/g, '-');

            const postText = `🚙 Buscando pneus novos de alta durabilidade e economia para rodar na região do ${selected.name === 'Curitiba' ? 'Centro' : selected.name}? ⭐️\n\nNa Carplus Pneus Arthur Bernardes (no Portão), oferecemos as melhores marcas mundiais como Pirelli, Goodyear, Bridgestone e Delinte com montagem técnica computadorizada e bicos de ar de brinde! 🛠\n\nMoradores e motoristas do ${selected.name} contam com condições incríveis de pagamento em até 10x sem juros! Consulte a medida recomendada para seu carro.\n\n👉 Acesse agora nossa página oficial de atendimento em ${selected.name}:\nhttps://www.carpluscwb.com.br/${selected.type}/${cleanSlug}`;
            
            setCurrentGbpPost({ text: postText, pageName: selected.name });
            setCopySuccess(null);
          };

          const handleCopyGbp = () => {
            if (!currentGbpPost) return;
            navigator.clipboard.writeText(currentGbpPost.text);
            setCopySuccess("Copiado!");
            setTimeout(() => setCopySuccess(null), 3000);
          };

          // Update rate and persist
          const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value);
            setSimulatedRate(val);
            saveGSCRate(val);
          };

          // Active tab for listing pages below
          const [activeListTab, setActiveListTab] = useState<'bairro' | 'cidade' | 'carro' | 'aro'>('bairro');

          const getDisplayList = () => {
            if (activeListTab === 'bairro') return bairrosList;
            if (activeListTab === 'cidade') return cidadesList;
            if (activeListTab === 'carro') return WAVE_CARS;
            return WAVE_AROS;
          };

          return (
            <div className="space-y-8 text-gray-950 animate-fade-in pb-12" id="admin-dashboard-container">
              
              {/* Header block */}
              <div className="bg-gray-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="bg-yellow-500 text-gray-950 font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded inline-block">
                      Enterprise SEO Control Box
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-mono text-yellow-500">
                      Painel de Indexação em Ondas Progressivas
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">
                      Simulação e controle de liberação das páginas programáticas (pSEO) nas SERPs do Google Search Console.
                    </p>
                  </div>
                  <button 
                    onClick={onNavigateHome}
                    className="self-start md:self-auto flex items-center gap-1.5 bg-gray-900 border border-gray-800 hover:bg-yellow-500 hover:text-gray-950 font-black text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para Home
                  </button>
                </div>
              </div>

              {/* Top Row Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-gray-250 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-500">Índice GSC Estimado</span>
                    <BarChart3 className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black font-mono text-gray-910">{simulatedRate}%</p>
                    <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded border ${phaseColor}`}>
                      {currentPhaseName.split('(')[0]}
                    </span>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-250 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-500">Páginas Indexáveis</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black font-mono text-gray-910">{totalIndexable} <span className="text-xs text-gray-400 font-medium font-sans">/ {totalPagesInSystem}</span></p>
                    <p className="text-[10px] text-gray-500 font-bold">
                      {Math.round((totalIndexable / totalPagesInSystem) * 100)}% de eficiência técnica liberada
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-250 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-500 font-bold">URLs Filtradas (noindex)</span>
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black font-mono text-yellow-600">{totalPagesInSystem - totalIndexable}</p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Proteção tática contra algoritmos de Spam Local
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-250 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-[10px] uppercase font-mono font-black tracking-wider text-gray-500">Crawler Health Status</span>
                    <Signal className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xl font-black font-mono ${isAlertTriggered ? 'text-red-650' : 'text-green-700'}`}>
                      {isAlertTriggered ? '🚨 ALERTA (<70%)' : '🟢 ESTÁVEL'}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold leading-tight">
                      {isAlertTriggered ? 'Confiança algorítmica baixa! Alerta disparado.' : 'Comportamento de excelência. Risco de spam zero.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Controller (Live Sandbox) */}
              <div className="bg-white border-2 border-gray-250 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-base font-black text-gray-900 uppercase font-mono flex items-center justify-center sm:justify-start gap-1.5">
                    <Settings2 className="w-5 h-5 text-yellow-500" />
                    Simulador e Provocador de Indexação do Google Search Console
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    Arraste o controle deslizante para simular o progresso do Google na indexação das páginas de bairros e municípios de Curitiba. Isso altera instantaneamente as tags e links do sitemap.
                  </p>
                </div>

                {/* Range input */}
                <div className="space-y-3 bg-gray-50 border border-gray-150 p-6 rounded-2xl shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black font-mono uppercase tracking-wider">
                    <span className="text-gray-400">Taxa Inicial (Phase 1)</span>
                    <span className="text-gray-900 bg-white border border-gray-300 px-3 py-1.5 rounded-xl block text-sm shadow">
                      Simulado GSC: <strong className="text-blue-600 ml-1">{simulatedRate}%</strong>
                    </span>
                    <span className="text-gray-400 font-bold">Modo Enterprise (100%)</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    step="5" 
                    value={simulatedRate} 
                    onChange={handleSliderChange}
                    className="w-full accent-blue-600 block h-2.5 bg-gray-200 rounded-lg cursor-ew-resize opacity-90"
                    id="admin-slider-gsc"
                  />
                  <div className="grid grid-cols-3 text-center text-[10px] text-gray-500 uppercase font-mono font-black pt-3">
                    <div className="text-left">
                      <p className="text-gray-700">Fase 1 (10% - 79%)</p>
                      <p className="font-medium text-[9px] text-gray-400">Somente Bairros (20) & Cidades (5) Principais</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Fase 2 (80% - 89%)</p>
                      <p className="font-medium text-[9px] text-gray-400">+20 Bairros & +5 Cidades pSEO adicionados</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-700">Fase 3 (&ge;90%)</p>
                      <p className="font-medium text-[9px] text-gray-400">Liberação Completa (Aros, Carros e RMC completo)</p>
                    </div>
                  </div>
                </div>

                {/* Simulated alert banner */}
                {isAlertTriggered && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 space-y-2 text-xs">
                    <h5 className="font-black flex items-center gap-1.5 uppercase font-mono text-xs text-red-650">
                      <AlertCircle className="w-4 h-4 text-red-650" />
                      GSC Monitor Alerta: Alarme de Confiança Baixa
                    </h5>
                    <p className="font-semibold leading-relaxed">
                      ALERTA AUTOMÁTICO: A taxa de indexação atual simulada caiu abaixo do limite de segurança recomendado de <strong>70%</strong>. Baixo ranqueamento de páginas locais sem proteção tática noindex induz o crawler do Google a considerar as landings como "Páginas Úteis Duplicadas", reduzindo drasticamente o orçamento tático de rastreamento do Carplus CWB.
                    </p>
                  </div>
                )}
              </div>

              {/* Section row: GBP copywriter post & live view of pages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                {/* 1. GBP Weekly Post copy writer */}
                <div className="bg-white border-2 border-gray-250 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between h-full min-h-[460px]">
                  <div className="space-y-3">
                    <span className="bg-[#f49e1a]/15 text-gray-950 font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                      Google Meu Negócio (GBP) Integration
                    </span>
                    <h3 className="text-base font-black text-gray-950 uppercase font-mono flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Gerador de Postagens Semanal pSEO
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      Com o intuito de estabelecer autoridade nas landings liberadas em ondas, o algoritmo recomenda postar nos canais oficiais do Perfil da Empresa no Google de forma semanal linkando de volta para landings ativas (com robots index)!
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4.5 space-y-3 text-xs mt-4">
                    {currentGbpPost ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-250 pb-2">
                          <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest">
                            Landing Selecionada: <strong className="text-gray-800 font-black">{currentGbpPost.pageName}</strong>
                          </span>
                          <span className="text-[9px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-black uppercase font-mono">
                            Released / Ativo
                          </span>
                        </div>
                        <pre className="text-[11px] text-gray-750 font-sans font-bold leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto select-all cursor-pointer border border-gray-150 p-3 rounded-lg bg-white shadow-inner">
                          {currentGbpPost.text}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400 space-y-2">
                        <FileText className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="font-extrabold text-xs">Nenhum post gerado ainda</p>
                        <p className="text-[10px] font-medium">Clique no botão abaixo para gerar uma recomendação.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={generateWeeklyRecommendation}
                      className="flex-1 bg-[#f49e1a] hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border-2 border-black transition cursor-pointer text-center"
                    >
                      Sortear & Gerar Post Semanal
                    </button>
                    {currentGbpPost && (
                      <button
                        onClick={handleCopyGbp}
                        className="bg-gray-950 hover:bg-gray-850 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4.5 rounded-xl transition cursor-pointer shrink-0 border-2 border-transparent"
                      >
                        {copySuccess || "Copiar Texto"}
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Live Page index map (The Interactive Index Mapper list) */}
                <div className="bg-white border-2 border-gray-250 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between h-full min-h-[460px]">
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-gray-950 uppercase font-mono flex items-center gap-1.5">
                      <Map className="w-5 h-5 text-blue-500" />
                      Mapeador Dinâmico de Landings
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      Visualize instantaneamente de forma tática o status de indexação de cada uma das landing pages cadastradas com base no índice simulado do GSC.
                    </p>
                  </div>

                  {/* List Sub Tabs */}
                  <div className="grid grid-cols-4 gap-1.5 bg-gray-100 p-1 rounded-xl mt-4 border border-gray-200">
                    {(['bairro', 'cidade', 'carro', 'aro'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveListTab(tab)}
                        className={`py-1.5 px-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition shrink-0 cursor-pointer ${activeListTab === tab ? 'bg-white text-gray-950 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        {tab === 'bairro' ? 'Bairros' : tab === 'cidade' ? 'Cidades' : tab === 'carro' ? 'Carros' : 'Aros'}
                      </button>
                    ))}
                  </div>

                  {/* Search / Status Filter header */}
                  <div className="border border-gray-150 rounded-2xl max-h-76 overflow-y-auto mt-4 bg-white shadow-inner divide-y divide-gray-150">
                    {getDisplayList().map(name => {
                      const score = calculateLocalScore(name, activeListTab);
                      const isReleased = isPageReleased(name, activeListTab, simulatedRate);
                      const isPriority = activeListTab === 'bairro' ? PRIORITY_NEIGHBORHOODS.includes(name) : activeListTab === 'cidade' ? PRIORITY_CITIES.includes(name) : false;

                      return (
                        <div key={name} className="flex items-center justify-between p-3.5 hover:bg-gray-50/50 transition">
                          <div className="space-y-1">
                            <span className="text-xs font-black text-gray-850 tracking-tight flex items-center gap-1">
                              {name}
                              {isPriority && (
                                <span className="bg-yellow-500/15 text-yellow-600 font-mono font-black text-[7px] uppercase px-1 rounded border border-yellow-500/15">
                                  Priority
                                </span>
                              )}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-black font-mono">
                              Score: <strong className="text-gray-650 font-bold">{score}</strong> • Volume: {score > 85 ? 'Excelente' : 'Bom'} • Proximidade: {score > 90 ? 'Extrema' : 'Sede RMC'}
                            </span>
                          </div>

                          <div>
                            {isReleased ? (
                              <span className="text-[9px] font-black uppercase font-mono tracking-widest text-green-700 bg-green-50/50 border border-green-200 px-2.5 py-1 rounded-xl">
                                index, follow
                              </span>
                            ) : (
                              <span className="text-[9px] font-black uppercase font-mono tracking-widest text-yellow-700 bg-yellow-50/50 border border-yellow-250 px-2.5 py-1 rounded-xl">
                                noindex, follow
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          );
        })()}

        {/* VIEW: SEO DYNAMIC LANDING PAGE */}
        {view === 'seo-landing' && seoTarget && (() => {
          const sampleSearched = getMostSearchedTires(seoTarget.name, seoTarget.type);
          const isAro = seoTarget.type === 'aro';
          const isCarro = seoTarget.type === 'carro';

          let targetTires: any[] = [];
          let ratioText = '';

          if (isAro) {
            const extracted = seoTarget.name.match(/\d+/);
            const targetRim = extracted ? parseInt(extracted[0]) : null;
            targetTires = targetRim ? TIRES_DATA.filter(t => t.rim === targetRim) : [];
          } else if (isCarro) {
            const normalizedCarName = seoTarget.name.toLowerCase();
            const matchedCar = CAR_MODELS_DATA.find(c => 
              normalizedCarName.includes(c.name.toLowerCase()) || 
              c.name.toLowerCase().includes(normalizedCarName) ||
              normalizedCarName.includes(c.brand.toLowerCase() + " " + c.name.toLowerCase())
            );
            if (matchedCar) {
              const ratio = matchedCar.recommendedTireRatio;
              ratioText = ratio;
              const parts = ratio.split('/');
              if (parts.length >= 3) {
                const [w, a, r] = parts.map(Number);
                targetTires = TIRES_DATA.filter(t => t.width === w && t.aspectRatio === a && t.rim === r);
              }
            }
          } else {
            // Curated offers for local neighborhoods or cities
            targetTires = TIRES_DATA.filter(t => t.isOffer).slice(0, 8);
          }

          if (isCarro && targetTires.length === 0 && ratioText) {
            const parts = ratioText.split('/');
            if (parts.length >= 3) {
              const r = parseInt(parts[2]);
              targetTires = TIRES_DATA.filter(t => t.rim === r);
            }
          }

          const localFaq = [
            {
              q: `A Carplus Pneus realmente atende moradores de ${seoTarget.name}?`,
              a: `Sim, atendemos todos os condutores da região de ${seoTarget.name} com montagem gratuita de pneus adquiridos aqui no portal, oferecendo também a substituição das válvulas (bicos de borracha comum) sem nenhuma cobrança de mão de obra adicional.`
            },
            {
              q: `Como faço para chegar de ${seoTarget.name} até a loja no Portão?`,
              a: `O percurso de carro saindo de ${seoTarget.name} dura pouquíssimos minutos. A distância estimada é de aproximadamente ${getRouteInstructions(seoTarget.name, seoTarget.type).distance} e o tempo estimado de percurso é de cerca de ${getRouteInstructions(seoTarget.name, seoTarget.type).time} de carro, seguindo as indicações do roteiro prático e de fácil acesso listado em nosso painel.`
            },
            {
              q: "Quais são as marcas de pneus novos disponíveis em estoque?",
              a: "Contamos com estoque à pronta entrega de grandes fabricantes de renome internacional com certificação completa do INMETRO, tais como Pirelli, Bridgestone, Michelin, Goodyear, Firestone, Dunlop, Delinte, Comforser e Xbri."
            },
            {
              q: "Como funciona a garantia de 5 anos das borrachas?",
              a: "Todos os pneus novos comercializados na Carplus possuem garantia de fábrica estendida de cinco anos contra eventuais imperfeições estruturais ou vícios de fundição. No ato da sua montagem, nossos técnicos ainda realizam um teste de suspensão preventivo totalmente gratuito."
            },
            {
              q: "Como reservo o pneu e quando realiza o pagamento?",
              a: "A reserva das unidades é efetuada totalmente online sem custos adicionais. Você não faz nenhum pagamento digital no site. O agendamento é sincronizado direto com nosso WhatsApp comercial e você só paga na nossa recepção física após os pneus estarem devidamente instalados no carro."
            }
          ];

          const CARPLUS_GALLERY = [
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/fachada-logo.webp', label: 'Fachada Principal Carplus Arthur Bernardes' },
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/loja-de-pneus-portao-curitiba-pirelli.png', label: 'Expositores Oficiais e Showroom Pirelli' },
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/alinhamento-jeep.webp', label: 'Rampa de Alinhamento e Geometria 3D' },
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanicos-trabalho.webp', label: 'Técnicos Mecânicos Treinados em Ação' },
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/troca-pneu.webp', label: 'Troca de Pneus e Balanceamento Preciso' },
            { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/escritorio.webp', label: 'Sala de Espera e Escritório do Cliente' }
          ];

          return (
            <div className="space-y-8 animate-fade-in" id="view-seo-landing">
              
              {/* Dynamic content rendering with Premium Hero Carousel (Pure White / Crisp Style) */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-gray-900" id="seo-hero-whitesection">
                
                {/* Hero section splits in two */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-200 pb-8">
                  <div className="lg:col-span-7 space-y-4 text-center sm:text-left">
                    <span className="bg-yellow-500/15 text-gray-900 border border-[#f49e1a]/35 font-mono font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
                      {seoTarget.type === 'bairro' ? 'Bairro / Região de Curitiba' : 
                       seoTarget.type === 'cidade' ? 'Município Região Metropolitana (RMC)' : 
                       seoTarget.type === 'aro' ? 'Medida de Roda Especial (Aros)' : 
                       'Guia Homologado de Automóvel'}
                    </span>
                    
                    <h2 className="text-2xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight leading-tight select-none">
                      {seoTarget.type === 'bairro' && `Pneus em Curitiba - Bairro ${seoTarget.name}`}
                      {seoTarget.type === 'cidade' && `Pneus na Região Metropolitana - Fácil Acesso em ${seoTarget.name}`}
                      {seoTarget.type === 'aro' && `Pneus de Alta Tração ${seoTarget.name} em Curitiba`}
                      {seoTarget.type === 'carro' && `Pneus Homologados Originais para ${seoTarget.name}`}
                    </h2>
                    
                    <p className="text-xs text-yellow-600 uppercase font-mono font-black tracking-wider">
                      Serviços de Troca de Pneus, Alinhamento 3D e Freios para condutores de {seoTarget.name}
                    </p>

                    <div className="space-y-4 text-xs sm:text-sm text-gray-650 text-justify leading-relaxed font-semibold">
                      <p>
                        A <strong className="text-gray-900">Carplus Pneus</strong> é uma referência histórica em mecânica expressa e reposição de borrachas homologadas que atende com maestria moradores do bairro ou região de <strong className="text-yellow-650">{seoTarget.name}</strong> há mais de <strong className="text-gray-905 font-mono">35 anos de atuação comercial sólida em Curitiba</strong>.
                      </p>
                      <p>
                        Oferecemos um portfólio completo com as melhores marcas mundiais em estoque (Bridgestone, Michelin, Pirelli, Dunlop e muito mais). Todos os pneus comprados em nosso portal já incluem montagem técnica gratuita e troca de bicos mágicos em nossa sede na Arthur Bernardes. Contamos com técnicos qualificados para cuidar do seu automóvel.
                      </p>
                    </div>
                  </div>

                  {/* Spotlight Offers premium animated container - Styled to White/Grey */}
                  <div className="lg:col-span-5 bg-gray-50 border border-gray-250 p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[360px] shadow-sm">
                    <div className="absolute top-0 right-0 bg-[#f49e1a] text-gray-950 font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl font-mono flex items-center gap-1 z-10 border-b border-l border-gray-300">
                      <Flame className="w-3 h-3 animate-pulse text-gray-950" />
                      <span>Oferta Especial Local</span>
                    </div>

                    {offersOnSale.length > 0 && (
                      <div className="relative flex-grow flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                          {offersOnSale.map((t, idx) => {
                            if (idx !== activeOfferIdx) return null;
                            return (
                              <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col justify-between h-full pt-4"
                              >
                                <div className="flex justify-center flex-grow items-center bg-white rounded-2xl p-2 border border-gray-200">
                                  <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="h-28 object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="text-center mt-3 space-y-0.5">
                                  <span className="text-[10px] text-yellow-600 font-mono tracking-widest font-black uppercase">
                                    {t.brand}
                                  </span>
                                  <h4 className="text-gray-900 font-black text-xs uppercase truncate max-w-xs mx-auto">
                                    {t.name}
                                  </h4>
                                  <div className="flex items-center justify-center gap-2 mt-1">
                                    {t.promoPrice ? (
                                      <>
                                        <span className="line-through text-[10px] text-gray-400 font-mono font-bold">
                                          R$ {t.price.toFixed(2)}
                                        </span>
                                        <span className="text-lg font-black text-black font-mono">
                                          R$ {t.promoPrice.toFixed(2)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-base font-black text-gray-950 font-mono">
                                        R$ {t.price.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="pt-3">
                                  <a
                                    href={formatWhatsApp(`Olá Carplus! Vi a Oferta Especial de ${t.name} nas buscas do bairro/cidade ${seoTarget.name} e gostaria de reservá-lo para instalação inclusa.`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gray-950 hover:bg-yellow-500 text-[#f49e1a] hover:text-gray-950 font-black py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition text-center block cursor-pointer border border-black shadow-sm"
                                  >
                                    Reservar Pneu em Oferta
                                  </a>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-1.5 mt-2 z-10">
                      {offersOnSale.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setActiveOfferIdx(dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                            dotIdx === activeOfferIdx ? 'bg-yellow-600 w-3' : 'bg-gray-300'
                          }`}
                          aria-label={`Slide ${dotIdx}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specific local most searched tires section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                    Pneus Mais Procurados localmente por condutores em {seoTarget.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    Abaixo listamos as medidas de pneus novos e marcas homologadas que apresentam campeões históricos de buscas para veículos residindo ou circulando em {seoTarget.name}:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sampleSearched.map((p, idx) => (
                      <div key={idx} className="bg-white border-2 border-gray-150 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-sm">
                        <div>
                          <span className="text-yellow-650 bg-yellow-500/10 font-mono font-black text-[9px] uppercase px-2 py-0.5 rounded border border-yellow-500/25 inline-block">
                            {p.category}
                          </span>
                          <h5 className="text-gray-900 font-black text-sm uppercase mt-2 font-display">
                            Medida Ideal: {p.medida}
                          </h5>
                          <p className="text-[11px] text-gray-550 mt-1.5 text-justify leading-relaxed font-semibold">
                            {p.motivo}
                          </p>
                          {p.sugestao && (
                            <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase">
                              Sugestão de Estoque: <strong className="text-gray-900 font-extrabold">{p.sugestao.brand} {p.sugestao.model}</strong>
                            </p>
                          )}
                        </div>

                        <a 
                          href={formatWhatsApp(`Olá Carplus! Gostaria de consultar preços de pneus na medida ${p.medida} para meu carro, sabendo do guia mais buscado do bairro/localidade ${seoTarget.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#1e2026] hover:bg-yellow-500 hover:text-gray-950 text-[#f49e1a] font-black border border-black py-2 rounded-xl text-[10px] uppercase tracking-wider text-center transition cursor-pointer"
                        >
                          Consultar Preço da Medida
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MATCHING REAL TIRES DYNAMIC CATALOG GRID */}
                <div className="space-y-4 border-t border-gray-150 pt-7">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      {isAro && (
                        <>
                          <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                            Estoque Imediato no {seoTarget.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Abaixo listamos todos os modelos de pneus novos nacionais e importados de **{seoTarget.name}** disponíveis em Curitiba:
                          </p>
                        </>
                      )}
                      {isCarro && (
                        <>
                          <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                            Pneus Compatíveis com {seoTarget.name} {ratioText ? `(${ratioText})` : ''}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Veja os pneus novos no estoque correspondentes à medida oficial ou compatíveis do seu carro:
                          </p>
                        </>
                      )}
                      {!isAro && !isCarro && (
                        <>
                          <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                            Destaques em Oferta com Instalação Grátis em {seoTarget.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Pneus novos com montagem inclusa e troca de bicos grátis para motoristas de {seoTarget.name}:
                          </p>
                        </>
                      )}
                    </div>
                    <span className="font-mono text-[10px] bg-[#f49e1a]/15 text-yellow-650 font-black px-2.5 py-1 rounded border border-[#f49e1a]/30 uppercase shrink-0">
                      {targetTires.length} Pneus em Estoque
                    </span>
                  </div>

                  {targetTires.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="seo-page-tire-grid">
                      {targetTires.map((t) => (
                        <div key={t.id} className="h-full">
                          <TireCard 
                            tire={t}
                            onAddToCart={(tire, qty) => {
                              if (onAddToCart) {
                                onAddToCart(tire, qty);
                              } else {
                                const whatsappUrl = `https://wa.me/5541999999999?text=Olá%20Carplus!%20Gostaria%20de%20reservar%20${qty}%20unidades%20do%20pneu%20${encodeURIComponent(tire.name)}%20com%20instalação%20grátis%252c%20vi%20na%20página%20de%20${encodeURIComponent(seoTarget.name)}.`;
                                window.open(whatsappUrl, '_blank');
                              }
                            }}
                            onSelectTire={(tire) => {
                              if (onSelectTire) {
                                onSelectTire(tire);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-500/5 border border-[#f49e1a]/15 p-6 rounded-2xl text-center space-y-2">
                       <p className="text-xs font-black text-gray-900 uppercase">Gama Completa Sob Demanda</p>
                       <p className="text-[11px] text-gray-600 max-w-md mx-auto leading-relaxed">
                         Não localizamos unidades de estoque imediato para esta medida específica agora, mas podemos importar e faturar direto do atacado em até 24 horas, mantendo a instalação gratuita no Portão!
                       </p>
                       <a 
                         href={formatWhatsApp(`Olá Carplus! Gostaria de consultar pneu para meu veículo ${seoTarget.name}, que vi na página do site.`)}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-block bg-black text-white hover:bg-[#f49e1a] hover:text-black font-mono font-black text-[10px] uppercase tracking-wider py-2 px-4 rounded-xl transition cursor-pointer" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                       >
                         Consultar Medida Personalizada ➔
                       </a>
                    </div>
                  )}
                </div>

                {/* Route instructions box - percurso */}
                <div className="bg-gray-50 border border-gray-150 p-5 rounded-2xl space-y-3.5 font-sans shadow-inner text-gray-900">
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                    <Navigation className="w-5 h-5 text-yellow-600 shrink-0" />
                    <h4 className="text-sm font-black text-gray-950 uppercase tracking-widest font-mono">Percurso Recomendado até a Unidade Carplus Portão</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <p className="text-[10px] text-gray-400 uppercase font-mono font-bold">Origem da Partida</p>
                      <p className="font-extrabold text-gray-900 uppercase mt-0.5">{seoTarget.name}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                      <p className="text-[10px] text-gray-400 uppercase font-mono font-bold">Distância Estimada</p>
                      <p className="font-black text-yellow-650 font-mono text-sm mt-0.5">
                        {getRouteInstructions(seoTarget.name, seoTarget.type).distance}
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 border border-[#f49e1a]/20 p-3 rounded-xl">
                      <p className="text-[10px] text-yellow-650 uppercase font-mono font-extrabold">Tempo Médio de Carro</p>
                      <p className="font-black text-yellow-650 font-mono text-sm mt-0.5">
                        {getRouteInstructions(seoTarget.name, seoTarget.type).time}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-700 leading-relaxed text-justify bg-white p-3.5 rounded-xl border border-gray-200 uppercase font-mono font-bold shadow-sm">
                    <strong className="text-gray-900 block uppercase text-[10px] tracking-wider mb-2 font-sans font-black">Passo a passo do percurso:</strong>
                    {getRouteInstructions(seoTarget.name, seoTarget.type).route}
                  </div>

                  <div className="text-[10px] text-gray-500 text-justify flex items-start gap-1.5 font-medium leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-[#f49e1a] shrink-0 mt-0.5" />
                    <p>
                      <strong>Atenção:</strong> Siga com segurança, respeitando as faixas exclusivas dos ônibus expressos biarticulados nas canaletas de Curitiba. Estamos localizados na Avenida Arthur Bernardes, uma avenida de super fácil acesso, com pátio amplo para manobras de veículos médios, caminhonetes ou SUVs.
                    </p>
                  </div>
                </div>

                {/* Real photo gallery showcasing Carplus workshop */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                    Estrutura Física Carplus: Nossa Loja em Curitiba
                  </h4>
                  <p className="text-xs text-gray-600">
                    Veja fotos reais de nossa infraestrutura na Unidade Portão, equipada com rampas computadorizadas de Alinhamento 3D:
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {CARPLUS_GALLERY.map((img, idx) => (
                      <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition">
                        <img 
                          src={img.url} 
                          alt={img.label}
                          className="h-40 w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent flex items-end p-2 sm:p-3">
                          <p className="text-[10px] font-bold text-white uppercase tracking-wide truncate w-full">
                            {img.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advantages highlighted list */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-gray-950 uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none font-mono">
                    Vantagens em Escolher a Carplus Pneus
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "35 Anos de Tradição de Mercado", desc: "Desde 1991 garantindo honestidade e precisão no orçamento, sem forçar reparos indesejados." },
                      { title: "Técnicos Treinados e Habilitados", desc: "Troca e alinhamento com bicos novos, calibragem computadorizada e testes corretos de rolagem." },
                      { title: "Geometria 3D e Alinhamento Preciso", desc: "Nossos equipamentos ajustam os eixos de cambagem seguindo as especificações exatas do seu modelo." },
                      { title: "Maior Nota de Aprovação no Google Mapas", desc: "Reconhecimento comprovado e real no mapa de Curitiba, com milhares de clientes satisfeitos recomendando." },
                      { title: "Facilidade de Pagamento Presencial", desc: "Parcele tudo em até 10x sem juros no cartão de crédito físico diretamente na nossa entrega técnica." },
                      { title: "Melhor Medida com Nota INMETRO", desc: "Segurança total em curvas sob pista molhada no inverno característico de Curitiba." }
                    ].map((adv, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex gap-3 shadow-inner">
                        <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-extrabold text-gray-905 text-xs uppercase">{adv.title}</h5>
                          <p className="text-[11px] text-gray-600 mt-1 text-justify leading-relaxed font-semibold">{adv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local FAQ Accordion container */}
                <div className="space-y-4 border-t border-gray-200 pt-6 text-gray-900">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                    <h4 className="text-sm font-black text-gray-950 uppercase tracking-wider font-mono">Perguntas Frequentes (FAQ) de Atendimento</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Consulte as principais dúvidas sobre frete, agendamento de orçamento online e serviços executados na nossa autocenter:
                  </p>

                  <div className="space-y-2.5">
                    {localFaq.map((faq, idx) => {
                      const isOpen = activeFaqIdx === idx;
                      return (
                        <div key={idx} className="bg-gray-55 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
                          <button
                            onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-4 text-left text-gray-800 hover:text-yellow-650 transition cursor-pointer font-black text-xs sm:text-sm uppercase bg-gray-50"
                          >
                            <span>{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-yellow-500 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-yellow-500 shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="p-4 pt-4 border-t border-gray-200 bg-white text-xs text-gray-600 leading-relaxed text-justify font-semibold">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <CarplusVideosSection />

                {/* Direct Cross-Linking Menu satisfying: 'crie links internos entre as paginas pneus, bairro e cidade e aro e marcas' */}
                <div className="bg-yellow-500/5 border-2 border-dashed border-[#f49e1a]/30 rounded-2xl p-5 sm:p-6 space-y-4 text-gray-900" id="seo-deep-internal-links">
                  <h4 className="text-xs sm:text-sm font-black text-gray-950 uppercase tracking-widest flex items-center gap-2 font-mono">
                    <InfoIcon className="w-4 h-4 text-[#f49e1a] shrink-0" />
                    <span>Rede de Localizações & Navegabilidade de Termos Oficiais</span>
                  </h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Facilitamos a navegação de motoristas e idosos com atalhos diretos entre bairros próximos, principais aros de rodas suportados e marcas de pneus em estoque para Curitiba:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                    
                    {/* Column 1: Bairros Próximos */}
                    <div className="space-y-2.5">
                      <p className="font-extrabold uppercase text-gray-950 border-b border-gray-200 pb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#f49e1a]"></span>
                        Atalhos de Bairros
                      </p>
                      <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700">
                        {['Portão', 'Água Verde', 'CIC', 'Pinheirinho', 'Batel', 'Santa Felicidade'].map((b) => (
                          <button
                            key={b}
                            onClick={() => onSelectSeoTarget({ type: 'bairro', name: b })}
                            className="text-left hover:text-yellow-600 hover:underline transition"
                          >
                            ➔ Pneus no bairro {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Cidades RMC */}
                    <div className="space-y-2.5">
                      <p className="font-extrabold uppercase text-gray-950 border-b border-gray-200 pb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#f49e1a]"></span>
                        Cidades do PR
                      </p>
                      <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700">
                        {['Araucária', 'Colombo', 'Pinhais', 'São José dos Pinhais', 'Fazenda Rio Grande', 'Campo Largo'].map((c) => (
                          <button
                            key={c}
                            onClick={() => onSelectSeoTarget({ type: 'cidade', name: c })}
                            className="text-left hover:text-yellow-600 hover:underline transition"
                          >
                            ➔ Instalação em {c} (RMC)
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Aro do Pneu */}
                    <div className="space-y-2.5">
                      <p className="font-extrabold uppercase text-gray-950 border-b border-gray-200 pb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#f49e1a]"></span>
                        Buscar por Aro
                      </p>
                      <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700">
                        {[13, 14, 15, 16, 17, 18, 19, 20].map((a) => (
                          <button
                            key={a}
                            onClick={() => {
                              if (onSelectRimFromSeo) {
                                onSelectRimFromSeo(a);
                              } else {
                                onSelectSeoTarget({ type: 'aro', name: `Aro ${a}` });
                              }
                            }}
                            className="text-left hover:text-yellow-600 hover:underline transition"
                          >
                            ➔ Ver modelos Aro R{a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 4: Marcas Principais */}
                    <div className="space-y-2.5">
                      <p className="font-extrabold uppercase text-gray-950 border-b border-gray-200 pb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#f49e1a]"></span>
                        Navegar por Marca
                      </p>
                      <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700">
                        {['Bridgestone', 'Pirelli', 'Michelin', 'Continental', 'Goodyear', 'Delinte'].map((brand) => (
                          <button
                            key={brand}
                            onClick={() => {
                              if (onSelectBrandFromSeo) {
                                onSelectBrandFromSeo(brand);
                              } else {
                                onSelectSeoTarget({ type: 'aro', name: brand }); // fallback or similar
                              }
                            }}
                            className="text-left hover:text-yellow-600 hover:underline transition"
                          >
                            ➔ Pneus da {brand} novos
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Actions direct triggers */}
                <div className="bg-gray-150 border-2 border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-inner">
                  <div className="text-center sm:text-left">
                    <h5 className="text-gray-950 font-black leading-tight uppercase text-xs font-mono">Deseja reservar agora seu Pneu com Instalação?</h5>
                    <p className="text-[11px] text-gray-600 mt-1 font-medium">Contate um consultor gratuitamente via chat ou navegue pelo mapa do site completo.</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onNavigateToPage('mapa-do-site');
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300 font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Outros Bairros / Mapa
                    </button>
                    <a
                      href={formatWhatsApp(`Olá Carplus Pneus! Agendei a reserva do trajeto saindo de ${seoTarget.name} e gostaria de confirmar dia/hora para montagem inclusa gratuita.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#f49e1a] hover:bg-yellow-400 text-gray-950 font-black text-xs uppercase px-5 py-2.5 rounded-xl transition border border-black flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reservar Agora</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>

      {/* MODAL 1: WHEEL SERVICE DETAILS */}
      <AnimatePresence>
        {selectedWheelService && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans select-none" id="modal-wheel-service-detail">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden max-w-2xl w-full"
            >
              <div className="relative h-64 sm:h-72 bg-gray-900 border-b border-gray-200">
                <img 
                  src={selectedWheelService.image} 
                  alt={selectedWheelService.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedWheelService(null)}
                  className="absolute top-4 right-4 bg-gray-950/75 text-white hover:bg-yellow-500 hover:text-gray-950 p-2.5 rounded-full transition shadow-lg shrink-0 cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 rounded-xl text-white">
                  <span className="bg-yellow-500 text-gray-950 font-mono font-black text-[9px] uppercase px-2.5 py-1 rounded inline-block">
                    {selectedWheelService.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black uppercase mt-1 text-yellow-500 font-mono">
                    {selectedWheelService.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider font-mono">
                    Como é feito o Serviço?
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify font-medium">
                    {selectedWheelService.details}
                  </p>
                </div>

                <div className="border-t border-gray-150 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] uppercase font-mono font-black text-yellow-600 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Equipe Carplus Pneus
                    </h5>
                    <p className="text-[11px] text-gray-650 leading-relaxed text-justify font-bold">
                      {selectedWheelService.team}
                    </p>
                  </div>
                  
                  <div className="space-y-1.5 bg-gray-50 p-3.5 rounded-xl border border-gray-150">
                    <h5 className="text-[10px] uppercase font-mono font-black text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Prazo & Execução
                    </h5>
                    <p className="text-[11px] text-gray-700 font-extrabold">
                      {selectedWheelService.time}
                    </p>
                    <p className="text-[9px] text-gray-400 font-medium">Agende sua avaliação gratuita em Curitiba!</p>
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="border-t border-gray-150 pt-4 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setSelectedWheelService(null)}
                    className="text-gray-400 hover:text-gray-600 font-extrabold text-xs uppercase px-4 py-2 rounded transition cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                  <a 
                    href={formatWhatsApp(`Olá Carplus Curitiba! Li os detalhes do serviço técnico de "${selectedWheelService.title}" e gostaria de agendar uma vistoria imediata das minhas rodas de liga leve.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow cursor-pointer border border-black"
                  >
                    Agendar / WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CARPLUS GALLERY AND TEAM DETAILS */}
      <AnimatePresence>
        {selectedGalleryStep && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans select-none" id="modal-gallery-step-detail">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden max-w-2xl w-full"
            >
              <div className="relative h-64 sm:h-72 bg-gray-900 border-b border-gray-200">
                <img 
                  src={selectedGalleryStep.image} 
                  alt={selectedGalleryStep.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedGalleryStep(null)}
                  className="absolute top-4 right-4 bg-gray-950/75 text-white hover:bg-yellow-500 hover:text-gray-950 p-2.5 rounded-full transition shadow-lg shrink-0 cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 rounded-xl text-white">
                  <span className="bg-yellow-500 text-gray-950 font-mono font-black text-[9px] uppercase px-2.5 py-1 rounded inline-block">
                    {selectedGalleryStep.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black uppercase mt-1 text-yellow-500 font-mono">
                    {selectedGalleryStep.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider font-mono">
                    Compromisso Técnico & Detalhes
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify font-medium">
                    {selectedGalleryStep.details}
                  </p>
                </div>

                <div className="border-t border-gray-150 pt-4">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] uppercase font-mono font-black text-yellow-600 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Nossa Equipe de Pista na Loja do Portão
                    </h5>
                    <p className="text-[11px] text-gray-750 leading-relaxed text-justify font-bold bg-gray-50 border border-gray-150 p-3.5 rounded-xl">
                      {selectedGalleryStep.team}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-150 pt-4 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setSelectedGalleryStep(null)}
                    className="text-gray-400 hover:text-gray-600 font-extrabold text-xs uppercase px-4 py-2 rounded transition cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                  <a 
                    href={formatWhatsApp(`Olá Carplus Curitiba! Vi a foto da equipe técnica sobre "${selectedGalleryStep.title}" e gostaria de marcar uma revisão mecânica na Arthur Bernardes.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow cursor-pointer border border-black"
                  >
                    Agendar Revisão Gratuita
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
