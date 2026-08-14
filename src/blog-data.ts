export interface BlogSection {
  title?: string;
  level?: 'h2' | 'h3';
  paragraphs: string[];
  listItems?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'info';
    title: string;
    text: string;
  };
  internalLinks?: Array<{
    text: string;
    url: string;
    description?: string;
  }>;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  h1: string;
  category: 
    | 'Suspensão' 
    | 'Pneus' 
    | 'Alinhamento e Balanceamento' 
    | 'Freios' 
    | 'Manutenção Preventiva' 
    | 'Troca de Óleo' 
    | 'Diagnóstico Automotivo' 
    | 'Rodas' 
    | 'Dicas para Motoristas';
  summary: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string;
  publishedIso: string;
  updatedDate?: string;
  updatedIso?: string;
  readingTime: string;
  featuredImage: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  ctaTitle?: string;
  ctaText?: string;
  ctaButtonText?: string;
  whatsappMessage?: string;
  relatedSlugs: string[];
}

export const BLOG_CATEGORIES = [
  'Suspensão',
  'Pneus',
  'Alinhamento e Balanceamento',
  'Freios',
  'Manutenção Preventiva',
  'Troca de Óleo',
  'Diagnóstico Automotivo',
  'Rodas',
  'Dicas para Motoristas'
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'carro-puxando-para-o-lado',
    title: 'Carro puxando para o lado: o que pode ser e quando procurar uma oficina?',
    h1: 'Carro puxando para o lado: o que pode ser e quando procurar uma oficina?',
    category: 'Alinhamento e Balanceamento',
    summary: 'Seu carro tende a ir para a direita ou para a esquerda ao soltar levemente o volante em linha reta? Entenda as causas mecânicas prováveis e quando fazer uma avaliação presencial.',
    metaTitle: 'Carro Puxando para o Lado: O Que Pode Ser? | Blog Carplus',
    metaDescription: 'Descubra as principais causas do carro puxando para a direita ou esquerda: alinhamento, calibragem, suspensão e freios. Saiba quando agendar uma inspeção em Curitiba.',
    publishedDate: '12 de Agosto de 2026',
    publishedIso: '2026-08-12',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '6 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/alinhamento-jeep.webp',
    imageAlt: 'Alinhamento 3D computadorizado em veículo na oficina Carplus Pneus no Portão em Curitiba',
    intro: 'Você está dirigindo em uma via plana e reta, solta as mãos suavemente do volante por um segundo e percebe que o veículo imediatamente começa a derivar para a direita ou para a esquerda? Esse é um dos sintomas mais comuns relatados pelos motoristas nas oficinas de Curitiba. Embora pareça um incômodo menor no início, o carro puxando para o lado compromete a dirigibilidade, acelera o desgaste irregular dos pneus e sobrecarrega os componentes da direção.',
    sections: [
      {
        title: '1. Desalinhamento da Geometria da Direção',
        level: 'h2',
        paragraphs: [
          'A causa mais frequente para o veículo desviar de trajetória é a alteração nos ângulos de geometria das rodas dianteiras e traseiras: convergência, divergência, cambagem (camber) e cáster.',
          'Quando você passa por buracos mais profundos, sobe em guias ou transita constantemente por ruas com calçamento irregular — situações comuns no cotidiano urbano —, os tirantes e barras de direção sofrem pequenos desajustes milimétricos. Isso faz com que uma das rodas exerça força lateral contínua, puxando todo o veículo.'
        ],
        callout: {
          type: 'info',
          title: 'Diferença entre Convergência e Cambagem',
          text: 'A convergência mede se as rodas estão apontadas para dentro ou para fora vistas de cima. A cambagem mede a inclinação vertical da roda vista de frente. Ambos os desvios causam deriva e desgaste prematuro de borracha.'
        }
      },
      {
        title: '2. Diferença de Pressão nos Pneus (Calibragem Desigual)',
        level: 'h2',
        paragraphs: [
          'Antes de supor um problema mecânico complexo, verifique a calibragem dos pneus. Se o pneu dianteiro direito estiver com 24 PSI e o dianteiro esquerdo estiver com 32 PSI, o lado mais murcho apresentará maior área de atrito com o asfalto e maior resistência à rolagem.',
          'O resultado prático é que o veículo será "puxado" para o lado do pneu com menor pressão. Por isso, manter a calibragem recomendada pelo manual do proprietário (aferida a frio) é o primeiro passo para o diagnóstico.'
        ]
      },
      {
        title: '3. Desgaste Irregular ou Deformação nos Pneus',
        level: 'h2',
        paragraphs: [
          'Pneus que rodaram muito tempo descalibrados ou em veículos desalinhados acumulam desgaste assimétrico (mais gasto na borda interna ou externa). Mesmo após realizar um novo alinhamento, a conicidade residual da borracha pode continuar induzindo o carro para o lado.',
          'Deformações estruturais na carcaça do pneu (como rompimento de cintas de aço internas por impacto) também geram forças laterais constantes conhecidas na engenharia como "puxão por cone".'
        ]
      },
      {
        title: '4. Folgas e Desgastes na Suspensão e Direção',
        level: 'h2',
        paragraphs: [
          'Componentes com folga alteram a geometria dinâmica do carro em movimento. Entre as peças que merecem inspeção técnica cuidadosa estão:',
        ],
        listItems: [
          'Buchas de bandeja desgastadas ou ressecadas que permitem deslocamento dos braços oscilantes;',
          'Pivôs de suspensão com folga radial ou axial;',
          'Terminais de direção e axiais gastos;',
          'Coxins e rolamentos superiores do amortecedor danificados.'
        ]
      },
      {
        title: '5. Pinça de Freio Presa ou Agarrando',
        level: 'h2',
        paragraphs: [
          'Se o êmbolo da pinça de freio travar devido a acúmulo de sujeira ou oxidação, a pastilha de freio permanecerá em contato constante com o disco daquela roda, mesmo sem o pedal acionado.',
          'Além de puxar o veículo de maneira acentuada para o lado travado, essa falha provoca superaquecimento da roda, cheiro forte de queimado e aumento substancial no consumo de combustível.'
        ],
        callout: {
          type: 'warning',
          title: 'Alerta de Segurança',
          text: 'Se você notar que uma das rodas dianteiras está muito quente ao toque ou emitindo cheiro de queimado após rodar, procure imediatamente uma oficina especializada.'
        }
      },
      {
        title: 'Quando Procurar Avaliação Profissional?',
        level: 'h2',
        paragraphs: [
          'Se a calibragem foi conferida e o carro continua puxando, ou se a deriva for acompanhada de volante torto em linha reta, barulhos na suspensão ou trepidação, é hora de realizar uma inspeção presencial.',
          'Na oficina, o veículo é colocado na rampa de alinhamento computadorizado e no elevador para checagem minuciosa de folgas mecânicas, estado dos pneus e eficiência dos freios.'
        ],
        internalLinks: [
          {
            text: 'Conheça o serviço de Alinhamento 3D computadorizado da Carplus no Portão',
            url: '/alinhamento-3d-curitiba',
            description: 'Tecnologia laser tridimensional com precisão milimétrica para todas as marcas.'
          },
          {
            text: 'Entenda quando fazer alinhamento e balanceamento preventivo',
            url: '/blog/quando-fazer-alinhamento-balanceamento/',
            description: 'Sintomas comuns e intervalos recomendados para o cuidado do veículo.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'É perigoso andar com o carro puxando para o lado?',
        answer: 'Sim. Além de cansar o motorista que precisa corrigir a trajetória constantemente no volante, o carro puxando reduz a estabilidade em frenagens de emergência e acelera o desgaste irregular dos pneus, podendo inutilizá-los em poucos milhares de quilômetros.'
      },
      {
        question: 'Calibrar os pneus pode resolver o problema de puxar para o lado?',
        answer: 'Se a causa for apenas uma diferença de pressão entre as rodas do mesmo eixo, sim. Porém, se houver folga de suspensão, desgaste cônico na borracha ou desalinhamento da geometria, calibrar não resolverá e será necessária inspeção em oficina.'
      },
      {
        question: 'Qual a diferença entre alinhamento e balanceamento?',
        answer: 'O alinhamento ajusta os ângulos de direção das rodas para que rolem paralelas e retas. O balanceamento compensa desequilíbrios de peso no conjunto roda e pneu para evitar vibrações no volante em velocidades mais altas.'
      }
    ],
    ctaTitle: 'Seu carro está puxando para um dos lados?',
    ctaText: 'Agende uma avaliação técnica na Carplus em Curitiba. Nossa equipe verifica geometria, suspensão, freios e pneus para devolver a dirigibilidade segura e suave ao seu carro.',
    ctaButtonText: 'Agendar Avaliação no Portão',
    whatsappMessage: 'Olá Carplus! Meu carro está puxando para um dos lados e gostaria de agendar uma avaliação na loja do Portão.',
    relatedSlugs: [
      'quando-fazer-alinhamento-balanceamento',
      'pneu-desgastando-de-um-lado',
      'sinais-problemas-suspensao'
    ]
  },
  {
    id: '2',
    slug: 'barulho-suspensao-lombadas',
    title: 'Barulho na suspensão ao passar em lombadas: quais podem ser as causas?',
    h1: 'Barulho na suspensão ao passar em lombadas: quais podem ser as causas?',
    category: 'Suspensão',
    summary: 'Estalos secos, rangidos ou batidas ao transpor lombadas e valetas em Curitiba? Conheça os componentes que costumam gerar esses ruídos e a importância da inspeção técnica.',
    metaTitle: 'Barulho na Suspensão em Lombadas: Causas Prováveis | Blog Carplus',
    metaDescription: 'Ouviu estalos ou batidas na suspensão ao passar em quebra-molas? Entenda o papel de bieletas, amortecedores, buchas e coxins e quando fazer uma revisão.',
    publishedDate: '10 de Agosto de 2026',
    publishedIso: '2026-08-10',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '5 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanicos-trabalho.webp',
    imageAlt: 'Mecânicos profissionais avaliando sistema de suspensão em elevador automotivo na Carplus',
    intro: 'Passar por quebra-molas, valetas e desníveis no asfalto faz parte da rotina de qualquer motorista em Curitiba. No entanto, quando essa transposição vem acompanhada de barulhos como estalos metálicos, "toc-toc" seco ou rangidos de borracha, é sinal claro de que algum componente do conjunto de suspensão sofreu desgaste ou atingiu o fim de sua vida útil.',
    sections: [
      {
        title: 'Por Que a Suspensão Faz Barulho em Lombadas?',
        level: 'h2',
        paragraphs: [
          'Ao transpor uma lombada, a suspensão do carro passa por dois movimentos extremos sucessivos: compressão brusca (quando a roda sobe o obstáculo) e extensão (quando a roda desce de volta ao asfalto).',
          'Se todas as peças estiverem firmes e com a lubrificação e elasticidade adequadas, o impacto é absorvido silenciosamente. Porém, quando há folga mecânica ou borracha ressecada, os componentes metálicos entram em contato direto, gerando o ruído.'
        ]
      },
      {
        title: 'Principais Componentes Suspeitos',
        level: 'h2',
        paragraphs: [
          'Diferentes falhas na suspensão podem produzir sintomas auditivos bastante semelhantes. Por isso, apenas a inspeção em elevador automotivo consegue apontar o componente exato:',
        ],
        listItems: [
          'Bieletas da barra estabilizadora: São as maiores causadoras do barulho de "toc-toc" rápido ao passar em lombadas ou pisos irregulares. Possuem pequenas articulações esféricas que pegam folga com o tempo.',
          'Buchas da barra estabilizadora e das bandejas: Feitas de borracha vulcanizada, ressecam e racham com a poeira, umidade e variações térmicas de Curitiba, provocando rangidos tipo "cama velha" ou batidas secas.',
          'Amortecedores e batentes: Amortecedores com perda de fluido hidráulico ou gás perdem a capacidade de frenagem do movimento, fazendo a suspensão bater no fim de curso (batida seca no topo).',
          'Pivôs de suspensão: Fazem a ligação entre a manga de eixo e as bandejas. Folgas em pivôs são perigosas e causam estalos fortes em manobras e ondulações.',
          'Coxins e rolamentos superiores: Fixam o conjunto amortecedor/mola à carroceria. Quando rompidos, geram estalos audíveis dentro da cabine ao passar em quebra-molas ou girar o volante.'
        ]
      },
      {
        title: 'Sintomas Semelhantes, Causas Diferentes',
        level: 'h2',
        paragraphs: [
          'É fundamental destacar que um ruído na dianteira nem sempre vem da mesma peça em modelos de veículos diferentes. Um Ford Ka pode apresentar barulho de bieleta, enquanto em um Chevrolet Onix ou Fiat Mobi o ruído pode ter origem nas buchas da barra estabilizadora.',
          'Tentativas de "diagnosticar de ouvido" sem inspecionar o carro suspenso frequentemente levam à troca desnecessária de peças boas enquanto o real defeito permanece.'
        ],
        callout: {
          type: 'info',
          title: 'Inspeção com Alavanca Técnica',
          text: 'Na oficina, o mecânico posiciona o carro no elevador e utiliza alavancas específicas para forçar individualmente cada articulação, identificando folgas que não aparecem com o peso do carro no chão.'
        },
        internalLinks: [
          {
            text: 'Conheça nossos serviços de mecânica e suspensão no Portão',
            url: '/oficina-do-pneu-curitiba',
            description: 'Inspeção completa de amortecedores, molas, buchas e pivôs.'
          },
          {
            text: '7 sinais de que a suspensão do carro precisa de avaliação',
            url: '/blog/sinais-problemas-suspensao/',
            description: 'Aprenda a reconhecer outros indícios de desgaste além dos barulhos.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'É perigoso andar com barulho na suspensão?',
        answer: 'Sim, dependendo da peça afetada. Se o barulho for causado por um pivô de suspensão ou terminal de direção com folga excessiva, a peça pode se soltar completamente em movimento, causando perda total do controle do veículo e risco de acidentes graves.'
      },
      {
        question: 'Como saber se o amortecedor está ruim?',
        answer: 'Sinais comuns de amortecedor danificado incluem: marcas visíveis de vazamento de óleo na haste externa, carro balançando várias vezes após passar por ondulações, perda de estabilidade em curvas e batidas secas constantes ao passar por desníveis.'
      },
      {
        question: 'Barulho ao passar em lombada pode ser bieleta?',
        answer: 'Sim, a bieleta é uma das campeãs de ruídos ao passar em lombadas, quebra-molas e paralelepípedos. Suas pequenas rótulas esféricas se desgastam rapidamente devido aos impactos constantes e criam uma folga que estala repetidamente.'
      }
    ],
    ctaTitle: 'Sua suspensão está fazendo barulho?',
    ctaText: 'Não espere uma folga pequena comprometer outras peças caras. Traga seu carro para uma inspeção técnica sem compromisso na Carplus no bairro Portão.',
    ctaButtonText: 'Solicitar Diagnóstico de Suspensão',
    whatsappMessage: 'Olá! Meu carro está fazendo barulho na suspensão ao passar em lombadas e gostaria de agendar uma verificação na Carplus Portão.',
    relatedSlugs: [
      'sinais-problemas-suspensao',
      'carro-puxando-para-o-lado',
      'quando-fazer-alinhamento-balanceamento'
    ]
  },
  {
    id: '3',
    slug: 'quando-fazer-alinhamento-balanceamento',
    title: 'Quando fazer alinhamento e balanceamento do carro?',
    h1: 'Quando fazer alinhamento e balanceamento do carro?',
    category: 'Alinhamento e Balanceamento',
    summary: 'Entenda a diferença real entre esses dois procedimentos essenciais, os sintomas que alertam para a necessidade de regulagem e a periodicidade preventiva recomendada.',
    metaTitle: 'Quando Fazer Alinhamento e Balanceamento no Carro? | Blog Carplus',
    metaDescription: 'Saiba quando fazer o alinhamento e balanceamento do seu veículo em Curitiba. Descubra os sinais no volante e nos pneus que indicam a hora da revisão.',
    publishedDate: '08 de Agosto de 2026',
    publishedIso: '2026-08-08',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '5 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/montagem-pneu.webp',
    imageAlt: 'Equipamento de balanceamento dinâmico de rodas e pneus na oficina Carplus Curitiba',
    intro: 'Alinhamento e balanceamento são dois dos serviços mais procurados em centros automotivos, mas ainda geram dúvidas entre muitos motoristas. Embora frequentemente sejam realizados juntos, tratam-se de procedimentos técnicos completamente distintos, que corrigem problemas diferentes e atuam em conjuntos específicos do veículo.',
    sections: [
      {
        title: 'Qual a Diferença Real Entre Alinhamento e Balanceamento?',
        level: 'h2',
        paragraphs: [
          'Compreender o objetivo de cada serviço ajuda a identificar qual deles seu carro está precisando:',
          'Alinhamento (Geometria): É o ajuste dos ângulos de suspensão e direção (câmber, cáster, convergência e divergência) para garantir que as quatro rodas fiquem perfeitamente paralelas entre si e perpendiculares ao solo, seguindo os parâmetros definidos pela montadora.',
          'Balanceamento: É a equalização do peso do conjunto roda e pneu. Como nenhum pneu ou roda possui distribuição de massa 100% perfeita, pesos de chumbo ou zinco adesivos são aplicados na borda da roda para equilibrar a rotação em alta velocidade.'
        ]
      },
      {
        title: 'Sinais de Que o Carro Precisa de Alinhamento',
        level: 'h2',
        paragraphs: [
          'Você deve procurar um centro automotivo para conferir o alinhamento quando notar:',
        ],
        listItems: [
          'Carro puxando para a direita ou esquerda em linha reta;',
          'Volante desalinhado (torto) enquanto o carro segue em linha reta;',
          'Desgaste irregular na borda dos pneus (ombro interno ou externo mais gasto);',
          'Sensação de instabilidade em curvas ou volante com retorno lento após manobras.'
        ]
      },
      {
        title: 'Sinais de Que as Rodas Precisam de Balanceamento',
        level: 'h2',
        paragraphs: [
          'O desbalanceamento gera sintomas muito característicos ligados à rotação e velocidade:',
        ],
        listItems: [
          'Vibração no volante que surge em velocidades específicas (geralmente entre 80 km/h e 110 km/h);',
          'Trepidação no assoalho ou nos bancos traseiros (indica desbalanceamento nas rodas traseiras);',
          'Ruído de zumbido ritmado na rodagem;',
          'Desgaste ondulado ou em "escamas" na superfície da banda de rodagem.'
        ]
      },
      {
        title: 'Periodicidade e Momentos Chave para Fazer o Serviço',
        level: 'h2',
        paragraphs: [
          'De maneira preventiva, recomenda-se realizar o alinhamento e balanceamento a cada 10.000 km rodados ou uma vez por ano. No entanto, situações extraordinárias antecipam essa necessidade:',
        ],
        listItems: [
          'Ao instalar pneus novos ou fazer rodízio de pneus;',
          'Após fortes impactos contra buracos, desníveis ou guias de calçada;',
          'Após qualquer reparo na suspensão ou direção (troca de amortecedores, buchas, pivôs ou terminais);',
          'Antes de realizar viagens longas em rodovias.'
        ],
        internalLinks: [
          {
            text: 'Conheça o Alinhamento 3D de alta precisão da Carplus Curitiba',
            url: '/alinhamento-3d-curitiba',
            description: 'Aferição digital computadorizada para veículos nacionais e importados.'
          },
          {
            text: 'Descubra as causas de pneu desgastando de um lado só',
            url: '/blog/pneu-desgastando-de-um-lado/',
            description: 'Como o desalinhamento destrói a vida útil da borracha prematuramente.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Preciso alinhar e balancear ao colocar pneus novos?',
        answer: 'Sim, é altamente indispensável. Colocar pneus novos em um carro desalinhado pode destruir o composto de borracha novo em menos de 5.000 km. Já o balanceamento garante que o novo conjunto gire sem vibrações.'
      },
      {
        question: 'O alinhamento 3D é melhor que o convencional?',
        answer: 'Sim. O alinhamento 3D utiliza câmeras de alta definição e alvos reflexivos computadorizados que leem a geometria do carro com precisão decimal, eliminando erros humanos de leitura e garantindo tolerâncias exatas de fábrica.'
      },
      {
        question: 'O que acontece se eu não balancear as rodas?',
        answer: 'Além do desconforto da vibração contínua no volante, o desbalanceamento causa desgaste irregular nos pneus, fadiga prematura dos rolamentos de roda e folgas aceleradas nos terminais de direção.'
      }
    ],
    ctaTitle: 'Quer deixar a direção do seu carro leve e precisa?',
    ctaText: 'Agende seu Alinhamento 3D e Balanceamento na Carplus Pneus no Portão. Equipamentos modernos e equipe especializada para o seu conforto.',
    ctaButtonText: 'Agendar Alinhamento e Balanceamento',
    whatsappMessage: 'Olá! Gostaria de agendar alinhamento 3D e balanceamento na Carplus Portão.',
    relatedSlugs: [
      'carro-puxando-para-o-lado',
      'pneu-desgastando-de-um-lado',
      'volante-vibrando-causas'
    ]
  },
  {
    id: '4',
    slug: 'pneu-desgastando-de-um-lado',
    title: 'Pneu desgastando de um lado: o que isso pode indicar?',
    h1: 'Pneu desgastando de um lado: o que isso pode indicar?',
    category: 'Pneus',
    summary: 'Notou que a borda interna ou externa do seu pneu está ficando lisa enquanto o resto da banda ainda tem borracha? Entenda as causas geométricas e mecânicas desse desgaste.',
    metaTitle: 'Pneu Desgastando de Um Lado: O Que Significa? | Blog Carplus',
    metaDescription: 'Veja o que causa o desgaste irregular dos pneus de um lado só: cambagem, convergência, calibragem ou folgas na suspensão. Evite perder seus pneus em Curitiba.',
    publishedDate: '06 de Agosto de 2026',
    publishedIso: '2026-08-06',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '6 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/troca-pneu.webp',
    imageAlt: 'Técnico examinando indicador de desgaste e banda de rodagem de pneu na Carplus',
    intro: 'Os pneus são o único ponto de contato entre o automóvel e o asfalto. Em condições ideais de alinhamento, calibragem e suspensão, a banda de rodagem deve se desgastar de maneira perfeitamente homogênea e uniforme em toda a sua largura. Quando você observa que um dos ombros do pneu está "comendo" mais rápido do que o centro ou a borda oposta, há uma anomalia mecânica que precisa de atenção imediata.',
    sections: [
      {
        title: '1. Desvio de Cambagem (Camber Negativo ou Positivo)',
        level: 'h2',
        paragraphs: [
          'A cambagem é a inclinação da parte superior da roda para dentro ou para fora quando vista de frente:',
          'Camber Negativo Excessivo (rodas "abertas" na base): Faz com que o peso do carro fique concentrado na borda interna do pneu, desgastando intensamente o ombro de dentro.',
          'Camber Positivo Excessivo (rodas "fechadas" na base): Concentra o atrito na borda externa, deixando a parte de fora do pneu lisa antes do tempo.'
        ],
        callout: {
          type: 'tip',
          title: 'Atenção aos Buracos de Curitiba',
          text: 'Impactos fortes em buracos podem empenar amortecedores, mangas de eixo ou braços de suspensão, alterando permanentemente o camber daquela roda específica.'
        }
      },
      {
        title: '2. Desvio de Convergência ou Divergência',
        level: 'h2',
        paragraphs: [
          'Quando as rodas estão "convergentes" (fechadas para frente como a ponta de uma flecha), a borracha é arrastada lateralmente pelo asfalto, criando um desgaste áspero e em formato de serra na borda externa.',
          'Quando estão "divergentes" (abertas para frente), o mesmo arraste ocorre na borda interna. Esse tipo de desgaste é muito rápido e pode destruir um jogo de pneus em poucas semanas de rodagem.'
        ]
      },
      {
        title: '3. Calibragem Incorreta Prolongada',
        level: 'h2',
        paragraphs: [
          'A pressão dos pneus dita como a banda de rodagem se apoia no chão:',
          'Pressão Baixa (Subcalibragem): O pneu murcho apoia-se excessivamente nos dois ombros laterais, desgastando as duas bordas e deixando o centro intacto.',
          'Pressão Alta (Sobrecalibragem): O pneu "estufado" apoia apenas o centro, desgastando o meio da banda e reduzindo a aderência.'
        ]
      },
      {
        title: '4. Folga em Buchas, Pivôs ou Molas Cansadas',
        level: 'h2',
        paragraphs: [
          'Molas de suspensão fadigadas ("arriadas") alteram a altura original do veículo, o que em muitas suspensões modernas gera camber negativo automático e desgaste acelerado das bordas internas.',
          'Da mesma forma, buchas de bandeja estouradas permitem que a roda oscile para frente e para trás durante frenagens e acelerações, gerando desgaste assimétrico.'
        ]
      },
      {
        title: 'Orientações de Segurança: Posso Inverter o Pneu?',
        level: 'h2',
        paragraphs: [
          'Muitos motoristas perguntam se podem simplesmente "virar o pneu no aro" para compensar o desgaste. É importante ter cautela: se o pneu for do tipo assimétrico ou unidirecional (com sentido de rotação obrigatório), a inversão incorreta prejudica a drenagem de água e a frenagem no molhado.',
          'Além disso, se a profundidade dos sulcos na área desgastada atingir o indicador TWI (1,6 mm), o pneu já é considerado careca perante a lei e deve ser substituído por questões de segurança.'
        ],
        internalLinks: [
          {
            text: 'Confira nosso estoque completo de pneus novos em promoção no Portão',
            url: '/garagem-de-pneus-curitiba',
            description: 'Pirelli, Goodyear, Michelin, Bridgestone, Delinte e Xbri com garantia.'
          },
          {
            text: 'Saiba quando fazer o alinhamento 3D do seu veículo',
            url: '/alinhamento-3d-curitiba',
            description: 'Evite perder pneus por erros de geometria e cambagem.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Pneu gasto de um lado tem conserto?',
        answer: 'A borracha que já se desgastou não pode ser reposta. No entanto, corrigir o alinhamento, a cambagem e a suspensão imediatamente impede que o desgaste continue avançando, salvando o restante da vida útil do pneu se ainda estiver acima de 1,6 mm.'
      },
      {
        question: 'O que significa a sigla TWI no pneu?',
        answer: 'TWI (Tread Wear Indicator) são pequenos ressaltos de borracha posicionados dentro dos sulcos principais. Quando a banda atinge a altura do TWI, o pneu atingiu o limite legal de 1,6 mm de profundidade e deve ser trocado.'
      },
      {
        question: 'Com que frequência devo inspecionar o estado visual dos pneus?',
        answer: 'O ideal é fazer uma inspeção visual a cada 15 dias, aproveitando o momento da calibragem a frio para verificar se há cortes, bolhas, desgaste assimétrico ou corpos estranhos presos na banda.'
      }
    ],
    ctaTitle: 'Seus pneus estão gastando de forma desigual?',
    ctaText: 'Visite a Carplus Pneus no Portão. Identificamos a causa geométrica ou mecânica do desgaste e oferecemos as melhores soluções em pneus novos e alinhamento 3D.',
    ctaButtonText: 'Avaliar Desgaste dos Pneus',
    whatsappMessage: 'Olá Carplus! Percebi que meus pneus estão gastando de um lado só e gostaria de uma avaliação na loja do Portão.',
    relatedSlugs: [
      'quando-fazer-alinhamento-balanceamento',
      'carro-puxando-para-o-lado',
      'sinais-problemas-suspensao'
    ]
  },
  {
    id: '5',
    slug: 'revisao-carro-antes-de-viajar',
    title: 'Revisão antes de viajar: o que verificar no carro?',
    h1: 'Revisão antes de viajar: o que verificar no carro?',
    category: 'Manutenção Preventiva',
    summary: 'Guia completo e atemporal para pegar a estrada com tranquilidade. Confira o checklist dos itens essenciais de segurança, mecânica, elétrica e pneus.',
    metaTitle: 'Revisão Antes de Viajar: O Que Verificar no Carro? | Blog Carplus',
    metaDescription: 'Checklist completo para revisão pré-viagem em Curitiba: pneus, freios, óleo, arrefecimento, estepe e suspensão. Garanta uma viagem segura para sua família.',
    publishedDate: '04 de Agosto de 2026',
    publishedIso: '2026-08-04',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '7 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/oficina-carros.webp',
    imageAlt: 'Revisão preventiva completa de automóvel em oficina mecânica Carplus em Curitiba',
    intro: 'Planejar uma viagem com a família ou amigos é sempre empolgante, seja descendo a serra rumo ao litoral do Paraná e Santa Catarina, seja pegando rodovias interestaduais como BR-277, BR-376 e BR-116. No entanto, rodar em alta velocidade contínua e com o carro carregado de passageiros e bagagens exige muito mais de todos os sistemas mecânicos do que o uso urbano diário. Um checklist preventivo bem executado evita contratempos perigosos e gastos imprevistos.',
    sections: [
      {
        title: 'Checklist de Pneus e Rodas',
        level: 'h2',
        paragraphs: [
          'Os pneus sustentam todo o peso da carga e são responsáveis pela frenagem e aderência em pista seca ou sob chuva torrencial:',
        ],
        listItems: [
          'Profundidade dos sulcos: Verifique se estão bem acima do TWI (mínimo legal de 1,6 mm, recomendado 3 mm para chuva em rodovia);',
          'Calibragem a frio: Calibre todos os pneus de acordo com a tabela do fabricante para veículo com carga máxima (passageiros + malas);',
          'Estepe: Nunca esqueça de calibrar o pneu sobressalente com 2 a 4 PSI a mais do que os pneus normais, pois ele perde pressão parado;',
          'Ferramentas obrigatórias: Teste o funcionamento do macaco, chave de roda e triângulo de sinalização;',
          'Alinhamento e Balanceamento: Garante estabilidade sem vibrações em velocidades de rodovia.'
        ]
      },
      {
        title: 'Sistema de Freios',
        level: 'h2',
        paragraphs: [
          'Em descidas de serra e frenagens de emergência em rodovias, os freios são levados ao limite térmico:',
        ],
        listItems: [
          'Espessura das pastilhas e condição dos discos de freio;',
          'Nível e ponto de ebulição do fluido de freio (deve ser trocado a cada 1 ou 2 anos devido à umidade acumulada);',
          'Funcionamento e regulagem do freio de estacionamento.'
        ]
      },
      {
        title: 'Fluidos, Óleo e Sistema de Arrefecimento',
        level: 'h2',
        paragraphs: [
          'O motor trabalhará em rotações mais elevadas e sob calor constante:',
        ],
        listItems: [
          'Óleo do motor e filtro de óleo: Confira o nível na vareta e garanta que o óleo não vencerá no meio da viagem;',
          'Líquido de arrefecimento: Verifique o nível e a proporção de aditivo no reservatório (nunca use apenas água de torneira);',
          'Fluido da direção hidráulica ou transmissão (quando aplicável);',
          'Reservatório do limpador de para-brisa: Abasteça com água e produto desengraxante automotivo.'
        ]
      },
      {
        title: 'Sistema Elétrico e Iluminação',
        level: 'h2',
        paragraphs: [
          'Verifique o funcionamento de todas as lâmpadas antes de sair da garagem:',
        ],
        listItems: [
          'Faróis baixos, altos e de neblina;',
          'Lanternas traseiras, luzes de freio e terceira luz de freio (brake light);',
          'Luzes de seta e pisca-alerta;',
          'Luz de ré e iluminação da placa traseira;',
          'Carga e terminais da bateria automotiva.'
        ]
      },
      {
        title: 'Visibilidade e Segurança',
        level: 'h2',
        paragraphs: [
          'Em rodovias com chuva forte, a visibilidade é crucial. Palhetas do limpador de para-brisa ressecadas trepidam e embaçam o vidro, reduzindo a visão do condutor. Troque as palhetas se apresentarem estrias ou ruído.',
          'Também verifique o funcionamento do desembaçador traseiro e da ventilação interna do ar-condicionado.'
        ],
        internalLinks: [
          {
            text: 'Agende uma revisão preventiva completa pré-viagem na Carplus',
            url: '/contato',
            description: 'Inspeção rápida e honesta no bairro Portão em Curitiba.'
          },
          {
            text: 'Dicas sobre quando trocar o óleo do motor sem errar',
            url: '/blog/quando-trocar-oleo-carro/',
            description: 'Especificações corretas e cuidados para motores flex e diesel.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Com quantos dias de antecedência devo fazer a revisão antes de viajar?',
        answer: 'Recomenda-se realizar a revisão com cerca de 5 a 7 dias de antecedência. Isso garante tempo suficiente caso seja necessário substituir alguma peça ou realizar testes após o serviço.'
      },
      {
        question: 'Preciso calibrar o estepe com pressão diferente dos outros pneus?',
        answer: 'Sim. Recomenda-se colocar cerca de 2 a 4 PSI a mais no estepe do que a pressão indicada para os pneus de rodagem, pois o pneu reserva costuma perder um pouco de pressão naturalmente enquanto fica guardado no porta-malas.'
      },
      {
        question: 'O que não pode faltar no carro em viagens longas?',
        answer: 'Documentos do veículo e do motorista em dia, estepe calibrado, macaco, chave de roda, triângulo de sinalização, palhetas em bom estado e água no reservatório do esguicho.'
      }
    ],
    ctaTitle: 'Vai viajar em breve?',
    ctaText: 'Faça o check-up preventivo do seu veículo na Carplus Pneus e Oficina no Portão. Segurança, rapidez e transparência para você e sua família pegarem a estrada.',
    ctaButtonText: 'Agendar Revisão Pré-Viagem',
    whatsappMessage: 'Olá Carplus! Estou planejando uma viagem e gostaria de agendar uma revisão preventiva no Portão.',
    relatedSlugs: [
      'quando-trocar-oleo-carro',
      'quando-fazer-alinhamento-balanceamento',
      'freio-fazendo-barulho'
    ]
  },
  {
    id: '6',
    slug: 'sinais-problemas-suspensao',
    title: 'Suspensão do carro: 7 sinais de que está na hora de fazer uma avaliação',
    h1: 'Suspensão do carro: 7 sinais de que está na hora de fazer uma avaliação',
    category: 'Suspensão',
    summary: 'Aprenda a reconhecer os 7 sintomas mais comuns de desgaste na suspensão que afetam o conforto, a estabilidade e a segurança da sua condução.',
    metaTitle: '7 Sinais de Problemas na Suspensão do Carro | Blog Carplus',
    metaDescription: 'Descubra os 7 principais sintomas de defeito na suspensão: barulhos, instabilidade, carro balançando, desgaste nos pneus e mergulho na frenagem.',
    publishedDate: '02 de Agosto de 2026',
    publishedIso: '2026-08-02',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '6 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanico-motor.webp',
    imageAlt: 'Profissional da Carplus realizando teste e avaliação detalhada da suspensão automotiva',
    intro: 'O sistema de suspensão é um dos conjuntos mais importantes do automóvel. Sua função primordial não é apenas proporcionar conforto aos ocupantes, mas principalmente manter as quatro rodas em contato firme e constante com o solo em qualquer situação — acelerando, manobrando em curvas ou freando bruscamente. Conheça os 7 sinais mais claros de que sua suspensão precisa de uma inspeção técnica.',
    sections: [
      {
        title: 'Sinal 1: Barulhos Metálicos, Estalos e Rangidos',
        level: 'h2',
        paragraphs: [
          'Ruídos anormais como "toc-toc" constante em paralelepípedos, estalos ao esterçar o volante ou rangidos ao passar por ondulações são indicativos clássicos de folga em bieletas, buchas fadigadas, pivôs com folga ou coxins estourados.'
        ]
      },
      {
        title: 'Sinal 2: Instabilidade e Sensação de "Carro Solto"',
        level: 'h2',
        paragraphs: [
          'Se você sente que o carro "flutua" ou parece desviar da linha reta ao passar por desníveis de asfalto na velocidade de cruzeiro, a ação amortecedora e a rigidez dos braços oscilantes podem estar comprometidas.'
        ]
      },
      {
        title: 'Sinal 3: Carro Balançando Excessivamente Após Lombadas',
        level: 'h2',
        paragraphs: [
          'Quando o amortecedor perde sua carga de pressão interna, a mola continua oscilando livremente após o impacto. O carro passa por uma lombada e continua "quicando" duas ou três vezes antes de estabilizar.'
        ]
      },
      {
        title: 'Sinal 4: Desgaste Irregular ou Prematuro dos Pneus',
        level: 'h2',
        paragraphs: [
          'Borracha gasta mais em um dos ombros, sulcos com desgaste em escama ou pontos escamosos na banda de rodagem são consequências diretas de ângulos de suspensão desregulados ou amortecedores sem pressão.'
        ]
      },
      {
        title: 'Sinal 5: Dificuldade e Inclinação Excessiva em Curvas (Body Roll)',
        level: 'h2',
        paragraphs: [
          'Se a carroceria do veículo inclina exageradamente para o lado de fora nas curvas, a barra estabilizadora, suas buchas ou os amortecedores perderam a capacidade de controlar a transferência lateral de carga.'
        ]
      },
      {
        title: 'Sinal 6: Frente "Mergulha" e Distância de Frenagem Aumenta',
        level: 'h2',
        paragraphs: [
          'Em frenagens médias ou fortes, a frente do carro abaixa violentamente ("mergulho") e a traseira levanta. Isso descarrega o peso das rodas traseiras, aumentando perigosamente a distância necessária para parar o veículo.'
        ]
      },
      {
        title: 'Sinal 7: Desconforto Excessivo e Batidas Secas',
        level: 'h2',
        paragraphs: [
          'Pequenas irregularidades do asfalto que antes passavam despercebidas agora são transmitidas como golpes secos e incômodos para dentro da cabine, indicando batentes destruídos ou amortecedores travados.'
        ],
        internalLinks: [
          {
            text: 'Conheça nossos serviços mecânicos de suspensão e freios no Portão',
            url: '/oficina-do-pneu-curitiba',
            description: 'Diagnóstico técnico transparente e peças de alta qualidade com garantia.'
          },
          {
            text: 'Entenda os barulhos na suspensão ao passar em lombadas',
            url: '/blog/barulho-suspensao-lombadas/',
            description: 'Guia específico para ruídos em quebra-molas e valetas.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Quanto tempo dura em média a suspensão de um carro?',
        answer: 'Em média, componentes como amortecedores duram entre 40.000 e 60.000 km, enquanto bieletas e buchas podem demandar substituição antes dependendo da qualidade das vias. Em cidades com vias acidentadas, revisões preventivas a cada 20.000 km são ideais.'
      },
      {
        question: 'Posso trocar apenas um amortecedor que estragou?',
        answer: 'Não é recomendado. Os amortecedores devem ser trocados sempre aos pares no mesmo eixo (ambos dianteiros ou ambos traseiros) para manter o equilíbrio de amortecimento e estabilidade do veículo.'
      },
      {
        question: 'O teste de empurrar o carro para baixo com as mãos funciona?',
        answer: 'Esse teste caseiro é muito rudimentar e só detecta amortecedores totalmente travados ou estourados. Amortecedores modernos com 50% de eficiência perdida passam nesse teste manual, mas falham em velocidades reais de trânsito.'
      }
    ],
    ctaTitle: 'Identificou algum desses 7 sinais no seu carro?',
    ctaText: 'Traga seu veículo para uma avaliação detalhada na Carplus Pneus no Portão. Identificamos com precisão o que precisa ser ajustado ou trocado.',
    ctaButtonText: 'Agendar Avaliação de Suspensão',
    whatsappMessage: 'Olá Carplus! Notei sinais de desgaste na suspensão do meu carro e gostaria de agendar uma inspeção.',
    relatedSlugs: [
      'barulho-suspensao-lombadas',
      'carro-puxando-para-o-lado',
      'quando-fazer-alinhamento-balanceamento'
    ]
  },
  {
    id: '7',
    slug: 'volante-vibrando-causas',
    title: 'Volante vibrando: conheça algumas das possíveis causas',
    h1: 'Volante vibrando: conheça algumas das possíveis causas',
    category: 'Diagnóstico Automotivo',
    summary: 'A trepidação no volante pode surgir em velocidades específicas ou ao acionar o pedal de freio. Saiba o que pode estar provocando essa oscilação incômoda.',
    metaTitle: 'Volante Vibrando: Possíveis Causas e Soluções | Blog Carplus',
    metaDescription: 'Seu volante treme em alta velocidade ou ao frear? Conheça as causas mais frequentes: balanceamento, rodas empenadas, pneus deformados e discos de freio.',
    publishedDate: '30 de Julho de 2026',
    publishedIso: '2026-07-30',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '5 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/alinhamento-jeep.webp',
    imageAlt: 'Diagnóstico de vibração de direção e balanceamento na Carplus Pneus Curitiba',
    intro: 'Poucas coisas são tão irritantes e preocupantes ao dirigir quanto sentir o volante trepidar nas mãos. A vibração no volante nunca é normal: ela indica que alguma força centrífuga, oscilação geométrica ou desbalanceamento de massa está sendo transmitido através da coluna de direção até as suas mãos.',
    sections: [
      {
        title: '1. Desbalanceamento das Rodas Dianteiras',
        level: 'h2',
        paragraphs: [
          'É a causa mais clássica. Quando as rodas dianteiras perdem o contrapeso de balanceamento (ou após a montagem de pneus sem o devido ajuste), a vibração surge de forma ritmada e atinge seu pico em uma faixa específica de velocidade — quase sempre entre 80 km/h e 110 km/h.',
          'Se a vibração surgir no assoalho ou no banco em vez do volante, o desbalanceamento geralmente está nas rodas traseiras.'
        ]
      },
      {
        title: '2. Rodas Amassadas ou Empenadas',
        level: 'h2',
        paragraphs: [
          'Passar por um buraco em velocidade pode amassar a borda interna da roda de liga leve ou de ferro sem que o motorista perceba visualmente por fora. Ao girar, a roda empenada oscila lateralmente, gerando vibração contínua que não se resolve apenas com chumbos de balanceamento.'
        ]
      },
      {
        title: '3. Deformações, Bolhas ou Ovalização nos Pneus',
        level: 'h2',
        paragraphs: [
          'Um pneu que sofreu forte impacto pode ter rompimento de lonas na cinta de aço, criando bolhas na lateral ou uma deformação oval na banda de rodagem. Essa imperfeição faz o pneu "pular" microscopicamente a cada volta da roda.'
        ]
      },
      {
        title: '4. Discos de Freio Empenados (Vibração ao Frear)',
        level: 'h2',
        paragraphs: [
          'Se o volante só vibra no momento em que você pisa no pedal de freio, a causa quase certamente reside nos discos de freio dianteiros empenados. O choque térmico (passar por poça d\'água profunda com discos muito quentes) é o principal fator desse empenamento.'
        ]
      },
      {
        title: '5. Folgas na Caixa de Direção e Terminais Axiais',
        level: 'h2',
        paragraphs: [
          'Terminais de direção desgastados ou folga interna na cremalheira da caixa de direção deixam a roda livre para vibrar com as irregularidades da pista, transmitindo a folga diretamente ao volante.'
        ],
        internalLinks: [
          {
            text: 'Saiba quando fazer o alinhamento 3D e balanceamento computadorizado',
            url: '/blog/quando-fazer-alinhamento-balanceamento/',
            description: 'Elimine vibrações com equipamentos auditados de alta precisão.'
          },
          {
            text: 'Confira as causas de freio fazendo barulho ou chiado',
            url: '/blog/freio-fazendo-barulho/',
            description: 'Como inspecionar pastilhas e discos de freio com segurança.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Por que o volante vibra apenas em certas velocidades?',
        answer: 'Isso ocorre devido ao fenômeno da ressonância mecânica. Quando a frequência de rotação da roda desbalanceada atinge a mesma frequência natural da suspensão do carro (geralmente entre 80 e 100 km/h), a amplitude da vibração se multiplica e passa a ser sentida no volante.'
      },
      {
        question: 'Roda empenada tem recuperação segura?',
        answer: 'Amassados leves na borda de rodas podem ser desentortados em máquinas especializadas de desempeno a frio. No entanto, trincas ou deformações na estrutura central da roda exigem substituição por segurança.'
      },
      {
        question: 'Alinhamento tira a vibração do volante?',
        answer: 'Não. O alinhamento ajusta os ângulos de trajetória para o carro não puxar. Quem elimina a vibração por rotação é o balanceamento das rodas ou a troca/retífica de componentes empenados.'
      }
    ],
    ctaTitle: 'Seu volante está vibrando?',
    ctaText: 'Na Carplus Pneus Portão, colocamos suas rodas no balanceador digital e inspecionamos suspensão, discos e pneus para acabar com a trepidação.',
    ctaButtonText: 'Eliminar Vibração no Volante',
    whatsappMessage: 'Olá! Meu volante está vibrando e gostaria de agendar um balanceamento e verificação na Carplus Portão.',
    relatedSlugs: [
      'quando-fazer-alinhamento-balanceamento',
      'freio-fazendo-barulho',
      'sinais-problemas-suspensao'
    ]
  },
  {
    id: '8',
    slug: 'freio-fazendo-barulho',
    title: 'Freio fazendo barulho: quando é hora de verificar o sistema?',
    h1: 'Freio fazendo barulho: quando é hora de verificar o sistema?',
    category: 'Freios',
    summary: 'Chiados agudos, assobios ou atrito metálico ao pisar no freio? Entenda o que cada som significa e porque você nunca deve adiar a revisão dos freios.',
    metaTitle: 'Freio Fazendo Barulho: Quando Procurar uma Oficina? | Blog Carplus',
    metaDescription: 'Seu freio está chiando, roncando ou estalando? Entenda o que pode ser: pastilhas gastas, discos riscados ou vitrificação. Cuide da sua segurança em Curitiba.',
    publishedDate: '28 de Julho de 2026',
    publishedIso: '2026-07-28',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '5 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanicos-trabalho.webp',
    imageAlt: 'Inspeção e manutenção de pastilhas e discos de freio automotivo na Carplus Portão',
    intro: 'O sistema de freios é, sem sombra de dúvidas, o item de segurança ativa mais crucial do seu veículo. Por ser acionado centenas de vezes todos os dias nas vias urbanas movimentadas de Curitiba, ele sofre atrito e desgaste contínuos por projeto. Portanto, quando o freio começa a emitir ruídos, ele está literalmente enviando um sinal sonoro de que algo precisa ser verificado.',
    sections: [
      {
        title: '1. Chiado Agudo e Contínuo ao Frear (Aviso de Desgaste)',
        level: 'h2',
        paragraphs: [
          'A maioria das pastilhas de freio modernas possui uma lâmina metálica projetada especificamente como indicador acústico de desgaste. Quando o material de fricção atinge a espessura mínima de segurança (cerca de 2 a 3 mm), essa lâmina encosta no disco de freio emitindo um chiado agudo característico.',
          'Esse barulho é um aviso deliberado de que a pastilha precisa ser trocada antes que a placa de suporte de ferro danifique o disco.'
        ]
      },
      {
        title: '2. Ruído Áspero de "Ferro Raspando com Ferro"',
        level: 'h2',
        paragraphs: [
          'Se o chiado inicial foi ignorado e o som evoluiu para um barulho grave de atrito metálico áspero ao frear, a pastilha de freio acabou por completo. A placa de aço traseira da pastilha agora está pressionando diretamente contra a face do disco de freio.',
          'Além da perda severa de capacidade de frenagem, rodar nessa condição risca profundamente os discos, tornando obrigatória a sua substituição imediata.'
        ],
        callout: {
          type: 'warning',
          title: 'Perigo Iminente',
          text: 'Se o freio estiver raspando ferro com ferro, evite rodar com o carro e procure uma oficina com urgência. A distância de parada aumenta drasticamente.'
        }
      },
      {
        title: '3. Chiado por Pastilha Vitrificada',
        level: 'h2',
        paragraphs: [
          'Frenagens bruscas e consecutivas ou descidas prolongadas de serra sem utilizar o freio motor superaquecem o composto da pastilha. A resina interna queima e forma uma camada vítrea e espelhada na superfície da pastilha.',
          'Essa vitrificação faz o freio chiar mesmo com pastilhas novas e reduz a aderência.'
        ]
      },
      {
        title: '4. Poeira, Sujeira e Variações Climáticas',
        level: 'h2',
        paragraphs: [
          'Acúmulo de fuligem de freio nas cavidades das pinças ou umidade matinal nas pistas de Curitiba podem causar chiados passageiros nas primeiras frenagens do dia, que costumam sumir após os freios atingirem a temperatura de trabalho.'
        ]
      },
      {
        title: 'A Importância do Fluido de Freio',
        level: 'h2',
        paragraphs: [
          'Revisar o freio não é apenas trocar pastilhas. O fluido de freio é higroscópico (absorve umidade do ar com o tempo). Se estiver vencido ou com água acumulada, ele ferve sob uso severo e cria bolhas de vapor, fazendo o pedal "ir até o fundo" sem frear.'
        ],
        internalLinks: [
          {
            text: 'Conheça nossos serviços especializados de freios e suspensão',
            url: '/oficina-do-pneu-curitiba',
            description: 'Troca de pastilhas, discos, fluido e sapatas de freio com garantia.'
          },
          {
            text: 'Checklist para revisão preventiva antes de viajar com o carro',
            url: '/blog/revisao-carro-antes-de-viajar/',
            description: 'Como checar todos os itens de segurança antes da estrada.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'É normal o freio chiar em dias de chuva ou frio?',
        answer: 'Um leve ruído nas primeiras frenagens da manhã em dias úmidos ou chuvosos pode ocorrer devido a uma fina película de oxidação que se forma rapidamente na superfície do disco. Esse ruído deve desaparecer após poucas frenagens.'
      },
      {
        question: 'Quanto tempo dura um jogo de pastilhas de freio?',
        answer: 'Em média, as pastilhas dianteiras duram entre 20.000 e 40.000 km, variando conforme o peso do carro, se o câmbio é automático ou manual e o estilo de condução do motorista.'
      },
      {
        question: 'Preciso trocar o disco toda vez que trocar a pastilha?',
        answer: 'Não necessariamente. O disco de freio possui uma espessura mínima gravada na sua borda pelo fabricante. Se estiver dentro da medida e sem empenamento ou sulcos profundos, pode ser mantido.'
      }
    ],
    ctaTitle: 'Seu freio está fazendo barulho?',
    ctaText: 'Não brinque com a sua segurança e a de quem você ama. Traga seu carro para uma inspeção completa e transparente do sistema de freios na Carplus Portão.',
    ctaButtonText: 'Inspecionar Sistema de Freios',
    whatsappMessage: 'Olá Carplus! Meu freio está fazendo barulho e gostaria de agendar uma inspeção no Portão.',
    relatedSlugs: [
      'volante-vibrando-causas',
      'revisao-carro-antes-de-viajar',
      'sinais-problemas-suspensao'
    ]
  },
  {
    id: '9',
    slug: 'quando-trocar-oleo-carro',
    title: 'Troca de óleo: como saber quando chegou a hora?',
    h1: 'Troca de óleo: como saber quando chegou a hora?',
    category: 'Troca de Óleo',
    summary: 'Entenda os critérios de quilometragem e tempo, as diferenças entre óleos minerais e sintéticos e o que caracteriza o uso severo nas cidades.',
    metaTitle: 'Quando Trocar o Óleo do Carro? Guia Completo | Blog Carplus',
    metaDescription: 'Saiba o momento exato de trocar o óleo do motor do seu veículo. Entenda a regra de tempo vs km, óleo sintético, uso severo e troca de filtro em Curitiba.',
    publishedDate: '26 de Julho de 2026',
    publishedIso: '2026-07-26',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '6 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanico-motor.webp',
    imageAlt: 'Verificação técnica de óleo do motor e filtros em auto center Carplus Curitiba',
    intro: 'O óleo lubrificante é popularmente conhecido como o "sangue do motor", e essa analogia é perfeita. Ele tem a missão vital de lubrificar as peças móveis (pistões, bielas, virabrequim e comando de válvulas), reduzir o atrito e o calor, limpar resíduos de combustão e proteger contra corrosão. Trocar o óleo no prazo correto é a manutenção mais barata e eficaz para evitar a retífica prematura do motor.',
    sections: [
      {
        title: 'A Regra Universal: Quilometragem vs Tempo',
        level: 'h2',
        paragraphs: [
          'Muitos motoristas acreditam que o óleo só precisa ser trocado quando atinge determinada quilometragem (como 10.000 km). Essa é uma das maiores causas de formação de borra no motor.',
          'A regra correta é: troca-se por quilometragem OU por tempo, o que vencer primeiro. Mesmo que você rode apenas 2.000 km em um ano, o óleo sofre oxidação pelo contato com o ar e perde suas propriedades químicas de proteção, devendo ser substituído anualmente.'
        ]
      },
      {
        title: 'Tipos de Óleo e Prazos Médios',
        level: 'h2',
        paragraphs: [
          'Cada veículo exige uma especificação exata de viscosidade (ex: 0W20, 5W30, 10W40) e normas API/ACEA indicadas no manual:',
        ],
        listItems: [
          'Óleo Mineral: Obtido diretamente do refino do petróleo. Intervalo comum de 5.000 km ou 6 meses;',
          'Óleo Semissintético: Mistura balanceada de bases minerais e sintéticas. Intervalo comum de 7.500 a 10.000 km ou 6 a 12 meses;',
          'Óleo 100% Sintético: Criado em laboratório com moléculas uniformes e aditivação avançada. Intervalo comum de 10.000 km ou 12 meses.'
        ]
      },
      {
        title: 'Você Sabia Que Provavelmente Seu Carro Opera em Uso Severo?',
        level: 'h2',
        paragraphs: [
          'Os manuais de quase todas as montadoras estabelecem que em "condições severas de uso", o intervalo de troca do óleo deve ser reduzido pela metade. O que configura uso severo?',
        ],
        listItems: [
          'Trânsito urbano anda-e-para com paradas frequentes e motor em marcha lenta;',
          'Trajetos curtos (menos de 8 km) em que o motor é desligado antes de atingir a temperatura ideal de funcionamento;',
          'Uso diário como aplicativo, táxi ou entrega;',
          'Rodagem frequente em estradas de terra ou locais com muita poeira.'
        ]
      },
      {
        title: 'Por Que Sempre Trocar o Filtro de Óleo Junto?',
        level: 'h2',
        paragraphs: [
          'O filtro de óleo retém impurezas metálicas e partículas de carbono. Se você colocar óleo novo mas mantiver o filtro velho, cerca de 500 ml de óleo sujo e saturado contaminarão instantaneamente o óleo novinho, reduzindo drasticamente sua eficácia.'
        ]
      },
      {
        title: 'Como Medir a Vareta de Óleo Corretamente',
        level: 'h2',
        paragraphs: [
          'A medição deve ser feita com o carro estacionado em piso plano e com o motor desligado e frio (ou após cerca de 10 minutos desligado para que todo o óleo escorra para o cárter).',
          'O nível correto deve estar exatamente entre as marcas de MÍNIMO e MÁXIMO da vareta. Rodar com óleo abaixo do mínimo causa falta de lubrificação; rodar acima do máximo causa sobrepressão e vazamentos em retentores.'
        ],
        internalLinks: [
          {
            text: 'Conheça nossos serviços de manutenção preventiva em Curitiba',
            url: '/oficina-do-pneu-curitiba',
            description: 'Troca de óleo, filtros, correias e revisão completa.'
          },
          {
            text: 'Checklist de revisão veicular antes de pegar a estrada',
            url: '/blog/revisao-carro-antes-de-viajar/',
            description: 'Tudo o que você deve inspecionar para viajar com segurança.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Posso completar o óleo se o nível estiver baixo?',
        answer: 'Sim, se o nível estiver entre as marcas ou próximo do mínimo, você pode completar, desde que utilize exatamente o mesmo tipo, marca e viscosidade de óleo já presente no motor. Se a troca estiver próxima da data, o ideal é antecipar a troca completa.'
      },
      {
        question: 'Por que o óleo do motor fica preto rapidamente?',
        answer: 'Ficar escuro é sinal de que o óleo está cumprindo sua função detergente e dispersante com sucesso, limpando as impurezas da combustão e mantendo-as em suspensão para que não virem borra no motor.'
      },
      {
        question: 'Misturar óleos diferentes estraga o motor?',
        answer: 'Misturar viscosidades diferentes (ex: 5W30 com 20W50) altera a fluidez calculada pela montadora e pode prejudicar a lubrificação em partidas a frio. Em caso de emergência, complete com o mais próximo e programe a troca total em seguida.'
      }
    ],
    ctaTitle: 'Está na hora de trocar o óleo do seu carro?',
    ctaText: 'Na Carplus Portão, realizamos a troca de óleo e filtros com os lubrificantes recomendados pelo fabricante do seu veículo. Rápido e garantido.',
    ctaButtonText: 'Consultar Troca de Óleo',
    whatsappMessage: 'Olá! Gostaria de consultar orçamento para troca de óleo e filtros do meu carro na Carplus Portão.',
    relatedSlugs: [
      'revisao-carro-antes-de-viajar',
      'sinais-problemas-suspensao',
      'quando-fazer-alinhamento-balanceamento'
    ]
  },
  {
    id: '10',
    slug: 'como-escolher-rodas-carro',
    title: 'Como escolher rodas para o carro sem errar na compatibilidade',
    h1: 'Como escolher rodas para o carro sem errar na compatibilidade',
    category: 'Rodas',
    summary: 'Trocar as rodas do carro vai muito além do design. Conheça as medidas técnicas essenciais como furação (PCD), offset (ET), tala e compatibilidade com pneus.',
    metaTitle: 'Como Escolher Rodas para o Carro Sem Errar? | Blog Carplus',
    metaDescription: 'Guia completo para escolher rodas automotivas: furação PCD, offset ET, tala, anel centralizador e compatibilidade com pneus e suspensão em Curitiba.',
    publishedDate: '24 de Julho de 2026',
    publishedIso: '2026-07-24',
    updatedDate: '14 de Agosto de 2026',
    updatedIso: '2026-08-14',
    readingTime: '6 min de leitura',
    featuredImage: 'https://www.carpluspneuseoficina.com.br/images/galeria/loja-de-pneus-portao-curitiba-pirelli.png',
    imageAlt: 'Mostruário de rodas de liga leve e pneus de alta performance na Carplus Pneus Portão',
    intro: 'Personalizar o carro com um novo conjunto de rodas de liga leve é o sonho de muitos motoristas. As rodas certas transformam o visual do automóvel, valorizam o veículo e podem até melhorar a estabilidade. No entanto, escolher rodas baseando-se apenas na estética é uma das principais causas de problemas de raspagem na lataria, danos à suspensão e até riscos de acidentes. Entenda as especificações técnicas obrigatórias.',
    sections: [
      {
        title: '1. Furação da Roda (PCD - Pitch Circle Diameter)',
        level: 'h2',
        paragraphs: [
          'A furação indica a quantidade de parafusos/porcas e a distância do diâmetro imaginário entre eles em milímetros:',
          'Exemplos comuns: 4x100 (muitos Chevrolet, VW e Fiat antigos), 4x108 (Ford e Peugeot/Citroën), 5x100 (VW Polo, Fox, Golf), 5x112 (Audi e VW modernos), 5x114,3 (Honda, Toyota, Hyundai, Renault).',
          'Nunca tente forçar uma roda de furação diferente no cubo do seu carro sem a compatibilidade exata de fábrica.'
        ]
      },
      {
        title: '2. Tala da Roda (Largura em Polegadas)',
        level: 'h2',
        paragraphs: [
          'A tala é a largura útil da roda medida em polegadas (ex: 6.0", 7.0", 8.0"). Ela dita qual é a largura mínima e máxima do pneu que pode ser montado com segurança.',
          'Montar um pneu muito estreito em uma tala larga deixa a borda exposta a guias; montar um pneu muito largo em uma tala estreita deforma a carcaça e prejudica a estabilidade.'
        ]
      },
      {
        title: '3. Offset da Roda (ET)',
        level: 'h2',
        paragraphs: [
          'O offset (indicado pela sigla ET na roda) é a distância entre a face de assentamento da roda no cubo e o centro geométrico de sua largura:',
          'Offset Muito Alto: A roda fica mais "para dentro" da caixa de roda, podendo raspar nas pinças de freio, nos amortecedores ou nos braços de suspensão.',
          'Offset Muito Baixo: A roda é projetada "para fora", podendo raspar nas bordas dos para-lamas ao passar por desníveis ou com passageiros no banco traseiro.'
        ]
      },
      {
        title: '4. Diâmetro do Cubo e Anel Centralizador',
        level: 'h2',
        paragraphs: [
          'O orifício central da roda deve encaixar perfeitamente no cubo do eixo do carro. Em rodas universais de reposição (aftermarket), esse furo costuma ser maior, exigindo o uso de anéis centralizadores plásticos ou metálicos.',
          'Rodar sem o anel centralizador correto centraliza a roda apenas pelos parafusos, gerando vibrações severas no volante que nenhum balanceamento consegue corrigir.'
        ]
      },
      {
        title: '5. Manutenção do Diâmetro Total Externo (Roda + Pneu)',
        level: 'h2',
        paragraphs: [
          'Se você deseja aumentar o aro (por exemplo, passar de Aro 15 para Aro 17), é obrigatório reduzir proporcionalmente a altura do perfil do pneu (ex: passar de 185/65 R15 para 205/45 R17).',
          'A variação máxima recomendada no diâmetro externo total é de até ±3%. Alterações maiores distorcem a marcação do velocímetro, alteram a relação final de marchas e podem descalibrar os sensores de ABS e controle de estabilidade (ESP).'
        ],
        internalLinks: [
          {
            text: 'Consulte nosso estoque de pneus por aro (Aro 13 ao Aro 20) no Portão',
            url: '/mapa-do-site',
            description: 'Encontre a medida exata homologada para o seu conjunto.'
          },
          {
            text: 'Entenda os sintomas de volante vibrando por rodas empenadas',
            url: '/blog/volante-vibrando-causas/',
            description: 'Como identificar anomalias na rotação e balanceamento.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Aumentar o aro da roda aumenta o consumo de combustível?',
        answer: 'Geralmente sim, de forma moderada. Rodas maiores e mais largas costumam ser mais pesadas e montadas com pneus de maior área de contato, gerando maior resistência de rolagem e exigindo um pouco mais de esforço do motor.'
      },
      {
        question: 'Qual a função do anel centralizador de roda?',
        answer: 'O anel centralizador adapta o furo central da roda de liga leve ao tamanho exato do cubo do veículo. Ele garante que a roda fique perfeitamente concêntrica ao girar, eliminando vibrações no volante.'
      },
      {
        question: 'Onde encontro as especificações originais de rodas e pneus do meu carro?',
        answer: 'As medidas originais e pressões recomendadas constam no manual do proprietário e geralmente em uma etiqueta adesiva colada na coluna da porta do motorista ou na tampa do bocal de combustível.'
      }
    ],
    ctaTitle: 'Quer trocar as rodas ou pneus do seu carro com segurança?',
    ctaText: 'Venha conversar com os especialistas da Carplus no Portão. Orientamos você sobre furação, medidas ideais, tala e montagem computadorizada.',
    ctaButtonText: 'Falar com Consultor de Rodas e Pneus',
    whatsappMessage: 'Olá Carplus! Gostaria de tirar dúvidas sobre rodas e compatibilidade de pneus para o meu carro.',
    relatedSlugs: [
      'quando-fazer-alinhamento-balanceamento',
      'volante-vibrando-causas',
      'pneu-desgastando-de-um-lado'
    ]
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalizedSlug = slug.toLowerCase().replace(/^\/blog\/?/, '').replace(/\/$/, '');
  return BLOG_POSTS.find(post => post.slug === normalizedSlug);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map(slug => BLOG_POSTS.find(p => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3);
}
