import React, { useState, useEffect } from 'react';
import { 
  Building, ShieldCheck, HelpCircle, FileText, ArrowLeft, Navigation, 
  Phone, Globe, MapPin, Zap, CheckCircle2, UserCheck, Star, Sparkles, AlertCircle, Send,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Tag, Image as ImageIcon, Flame, Clock
} from 'lucide-react';
import { 
  OFFICIAL_NEIGHBORHOODS, NON_OFFICIAL_NEIGHBORHOODS, POPULAR_REGIONS, 
  METROPOLITAN_CITIES, getRouteInstructions 
} from '../seo-data';
import ServiceHistory from './ServiceHistory';
import { TIRES_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface CompanyPagesProps {
  view: 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing';
  seoTarget: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; } | null;
  onNavigateHome: () => void;
  onNavigateToPage: (page: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site') => void;
  onSelectSeoTarget: (target: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; }) => void;
}

export default function CompanyPages({ view, seoTarget, onNavigateHome, onNavigateToPage, onSelectSeoTarget }: CompanyPagesProps) {
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
    <div className="bg-[#111215] text-[#9ca3af] min-h-screen py-10 px-4 sm:px-6 font-sans select-none" id="company-pages-container">
      
      {/* Header element */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-gray-800 pb-5 mb-8">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-yellow-500 hover:text-yellow-400 cursor-pointer"
          id="back-home-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Catálogo</span>
        </button>
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
          Carplus Pneus • Unidade Portão
        </span>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* VIEW: QUEM SOMOS */}
        {view === 'quem-somos' && (
          <div className="space-y-8" id="view-quem-somos">
            <div className="text-center md:text-left">
              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Tradição & Confiança
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-3 tracking-tight">
                Quem Somos • <span className="text-[#f49e1a]">Carplus Pneus & Oficina</span>
              </h2>
              <p className="text-sm max-w-2xl mt-2 text-justify leading-relaxed">
                Há 35 anos cuidando da segurança e performance do seu automóvel com transparência, equipamentos 3D e equipe de engenharia mecânica qualificada em Curitiba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
              <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white uppercase border-l-4 border-yellow-500 pl-3 leading-tight">
                    Nossa História
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 text-justify leading-relaxed">
                    Fundada no coração do Paraná, a Carplus Pneus nasceu com a proposta de oferecer uma nova experiência na venda e montagem de pneus e revisão mecânica preventiva completa. Longe das práticas abusivas e orçamentos "empurrados" que infelizmente são comuns, construímos nossa reputação baseada na honestidade e laudos fotográficos precisos.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 text-justify leading-relaxed">
                    Hoje, com 35 anos de atuação comercial na capital curitibana, a nossa unidade na Avenida Presidente Arthur da Silva Bernardes se tornou referência absoluta de satisfação, contando com a maior pontuação em avaliações reais dos clientes no Google Maps.
                  </p>
                </div>
                
                <div className="mt-6 bg-[#111215] p-4 rounded-2xl border border-gray-800 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500 shrink-0 fill-yellow-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Líder absoluta em Curitiba</h4>
                    <p className="text-[10px] text-gray-500">Milhares de motoristas que rodam no Portão, Água Verde e CIC confiam em nossos técnicos.</p>
                  </div>
                </div>
              </div>

              {/* Core assets column */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 space-y-3">
                  <div className="text-yellow-500 bg-yellow-500/10 p-2.5 rounded-xl w-fit">
                    <UserCheck className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">Técnicos Treinados & Habilitados</h4>
                  <p className="text-xs text-gray-400 text-justify leading-relaxed">
                    Nossos profissionais passam por certificações trimestrais de fabricantes de pneus e suspensão. Realizamos a troca de bicos com torque controlado e balanceamento dinâmico a laser.
                  </p>
                </div>

                <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 space-y-3">
                  <div className="text-yellow-500 bg-yellow-500/10 p-2.5 rounded-xl w-fit">
                    <Navigation className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">Geometria 3D de Última Geração</h4>
                  <p className="text-xs text-gray-400 text-justify leading-relaxed">
                    Utilizamos sensores reflexivos de alta precisão que comparam milimetricamente as especificações de cambagem, convergência e cáster com o banco de dados oficial das montadoras de todo o mundo.
                  </p>
                </div>

                <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 space-y-3">
                  <div className="text-yellow-500 bg-yellow-500/10 p-2.5 rounded-xl w-fit">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">Atendimento Sem Surpresas</h4>
                  <p className="text-xs text-gray-400 text-justify leading-relaxed">
                    Você acompanha cada passo da manutenção. Orçamentos detalhados preestabelecidos e pagamento facilitado em até 10x sem juros no cartão de crédito físico na nossa loja.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e2026] to-[#111215] border border-gray-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-white uppercase">Agende sua visita na loja física ou tire suas dúvidas!</h4>
                <p className="text-xs text-gray-400 mt-1">Nossos consultores no Portão estão de plantão para simular fretes e reservar medidas.</p>
              </div>
              <a 
                href={formatWhatsApp('Olá Carplus! Gostaria de falar com um atendente sabendo que vocês trabalham há 35 anos em Curitiba.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shrink-0 border border-black"
                id="whatsapp-about-cta"
              >
                Falar com Atendimento
              </a>
            </div>
          </div>
        )}

        {/* VIEW: PRIVACY POLICY */}
        {view === 'politica-privacidades' && (
          <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6" id="view-privacy-policy">
            <div className="border-b border-gray-850 pb-4">
              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Segurança Legal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2 select-none">
                Política de Privacidade • <span className="text-[#f49e1a]">Carplus Pneus</span>
              </h2>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">Última atualização: 11 de Junho de 2026</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 text-justify leading-relaxed">
              <p>
                A Carplus Pneus está comprometida com a proteção de dados pessoais e privacidade de nossos clientes. Esta Política de Privacidade explica como coletamos, armazenamos e utilizamos as informações no âmbito deste portal e do agendamento comercial físico.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">1. Coleta e Uso de Informações</h4>
              <p>
                Nós não coletamos dados para fins de comercialização com terceiros. As informações inseridas no formulário do Carrinho de Compras e do chat de suporte (como Nome, Placa do Veículo e preferência de pneu) são tratadas voluntariamente e de forma encriptada para agilizar seu atendimento via WhatsApp direto com nosso canal de vendas físico.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">2. Armazenamento Local (Cookies e LocalStorage)</h4>
              <p>
                Este site utiliza a tecnologia inovadora de <strong>LocalStorage</strong> em seu navegador web local. Isso garante que os itens adicionados ao seu carrinho de pneus e o seu histórico de registros de placas sejam persistidos localmente de forma privada e exclusiva no seu computador ou celular, sem qualquer envio a bancos de dados externos desconhecidos.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">3. Transações de Pagamento Seguras</h4>
              <p>
                Lembramos que **não realizamos transações digitais de cartões ou boletos online** neste ambiente provisório. Todo o faturamento e pagamento das mercadorias e de mão de obra de oficina mecânica ocorre pessoalmente de forma presencial no ato da entrega técnica na nossa loja física (Av. Presid. Arthur da Silva Bernardes, 1323, Portão, Curitiba - PR).
              </p>

              <h4 className="text-white font-bold uppercase mt-4">4. Contato Encarregado</h4>
              <p>
                Em caso de dúvidas para remoção ou atualização física de histórico automotivo local, por favor ligue gratuitamente para a gerência da Carplus Portão através do contato telefônico principal: <strong>(41) 3082-7282</strong>.
              </p>
            </div>
          </div>
        )}

        {/* VIEW: RETURN POLICY */}
        {view === 'politica-devolucao' && (
          <div className="bg-[#1e2026] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6" id="view-return-policy">
            <div className="border-b border-gray-850 pb-4">
              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Garantia Certificada
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2 select-none">
                Política de Troca & Devolução • <span className="text-[#f49e1a]">Carplus Pneus</span>
              </h2>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">Em total conformidade com a Lei Federal nº 8.078/1990 (Código de Defesa do Consumidor - CDC).</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 text-justify leading-relaxed">
              <p>
                A Carplus Pneus busca sempre a satisfação total e a integridade preventiva dos condutores de Curitiba e região metropolitana. Veja como funcionam as trocas e garantias em nossa oficina física do Portão:
              </p>

              <h4 className="text-white font-bold uppercase mt-4">1. Arrependimento e Troca Preventiva</h4>
              <p>
                Conforme o CDC, caso queira substituir ou devolver pneus comprados que ainda não foram montados no veículo, asseguramos um período confortável de até 7 dias corridos após a retirada física para a troca de perfil ou solicitação de devolução, desde que a borracha esteja intacta, com os selos de certificação do INMETRO preservados.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">2. Garantia de 5 Anos Contra Defeitos de Fabricação</h4>
              <p>
                Todos os nossos pneus multimarcas homologados comercializados gozam de **garantia estendida legal de 5 (cinco) anos** fornecida diretamente pelo fabricante oficial nacional (Bridgestone, Michelin, Pirelli, Kumho, Hankook e Dunlop). A garantia cobre problemas estruturais como bolhas térmicas ou descolamento de banda de rolagem decorrentes de defeito de fundição na fabricação.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">3. Exclusão de Coberturas</h4>
              <p>
                A garantia contra defeitos de fabricação **NÃO** cobre rasgos provocados por cortes em guias, furos acidentais de pregos, impactos de buracos decorrentes de más condições asfálticas ou desgaste irregular provocado por falta de vistorias técnicas periódicas de alinhamento e geometria 3D.
              </p>

              <h4 className="text-white font-bold uppercase mt-4">4. Procedimento de Troca</h4>
              <p>
                Traga o carro à nossa sede no endereço <strong>Av. Presidente Arthur da Silva Bernardes, 1323 (Portão)</strong> para análise imediata do engenheiro técnico credenciado. O laudo é emitido e, confirmada a ocorrência de defeito original, efetuamos a substituição imediata sem custos extras e de forma prioritária.
              </p>
            </div>
          </div>
        )}

        {/* VIEW: MAPA DO SITE */}
        {view === 'mapa-do-site' && (
          <div className="space-y-8" id="view-sitemap-portal">
            <div className="text-center sm:text-left">
              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Diretório de Links & SEO
              </span>
              <h2 className="text-3xl font-black uppercase text-white mt-3 select-none">
                Mapa do Site • <span className="text-[#f49e1a]">Sitemap Portal Completo</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-2xl text-justify">
                Navegue rapidamente de forma integrada por todas as páginas institucionais, guias de pneus novos por aros, regiões populares não oficiais de Curitiba e cidades metropolitanas de fácil conectividade física.
              </p>
            </div>

            {/* CRITICAL INTEGRATION: SERVICE HISTORY IS INSERTED HERE AND REMOVED FROM NAVBAR */}
            <div className="border border-gray-800 p-1 bg-gradient-to-br from-[#1e2026] to-[#111215] rounded-3xl" id="integrated-service-history">
              <div className="p-4 border-b border-gray-800 bg-[#111215]/50 rounded-t-3xl text-center sm:text-justify flex flex-col sm:flex-row justify-between items-center gap-2">
                <div>
                  <span className="bg-yellow-500 text-gray-950 font-mono font-black text-[9px] uppercase px-2 py-0.5 rounded border border-black">
                    Área Exclusiva do Cliente
                  </span>
                  <h4 className="text-sm font-bold text-white uppercase mt-1">Busque seu Histórico Digital nesta Página</h4>
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  Consultas locais persisitidas com total sigilo.
                </div>
              </div>
              <div className="p-1">
                <ServiceHistory />
              </div>
            </div>

            {/* Sitemap grid index of key links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              
              {/* Box 1: Institutional Core and raw XML link */}
              <div className="bg-[#1e2026] border border-gray-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2 flex items-center gap-1">
                  <Building className="w-4 h-4 text-yellow-500" />
                  <span>Canais Principais</span>
                </h4>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><button onClick={onNavigateHome} className="hover:text-yellow-500 transition cursor-pointer">Catálogo de Vendas & Início</button></li>
                  <li><button onClick={() => onSelectSeoTarget({ type: 'bairro', name: 'Portão' })} className="hover:text-yellow-500 transition cursor-pointer">Como Chegar Carplus Portão</button></li>
                  <li><button onClick={() => onSelectSeoTarget({ type: 'bairro', name: 'Água Verde' })} className="hover:text-yellow-500 transition cursor-pointer">Revisão para o Água Verde</button></li>
                  <li><a href="/sitemap.xml" target="_blank" className="hover:text-yellow-500 transition flex items-center gap-1 font-mono text-[10px] text-yellow-500 py-1 border-t border-gray-800/50 mt-2">Ver Sitemap.xml Técnico</a></li>
                </ul>
              </div>

              {/* Box 2: Tire Rims range Aro 13 - 23 */}
              <div className="bg-[#1e2026] border border-gray-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Destaques por Aro Wheel</span>
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                  {AROS.map((aro) => (
                    <button
                      key={`aro-link-${aro}`}
                      onClick={() => onSelectSeoTarget({ type: 'aro', name: `Aro ${aro}` })}
                      className="bg-[#111215] border border-gray-800 hover:border-yellow-500 py-2 rounded text-gray-300 hover:text-white font-black uppercase text-[9px] cursor-pointer"
                    >
                      R{aro}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box 3: Regiões Metropolitanas de Curitiba (RMC) */}
              <div className="bg-[#1e2026] border border-gray-800 p-5 rounded-2xl space-y-3 lg:col-span-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2 flex items-center gap-1">
                  <Globe className="w-4 h-4 text-yellow-500" />
                  <span>Cidades Região Metropolitana (RMC)</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                  {METROPOLITAN_CITIES.map((cidade) => (
                    <button
                      key={`cidade-link-${cidade}`}
                      onClick={() => onSelectSeoTarget({ type: 'cidade', name: cidade })}
                      className="bg-[#111215] border border-gray-800 hover:border-yellow-500 px-2 py-1 rounded text-gray-400 hover:text-white cursor-pointer"
                    >
                      {cidade}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bairros de Curitiba SEO list (Huge IPPUC listing clickables) */}
            <div className="bg-[#1e2026] border border-gray-800 p-5 sm:p-6 rounded-2xl space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2">
                Páginas de Geolocalização de Bairros Oficiais (75 Bairros Curitiba)
              </h4>
              <p className="text-[11px] text-gray-400 text-justify">
                Clique sobre qualquer bairro reconhecido para carregar o guia de vantagens e instruções de percurso direto até a nossa unidade de portabilidade mecânica.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-[10px] font-semibold text-gray-400">
                {OFFICIAL_NEIGHBORHOODS.map((bairro) => (
                  <button
                    key={`bairro-link-${bairro}`}
                    onClick={() => onSelectSeoTarget({ type: 'bairro', name: bairro })}
                    className="text-left hover:text-yellow-500 transition py-1 cursor-pointer flex items-center gap-1.5 truncate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span>
                    <span>{bairro}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bairros Não Oficiais & Vilas de Curitiba */}
            <div className="bg-[#1e2026] border border-gray-800 p-5 sm:p-6 rounded-2xl space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2">
                Vilas, Loteamentos & Bairros Não Oficiais (Buscas Populares em Curitiba)
              </h4>
              <p className="text-[11px] text-gray-400 text-justify">
                Termos regionais e imobiliários muito consultados pelos moradores locais. Conectamos estas micro-regiões de forma rápida:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-[10px] font-semibold text-gray-400">
                {NON_OFFICIAL_NEIGHBORHOODS.map((v) => (
                  <button
                    key={`non-off-link-${v.name}`}
                    onClick={() => onSelectSeoTarget({ type: 'bairro', name: v.name, region: v.region })}
                    className="text-left hover:text-yellow-500 transition py-1 cursor-pointer flex flex-col"
                  >
                    <span className="text-white font-bold truncate">{v.name}</span>
                    <span className="text-[8px] text-gray-500 truncate">Região {v.region}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Regions subdivisions Group list */}
            <div className="bg-[#1e2026] border border-gray-800 p-5 sm:p-6 rounded-2xl space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wide border-b border-gray-800 pb-2">
                Subdivisões e Regiões de Grande Densidade Demográfica
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {POPULAR_REGIONS.map((reg) => (
                  <div key={reg.name} className="bg-[#111215] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-black text-yellow-500 uppercase">{reg.name}</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">{reg.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-800/50">
                      {reg.subAreas.map((sa) => (
                        <button
                          key={sa}
                          onClick={() => onSelectSeoTarget({ type: 'bairro', name: sa, region: reg.name })}
                          className="bg-[#1e2026] hover:bg-yellow-500/10 px-2 py-0.5 rounded text-[8px] text-gray-300 hover:text-yellow-500 font-bold transition cursor-pointer"
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

        {/* VIEW: SEO DYNAMIC LANDING PAGE */}
        {view === 'seo-landing' && seoTarget && (() => {
          const sampleSearched = getMostSearchedTires(seoTarget.name, seoTarget.type);
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
              
              {/* Dynamic content rendering with Premium Hero Carousel */}
              <div className="bg-black border border-yellow-500/10 rounded-3xl p-6 sm:p-8 space-y-8">
                
                {/* Hero section splits in two */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-905 pb-8">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {seoTarget.type === 'bairro' ? 'Bairro / Região Especial de Curitiba' : 
                       seoTarget.type === 'cidade' ? 'Município Região Metropolitana (RMC)' : 
                       seoTarget.type === 'aro' ? 'Medida de Roda Especial (Aros)' : 
                       'Guia Homologado de Automóvel'}
                    </span>
                    
                    <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight font-display">
                      {seoTarget.type === 'bairro' && `Pneus em Curitiba - Bairro ${seoTarget.name}`}
                      {seoTarget.type === 'cidade' && `Pneus na Região Metropolitana - Fácil Acesso em ${seoTarget.name}`}
                      {seoTarget.type === 'aro' && `Pneus de Alta Tração ${seoTarget.name} em Curitiba`}
                      {seoTarget.type === 'carro' && `Pneus Homologados Originais para ${seoTarget.name}`}
                    </h2>
                    
                    <p className="text-xs text-yellow-500 uppercase font-mono font-bold tracking-wide">
                      Serviços de Troca de Pneus, Alinhamento 3D e Freios para condutores de {seoTarget.name}
                    </p>

                    <div className="space-y-4 text-xs sm:text-sm text-gray-300 text-justify leading-relaxed">
                      <p>
                        A <strong className="text-white">Carplus Pneus</strong> é uma referência histórica em mecânica expressa e reposição de borrachas homologadas que atende com maestria moradores do bairro ou região de <strong className="text-yellow-500">{seoTarget.name}</strong> há mais de <strong className="text-white font-mono">35 anos de atuação comercial sólida em Curitiba</strong>.
                      </p>
                      <p>
                        Oferecemos um portfólio completo com as melhores marcas mundiais em estoque (Bridgestone, Michelin, Pirelli, Dunlop e muito mais). Todos os pneus comprados em nosso portal já incluem montagem técnica gratuita e troca de bicos comuns em nossa sede na Arthur Bernardes. Contamos com técnicos qualificados para cuidar do seu eixo e suspensão com segurança e agilidade.
                      </p>
                    </div>
                  </div>

                  {/* Spotlight Offers premium animated container */}
                  <div className="lg:col-span-5 bg-[#111215] border border-yellow-500/20 p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[360px] shadow-2xl">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-gray-950 font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl font-mono flex items-center gap-1 z-10">
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
                                <div className="flex justify-center flex-grow items-center">
                                  <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="h-32 object-contain bg-black rounded-2xl p-2 border border-yellow-500/10"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="text-center mt-3 space-y-1">
                                  <span className="text-[10px] text-yellow-500 font-mono tracking-widest font-black uppercase">
                                    {t.brand}
                                  </span>
                                  <h4 className="text-white font-bold text-xs uppercase truncate max-w-xs mx-auto">
                                    {t.name}
                                  </h4>
                                  <div className="flex items-center justify-center gap-2 mt-1">
                                    {t.promoPrice ? (
                                      <>
                                        <span className="line-through text-[10px] text-gray-500 font-mono">
                                          R$ {t.price.toFixed(2)}
                                        </span>
                                        <span className="text-lg font-black text-white font-mono">
                                          R$ {t.promoPrice.toFixed(2)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-base font-black text-white font-mono">
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
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition text-center block cursor-pointer"
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
                            dotIdx === activeOfferIdx ? 'bg-yellow-500 w-3' : 'bg-gray-700'
                          }`}
                          aria-label={`Slide ${dotIdx}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specific local most searched tires section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none">
                    Pneus Mais Procurados localmente por condutores em {seoTarget.name}
                  </h4>
                  <p className="text-xs text-gray-400 text-justify">
                    Abaixo listamos as medidas de pneus novos e marcas homologadas que apresentam campeões históricos de buscas para veículos residindo ou circulando em {seoTarget.name}, perfeitos para as condições climáticas e viárias locais:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sampleSearched.map((p, idx) => (
                      <div key={idx} className="bg-black border border-gray-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-yellow-500 bg-yellow-500/10 font-mono font-black text-[9px] uppercase px-2 py-0.5 rounded border border-yellow-500/25">
                            {p.category}
                          </span>
                          <h5 className="text-white font-extrabold text-sm uppercase mt-2 font-display">
                            Medida Ideal: {p.medida}
                          </h5>
                          <p className="text-[11px] text-gray-400 mt-1.5 text-justify leading-relaxed">
                            {p.motivo}
                          </p>
                          {p.sugestao && (
                            <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase">
                              Sugestão de Estoque: <strong className="text-white">{p.sugestao.brand} {p.sugestao.model}</strong>
                            </p>
                          )}
                        </div>

                        <a 
                          href={formatWhatsApp(`Olá Carplus! Gostaria de consultar preços de pneus na medida ${p.medida} para meu veículo, referenciando o guia mais buscado do bairro/localidade ${seoTarget.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#1e2026] hover:bg-yellow-500 hover:text-gray-950 text-yellow-500 font-semibold border border-yellow-500/20 py-2 rounded-xl text-[10px] uppercase tracking-wider text-center transition cursor-pointer"
                        >
                          Consultar Preço da Medida
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Route instructions box - percurso */}
                <div className="bg-[#111215] border border-gray-850 p-5 rounded-2xl space-y-3.5 font-sans">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                    <Navigation className="w-5 h-5 text-yellow-500 shrink-0" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Percurso Recomendado até a Unidade Carplus Portão</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="bg-[#1e2026] p-3 rounded-xl border border-gray-800">
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Origem da Partida</p>
                      <p className="font-bold text-white uppercase mt-0.5">{seoTarget.name}</p>
                    </div>
                    <div className="bg-[#1e2026] p-3 rounded-xl border border-gray-800">
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Distância Estimada</p>
                      <p className="font-bold text-yellow-500 font-mono text-sm mt-0.5">
                        {getRouteInstructions(seoTarget.name, seoTarget.type).distance}
                      </p>
                    </div>
                    <div className="bg-[#111215] border border-yellow-500/10 p-3 rounded-xl">
                      <p className="text-[10px] text-yellow-500 uppercase font-mono font-bold">Tempo Médio de Carro</p>
                      <p className="font-bold text-yellow-500 font-mono text-sm mt-0.5">
                        {getRouteInstructions(seoTarget.name, seoTarget.type).time}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-300 leading-relaxed text-justify bg-[#1e2026] p-3.5 rounded-xl border border-gray-800 uppercase font-mono">
                    <strong className="text-white block uppercase text-[10px] tracking-wider mb-2 font-sans">Passo a passo do percurso:</strong>
                    {getRouteInstructions(seoTarget.name, seoTarget.type).route}
                  </div>

                  <div className="text-[10px] text-gray-500 text-justify flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Atenção:</strong> Siga com segurança, respeitando as faixas exclusivas dos ônibus expressos biarticulados nas canaletas de Curitiba. Estamos localizados na Avenida Arthur Bernardes, uma avenida de super fácil acesso, com pátio amplo para manobras de veículos médios, caminhonetes ou SUVs.
                    </p>
                  </div>
                </div>

                {/* Real photo gallery showcasing Carplus workshop */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none">
                    Estrutura Física Carplus: Nossa Loja em Curitiba
                  </h4>
                  <p className="text-xs text-gray-400">
                    Veja fotos reais de nossa infraestrutura na Unidade Portão, equipada com rampas computadorizadas de Alinhamento 3D, balanceamento dinâmico e ampla sala de recepção:
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {CARPLUS_GALLERY.map((img, idx) => (
                      <div key={idx} className="group relative overflow-hidden rounded-2xl bg-black border border-gray-800 transition">
                        <img 
                          src={img.url} 
                          alt={img.label}
                          className="h-40 w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-2 sm:p-3">
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
                  <h4 className="text-sm font-bold text-white uppercase border-l-4 border-yellow-500 pl-3 leading-tight select-none">
                    Vantagens em Escolher a Carplus Pneus
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "35 Anos de Tradição de Mercado", desc: "Desde 1991 garantindo honestidade e precisão no orçamento, sem forçar reparos indesejados." },
                      { title: "Técnicos Treinados e Habilitados", desc: "Troca e alinhamento com bicos novos, calibragem computadorizada e testes corretos de rolagem." },
                      { title: "Geometria 3D e Alinhamento Preciso", desc: "Nossos equipamentos ajustam os eixos de cambagem seguindo as especificações exatas do seu modelo." },
                      { title: "Maior Nota de Aprovação no Google", desc: "Reconhecimento comprovado e real no mapa de Curitiba, com milhares de clientes satisfeitos recomendando." },
                      { title: "Facilidade de Pagamento Físico", desc: "Parcele tudo em até 10x sem juros no cartão de crédito físico diretamente na nossa entrega técnica." },
                      { title: "Melhor Medida Qualidade do INMETRO", desc: "Segurança total em curvas sob pista molhada no inverno característico de Curitiba." }
                    ].map((adv, idx) => (
                      <div key={idx} className="bg-[#111215] border border-gray-850 p-4 rounded-xl flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-white text-xs uppercase">{adv.title}</h5>
                          <p className="text-[11px] text-gray-400 mt-1 text-justify leading-relaxed">{adv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local FAQ Accordion container */}
                <div className="space-y-4 border-t border-gray-850 pt-6">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Perguntas Frequentes (FAQ) de Atendimento</h4>
                  </div>
                  <p className="text-xs text-gray-400">
                    Consulte as principais dúvidas sobre frete, agendamento de orçamento online e serviços executados na nossa autocenter:
                  </p>

                  <div className="space-y-2.5">
                    {localFaq.map((faq, idx) => {
                      const isOpen = activeFaqIdx === idx;
                      return (
                        <div key={idx} className="bg-[#111215] border border-gray-850 rounded-xl overflow-hidden transition-all duration-300">
                          <button
                            onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-4 text-left text-white hover:text-yellow-500 transition cursor-pointer font-bold text-xs sm:text-sm uppercase"
                          >
                            <span>{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-yellow-500 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-yellow-500 shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="p-4 pt-0 border-t border-gray-800/40 text-xs text-gray-400 leading-relaxed text-justify">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Actions direct triggers */}
                <div className="bg-gradient-to-br from-[#111215] to-[#1a1b22] border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <h5 className="text-white font-bold leading-tight uppercase text-xs">Precisa agendar orçamento de Pneus no Portão?</h5>
                    <p className="text-[11px] text-gray-400 mt-1">Simule medidas, consulte preços e reserve com frete zerado agendando via WhatsApp.</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onNavigateToPage('mapa-do-site');
                      }}
                      className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Outros Bairros
                    </button>
                    <a
                      href={formatWhatsApp(`Olá Carplus Pneus! Agendei a reserva do trajeto saindo de ${seoTarget.name} e gostaria de confirmar dia/hora para montagem inclusa gratuita.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black text-xs uppercase px-5 py-2.5 rounded-xl transition border border-black flex items-center gap-1.5 cursor-pointer"
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

    </div>
  );
}
