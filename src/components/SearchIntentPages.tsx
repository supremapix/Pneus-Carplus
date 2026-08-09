import React, { useState } from 'react';
import { 
  Award, Shield, Check, Phone, MapPin, Zap, TrendingUp, Percent, 
  ShoppingBag, Flame, ThumbsUp, MessageSquare, CornerDownRight,
  ArrowRight, Sparkles, Scale, Info, HelpCircle, ChevronRight, CheckCircle
} from 'lucide-react';

interface SearchIntentPagesProps {
  view: 
    | 'xbri-pneus-curitiba'
    | 'pneus-baratos-em-curitiba'
    | 'melhor-site-para-comprar-pneus'
    | 'distribuidora-de-pneus-importados-atacado-curitiba'
    | 'pneu-hankook-curitiba'
    | 'pneus-bridgestone-curitiba-precos'
    | 'barao-pneus-e-oficina-bacacheri-curitiba'
    | 'barao-pneus-sao-jose-pinhais'
    | 'pneus-em-curitiba-melhor-preco'
    | 'distribuidora-de-pneus-em-curitiba'
    | 'bana-pneus'
    | 'loja-de-pneus-em-curitiba'
    | 'pneus-pirelli-em-curitiba-melhor-preco'
    | 'barao-pneus-e-oficina-portao';
  onNavigateHome: () => void;
}

export default function SearchIntentPages({ view, onNavigateHome }: SearchIntentPagesProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper inside WhatsApp formatting
  const formatWhatsApp = (text: string) => {
    return `https://wa.me/5541999999999?text=${encodeURIComponent(text)}`;
  };

  // Structured Content for each page to maximize relevance
  const pageData = {
    'xbri-pneus-curitiba': {
      title: "Xbri Pneus Curitiba",
      subtitle: "Ampla linha de modelos Xbri a pronta entrega com bicos de borracha novos e instalação de pista grátis.",
      tag: "Custo-Benefício Premium",
      bgGradient: "from-emerald-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Os pneus <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Xbri Pneus</strong> tornaram-se uma das maiores referências do mercado automotivo brasileiro devido à sua alta resistência e quilometragem excepcional nas nossas estradas, com um custo por quilômetro extremamente vantajoso.
          </p>
          
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-3xl space-y-3">
            <h3 className="text-sm font-black text-emerald-900 uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Por que escolher pneus Xbri em Curitiba?
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Banda de rodagem reforçada</strong> para amortecer os impactos dos buracos urbanos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Compostos de última geração</strong> que reduzem o ruído em rodovias como a BR-116.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Excelente escoamento de água</strong>, essencial para as repentinas chuvas de Curitiba.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Certificação total do Inmetro</strong> com classificação A/B de aderência técnica.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-black uppercase font-mono text-gray-950">Modelos Xbri de Sucesso Comercial</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-bold">
              Comercializamos as linhas completas da Xbri: <strong>Xbri Ecology</strong> (ideal para economia de combustível no trânsito urbano), <strong>Xbri Forza</strong> (excelência em estabilidade sob frenagens) e <strong>Xbri Brutus All Terrain</strong> (com compostos robustos para picapes e SUVs de alta tração no Paraná).
            </p>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/15 p-5 rounded-3xl space-y-2">
            <span className="font-mono text-[9px] text-[#f49e1a] uppercase font-black tracking-widest block">Compromisso Carplus</span>
            <p className="text-xs text-gray-800 leading-relaxed font-extrabold">
              Compre o seu jogo de pneus Xbri na Carplus Pneus Portão e ganhe na hora a instalação em nossas desmontadoras profissionais, alinhamento técnico preventivo das rodas e bicos novos de vedação comuns grátis!
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou buscando orçamento de pneus Xbri Curitiba. Quais medidas vocês têm disponíveis a pronta entrega?",
      faqs: [
        { q: "O pneu Xbri é uma marca confiável?", a: "Sim, a Xbri é uma marca brasileira de renome com forte representação industrial na Ásia, certificada e validada com notas excelentes pelo Inmetro brasileiro." },
        { q: "O bico de montagem é cobrado por fora?", a: "Absolutamente não! Na Carplus Pneus, a troca do pneu acompanha bicos de borracha comuns novos inteiramente de graça." }
      ]
    },
    'pneus-baratos-em-curitiba': {
      title: "Pneus Baratos em Curitiba",
      subtitle: "Garantia real de menor preço à pronta entrega. Mais de 10.000 pneus novos nacionais e importados.",
      tag: "Economia Real Garantida",
      bgGradient: "from-amber-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Se você está pesquisando por <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">pneus baratos em Curitiba</strong>, sabe como é difícil encontrar pneus novos com boa qualidade mecânica e garantia sem ter que pagar taxas embutidas absurdas na hora de realizar a montagem física na loja.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-150 p-4 rounded-2xl bg-gray-50 space-y-2">
              <span className="text-xl font-bold font-mono text-gray-850">01</span>
              <h4 className="text-xs font-black uppercase text-gray-950">Preço Direto de Fábrica</h4>
              <p className="text-[10px] text-gray-500 font-semibold">Eliminamos etapas de revendedores secundários para trazer margem limpa.</p>
            </div>
            <div className="border border-gray-150 p-4 rounded-2xl bg-gray-50 space-y-2">
              <span className="text-xl font-bold font-mono text-gray-850">02</span>
              <h4 className="text-xs font-black uppercase text-gray-950">Instalação Inclusa</h4>
              <p className="text-[10px] text-gray-500 font-semibold">Instalação computadorizada totalmente gratuita em nossa garagem no Portão.</p>
            </div>
            <div className="border border-gray-150 p-4 rounded-2xl bg-gray-50 space-y-2">
              <span className="text-xl font-bold font-mono text-gray-850">03</span>
              <h4 className="text-xs font-black uppercase text-gray-950">Bico Grátis de Verdade</h4>
              <p className="text-[10px] text-gray-500 font-semibold">Substituição de bicos ressecados inclusa sem acréscimos na nota fiscal.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-black uppercase font-mono text-gray-950">Cuidado com ofertas duvidosas e pneus "remold"</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-semibold">
              Muitas empresas anunciam preços de pneus extremamente baixos, mas vendem pneus remoldados (que possuem carcaças velhas retrabalhadas e oferecem baixa resistência à aquaplanagem e furos). Na Carplus Pneus, vendemos **apenas pneus novos premium com garantia oficial de 5 anos**. Segurança e preço baixo andam juntos conosco!
            </p>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/15 p-5 rounded-3xl flex items-center justify-between gap-4 text-xs font-sans">
            <div>
              <p className="font-extrabold text-gray-950 uppercase">Cobrimos Orçamentos da Concorrência</p>
              <p className="text-gray-550 leading-relaxed font-semibold">Traga a proposta impressa da região metropolitana que garantimos menor valor real à vista.</p>
            </div>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Vi a página de pneus baratos em Curitiba e gostaria de receber um orçamento de pneus novos e econômicos na minha medida.",
      faqs: [
        { q: "Quais são as formas de pagamento disponíveis?", a: "Parcelamos em até 10x sem juros no cartão de crédito, ou oferecemos descontos agressivos especiais para pagamentos via Pix à vista." },
        { q: "Os pneus baratos possuem garantia?", a: "Com certeza! Qualquer pneu comercializado pela Carplus, por mais econômico que seja, possui 5 anos de garantia oficial contra defeitos industriais." }
      ]
    },
    'melhor-site-para-comprar-pneus': {
      title: "Melhor Site para Comprar Pneus",
      subtitle: "Reserva digital sem burocracia. Você escolhe, agenda e só paga após instalados no veículo.",
      tag: "Segurança Digital Total",
      bgGradient: "from-blue-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Na internet, fraudes e falsos e-commerces de pneus tornaram-se comuns. Além disso, comprar e ter que esperar semanas para entregar gera estresse. A Carplus uniu o melhor de dois mundos: <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">a facilidade de pesquisar online e o conforto da montagem na loja física.</strong>
          </p>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black uppercase text-[#f49e1a] font-mono tracking-widest">O Funcionamento é Extremamente Simples:</h4>
            <div className="space-y-3 text-xs font-semibold text-gray-650">
              <p className="flex items-start gap-2">
                <span className="bg-yellow-500 text-gray-950 w-5 h-5 rounded-full flex items-center justify-center font-mono font-black shrink-0 mt-0.5">1</span>
                <span>Navegue pelo nosso catálogo digital completo e filtre pela marca, largura, aro ou modelo desejado de pneu.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-yellow-500 text-gray-950 w-5 h-5 rounded-full flex items-center justify-center font-mono font-black shrink-0 mt-0.5">2</span>
                <span>Clique em comprar ou chame nossa central pelo botão de agendamento rápido do WhatsApp.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="bg-yellow-500 text-gray-950 w-5 h-5 rounded-full flex items-center justify-center font-mono font-black shrink-0 mt-0.5">3</span>
                <span>Visite nossa mega loja física no Portão, acompanhe a montagem computadorizada e pague apenas após os pneus estarem perfeitamente instalados em seu veículo.</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase font-mono text-gray-950">Vantagens de Comprar Conosco na Internet</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-medium">
              Ao contrário de sites que cobram fretes altíssimos para entregar em Curitiba, aqui o preço exibido é o preço real que você pagará na loja com a montagem, bicos e calibragens inclusas. Sem letras miúdas, sem pegadinhas técnicas.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou no melhor site para comprar pneus e quero tirar dúvidas sobre pneus novos e agendar uma montagem física no Portão.",
      faqs: [
        { q: "Preciso pagar adiantado no site?", a: "De forma alguma! Você faz a reserva do pneu pelo site ou WhatsApp sem adiantamentos e efetua o pagamento apenas na loja física." },
        { q: "A montagem é cobrada à parte?", a: "Não. A montagem dos pneus em nosso auto center é cortesia integral Carplus ao comprar o jogo de composto." }
      ]
    },
    'distribuidora-de-pneus-importados-atacado-curitiba': {
      title: "Distribuidora de Pneus Importados no Atacado",
      subtitle: "Vendas corporativas sob demanda para frotas, revendedores, faturados CNPJ e oficinas paranaenses.",
      tag: "Parceria Corporativa CNPJ",
      bgGradient: "from-sky-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            A Carplus opera como uma sólida <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">distribuidora de pneus importados no atacado em Curitiba</strong>, oferecendo o maior catálogo de compostos asiáticos e de marcas consolidadas pelo menor preço em grande escala do Sul do país.
          </p>

          <div className="border border-dashed border-gray-200 rounded-2xl p-5 bg-yellow-500/5 space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-950 font-mono tracking-widest">Condições exclusivas para faturamento frotista:</h4>
            <ul className="text-xs text-gray-600 font-medium space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0"></span>
                <span>Faturamento flexível via boleto bancário facilitado sob consulta CNPJ.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0"></span>
                <span>Envio rápido de logística integrada para toda Curitiba, região metropolitana e litoral.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0"></span>
                <span>Modelos homologados pelo Inmetro e adequados à severa legislação de segurança corporativa.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0"></span>
                <span>Suporte técnico de engenharia de pneus para otimização de desgaste de frota leve.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-black uppercase font-mono text-gray-950">Estoque de Máxima Disponibilidade Industrial</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-semibold">
              Possuímos um estoque robusto e parcerias com as principais marcas globais (Delinte, Xbri, Roadcruza, Sailun, Triangle, Hankook e Pirelli). Abastecemos frotas de utilitários, carros de aplicativos corporativos, concessionárias de usados e locadoras regionais no Paraná.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Atuo com frotas/revenda e gostaria de solicitar uma cotação em lote no atacado de pneus importados para CNPJ.",
      faqs: [
        { q: "Quais documentos são necessários para faturado no boleto?", a: "Apenas o cartão CNPJ, contrato social atualizado e referências comerciais padrão do mercado automotivo." },
        { q: "Vocês possuem lote mínimo para atacado?", a: "Sim, os lotes faturados com preços exclusivos corporativos de atacado iniciam a partir de 12 unidades mistas." }
      ]
    },
    'pneu-hankook-curitiba': {
      title: "Pneu Hankook Curitiba",
      subtitle: "Linhas Dynapro, Ventus e Optimo à pronta entrega com montagem robotizada e bicos grátis.",
      tag: "Tecnologia Coreana Máxima",
      bgGradient: "from-zinc-900 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Os pneus <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Hankook em Curitiba</strong> são altamente cobiçados devido à alta engenharia coreana embarcada. Sendo equipamento original de fábrica em veículos de luxo (Audi, BMW, Hyundai, Volkswagen-Premium), a Hankook traz performance silenciada incomparável.
          </p>

          <div className="bg-gray-50 border border-gray-150 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-950 font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              Categorias premium Hankook disponíveis:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-650 font-medium">
              <p><strong>Hankook Ventus Prime:</strong> Ideal para sedãs e hatches, focado no conforto acústico impecável e altíssima estabilidade lateral em alta velocidade.</p>
              <p><strong>Hankook Dynapro AT:</strong> Linha robusta off-road premium para caminhonetes Hilux, Ranger, Amarok com alta durabilidade na terra batida.</p>
              <p><strong>Hankook Kinergy Eco:</strong> Composto de baixa resistência ao rolamento, formulado cientificamente para economizar no combustível urbano.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase font-mono text-gray-950">A Melhor Experiência de Montagem Física</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-bold">
              Como pneus premium exigem ferramental correto, nossas desmontadoras na Carplus possuem proteção em Nylon especial que impede qualquer tipo de risco nas rodas diamantadas de liga leve de seu veículo nacional ou importado de luxo.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou buscando orçamento da marca Hankook para o meu veículo. Quais linhas e medidas vocês têm em estoque?",
      faqs: [
        { q: "A marca Hankook é durável?", a: "Sem dúvidas, os pneus Hankook frequentemente atingem mais de 50.000 quilômetros rodados de vida útil quando mantidos alinhados periodicamente." },
        { q: "Qual a origem dos pneus Hankook?", a: "A Hankook é de origem sul-coreana, figurando atualmente entre as 7 maiores e mais conceituadas fabricantes globais de pneus." }
      ]
    },
    'pneus-bridgestone-curitiba-precos': {
      title: "Pneus Bridgestone Curitiba Preços",
      subtitle: "A maior fabricante de pneus do mundo com orçamentos competitivos e condições facilitadas no Portão.",
      tag: "Durabilidade Suprema Japonesa",
      bgGradient: "from-red-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Os pneus <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Bridgestone em Curitiba</strong> representam o ápice do desenvolvimento industrial de pneus. Conhecida por fabricar carcaças extremamente robustas que resistem às severas irregularidades do asfalto paranaense sem criar bolhas laterais de deformação.
          </p>

          <div className="border border-red-500/10 bg-red-500/5 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-red-950 font-mono tracking-widest flex items-center gap-1.5 text-left">
              <TrendingUp className="w-4 h-4 text-red-650" />
              Por que a Bridgestone se destaca no asfalto?
            </h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              A linha <strong>Bridgestone Turanza</strong> é amplamente referenciada como o pneu mais silencioso e seguro em condições extremas de curvas molhadas. Já a linha <strong>Ecopia</strong> utiliza óleos naturais na formulação para reduzir sensivelmente o consumo de combustível e a emissão de CO2 do carro na cidade.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase font-mono text-gray-950">Confira Preços Vantajosos Conosco</h3>
            <p className="text-xs text-gray-650 leading-relaxed font-bold">
              Negociamos diretamente lotes de reposição e oferecemos preços extremamente competitivos frente às concessionárias de marcas de pneus comuns. Faça seu agendamento no Portão e garanta montagem, balanceamento computadorizado e bicos comuns inclusas no pacote técnico!
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Gostaria de consultar os preços promocionais para pneus Bridgestone em Curitiba para o meu carro.",
      faqs: [
        { q: "A Bridgestone fabrica também a Firestone?", a: "Sim, a conceituada marca Firestone é uma subsidiária oficial que pertence à fabricante japonesa Bridgestone no Brasil." },
        { q: "Qual a calibragem correta para o pneu Bridgestone?", a: "Recomenda-se aferir a pressão fria semanalmente de acordo com a pressão estipulada no manual do proprietário do respectivo veículo." }
      ]
    },
    'barao-pneus-e-oficina-bacacheri-curitiba': {
      title: "Alternativa a Barão Pneus e Oficina Bacacheri",
      subtitle: "Buscando pneus novos com geometria 3D computadorizada? Descubra por que a Carplus é a alternativa perfeita.",
      tag: "Tecnologia de Alta Performance",
      bgGradient: "from-emerald-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Se você reside próximo ao norte de Curitiba e está buscando por <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Barão Pneus e Oficina Bacacheri Curitiba</strong>, saiba que a região conta com opções tradicionais interessantes. No entanto, se o seu foco é economizar de verdade nas melhores marcas importadas e nacionais com rampa 3D de nível internacional e montagem robotizada gratuita, vale a pena conhecer as exclusividades técnicas do box Carplus Pneus Portão.
          </p>

          <div className="bg-gray-50 border border-gray-150 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-950 font-mono tracking-widest text-left">
              O que você ganha optando pela Carplus Pneus Portão?
            </h4>
            <ul className="text-xs text-gray-650 font-bold space-y-2">
              <li className="flex items-center gap-2">
                 <Check className="w-4 h-4 text-yellow-500 shrink-0" />
                 <span><strong>Bicos Novos Comuns inteiramente de Graça</strong>: Sem surpresas na hora de receber sua nota de serviços.</span>
              </li>
              <li className="flex items-center gap-2">
                 <Check className="w-4 h-4 text-yellow-500 shrink-0" />
                 <span><strong>Geometria 3D no Portão</strong>: Equipamento laser tridimensional recalibrado semanalmente conforme as especificações de montadoras premium de luxo.</span>
              </li>
              <li className="flex items-center gap-2">
                 <Check className="w-4 h-4 text-yellow-500 shrink-0" />
                 <span><strong>Estoque Unificado de Varejo direto do Atacado</strong>: O melhor valor final líquido real em pneus Pirelli, Delinte, Goodyear, Bridgestone, Xbri, Hankook e Dunlop.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou na região do Bacacheri e recebi indicação de vocês pelo preço de pneus. Gostaria de cotar e marcar montagem.",
      faqs: [
        { q: "A Carplus possui convênio ou filial física no Bacacheri?", a: "Nossa ampla oficina integrada unificada fica situada estrategicamente na Av. Arthur Bernardes, Portão, concentrando nossa maior rampa automotiva para trazer custos de operação menores para o público final." },
        { q: "Possuem atendimento rápido aos sábados?", a: "Sim, nosso expediente aos sábados vai das 08h às 12h, operando com equipe de pista reforçada para montagem ágil." }
      ]
    },
    'barao-pneus-sao-jose-pinhais': {
      title: "Conheça Alternativa a Barão Pneus São José Pinhais",
      subtitle: "Descubra preços muito mais baratos em pneus novos de fábrica com rampa 3D computadorizada.",
      tag: "Distribuição Direta Paraná",
      bgGradient: "from-blue-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Motoristas de Pinhais e São José dos Pinhais buscam marcas confiáveis com valores justos, como a tradicional <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Barão Pneus São José dos Pinhais</strong>. Para garantir preços líquidos incríveis e assessoria em suspensões de altíssimo nível, muitos descem a rápida do Portão para aproveitar as vantagens competitivas Carplus Pneus.
          </p>

          <div className="bg-yellow-500/5 border border-yellow-500/15 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-950 font-mono tracking-widest text-left">
              Facilidades exclusivas no Portão:
            </h4>
            <p className="text-xs text-gray-650 leading-relaxed">
              Toda a linha leve de pneus, pneus robustos para caminhonetes e SUVs de passeio estão à pronta entrega em nossa mecânica. Nossos alinhadores avaliam o ângulo de câmber, caster e convergência eletronicamente sem riscar as rodas diamantadas, garantindo geometria milimétrica impecável para poupar seu combustível nas rodovias.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Sou de São José dos Pinhais e estou buscando preços competitivos de pneus novos. Gostaria de receber um orçamento de vocês.",
      faqs: [
        { q: "Quais as principais marcas de pneus que vocês vendem noPortão?", a: "Vendemos marcas de grande desempenho como Pirelli, Goodyear, Bridgestone, Delinte, Xbri, Hankook, Dunlop e Roadcruza." },
        { q: "A revisão da suspensão é cobrada?", a: "Na Carplus Pneus, a vistoria preventiva suspensa e diagnóstico de suspensão no elevador são 100% cortesias técnicas profissionais!" }
      ]
    },
    'pneus-em-curitiba-melhor-preco': {
      title: "Pneus com o Melhor Preço em Curitiba",
      subtitle: "Cobrimos propostas impressas de compostos novos com bicos inclusos e montagem física no box.",
      tag: "Menor Preço Líquido",
      bgGradient: "from-emerald-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            O asfalto urbano exige pneus resistentes e seguros no asfalto molhado. A busca pelo <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">melhor preço de pneus em Curitiba</strong> costuma esbarrar em propostas complicadas que escondem taxas surpresa de instalação. Aqui na Carplus Pneus, o valor de tabela é transparente e cobre as necessidades reais do veículo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-500/15 bg-green-500/5 p-4 rounded-2xl text-left space-y-2">
              <h4 className="text-xs font-bold uppercase text-green-950 font-mono">Diferença de Venda Carplus</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Sourcing direto com grandes fábricas e portos de importação, encurtando intermediários e reduzindo taxas de comercialização repassadas ao consumidor.</p>
            </div>
            <div className="border border-yellow-500/15 bg-yellow-500/5 p-4 rounded-2xl text-left space-y-2">
              <h4 className="text-xs font-bold uppercase text-yellow-950 font-mono">Eliminação de Tarifas de Montagem</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Diga adeus a cobrar taxas avulsas de bicos novos, descarte ecológico ou utilização de elevador. Inteiramente inclusos cortesias!</p>
            </div>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou pesquisando pneus na cidade de Curitiba e quero fechar o melhor preço nacional ou importado com vocês.",
      faqs: [
        { q: "O preço anunciado cobre faturamento parcelado?", a: "Trabalhamos com excelentes condições em até 10x sem juros ou desconto considerável à vista para Pix." },
        { q: "Quais os aros disponíveis à pronta entrega?", a: "Abastecemos aros do compacto 13 ao utilitário picape aro 20 de alta performance com estoque real em loja." }
      ]
    },
    'distribuidora-de-pneus-em-curitiba': {
      title: "Distribuidora de Pneus em Curitiba",
      subtitle: "Venda direta varejo sem intermediários com o maior parque logístico e estoque do Portão.",
      tag: "Do Atacado Direto ao Varejo",
      bgGradient: "from-sky-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Na Carplus Pneus, assumimos a função de uma verdadeira <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">distribuidora de pneus em Curitiba</strong>. Variações expressas de preços que você geralmente vê em grandes redes estão disponíveis aqui na Arthur Bernardes direto para seu veículo de passeio.
          </p>

          <div className="bg-gray-50 border border-gray-150 p-5 rounded-3xl space-y-2 text-justify">
            <span className="font-mono text-[9px] text-[#f49e1a] uppercase font-black tracking-widest block font-bold">Por Dentro de Nossa Distribuidora:</span>
            <p className="text-xs text-gray-650 leading-relaxed font-medium">
              Eliminamos o modelo tradicional de comissionamento embutido do varejo convencional. Ao comprar com um de nossos consultores de frota ou varejo técnico, apresentamos as opções mais duráveis de composto de acordo com a quilometragem média que seu veículo transita, garantindo a excelente relação de durabilidade e custo útil real.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Quero falar com a distribuidora de pneus em Curitiba para comprar pneus novos direto do estoque físico do Portão.",
      faqs: [
        { q: "Fazem venda de pneu para veículos SUV de aro grande?", a: "Sim, temos estoque focado em alta gama para SUVs aros 17, 18, 19 e 20 com proteção reforçada de flanco em borracha." },
        { q: "Possuem serviço de cambagem se as rodas estiverem tortas?", a: "Dispomos de equipe especializada e rampa suspensa para correções de cambagem e caster com total segurança mecânica." }
      ]
    },
    'bana-pneus': {
      title: "Alternativa a Bana Pneus",
      subtitle: "Seu guia para a melhor decisão técnica de pneus Goodyear nacionais em Curitiba.",
      tag: "Opções Técnicas de Qualidade",
      bgGradient: "from-amber-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Quando se fala em pneus Goodyear tradicionais, a rede <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Bana Pneus em Curitiba</strong> é uma das marcas históricas de auto center. No entanto, o motorista curitibano busca hoje diversidade de propostas de produtos, garantias facilitadas e montagem gratuita rápida.
          </p>

          <div className="bg-yellow-500/5 border border-yellow-500/15 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-950 font-mono tracking-widest text-left flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-yellow-600" />
              A importância da decisão livre no auto center:
            </h4>
            <p className="text-xs text-gray-650 leading-relaxed font-bold">
              Na Carplus Pneus, você tem a liberdade de comparar tecnicamente no box lado a lado pneus importados de altíssima tração e pneus nacionais consagrados como a marca Pirelli, avaliando o custo-benefício de cada desenho de banda de rodagem. Nosso compromisso é orientar a melhor escolha do cliente para o uso no dia a dia.
            </p>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Estou pesquisando pneus em Curitiba e comparando marcas. Gostaria de receber um orçamento de pneus novos e importados.",
      faqs: [
        { q: "Qual a diferença entre pneus Goodyear e Pirelli?", a: "Ambas são gigantes mundiais homologadas: a Pirelli destaca-se por excelente resposta dinâmica esportiva nas frenagens, enquanto a Goodyear tem apalpação macia de rodagem." },
        { q: "Posso parcelar meu pneu novo na Carplus?", a: "Sim! Oferecemos parcelamento em até 10x sem juros sob condições amigáveis de cartão de crédito." }
      ]
    },
    'loja-de-pneus-em-curitiba': {
      title: "Loja de Pneus em Curitiba",
      subtitle: "Seu centro automotivo especializado na Av. Arthur Bernardes, no Portão. Transparência técnica.",
      tag: "Estrutura Moderna Portão",
      bgGradient: "from-zinc-900 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Na nossa <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">loja de pneus em Curitiba</strong>, aliamos o atendimento atencioso da bacia de bairros ao que há de mais tecnológico em termos de alinhamento tridimensional, balanceamento eletrônico de massa de precisão e troca profissional de óleo do motor, filtros e pastilhas de freio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-150 p-4 rounded-2xl bg-gray-50 text-left space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-950 font-mono">Infraestrutura Ampla</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">Amplo box de estacionamento rápido no Portão, projetado para que você possa acompanhar no piso de loja cada detalhe da execução técnica do carro.</p>
            </div>
            <div className="border border-gray-150 p-4 rounded-2xl bg-gray-50 text-left space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-950 font-mono">Maquinário Anti-Riscos</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">Desmontadoras automotivas pneumáticas modernas dotadas de braço auxiliar auxiliar, que desmontam os pneus sem forçar ou riscar o aro.</p>
            </div>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Gostaria de agendar uma visita em sua loja física de pneus no Portão para trocar os pneus e revisar minha suspensão.",
      faqs: [
        { q: "Onde fica a loja exatamente?", a: "Nosso auto center unificado está situado na Av. General Arthur Bernardes, facilitando o acesso instantâneo para moradores do Portão, Seminário e Água Verde." },
        { q: "Precisa agendar a montagem de pneu murcho?", a: "Não é obrigatório, mas agendando pelo WhatsApp você ganha prioridade de rampa instantânea no box de pista!" }
      ]
    },
    'pneus-pirelli-em-curitiba-melhor-preco': {
      title: "Pneus Pirelli Curitiba Melhor Preço",
      subtitle: "Linhas oficiais Cinturato, Scorpion e P-Zero à pronta entrega homologadas pelas grandes montadoras.",
      tag: "Esportividade e Segurança Pirelli",
      bgGradient: "from-amber-950 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Os pneus <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">Pirelli em Curitiba pelo melhor preço</strong> estão concentrados na Carplus Pneus. Como a Pirelli é a marca líder preferencial do motorista paranaense, mantemos estoques amplos para frotas de passeio e picapes de passeio imediatos.
          </p>

          <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-black uppercase text-amber-900 font-mono tracking-widest text-left">
              Linha Pirelli Homologada Oficial:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-650 font-medium">
              <p><strong>Pirelli Cinturato P1 e P7:</strong> Modelos duráveis para sedãs, hatchbacks médios e populares, unindo alta tração mecânica seca ao conforto acústico suave.</p>
              <p><strong>Pirelli Scorpion:</strong> Focado no asfalto misto e terra para veículos SUV, utilitários, picapes Oroch, Toro, Duster, Compass com excelente aderência útil.</p>
            </div>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Gostaria de cotar o melhor preço de pneus Pirelli Cinturato / Scorpion em Curitiba para o meu veículo hoje.",
      faqs: [
        { q: "Os pneus Pirelli têm garantia?", a: "Sim, todos os pneus Pirelli novos possuem garantia integral oficial direto de fábrica de 5 anos via auditoria da marca." },
        { q: "Qual a vantagen da linha Cinturato?", a: "Frenagens ágeis em pistas úmidas, escoamento instantâneo da lâmina de chuva e alta resistência contra desgaste acelerado de banda." }
      ]
    },
    'barao-pneus-e-oficina-portao': {
      title: "Pneus no Portão Curitiba - Loja de Pneus no Portão",
      subtitle: "Estoque a pronta entrega, montagem técnica com bicos novos grátis, alinhamento 3D e balanceamento na Av. Arthur Bernardes.",
      tag: "Loja de Pneus no Portão",
      bgGradient: "from-zinc-900 to-gray-950",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-gray-650 leading-relaxed font-semibold">
            Procurando por <strong className="text-gray-955 bg-yellow-500/10 px-1 py-0.5 rounded">pneus no Portão em Curitiba</strong>? A Carplus Pneus é sua loja especializada no bairro Portão, localizada na Av. Presidente Arthur da Silva Bernardes, 1323. Oferecemos pronta entrega das melhores marcas de pneus (Pirelli, Bridgestone, Goodyear, Michelin, Continental, Firestone, Dunlop, Delinte, Xbri e Hankook) com bicos de borracha novos e montagem totalmente gratuita.
          </p>

          <div className="bg-yellow-500/5 border border-yellow-500/15 p-5 rounded-3xl space-y-3">
            <h3 className="text-sm font-black text-gray-950 uppercase font-mono">Por que comprar e instalar seus pneus no Portão com a Carplus?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span><strong>Pronta entrega no Portão:</strong> pneus aro 13 a 20 em estoque físico imediato.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span><strong>Montagem e Válvulas Grátis:</strong> trocamos seus pneus sem taxas escondidas com máquinas anti-risco.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span><strong>Alinhamento e Balanceamento no Portão:</strong> rampa 3D tridimensional de alta precisão.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span><strong>Atendimento a Bairros Próximos:</strong> localização estratégica no Portão para clientes do Água Verde, Vila Izabel, Batel, Capão Raso e Novo Mundo.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      whatsappText: "Olá Carplus! Moro no Portão e gostaria de cotar pneus a pronta entrega na loja da Av. Arthur Bernardes.",
      faqs: [
        { q: "Onde fica a loja de pneus da Carplus no Portão?", a: "Nossa loja física situa-se na Av. Presidente Arthur da Silva Bernardes, 1323, bairro Portão, Curitiba - PR, CEP 80320-300." },
        { q: "Quais serviços de pneu são feitos no Portão?", a: "Fazemos montagem técnica, troca de bicos/válvulas, balanceamento computadorizado e alinhamento 3D tridimensional." },
        { q: "Possuem pneus a pronta entrega no Portão para carros e SUVs?", a: "Sim, mantemos estoque próprio a pronta entrega de pneus passeio, SUV e caminhonete do aro 13 ao 20." }
      ]
    }
  };

  const activePage = pageData[view];

  if (!activePage) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-red-500 font-mono font-bold">Página não encontrada ou sob ondas de liberação.</p>
        <button onClick={onNavigateHome} className="bg-black text-white px-5 py-2.5 rounded-xl text-xs uppercase font-mono font-extrabold transition">
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in font-sans" id={`search-intent-${view}`}>
      {/* Header and Back Link */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-xs font-black uppercase text-gray-500 hover:text-black transition cursor-pointer font-mono"
        >
          ← Voltar para o Início
        </button>
        <span className="bg-yellow-500/10 text-yellow-650 font-mono font-black text-[9px] uppercase px-3.5 py-1.5 rounded-full border border-yellow-500/25">
          {activePage.tag}
        </span>
      </div>

      {/* Visual Hero Box */}
      <div className={`bg-gradient-to-r ${activePage.bgGradient} p-6 sm:p-8 rounded-3xl text-white shadow-xl text-left space-y-4`}>
        <div className="space-y-2">
          <span className="font-mono text-yellow-500 uppercase tracking-widest text-[9px] font-black">Pesquisa de Intenção Atendida</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-mono tracking-tight text-white leading-tight">
            {activePage.title}
          </h1>
          <p className="text-gray-300 font-medium leading-relaxed text-xs sm:text-sm max-w-2xl">
            {activePage.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-wrap gap-4 text-[10px] sm:text-[11px] text-gray-300 font-mono font-black uppercase">
          <span className="flex items-center gap-1"><Check className="text-[#f49e1a] w-4 h-4" /> Montagem Técnica Grátis</span>
          <span className="flex items-center gap-1"><Check className="text-[#f49e1a] w-4 h-4" /> Bicos de Borracha Novos</span>
          <span className="flex items-center gap-1"><Check className="text-[#f49e1a] w-4 h-4" /> Vistoria de Suspensão Cortesia</span>
        </div>
      </div>

      {/* Page Body Custom Rich Content */}
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 space-y-6">
        {activePage.content}
      </div>

      {/* Conversion WhatsApp Banner */}
      <div className="bg-yellow-500/5 border border-yellow-500/15 p-6 rounded-3xl text-center space-y-4 font-sans">
        <h3 className="text-md sm:text-lg font-black uppercase font-mono text-gray-950 tracking-tight leading-snug">
          Gostaria de falar com o consultor técnico e poupar em pneus novos hoje?
        </h3>
        <p className="text-xs text-gray-650 max-w-xl mx-auto leading-relaxed font-bold">
          Efetue uma cotação rápida no WhatsApp oficial da Carplus. Garantimos estoque real imediato e a melhor proposta em Curitiba no Portão!
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href={formatWhatsApp(activePage.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow border border-black cursor-pointer align-middle text-center"
          >
            Falar pelo WhatsApp ➔
          </a>
          <button 
            onClick={onNavigateHome}
            className="w-full sm:w-auto bg-black hover:bg-[#f49e1a] text-white hover:text-black font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition border border-black cursor-pointer"
          >
            Ver Catálogo Online
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4 text-left">
        <h3 className="text-sm font-black uppercase font-mono text-gray-500 tracking-wider flex items-center gap-1.5">
          <Info className="w-4 h-4 text-gray-400" /> Dúvidas Frequentes Automotivas (FAQ)
        </h3>

        <div className="space-y-2.5 font-sans">
          {activePage.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="border border-gray-150 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-yellow-500/5 transition gap-4"
                >
                  <span className="text-xs font-black uppercase text-gray-950 leading-relaxed font-mono">
                    {faq.q}
                  </span>
                  <ChevronRight className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-[#f49e1a]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-650 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
