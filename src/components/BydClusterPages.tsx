import React, { useState } from 'react';
import { 
  Award, Shield, Check, Phone, MapPin, Zap, TrendingUp, 
  ShoppingBag, Flame, ThumbsUp, MessageSquare, CornerDownRight,
  ArrowRight, Sparkles, Scale, Info, HelpCircle, ChevronRight, CheckCircle,
  Car, Wrench, AlertTriangle, Disc, Gauge, Clock, ChevronDown, ChevronUp,
  Tag, Calendar, ExternalLink
} from 'lucide-react';
import { TIRES_DATA } from '../data';
import TireCard from './TireCard';
import { Tire } from '../types';

export type BydClusterView = 
  | 'pneus-byd-curitiba'
  | 'pneu-byd-dolphin-curitiba'
  | 'pneu-byd-dolphin-mini-curitiba'
  | 'pneu-byd-dolphin-gs-curitiba'
  | 'pneu-byd-king-curitiba'
  | 'pneu-175-55-r16-curitiba'
  | 'pneu-195-60-r16-curitiba'
  | 'pneu-205-50-r17-curitiba'
  | 'pneu-215-55-r17-curitiba'
  | 'pneu-225-60-r16-curitiba';

interface BydClusterPagesProps {
  view: BydClusterView;
  onNavigateHome: () => void;
  onNavigateToPage?: (page: string) => void;
  onAddToCart?: (tire: Tire, quantity: number) => void;
  onShowTireDetail?: (tire: Tire) => void;
}

export default function BydClusterPages({
  view,
  onNavigateHome,
  onNavigateToPage,
  onAddToCart,
  onShowTireDetail
}: BydClusterPagesProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNav = (targetPath: string) => {
    const cleanPath = targetPath.replace(/^\//, '');
    if (cleanPath === '' || cleanPath === 'home') {
      onNavigateHome();
      window.history.pushState(null, '', '/');
    } else if (onNavigateToPage) {
      onNavigateToPage(cleanPath);
      window.history.pushState(null, '', `/${cleanPath}`);
    } else {
      window.location.href = `/${cleanPath}`;
    }
  };

  const formatWhatsAppUrl = (msg: string) => {
    return `https://wa.me/554130827282?text=${encodeURIComponent(msg)}`;
  };

  // Helper to filter matching tires in catalog
  const getMatchingTires = (width: number, aspect: number, rim: number) => {
    return TIRES_DATA.filter(t => t.width === width && t.aspectRatio === aspect && t.rim === rim);
  };

  // Common warning text
  const manualWarning = "Consulte a medida indicada no pneu instalado, etiqueta do veículo e manual do proprietário antes da substituição. A medida pode variar conforme versão e ano do veículo.";

  // RENDER: HUB PRINCIPAL /pneus-byd-curitiba
  if (view === 'pneus-byd-curitiba') {
    const tires16 = getMatchingTires(175, 55, 16);
    const tires17Dolphin = getMatchingTires(205, 50, 17);
    const tires17King = getMatchingTires(215, 55, 17);
    const allBydRelatedTires = [...tires16, ...tires17Dolphin, ...tires17King];

    return (
      <div className="bg-gray-50 min-h-screen pb-16 font-sans text-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-600 flex items-center gap-2 overflow-x-auto">
            <button onClick={() => handleNav('/')} className="hover:text-gray-950 font-medium">Início</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button onClick={() => handleNav('/carro/byd')} className="hover:text-gray-950 font-medium">BYD</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold">Pneus BYD Curitiba</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-900 via-gray-925 to-gray-950 text-white py-12 px-4 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#f49e1a]/20 border border-[#f49e1a]/40 text-[#f49e1a] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Veículos Elétricos & Híbridos em Curitiba
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-white leading-tight">
              Pneus para BYD em Curitiba: Dolphin, Dolphin Mini, Dolphin GS, King e outros modelos
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Consulte medidas, especificações técnicas e disponibilidade de pneus para a linha de veículos BYD na Carplus Pneus no bairro Portão. Pneus novos com garantia de fábrica, bicos de borracha inclusos e montagem técnica de precisão.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={formatWhatsAppUrl("Olá! Gostaria de consultar preço e disponibilidade de pneus para meu BYD em Curitiba.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Consultar Preço e Estoque no WhatsApp
              </a>
              <button
                onClick={() => handleNav('/alinhamento-3d-curitiba')}
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#f49e1a]" /> Alinhamento 3D para BYD
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
          
          {/* Factual Disclaimer Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block uppercase font-mono text-xs">Aviso importante de especificação técnica:</strong>
              <p className="mt-0.5 leading-relaxed">{manualWarning}</p>
            </div>
          </div>

          {/* Core Section: Qual pneu o BYD usa? */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f49e1a]">Tabela de Aplicações Técnicas</span>
              <h2 className="text-xl sm:text-2xl font-black font-mono text-gray-950 uppercase mt-1">
                Qual pneu o BYD usa?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Confira as medidas e aros indicados na documentação técnica dos principais modelos BYD comercializados no Brasil:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card Dolphin Mini */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-gray-400 transition space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      Compacto 100% Elétrico
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">Aro 16</span>
                  </div>
                  <h3 className="text-lg font-black font-mono text-gray-950">BYD Dolphin Mini</h3>
                  <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl space-y-1">
                    <p className="text-[11px] text-gray-500 font-medium">Medida oficial de especificação:</p>
                    <p className="text-base font-extrabold font-mono text-gray-950">175/55 R16 80H</p>
                  </div>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    Pneu com perfil voltado para eficiência energética e baixa resistência ao rolamento.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleNav('/pneu-175-55-r16-curitiba')}
                    className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    Ver Pneus 175/55 R16 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleNav('/pneu-byd-dolphin-mini-curitiba')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-xl transition"
                  >
                    Detalhes do Dolphin Mini
                  </button>
                </div>
              </div>

              {/* Card Dolphin / Dolphin GS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-gray-400 transition space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      Hatch EV
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">Aro 16 / 17</span>
                  </div>
                  <h3 className="text-lg font-black font-mono text-gray-950">BYD Dolphin / Dolphin GS</h3>
                  <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl space-y-1">
                    <p className="text-[11px] text-gray-500 font-medium">Medidas conforme versão/ano:</p>
                    <p className="text-base font-extrabold font-mono text-gray-950">205/50 R17 (Aro 17)</p>
                    <p className="text-xs font-bold font-mono text-gray-700">195/60 R16 (Aro 16)</p>
                  </div>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    Existem configurações da família Dolphin com rodas aro 17 e aro 16.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleNav('/pneu-205-50-r17-curitiba')}
                    className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    Ver Pneus 205/50 R17 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleNav('/pneu-byd-dolphin-curitiba')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-xl transition"
                  >
                    Detalhes do Dolphin
                  </button>
                </div>
              </div>

              {/* Card King */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-gray-400 transition space-y-4 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      Sedã Híbrido Plug-in (DM-i)
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">Aro 16 / 17</span>
                  </div>
                  <h3 className="text-lg font-black font-mono text-gray-950">BYD King</h3>
                  <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl space-y-1">
                    <p className="text-[11px] text-gray-500 font-medium">Medidas conforme versão/ano:</p>
                    <p className="text-base font-extrabold font-mono text-gray-950">215/55 R17 (Aro 17)</p>
                    <p className="text-xs font-bold font-mono text-gray-700">225/60 R16 (Aro 16)</p>
                  </div>
                  <p className="text-xs text-gray-650 leading-relaxed">
                    A medida 215/55 R17 equipa configurações do BYD King comercializadas no Brasil.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleNav('/pneu-215-55-r17-curitiba')}
                    className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    Ver Pneus 215/55 R17 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleNav('/pneu-byd-king-curitiba')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-xl transition"
                  >
                    Detalhes do BYD King
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Factual Answers Block for GEO / AI Engines */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f49e1a]">Respostas Rápidas & Fatuais</span>
              <h2 className="text-xl sm:text-2xl font-black font-mono text-gray-950">
                Guia Rápido de Dúvidas sobre Pneus BYD em Curitiba
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
              <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                <h3 className="font-black font-mono text-gray-950 uppercase text-xs sm:text-sm">
                  Qual o pneu do BYD Dolphin?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  O BYD Dolphin utiliza predominantemente pneus na medida <strong>205/50 R17</strong> (aro 17) em configurações no Brasil. Algumas documentações da família também contemplam a medida <strong>195/60 R16</strong> (aro 16).
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                <h3 className="font-black font-mono text-gray-950 uppercase text-xs sm:text-sm">
                  Qual a medida do pneu do BYD Dolphin Mini?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A especificação técnica oficial do BYD Dolphin Mini indica pneus na medida <strong>175/55 R16 80H</strong> (aro 16), desenvolvidos com foco em eficiência de rodagem e conforto urbano.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                <h3 className="font-black font-mono text-gray-950 uppercase text-xs sm:text-sm">
                  Qual o pneu do BYD King?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A medida <strong>215/55 R17</strong> (aro 17) é utilizada em configurações do sedã BYD King comercializadas no Brasil. O manual do modelo também contempla a especificação <strong>225/60 R16</strong>.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                <h3 className="font-black font-mono text-gray-950 uppercase text-xs sm:text-sm">
                  Onde comprar e trocar pneu para BYD em Curitiba?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Na <strong>Carplus Pneus e Oficina Mecânica</strong>, localizada na <strong>Av. Presidente Arthur da Silva Bernardes, 1323 – Portão, Curitiba – PR</strong>. Telefone: <strong>(41) 3082-7282</strong>. Montagem técnica, bicos de borracha novos e alinhamento 3D no local.
                </p>
              </div>
            </div>
          </div>

          {/* Real Products in Stock from Catalog */}
          {allBydRelatedTires.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-200 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f49e1a]">Catálogo Disponível</span>
                  <h2 className="text-xl font-black font-mono text-gray-950">
                    Pneus Disponíveis para Medidas Utilizadas na Linha BYD
                  </h2>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {allBydRelatedTires.length} opções cadastradas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allBydRelatedTires.map((tire) => (
                  <TireCard 
                    key={tire.id} 
                    tire={tire} 
                    onAddToCart={onAddToCart || (() => {})} 
                    onSelectTire={onShowTireDetail}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Technical Services Section */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f49e1a]">Autocenter no Portão</span>
              <h2 className="text-xl sm:text-2xl font-black font-mono">
                Serviços Especializados para Veículos Elétricos e Híbridos
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Veículos elétricos têm torque instantâneo e peso concentrado por conta das baterias, exigindo alinhamento e balanceamento de alta precisão.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#f49e1a]/20 text-[#f49e1a] flex items-center justify-center font-bold">
                  3D
                </div>
                <h3 className="font-bold text-sm text-white font-mono uppercase">Alinhamento 3D Computadorizado</h3>
                <p className="text-gray-300 leading-relaxed">
                  Leitura a laser de convergência e câmber para evitar desgaste prematuro dos pneus em acelerações fortes.
                </p>
              </div>

              <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#f49e1a]/20 text-[#f49e1a] flex items-center justify-center font-bold">
                  BAL
                </div>
                <h3 className="font-bold text-sm text-white font-mono uppercase">Balanceamento Dinâmico</h3>
                <p className="text-gray-300 leading-relaxed">
                  Calibração milimétrica das rodas para rodagem macia e silenciosa, essencial para o baixo ruído de cabine dos elétricos.
                </p>
              </div>

              <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#f49e1a]/20 text-[#f49e1a] flex items-center justify-center font-bold">
                  TOR
                </div>
                <h3 className="font-bold text-sm text-white font-mono uppercase">Torque Controlado</h3>
                <p className="text-gray-300 leading-relaxed">
                  Aperto com torquímetro calibrado para preservar prisioneiros e as rodas de liga leve sem riscos.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => handleNav('/alinhamento-3d-curitiba')}
                className="bg-[#f49e1a] hover:bg-[#d88912] text-gray-950 font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Conhecer Alinhamento 3D ➔
              </button>
              <button
                onClick={() => handleNav('/oficina-do-pneu-curitiba')}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Serviços de Oficina ➔
              </button>
            </div>
          </div>

          {/* Visible HTML FAQ (People Also Ask) */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f49e1a]">Perguntas Frequentes</span>
              <h2 className="text-xl sm:text-2xl font-black font-mono text-gray-950">
                Dúvidas sobre Pneus para BYD em Curitiba
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Qual pneu usa o BYD Dolphin?",
                  a: "A especificação mais comum no Brasil é a medida 205/50 R17 (aro 17). Existem também configurações da linha com documentação para 195/60 R16. Recomendamos sempre verificar a etiqueta na coluna da porta do motorista antes da compra."
                },
                {
                  q: "Qual pneu usa o BYD Dolphin Mini?",
                  a: "O BYD Dolphin Mini utiliza a medida 175/55 R16 80H (aro 16), projetada para baixo consumo de energia e tração adequada para a proposta urbana do veículo."
                },
                {
                  q: "Qual é a medida do pneu do BYD King?",
                  a: "A configuração comercializada no Brasil utiliza pneus na medida 215/55 R17 (aro 17). O manual do fabricante também contempla a configuração 225/60 R16."
                },
                {
                  q: "Onde comprar pneu para BYD em Curitiba?",
                  a: "Você pode comprar na Carplus Pneus, na Av. Presidente Arthur da Silva Bernardes, 1323, no bairro Portão em Curitiba. Dispomos de atendimento consultivo via WhatsApp para reserva e instalação no box."
                },
                {
                  q: "Onde trocar pneus do BYD em Curitiba?",
                  a: "A troca pode ser realizada em nosso autocenter no Portão, equipado com elevadores adequados para veículos elétricos e híbridos, balanceamento dinâmico e rampa de alinhamento 3D."
                },
                {
                  q: "Quanto custa um pneu para BYD?",
                  a: "O preço varia conforme a medida, marca e tecnologia do pneu (modelos com composto para EV, índices de carga e velocidade). Consulte a Carplus pelo WhatsApp (41) 3082-7282 para verificar o valor atualizado e disponibilidade de estoque."
                },
                {
                  q: "Posso colocar outra medida de pneu no BYD Dolphin?",
                  a: "Recomenda-se manter rigorosamente a medida original recomendada pelo fabricante para evitar alterações no velocímetro, no consumo de bateria, na calibração do controle de tração (ESP) e interferências na caixa de roda."
                },
                {
                  q: "Como saber a medida correta do pneu do meu BYD?",
                  a: "A medida correta está gravada na lateral do pneu instalado (ex: 205/50 R17 93W), na etiqueta informativa na coluna B da porta do motorista ou na tampa de recarga, e no manual do proprietário."
                },
                {
                  q: "É necessário fazer balanceamento depois da troca?",
                  a: "Sim. O balanceamento é indispensável para eliminar vibrações no volante e evitar o desgaste irregular do pneu, garantindo o silêncio de rodagem característico dos veículos elétricos."
                },
                {
                  q: "Quando devo fazer alinhamento após trocar os pneus?",
                  a: "O alinhamento 3D deve ser realizado no momento da montagem dos pneus novos, a cada 10.000 km rodados ou sempre que o veículo sofrer impactos em buracos e desníveis no asfalto."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition gap-3"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 text-xs sm:text-sm text-gray-700 bg-white border-t border-gray-200 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internal Cross-Linking Cluster Matrix */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4 text-left">
            <h3 className="text-sm font-black uppercase font-mono text-gray-950">
              Navegue pelo Cluster de Pneus BYD e Medidas em Curitiba
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <strong className="block text-gray-900 font-mono text-[11px] uppercase">Modelos BYD</strong>
                <ul className="space-y-1 text-gray-600">
                  <li><button onClick={() => handleNav('/pneu-byd-dolphin-mini-curitiba')} className="hover:text-black hover:underline">BYD Dolphin Mini (175/55 R16)</button></li>
                  <li><button onClick={() => handleNav('/pneu-byd-dolphin-curitiba')} className="hover:text-black hover:underline">BYD Dolphin (205/50 R17)</button></li>
                  <li><button onClick={() => handleNav('/pneu-byd-dolphin-gs-curitiba')} className="hover:text-black hover:underline">BYD Dolphin GS</button></li>
                  <li><button onClick={() => handleNav('/pneu-byd-king-curitiba')} className="hover:text-black hover:underline">BYD King (215/55 R17)</button></li>
                </ul>
              </div>

              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <strong className="block text-gray-900 font-mono text-[11px] uppercase">Medidas Relacionadas</strong>
                <ul className="space-y-1 text-gray-600">
                  <li><button onClick={() => handleNav('/pneu-175-55-r16-curitiba')} className="hover:text-black hover:underline">Pneu 175/55 R16 Curitiba</button></li>
                  <li><button onClick={() => handleNav('/pneu-195-60-r16-curitiba')} className="hover:text-black hover:underline">Pneu 195/60 R16 Curitiba</button></li>
                  <li><button onClick={() => handleNav('/pneu-205-50-r17-curitiba')} className="hover:text-black hover:underline">Pneu 205/50 R17 Curitiba</button></li>
                  <li><button onClick={() => handleNav('/pneu-215-55-r17-curitiba')} className="hover:text-black hover:underline">Pneu 215/55 R17 Curitiba</button></li>
                  <li><button onClick={() => handleNav('/pneu-225-60-r16-curitiba')} className="hover:text-black hover:underline">Pneu 225/60 R16 Curitiba</button></li>
                </ul>
              </div>

              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <strong className="block text-gray-900 font-mono text-[11px] uppercase">Por Aro</strong>
                <ul className="space-y-1 text-gray-600">
                  <li><button onClick={() => handleNav('/aro/16')} className="hover:text-black hover:underline">Pneus Aro 16 em Curitiba</button></li>
                  <li><button onClick={() => handleNav('/aro/17')} className="hover:text-black hover:underline">Pneus Aro 17 em Curitiba</button></li>
                  <li><button onClick={() => handleNav('/aro/18')} className="hover:text-black hover:underline">Pneus Aro 18 em Curitiba</button></li>
                </ul>
              </div>

              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-gray-200">
                <strong className="block text-gray-900 font-mono text-[11px] uppercase">Serviços & Localização</strong>
                <ul className="space-y-1 text-gray-600">
                  <li><button onClick={() => handleNav('/alinhamento-3d-curitiba')} className="hover:text-black hover:underline">Alinhamento 3D Curitiba</button></li>
                  <li><button onClick={() => handleNav('/oficina-do-pneu-curitiba')} className="hover:text-black hover:underline">Oficina e Montagem</button></li>
                  <li><button onClick={() => handleNav('/loja-de-pneus-em-curitiba')} className="hover:text-black hover:underline">Loja no Portão</button></li>
                  <li><button onClick={() => handleNav('/contato')} className="hover:text-black hover:underline">Como Chegar na Carplus</button></li>
                </ul>
              </div>
            </div>
          </div>

          {/* LocalBusiness Entity Footer Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <strong className="text-gray-950 font-bold block text-sm">Carplus Pneus e Oficina Mecânica</strong>
              <p className="text-gray-600">
                Av. Presidente Arthur da Silva Bernardes, 1323 – Portão, Curitiba – PR, 80320-300
              </p>
              <p className="text-gray-500">Telefone: (41) 3082-7282 | Seg a Sex: 08h às 18h • Sáb: 08h às 12h</p>
            </div>
            <a
              href="https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Portao,+Curitiba+-+PR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0"
            >
              <MapPin className="w-4 h-4 text-red-600" /> Ver no Google Maps
            </a>
          </div>

        </div>
      </div>
    );
  }

  // MODEL PAGES CONFIGURATION
  const modelConfig: Record<string, {
    title: string;
    modelName: string;
    badge: string;
    measures: string[];
    rims: number[];
    description: string;
    technicalDetails: string;
    recommendedMeasureSlug: string;
  }> = {
    'pneu-byd-dolphin-curitiba': {
      title: "Pneu para BYD Dolphin em Curitiba | Medida 205/50 R17 e 195/60 R16",
      modelName: "BYD Dolphin",
      badge: "Hatch Elétrico",
      measures: ["205/50 R17", "195/60 R16"],
      rims: [17, 16],
      description: "Encontre pneus compatíveis com o BYD Dolphin em Curitiba. A configuração mais comum comercializada no Brasil utiliza a medida 205/50 R17 (aro 17), com documentação contemplando também 195/60 R16.",
      technicalDetails: "O BYD Dolphin entrega torque instantâneo e exige pneus com excelente aderência em pistas secas e molhadas. Na Carplus no Portão você encontra opções compatíveis com montagem técnica, bicos novos de borracha e alinhamento 3D.",
      recommendedMeasureSlug: "pneu-205-50-r17-curitiba"
    },
    'pneu-byd-dolphin-mini-curitiba': {
      title: "Pneu para BYD Dolphin Mini em Curitiba | Medida 175/55 R16",
      modelName: "BYD Dolphin Mini",
      badge: "Compacto Elétrico",
      measures: ["175/55 R16 80H"],
      rims: [16],
      description: "Consulte disponibilidade de pneus para o BYD Dolphin Mini em Curitiba na medida oficial 175/55 R16 80H (aro 16). Pneus novos com garantia e instalação profissional na Carplus Portão.",
      technicalDetails: "A medida 175/55 R16 80H do Dolphin Mini foi projetada para combinar autonomia da bateria, estabilidade direcional e baixo nível de ruído em perímetro urbano e rodoviário.",
      recommendedMeasureSlug: "pneu-175-55-r16-curitiba"
    },
    'pneu-byd-dolphin-gs-curitiba': {
      title: "Pneu para BYD Dolphin GS em Curitiba | Medidas e Especificações",
      modelName: "BYD Dolphin GS",
      badge: "Versão GS",
      measures: ["205/50 R17", "195/60 R16"],
      rims: [17, 16],
      description: "Informações técnicas e opções de pneus para a versão GS da família BYD Dolphin em Curitiba. Medidas 205/50 R17 e 195/60 R16 conforme versão e lote de fabricação.",
      technicalDetails: "Confira sempre a medida gravada no pneu instalado no seu Dolphin GS antes da compra. Na Carplus realizamos a verificação presencial e montagem com elevadores pantográficos calibrados.",
      recommendedMeasureSlug: "pneu-205-50-r17-curitiba"
    },
    'pneu-byd-king-curitiba': {
      title: "Pneu para BYD King em Curitiba: Medida Original 215/55 R17 com Menor Preço Garantido",
      modelName: "BYD King DM-i",
      badge: "Sedã Híbrido Plug-in",
      measures: ["215/55 R17 (Original)", "225/60 R16"],
      rims: [17, 16],
      description: "Pneu para BYD King em Curitiba na medida original 215/55 R17. Cobrimos qualquer oferta de grandes redes como Carrefour e Mercado Livre, com montagem computadorizada gratuita e alinhamento 3D especializado no Portão.",
      technicalDetails: "O BYD King combina motor híbrido com entrega de torque instantâneo e exige pneus com carcaça reforçada e composto de baixa resistência ao rolamento para maximizar a autonomia elétrica. Na Carplus você encontra a medida original 215/55 R17 a pronta entrega com montagem anti-risco sem encostar no verniz das rodas.",
      recommendedMeasureSlug: "pneu-215-55-r17-curitiba"
    }
  };

  // RENDER: PÁGINAS DE MODELOS (Dolphin, Dolphin Mini, Dolphin GS, King)
  if (view in modelConfig) {
    const config = modelConfig[view];
    
    // Find tires matching the primary measure
    let matchedTires: Tire[] = [];
    if (view === 'pneu-byd-dolphin-mini-curitiba') {
      matchedTires = getMatchingTires(175, 55, 16);
    } else if (view === 'pneu-byd-dolphin-curitiba' || view === 'pneu-byd-dolphin-gs-curitiba') {
      matchedTires = [...getMatchingTires(205, 50, 17), ...getMatchingTires(195, 60, 16)];
    } else if (view === 'pneu-byd-king-curitiba') {
      matchedTires = [...getMatchingTires(215, 55, 17), ...getMatchingTires(225, 60, 16)];
    }

    return (
      <div className="bg-gray-50 min-h-screen pb-16 font-sans text-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-600 flex items-center gap-2 overflow-x-auto">
            <button onClick={() => handleNav('/')} className="hover:text-gray-950 font-medium">Início</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button onClick={() => handleNav('/pneus-byd-curitiba')} className="hover:text-gray-950 font-medium">Pneus BYD Curitiba</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold">{config.modelName}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-10 px-4 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="inline-block bg-[#f49e1a]/20 border border-[#f49e1a]/40 text-[#f49e1a] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              {config.badge} • Curitiba
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-white">
              {config.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {config.description}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={formatWhatsAppUrl(
                  view === 'pneu-byd-king-curitiba'
                    ? "Olá Carplus! Sou dono de BYD King e gostaria de cotar o pneu na medida original 215/55 R17 com montagem grátis e menor preço garantido."
                    : `Olá Carplus! Gostaria de consultar pneus para o ${config.modelName} em Curitiba com montagem grátis.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Consultar Preço no WhatsApp
              </a>
              <button
                onClick={() => handleNav(`/${config.recommendedMeasureSlug}`)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-gray-700 transition flex items-center gap-1.5"
              >
                Ver Medida {config.measures[0]} ➔
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          
          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block uppercase font-mono">Confirmação obrigatória de especificação:</strong>
              <p className="mt-0.5 leading-relaxed">{manualWarning}</p>
            </div>
          </div>

          {/* Technical Specs Cards */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-black font-mono uppercase text-gray-950 border-b border-gray-150 pb-2">
              Especificações Técnicas: {config.modelName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 font-medium block">Medidas Documentadas:</span>
                <strong className="text-sm font-mono text-gray-950 block">{config.measures.join(" / ")}</strong>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 font-medium block">Aro das Rodas:</span>
                <strong className="text-sm font-mono text-gray-950 block">Aro {config.rims.join(" ou ")}</strong>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 font-medium block">Local de Instalação:</span>
                <strong className="text-sm font-mono text-gray-950 block">Carplus Portão (Curitiba)</strong>
              </div>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed pt-2">
              {config.technicalDetails}
            </p>
          </div>

          {/* Matching Products */}
          {matchedTires.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h3 className="text-base font-black font-mono text-gray-950 uppercase">
                  Pneus Disponíveis para {config.modelName}
                </h3>
                <span className="text-xs text-gray-500">{matchedTires.length} opções</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedTires.map(t => (
                  <TireCard 
                    key={t.id} 
                    tire={t} 
                    onAddToCart={onAddToCart || (() => {})} 
                    onSelectTire={onShowTireDetail}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick FAQ */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-black font-mono text-gray-950 uppercase">
              Perguntas sobre Pneu do {config.modelName}
            </h3>
            <div className="space-y-3 text-xs text-gray-700">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-150 space-y-1">
                <strong className="text-gray-950 block">Qual medida de pneu vem no {config.modelName}?</strong>
                <p className="leading-relaxed">
                  As configurações mais frequentes utilizam {config.measures.join(" ou ")}. Confirme sempre a etiqueta informativa na porta do motorista.
                </p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-150 space-y-1">
                <strong className="text-gray-950 block">Onde comprar e trocar em Curitiba?</strong>
                <p className="leading-relaxed">
                  Na Carplus Pneus (Av. Presidente Arthur da Silva Bernardes, 1323, Portão). Montagem computadorizada, bicos novos e alinhamento 3D inclusos.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <button
              onClick={() => handleNav('/pneus-byd-curitiba')}
              className="bg-gray-900 text-white font-bold px-3.5 py-2 rounded-xl transition"
            >
              ⬅ Voltar ao HUB Pneus BYD
            </button>
            <button
              onClick={() => handleNav('/alinhamento-3d-curitiba')}
              className="bg-yellow-500/15 text-yellow-900 border border-yellow-500/30 font-bold px-3.5 py-2 rounded-xl transition"
            >
              Alinhamento 3D ➔
            </button>
            <button
              onClick={() => handleNav('/oficina-do-pneu-curitiba')}
              className="bg-gray-100 text-gray-800 border border-gray-300 font-bold px-3.5 py-2 rounded-xl transition"
            >
              Oficina Mecânica ➔
            </button>
          </div>

        </div>
      </div>
    );
  }

  // MEASURE PAGES CONFIGURATION
  const measureConfig: Record<string, {
    title: string;
    measureStr: string;
    width: number;
    aspect: number;
    rim: number;
    description: string;
    vehiclesApplied: string[];
    relatedBydModel?: string;
    relatedBydSlug?: string;
  }> = {
    'pneu-175-55-r16-curitiba': {
      title: "Pneu 175/55 R16 em Curitiba",
      measureStr: "175/55 R16",
      width: 175,
      aspect: 55,
      rim: 16,
      description: "Procurando pneu 175/55 R16 em Curitiba? Consulte disponibilidade de pneus novos nessa medida na Carplus Pneus. A medida 175/55 R16 80H aparece, entre outras aplicações, na especificação técnica oficial do BYD Dolphin Mini. Sempre confirme a especificação indicada para o ano e versão do veículo.",
      vehiclesApplied: ["BYD Dolphin Mini", "Veículos compactos aro 16"],
      relatedBydModel: "BYD Dolphin Mini",
      relatedBydSlug: "pneu-byd-dolphin-mini-curitiba"
    },
    'pneu-195-60-r16-curitiba': {
      title: "Pneu 195/60 R16 em Curitiba",
      measureStr: "195/60 R16",
      width: 195,
      aspect: 60,
      rim: 16,
      description: "Procurando pneu 195/60 R16 em Curitiba? Consulte disponibilidade na Carplus. A medida 195/60 R16 é utilizada em veículos compactos, sedãs e crossovers, além de constar em documentações da família BYD Dolphin. Sempre confirme a especificação indicada no veículo.",
      vehiclesApplied: ["BYD Dolphin (configurações aro 16)", "Nissan Kicks (versões aro 16)", "Citroën C3 Aircross"],
      relatedBydModel: "BYD Dolphin",
      relatedBydSlug: "pneu-byd-dolphin-curitiba"
    },
    'pneu-205-50-r17-curitiba': {
      title: "Pneu 205/50 R17 em Curitiba",
      measureStr: "205/50 R17",
      width: 205,
      aspect: 50,
      rim: 17,
      description: "Procurando pneu 205/50 R17 em Curitiba? Consulte disponibilidade de pneus nessa medida na Carplus. A medida 205/50 R17 aparece em configurações do BYD Dolphin e BYD Dolphin GS, além de sedãs médios e hatches esportivos. Sempre confirme a especificação no manual do veículo.",
      vehiclesApplied: ["BYD Dolphin", "BYD Dolphin GS", "Ford Focus", "Volvo V40 / S40", "Renault Megane"],
      relatedBydModel: "BYD Dolphin",
      relatedBydSlug: "pneu-byd-dolphin-curitiba"
    },
    'pneu-215-55-r17-curitiba': {
      title: "Pneu 215/55 R17 em Curitiba",
      measureStr: "215/55 R17",
      width: 215,
      aspect: 55,
      rim: 17,
      description: "Procurando pneu 215/55 R17 em Curitiba? Consulte disponibilidade de pneus nessa medida na Carplus. A medida 215/55 R17 aparece, entre outras aplicações, em configurações do BYD King, além de SUVs compactos e sedãs de diversas montadoras. Sempre confirme a especificação indicada para o ano e versão do veículo.",
      vehiclesApplied: ["BYD King", "Honda HR-V", "Volkswagen T-Cross", "Toyota Camry", "Nissan Kicks", "Peugeot 408"],
      relatedBydModel: "BYD King",
      relatedBydSlug: "pneu-byd-king-curitiba"
    },
    'pneu-225-60-r16-curitiba': {
      title: "Pneu 225/60 R16 em Curitiba",
      measureStr: "225/60 R16",
      width: 225,
      aspect: 60,
      rim: 16,
      description: "Procurando pneu 225/60 R16 em Curitiba? Consulte disponibilidade na Carplus. A medida 225/60 R16 é contemplada na documentação técnica do BYD King e em sedãs e crossovers de grande porte. Sempre confirme a medida instalada no seu automóvel.",
      vehiclesApplied: ["BYD King (configuração aro 16)", "Subaru Outback / Forester", "Audi A6 (gerações anteriores)"],
      relatedBydModel: "BYD King",
      relatedBydSlug: "pneu-byd-king-curitiba"
    }
  };

  // RENDER: PÁGINAS DE MEDIDAS (/pneu-175-55-r16-curitiba, /pneu-215-55-r17-curitiba, etc.)
  if (view in measureConfig) {
    const mConfig = measureConfig[view];
    const matchedTires = getMatchingTires(mConfig.width, mConfig.aspect, mConfig.rim);

    return (
      <div className="bg-gray-50 min-h-screen pb-16 font-sans text-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-600 flex items-center gap-2 overflow-x-auto">
            <button onClick={() => handleNav('/')} className="hover:text-gray-950 font-medium">Início</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button onClick={() => handleNav(`/aro/${mConfig.rim}`)} className="hover:text-gray-950 font-medium">Aro {mConfig.rim}</button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold">{mConfig.measureStr}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-10 px-4 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="inline-block bg-[#f49e1a]/20 border border-[#f49e1a]/40 text-[#f49e1a] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              Medida {mConfig.measureStr} • Aro {mConfig.rim}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-white">
              {mConfig.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {mConfig.description}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={formatWhatsAppUrl(`Olá! Gostaria de consultar preço e estoque para pneu medida ${mConfig.measureStr} em Curitiba.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" /> Consultar Medida no WhatsApp
              </a>
              {mConfig.relatedBydSlug && (
                <button
                  onClick={() => handleNav(`/${mConfig.relatedBydSlug}`)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-gray-700 transition"
                >
                  Ver Aplicação no {mConfig.relatedBydModel} ➔
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          
          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block uppercase font-mono">Aviso de compatibilidade veicular:</strong>
              <p className="mt-0.5 leading-relaxed">{manualWarning}</p>
            </div>
          </div>

          {/* Applications list */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-black font-mono uppercase text-gray-950 border-b border-gray-150 pb-2">
              Aplicações Veiculares da Medida {mConfig.measureStr}
            </h2>
            <p className="text-xs text-gray-650 leading-relaxed">
              A medida {mConfig.measureStr} é comumente equipada ou homologada para diversos automóveis nacionais e importados:
            </p>
            <div className="flex flex-wrap gap-2">
              {mConfig.vehiclesApplied.map((v, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-lg text-xs font-medium">
                  🚗 {v}
                </span>
              ))}
            </div>
          </div>

          {/* Products matching this measure */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <h3 className="text-base font-black font-mono text-gray-950 uppercase">
                Opções Cadastradas na Medida {mConfig.measureStr}
              </h3>
              <span className="text-xs text-gray-500">{matchedTires.length} disponíveis</span>
            </div>
            
            {matchedTires.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedTires.map(t => (
                  <TireCard 
                    key={t.id} 
                    tire={t} 
                    onAddToCart={onAddToCart || (() => {})} 
                    onSelectTire={onShowTireDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-6 text-center space-y-3 text-xs text-gray-700">
                <p className="font-semibold">
                  Consulte nosso estoque físico no Portão para a medida <strong>{mConfig.measureStr}</strong>.
                </p>
                <p className="text-gray-500">
                  Recebemos remessas semanais diretamente dos principais fabricantes e distribuidores homologados.
                </p>
                <a
                  href={formatWhatsAppUrl(`Olá! Gostaria de checar a chegada/estoque da medida ${mConfig.measureStr} na loja do Portão.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#20bd5a] transition"
                >
                  <MessageSquare className="w-4 h-4" /> Checar Estoque pelo WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Services & Location */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm text-xs">
            <h3 className="text-sm font-black font-mono uppercase text-gray-950">
              Instalação e Serviços no Portão em Curitiba
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Na compra de seus pneus na Carplus, a montagem computadorizada e os bicos novos de borracha são cortesia. Você também pode realizar o alinhamento 3D tridimensional e o balanceamento dinâmico no mesmo local:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-150">
                <strong className="text-gray-900 block font-mono text-[11px] uppercase">Montagem Técnica & Bicos</strong>
                <p className="text-[11px] mt-0.5">Válvulas novas de borracha e assentamento correto dos talões.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-150">
                <strong className="text-gray-900 block font-mono text-[11px] uppercase">Alinhamento 3D de Precisão</strong>
                <p className="text-[11px] mt-0.5">Geometria veicular computadorizada com tolerâncias de montadora.</p>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <button
              onClick={() => handleNav('/pneus-byd-curitiba')}
              className="bg-gray-900 text-white font-bold px-3.5 py-2 rounded-xl transition"
            >
              HUB Pneus BYD ➔
            </button>
            <button
              onClick={() => handleNav(`/aro/${mConfig.rim}`)}
              className="bg-gray-100 text-gray-800 border border-gray-300 font-bold px-3.5 py-2 rounded-xl transition"
            >
              Todos os Pneus Aro {mConfig.rim} ➔
            </button>
            <button
              onClick={() => handleNav('/alinhamento-3d-curitiba')}
              className="bg-yellow-500/15 text-yellow-900 border border-yellow-500/30 font-bold px-3.5 py-2 rounded-xl transition"
            >
              Alinhamento 3D ➔
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
}
