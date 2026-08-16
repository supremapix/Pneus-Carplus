import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Zap, Award, ThumbsUp, DollarSign, Wrench, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  carType: string;
  city: string;
  rating: number;
  category: 'preco' | 'eletrico' | 'honestidade';
  categoryLabel: string;
  teamMention?: string;
  quote: string;
  reviewText: string;
  date: string;
  badge: string;
  avatarLetter: string;
  avatarColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  // Categoria 1: Preço e Economia
  {
    id: 't1',
    name: 'Carlos Eduardo Mendes',
    vehicle: 'Toyota Corolla XEi',
    carType: 'Sedan Premium',
    city: 'Curitiba (Água Verde)',
    rating: 5,
    category: 'preco',
    categoryLabel: 'Preço & Economia',
    teamMention: 'Matheus',
    quote: 'Cobriram o orçamento da concorrência e ainda deram a montagem!',
    reviewText: 'Pesquisei em quatro grandes lojas de pneus de Curitiba antes de comprar. Cheguei na Carplus com um orçamento impresso e o Matheus cobriu na hora o valor do jogo Pirelli! Sem enrolação, sem taxas ocultas e a montagem com válvulas novas foi 100% cortesia. Economizei quase R$ 380 no jogo completo.',
    date: 'Avaliação real no Google',
    badge: 'Economia Comprovada',
    avatarLetter: 'C',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 't2',
    name: 'Mariana Silveira Ramos',
    vehicle: 'Jeep Compass Longitude',
    carType: 'SUV Médio',
    city: 'Curitiba (Portão)',
    rating: 5,
    category: 'preco',
    categoryLabel: 'Preço & Economia',
    teamMention: 'Vinicius',
    quote: 'Menor preço de Curitiba em 10x sem juros reais!',
    reviewText: 'Passei em dois autocenters na Linha Verde que queriam empurrar mil serviços extras além dos pneus. Na Carplus o Vinicius me atendeu com honestidade pura, fez o menor preço à vista em 10x no cartão sem acréscimo e entregou o carro alinhado em menos de 45 minutos. Nota 1000!',
    date: 'Avaliação real no Google',
    badge: '10x Sem Juros',
    avatarLetter: 'M',
    avatarColor: 'bg-amber-600'
  },

  // Categoria 2: Especialista em Carros Elétricos / Premium
  {
    id: 't3',
    name: 'Rodrigo Albuquerque',
    vehicle: 'BYD Dolphin Mini EV',
    carType: '100% Elétrico',
    city: 'Curitiba (Batel)',
    rating: 5,
    category: 'eletrico',
    categoryLabel: 'Especialista em EVs',
    teamMention: 'Jocimar',
    quote: 'Única oficina de Curitiba que realmente entende de carro elétrico!',
    reviewText: 'Fiquei com receio de levar meu Dolphin Mini em qualquer lugar por conta do peso da bateria e do ponto de apoio no elevador. O Jocimar me explicou tecnicamente a importância do índice de carga correto e o alinhamento 3D foi perfeito, o carro não puxa nada e o silêncio a bordo continua impecável.',
    date: 'Avaliação real no Google',
    badge: 'BYD Homologado',
    avatarLetter: 'R',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 't4',
    name: 'Fernando Guimarães Castro',
    vehicle: 'GWM Haval H6 Premium',
    carType: 'Híbrido Plug-in',
    city: 'São José dos Pinhais (RMC)',
    rating: 5,
    category: 'eletrico',
    categoryLabel: 'Especialista em EVs',
    teamMention: 'Matheus & Jocimar',
    quote: 'Pneus Pirelli Elect aro 19 a pronta entrega e preço imbatível.',
    reviewText: 'Vim de São José dos Pinhais porque nenhuma loja tinha a medida homologada do Haval H6 em estoque ou cobravam um absurdo. O Matheus me atendeu pelo WhatsApp, separou os pneus e o Jocimar fez a geometria 3D respeitando todos os parâmetros de fábrica. Serviço de concessionária com preço justo.',
    date: 'Avaliação real no Google',
    badge: 'Pirelli Elect EV',
    avatarLetter: 'F',
    avatarColor: 'bg-indigo-600'
  },

  // Categoria 3: Atendimento e Honestidade
  {
    id: 't5',
    name: 'Juliana Beatriz Fontes',
    vehicle: 'Honda HR-V EXL',
    carType: 'SUV Compacto',
    city: 'Curitiba (Batel)',
    rating: 5,
    category: 'honestidade',
    categoryLabel: 'Atendimento & Honestidade',
    teamMention: 'Vinicius',
    quote: 'Disseram que minha suspensão estava perfeita. Honestidade rara!',
    reviewText: 'Em outra loja me disseram que eu precisava trocar amortecedor e buchas antes de colocar os pneus. Levei na Carplus para uma segunda opinião e o Vinicius colocou o carro na rampa, me chamou para olhar e provou que a suspensão estava 100% íntegra. Troquei apenas os 4 pneus. Ganharam uma cliente para a vida toda.',
    date: 'Avaliação real no Google',
    badge: 'Diagnóstico 100% Honesto',
    avatarLetter: 'J',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 't6',
    name: 'Marcos Vinicius Tessari',
    vehicle: 'Volkswagen T-Cross TSI',
    carType: 'SUV Flex',
    city: 'Araucária (RMC)',
    rating: 5,
    category: 'honestidade',
    categoryLabel: 'Atendimento & Honestidade',
    teamMention: 'Matheus',
    quote: 'Pontualidade britânica, sala de espera excelente e zero surpresas.',
    reviewText: 'Agendei pelo site e pelo WhatsApp com o Matheus. Cheguei, meu jogo de pneus já estava separado com as etiquetas. Enquanto tomava um café na sala climatizada, acompanhei todo o serviço pelo vidro. Equipe educada, preço exatamente o combinado e garantia de 5 anos documentada.',
    date: 'Avaliação real no Google',
    badge: 'Cliente Satisfeito',
    avatarLetter: 'M',
    avatarColor: 'bg-purple-600'
  }
];

const CLOSING_FAQS = [
  {
    q: 'A Carplus realmente cobre qualquer orçamento de pneus em Curitiba?',
    a: 'Sim, garantido! Se você recebeu uma cotação formal de qualquer loja de pneus ou autocenter de Curitiba e Região Metropolitana para o mesmo modelo e marca, envie uma foto pelo WhatsApp. Cobrimos o valor e ainda mantemos a montagem técnica gratuita!'
  },
  {
    q: 'Como funciona o parcelamento em 10x sem juros?',
    a: 'Todos os nossos pneus e serviços podem ser parcelados em até 10 vezes fixas sem juros em todos os cartões de crédito (Visa, Mastercard, Elo, Hipercard). Não cobramos taxas adicionais no parcelamento e para pagamento via PIX à vista ainda oferecemos desconto especial.'
  },
  {
    q: 'Quanto tempo dura o serviço de troca de pneus e alinhamento 3D?',
    a: 'Nosso tempo médio de atendimento é de 30 a 45 minutos para o jogo completo de 4 pneus com montagem, balanceamento computadorizado e alinhamento 3D. Você pode aguardar confortavelmente em nossa sala de espera climatizada com café, água e Wi-Fi.'
  },
  {
    q: 'Os pneus vendidos possuem garantia de fábrica?',
    a: 'Sim, 100% dos nossos pneus são novos, homologados com selo oficial do INMETRO e acompanham certificado de garantia de 5 anos de fábrica contra qualquer defeito de fabricação ou deformidade estrutural.'
  },
  {
    q: 'Vocês têm estrutura segura para carros elétricos (BYD, GWM, Volvo, Tesla)?',
    a: 'Sim! Possuímos rampas pantográficas com calços especiais de borracha de alta densidade que protegem integralmente o conjunto inferior de baterias e os sensores de alta voltagem, além de software de alinhamento 3D com parâmetros originais de fábrica para EVs.'
  }
];

export default function AuthoritySocialProof() {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'preco' | 'eletrico' | 'honestidade'>('todos');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const filteredTestimonials = activeCategory === 'todos' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category === activeCategory);

  const formatWhatsApp = (msg: string) => `https://wa.me/554130827282?text=${encodeURIComponent(msg)}`;

  return (
    <section className="w-full py-12 sm:py-16 text-gray-900" id="prova-social-autoridade">
      {/* Container Principal */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header da Seção com Badge de Autoridade */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#f49e1a]/15 text-gray-950 border border-[#f49e1a]/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-xs">
            <Award className="w-4 h-4 text-[#f49e1a]" />
            <span>Mais de 200 Avaliações 5 Estrelas no Google</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight font-display mb-4">
            Por Que Somos a Oficina Nº 1 <span className="text-[#f49e1a] underline decoration-[#f49e1a]/40">e Mais Barata</span> de Curitiba?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Não acredite apenas em palavras: confira a experiência real de motoristas de Curitiba e Região Metropolitana que economizaram, receberam atendimento honesto do <strong>Matheus, Vinicius e Jocimar</strong> e garantiram pneus homologados com montagem grátis.
          </p>
        </div>

        {/* Floating Trust Bar / Grid de Métricas de Alta Confiança */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white border-2 border-yellow-400/60 rounded-2xl p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-950 font-display">Nota 5.0 Máxima</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">214+ Avaliações Reais Google</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
              <DollarSign className="w-5 h-5 font-black" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-950 font-display">Menor Preço</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Cobrimos Orçamentos de CWB</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
              <Zap className="w-5 h-5 font-black" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-950 font-display">Especialista EV</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">BYD, GWM, Volvo & Tesla</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-[#f49e1a] flex items-center justify-center mb-1">
              <ShieldCheck className="w-5 h-5 font-black" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-950 font-display">5 Anos Garantia</span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pneus Novos Homologados</span>
          </div>
        </div>

        {/* Filtros das Categorias de Prova Social */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8" id="social-proof-filters">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === 'todos'
                ? 'bg-gray-950 text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
            }`}
          >
            Todos os Depoimentos (6)
          </button>
          <button
            onClick={() => setActiveCategory('preco')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'preco'
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-500'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Preço & Economia
          </button>
          <button
            onClick={() => setActiveCategory('eletrico')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'eletrico'
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Elétricos & Premium (BYD/GWM)
          </button>
          <button
            onClick={() => setActiveCategory('honestidade')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'honestidade'
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-500'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Atendimento & Honestidade
          </button>
        </div>

        {/* Grid de Depoimentos Reais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 hover:border-[#f49e1a] rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Header do Card */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${
                    t.category === 'preco' ? 'bg-emerald-600' : t.category === 'eletrico' ? 'bg-blue-600' : 'bg-amber-600'
                  }`}>
                    {t.badge}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Frase de Destaque */}
                <h4 className="text-base font-black text-gray-950 leading-snug mb-3 group-hover:text-[#f49e1a] transition-colors">
                  "{t.quote}"
                </h4>

                {/* Texto do Depoimento */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {t.reviewText}
                </p>
              </div>

              {/* Footer do Card com Dados do Cliente e Técnico */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarColor} text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0`}>
                    {t.avatarLetter}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-gray-950">{t.name}</h5>
                    <p className="text-[11px] font-bold text-gray-500">{t.vehicle} • {t.city}</p>
                  </div>
                </div>

                {t.teamMention && (
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">Atendido por</span>
                    <span className="text-[11px] font-black text-gray-900">{t.teamMention}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Conversão Rápida / CTA de Prova Social */}
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-[#f49e1a]/40 shadow-xl mb-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="bg-[#f49e1a] text-gray-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Desafio Menor Preço Carplus
              </span>
              <h3 className="text-xl sm:text-3xl font-black uppercase font-display tracking-tight text-white">
                Já Tem um Orçamento da Concorrência? Nós Cobrimos!
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Mande agora uma foto ou mensagem com o orçamento que você recebeu. A equipe do Matheus, Vinicius e Jocimar responde em menos de 5 minutos com o menor preço garantido e montagem grátis no Portão.
              </p>
            </div>

            <a
              href={formatWhatsApp('Olá Matheus e equipe Carplus! Já tenho um orçamento de pneus em Curitiba e gostaria de cobrir com o menor preço garantido da loja.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f49e1a] hover:bg-white hover:text-gray-950 text-gray-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-2xl shrink-0 group cursor-pointer"
              id="cta-social-proof-whatsapp"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Cobrir Meu Orçamento no WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* FAQ de Fechamento de Objeções (Garantia, 10x sem juros, Tempo) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm" id="faq-fechamento-objecoes">
          <div className="text-center sm:text-left space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-gray-950 border border-yellow-200 font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              <HelpCircle className="w-3.5 h-3.5 text-[#f49e1a]" />
              <span>Transparência Total</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight font-display">
              Perguntas Frequentes & Garantias de Fechamento
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Tudo o que você precisa saber antes de vir até a nossa autocenter no bairro Portão:
            </p>
          </div>

          <div className="space-y-3">
            {CLOSING_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-gray-950 hover:text-[#f49e1a] transition cursor-pointer font-bold text-xs sm:text-sm uppercase"
                  >
                    <span className="pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#f49e1a] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#f49e1a] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-gray-200/50 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
