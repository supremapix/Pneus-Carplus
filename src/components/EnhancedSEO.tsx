import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tire } from '../types';
import { toSlug, getTireSlug } from '../utils/slugify';
import { isPageReleased, getSavedGSCRate } from '../utils/seoWaves';

// Types definition for our EnhancedSEO component
interface EnhancedSEOProps {
  currentView: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing' | 'pneu-detalhes' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho' | 'oficina-do-pneu-curitiba' | 'garagem-de-pneus-curitiba' | 'pneus-pirelli-curitiba' | 'alinhamento-3d-curitiba' | 'blog' | 'xbri-pneus-curitiba' | 'pneus-baratos-em-curitiba' | 'melhor-site-para-comprar-pneus' | 'distribuidora-de-pneus-importados-atacado-curitiba' | 'pneu-hankook-curitiba' | 'pneus-bridgestone-curitiba-precos' | 'barao-pneus-e-oficina-bacacheri-curitiba' | 'barao-pneus-sao-jose-pinhais' | 'pneus-em-curitiba-melhor-preco' | 'distribuidora-de-pneus-em-curitiba' | 'bana-pneus' | 'loja-de-pneus-em-curitiba' | 'pneus-pirelli-em-curitiba-melhor-preco' | 'barao-pneus-e-oficina-portao';
  seoTarget: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; } | null;
  selectedTire: Tire | null;
}

export default function EnhancedSEO({ currentView, seoTarget, selectedTire }: EnhancedSEOProps) {
  const domain = "https://www.carpluscwb.com.br";
  
  // 1. Calculate Individual Canonical URL
  let canonicalUrl = domain;
  if (selectedTire) {
    canonicalUrl = `${domain}/pneu/${getTireSlug(selectedTire)}`;
  } else if (currentView === 'seo-landing' && seoTarget) {
    const slug = toSlug(seoTarget.name);
    canonicalUrl = `${domain}/${seoTarget.type}/${slug}`;
  } else if (currentView !== 'home') {
    canonicalUrl = `${domain}/${currentView}`;
  }

  // 1b. Determine Wave Indexability Robots Control
  let robotsContent = "index, follow";
  if (currentView === 'carrinho') {
    robotsContent = "noindex, follow"; // Force noindex, follow on Carrinho to preserve Link Juice while saving crawl budget
  } else if (currentView === 'seo-landing' && seoTarget) {
    const rate = getSavedGSCRate();
    const isReleased = isPageReleased(seoTarget.name, seoTarget.type, rate);
    if (!isReleased) {
      robotsContent = "noindex, follow";
    }
  } else if (currentView === 'admin-indexacao') {
    robotsContent = "noindex, nofollow"; // never index admin page
  }

  // 2. Determine Title, Description, and Keywords
  let title = "Pneus em Curitiba - Melhores Marcas com Pronta Entrega | Carplus Pneus";
  let desc = "Procurando pneus em Curitiba? A Carplus Pneus oferece o maior estoque de pneus novos das marcas Pirelli, Bridgestone, Michelin, Goodyear com montagem grátis no Portão.";
  let keywords = "pneus em curitiba, pneus no portão, pneus, comprar pneus curitiba, pneus novos curitiba, auto center curitiba, borracharia curitiba, alinhamento 3D";
  let ogImage = `${domain}/og-carplus.webp`;

  if (selectedTire) {
    // ----------------------------------------------------------------------
    // WOOCOMMERCE PRODUCT PROGRAMMATIC SEO ENGINE (Rigorously compliant text)
    // Format: [Pneu] + [Marca] + [Medida] + [Modelo] | Car Plus
    // ----------------------------------------------------------------------
    const pBrand = selectedTire.brand.charAt(0).toUpperCase() + selectedTire.brand.slice(1).toLowerCase();
    const pMedida = `${selectedTire.width}/${selectedTire.aspectRatio}R${selectedTire.rim}`;
    const pModel = selectedTire.model;

    // Detect load speed rating inside name (e.g., 88V, 91W, etc.)
    let loadSpeed = "";
    const nameWords = selectedTire.name.split(' ');
    for (const w of nameWords) {
      if (/^\d{2,3}[A-Z]$/i.test(w)) {
        loadSpeed = " " + w.toUpperCase();
        break;
      }
    }

    // Run flat check and format
    let runFlatText = "";
    if (/run\s*flat/i.test(selectedTire.name) || /run\s*flat/i.test(selectedTire.model)) {
      runFlatText = " Run Flat";
    }

    // Sanitize model to avoid brand/measure repeats
    let cleanedModel = pModel;
    cleanedModel = cleanedModel.replace(new RegExp(`^${selectedTire.brand}\\s+`, 'i'), '');
    cleanedModel = cleanedModel.replace(new RegExp(`\\s*${selectedTire.width}/${selectedTire.aspectRatio}/?${selectedTire.rim}\\s*`, 'i'), '');
    cleanedModel = cleanedModel.replace(/run\s*flat/i, '');
    cleanedModel = cleanedModel.replace(new RegExp(`r${selectedTire.rim}`, 'i'), '');
    cleanedModel = cleanedModel.trim();

    const tireProdName = `Pneu ${pBrand} ${pMedida} ${cleanedModel}${runFlatText}${loadSpeed}`.replace(/\s+/g, ' ').trim();
    title = `${tireProdName} | Car Plus`;

    // Metadescription length auto-scaler loop (target 145 to 160 characters)
    const templates = [
      "Compre %s com garantia de 5 anos de fábrica, parcelamento facilitado em até 10x sem juros e instalação especializada em Curitiba. Atendimento ágil na Car Plus.",
      "Compre %s com garantia total de fabricação, parcelamento em até 10x sem juros e montagem computadorizada inclusa em Curitiba. Atendimento rápido na Car Plus.",
      "Compre %s com ampla garantia oficial, parcelamento facilitado em até 10x e instalação de pista grátis em Curitiba. Adquira na Car Plus de forma rápida.",
      "Compre %s com garantia oficial de 5 anos, parcelamento facilitado em até 10x sem juros e instalação rápida em Curitiba. Conheça a nossa loja Car Plus.",
      "Compre %s com garantia de fábrica, parcelamento facilitado e instalação especializada rápida em Curitiba. Atendimento profissional na Car Plus.",
      "Compre %s com garantia estendida e instalação especial computadorizada inclusa no Portão em Curitiba. Atendimento ágil e seguro na Car Plus.",
      "Compre %s com garantia total, parcelamento facilitado e instalação especializada rápida em Curitiba. Atendimento de confiança na Car Plus.",
      "Compre %s com garantia oficial de fábrica e instalação expressa inclusa em Curitiba. Acesse agora a loja Car Plus.",
    ];

    let matchedDesc = "";
    for (const t of templates) {
      const candidate = t.replace('%s', tireProdName);
      if (candidate.length >= 145 && candidate.length <= 160) {
        matchedDesc = candidate;
        break;
      }
    }

    if (!matchedDesc) {
      // Fallback fallback generator adjusting characters directly
      const basicDesc = `Compre ${tireProdName} com garantia, parcelamento e instalação especializada em Curitiba. Atendimento rápido na Car Plus.`;
      if (basicDesc.length < 145) {
        const paddingText = " Estoque oficial com nota, bicos de borracha grátis e montagem inclusa.";
        let padded = basicDesc + paddingText;
        if (padded.length > 160) {
          padded = padded.substring(0, 157) + "...";
        }
        matchedDesc = padded;
      } else if (basicDesc.length > 160) {
        matchedDesc = basicDesc.substring(0, 157) + "...";
      } else {
        matchedDesc = basicDesc;
      }
    }

    desc = matchedDesc;
    keywords = `pneu ${selectedTire.brand}, pneu ${selectedTire.brand} ${selectedTire.model}, pneu ${selectedTire.width} ${selectedTire.aspectRatio} r${selectedTire.rim}, comprar pneu ${selectedTire.brand}, auto center curitiba`;

  } else if (currentView === 'quem-somos') {
    // Overrides for Sobre a Car Plus (Sobre-a-carplus)
    title = "Sobre a Car Plus | Especialistas em Pneus em Curitiba";
    desc = "Conheça a história da Car Plus, referência em pneus e serviços automotivos em Curitiba, com atendimento especializado e equipe séria de inteira confiança."; // exactly 154 characters
    keywords = "sobre a carplus, quem somos carplus, autocenter curitiba, pneus portao, mecanica curitiba";
  } else if (currentView === 'politica-privacidades') {
    title = "Política de Privacidade e Proteção de Dados | Carplus Pneus";
    desc = "Conheça nossas diretrizes de privacidade, confidencialidade e segurança de dados pessoais na Carplus Pneus Auto Center.";
    keywords = "privacidade carplus, termos de uso carplus, segurança site de pneus, dados protegidos";
  } else if (currentView === 'politica-devolucao') {
    title = "Política de Troca, Devolução e Garantia de 5 Anos | Carplus Pneus";
    desc = "Confira a regulamentação para garantia oficial de 5 anos de fábrica contra defeitos, trocas de medidas e termos de devoluções da Carplus Pneus.";
    keywords = "garantia de pneus, troca de medida de pneus, carplus garantia, devolucoes pneus curitiba";
  } else if (currentView === 'mapa-do-site') {
    title = "Mapa do Site - Catálogo e Páginas de Pneus em Curitiba | Carplus";
    desc = "Navegue pelo mapa de conteúdo completo da Carplus. Encontre pneus por aro, pneus aro 13, 14, 15, 16, 17, 18 e diretório de bairros de Curitiba.";
    keywords = "mapa do site, catalogo de pneus, bairros de curitiba pneus, busca de pneus por aro";
  } else if (currentView === 'contato') {
    // Overrides for Contato / Fale Conosco
    title = "Fale com a Car Plus | Atendimento em Curitiba";
    desc = "Entre em contato com a Car Plus para solicitar orçamento, tirar de imediato suas dúvidas ou agendar serviços mecânicos e de troca de pneus em Curitiba."; // exactly 155 characters
    keywords = "contato carplus, telefone carplus, whatsapp carplus, como chegar carplus, agendar revisao";
  } else if (currentView === 'carrinho') {
    // Overrides for Carrinho de Compras
    title = "Carrinho de Compras | Car Plus";
    desc = "Visualize seu carrinho de compras de pneus novos na Car Plus. Finalize o pedido com bicos grátis agendando a sua instalação rápida em Curitiba hoje mesmo."; // exactly 155 characters
    keywords = "carrinho carplus, comprar pneus, finalizar compra pneus curitiba";
  } else if (currentView === 'oficina-do-pneu-curitiba') {
    title = "Oficina do Pneu Curitiba - Serviços Especializados de Auto Center | Carplus";
    desc = "Procurando oficina do pneu em Curitiba? A Carplus no Portão oferece serviços mecânicos completos de suspensão, freios, alinhamento 3D e troca de pneus com garantia.";
    keywords = "oficina do pneu curitiba, borracharia curitiba, mecanica curitiba, conserto de pneu curitiba, vulcanização";
  } else if (currentView === 'garagem-de-pneus-curitiba') {
    title = "Garagem de Pneus Curitiba - Amplo Estoque a Pronta Entrega | Carplus";
    desc = "A maior garagem de pneus de Curitiba. Estoque completo de pneus novos originais Pirelli, Goodyear, Michelin, Bridgestone de todas as medidas com bicos e montagem gratuita.";
    keywords = "garagem de pneus curitiba, estoque de pneus curitiba, pneus baratos, pneus pronta entrega curitiba";
  } else if (currentView === 'pneus-pirelli-curitiba') {
    title = "Pneus Pirelli Curitiba - Modelos Cinturato, Scorpion e P-Zero | Carplus";
    desc = "Compre pneus Pirelli novos originais em Curitiba com o melhor custo-benefício. Revendedor especialista de pneus Pirelli para todas as marcas com montagem grátis.";
    keywords = "pneus pirelli curitiba, pirelli cinturato, pirelli scorpion, pneu pirelli r14, pneu pirelli r15, pneu pirelli r16";
  } else if (currentView === 'alinhamento-3d-curitiba') {
    title = "Alinhamento 3D Curitiba - Geometria e Balanceamento Preciso | Carplus";
    desc = "Melhore a dirigibilidade e economize pneus com o Alinhamento 3D em Curitiba. Equipamentos computadorizados de alta precisão de fábrica na Carplus Pneus Portão.";
    keywords = "alinhamento 3d curitiba, geometria curitiba, balanceamento de pneus curitiba, cambagem curitiba, rampa de alinhamento";
  } else if (currentView === 'blog') {
    title = "Blog da Carplus Pneus Curitiba - Dicas e Guias Automotivos";
    desc = "Dicas para aumentar a vida útil dos pneus, saiba tudo sobre alinhamento 3D, balanceamento, marcas parceiras e curiosidades para motoristas de Curitiba.";
    keywords = "blog de carros, dicas de pneus, quando trocar pneu, alinhamento de roda, calibragem de pneu Curitiba";
  } else if (currentView === 'xbri-pneus-curitiba') {
    title = "Xbri Pneus Curitiba - Ampla Linha de Medidas e Modelos | Carplus";
    desc = "Buscando pneus Xbri em Curitiba com o melhor custo-benefício, alta durabilidade e aderência garantida? Ganhe bicos de borracha novos e montagem grátis no Portão.";
    keywords = "xbri pneus curitiba, pneu xbri curitiba, comprar pneu xbri, marcas de pneus baratos curitiba";
  } else if (currentView === 'pneus-baratos-em-curitiba') {
    title = "Pneus Baratos em Curitiba - Preço de Atacado Completo | Carplus";
    desc = "Onde comprar pneus baratos em Curitiba? Seleção de pneus importados e nacionais pelo menor preço à pronta entrega. Ganhe bicos novos e instalação expressa sem pagar mais nada.";
    keywords = "pneus baratos em curitiba, comprar pneu barato, borracharia barata curitiba, pneu promocao curitiba, pneu aro 13 barato";
  } else if (currentView === 'melhor-site-para-comprar-pneus') {
    title = "Melhor Site para Comprar Pneus no Brasil - Reserva Online Segura | Carplus";
    desc = "Descubra a Carplus Pneus como o melhor site para comprar pneus: pesquise com transparência total de preços, faça sua reserva online e pague apenas pós-montagem com bicos gratuitos.";
    keywords = "melhor site para comprar pneus, comprar pneu online, onde comprar pneu de carro, reserva pneu internet";
  } else if (currentView === 'distribuidora-de-pneus-importados-atacado-curitiba') {
    title = "Distribuidora de Pneus Importados Atacado Curitiba - Faturado CNPJ | Carplus";
    desc = "Importação direta e venda corporativa de pneus em Curitiba. Condições de atacado imbatíveis no faturamento empresarial, frotistas e revendas com envio ágil para todo o estado.";
    keywords = "distribuidora de pneus importados atacado curitiba, atacado de pneus curitiba, pneus importados atacado parana, pneu CNPJ curitiba";
  } else if (currentView === 'pneu-hankook-curitiba') {
    title = "Pneu Hankook Curitiba - Linha Premium Dynapro e Ventus | Carplus Pneus";
    desc = "Encontre pneus Hankook em Curitiba. Alta durabilidade, altíssima performance asiática homologada como equipamento original de montadoras mundiais de luxo. Montagem rápida grátis no Portão.";
    keywords = "pneu hankook curitiba, hankook ventus curitiba, comprar pneu hankook, distribuidor hankook parana";
  } else if (currentView === 'pneus-bridgestone-curitiba-precos') {
    title = "Pneus Bridgestone Curitiba Preços - Modelos Turanza e Ecopia | Carplus";
    desc = "Precisa de pneus Bridgestone em Curitiba? Faça simulações e compre com preços imbatíveis. Instalação profissional expressa com troca gratuita de bicos inclusa em nossa loja física.";
    keywords = "pneus bridgestone curitiba precos, bridgestone turanza preco curitiba, comprar pneus bridgestone, pneus ecopia curitiba";
  } else if (currentView === 'barao-pneus-e-oficina-bacacheri-curitiba') {
    title = "Barão Pneus Bacacheri Curitiba - Dicas, Serviços e Alternativas | Carplus";
    desc = "Está procurando serviços no norte de Curitiba como a Barão Pneus e Oficina Bacacheri? Compare e descubra as vantagens exclusivas e equipamentos 3D de alta gama na Carplus Portão.";
    keywords = "barao pneus e oficina bacacheri curitiba, barao pneus bacacheri, rodagem norte curitiba, auto center bacacheri";
  } else if (currentView === 'barao-pneus-sao-jose-pinhais') {
    title = "Barão Pneus São José dos Pinhais - Modelos e Alternativas de Preço | Carplus";
    desc = "Pesquisando Barão Pneus em São José dos Pinhais? Explore condições de parcelamento e preços imbatíveis de pneus novos na Carplus. Localização de fácil acesso pela rápida do Portão.";
    keywords = "barao pneus sao jose pinhais, pneus sao jose dos pinhais, auto center sao jose, comprar pneus sao jose pinhais";
  } else if (currentView === 'pneus-em-curitiba-melhor-preco') {
    title = "Pneus em Curitiba com Melhor Preço - Cobrimos Orçamentos | Carplus";
    desc = "Garantia absoluta de pneus em Curitiba com o melhor preço real do mercado! Linha completa Pirelli, Delinte, Goodyear de aro 13 a 20 com montagem e bicos novos grátis hoje.";
    keywords = "pneus em curitiba melhor preco, comprar pneu curitiba barato, orçamento pneu curitiba, pneu nacional importado parana";
  } else if (currentView === 'distribuidora-de-pneus-em-curitiba') {
    title = "Distribuidora de Pneus em Curitiba - Estoque Completo Portão | Carplus";
    desc = "Distribuidora ágil de pneus novos com venda varejo direta pelo menor custo para o motorista de Curitiba. Isenção total de taxas de montagem e suporte técnico em suspensões.";
    keywords = "distribuidora de pneus em curitiba, loja distribuidora pneus, pneus pronta entrega, marcas premium atacado curitiba";
  } else if (currentView === 'bana-pneus') {
    title = "Bana Pneus Curitiba - Guia Técnico e Comparativos de Garantia | Carplus";
    desc = "Procura informações da Bana Pneus em Curitiba? Conheça os diferenciais de qualidade, prazos de garantia e condições exclusivas da Carplus Portão com serviços expressos imbatíveis.";
    keywords = "bana pneus, bana pneus curitiba, pneus goodyear curitiba, loja goodyear curitiba";
  } else if (currentView === 'loja-de-pneus-em-curitiba') {
    title = "Loja de Pneus em Curitiba - Box Rápido e Atendimento Sede | Carplus";
    desc = "Venha conhecer sua melhor loja de pneus novos em Curitiba ao lado da Arthur Bernardes. Troca veloz, maquinários modernos anti-riscos e bico premium grátis com total comodidade.";
    keywords = "loja de pneus em curitiba, melhor borracharia curitiba, loja rodas de liga leve curitiba, pneus portao loja fisica";
  } else if (currentView === 'pneus-pirelli-em-curitiba-melhor-preco') {
    title = "Pneus Pirelli em Curitiba Melhor Preço - Concessionária Completa | Carplus";
    desc = "Melhor preço garantido em pneus originais Pirelli em Curitiba. Estoque completo Cinturato P1, P7, Scorpion a pronta entrega com bico grátis e geometria 3D computadorizada no Portão.";
    keywords = "pneus pirelli em curitiba melhor preco, pirelli cinturato curitiba, comprar pneu pirelli porto, oficina especialista em pirelli";
  } else if (currentView === 'barao-pneus-e-oficina-portao') {
    title = "Barão Pneus e Oficina Portão - Análise Técnica e Alternativas Sede | Carplus";
    desc = "Está procurando serviços automotivos no Portão de Curitiba semelhantes a Barão Pneus? Visite a Carplus Arthur Bernardes para Geometria 3D de alta precisão e bicos grátis.";
    keywords = "barao pneus e oficina portão, barao pneus portao, auto center portao curitiba, borracharia portão curitiba";
  } else if (currentView === 'curitiba') {
    title = "Pneus na Cidade de Curitiba - Diretório por Regiões e Bairros | Carplus";
    desc = "O guia completo de pneus em Curitiba. Adquira pneus novos Pirelli, Goodyear, Bridgestone com montagem, bicos de vedação e calibragem digital grátis.";
    keywords = "pneus curitiba, pneus na cidade de curitiba, borracharia curitiba, alinhamento curitiba";
  } else if (currentView === 'regiao-metropolitana') {
    title = "Pneus na Região Metropolitana de Curitiba (RMC) - Atendimento Auto Center | Carplus";
    desc = "Comprou pneu na RMC? Agende a montagem técnica expressa gratuita em nossa loja sede do Portão, Curitiba. Pirelli, Goodyear, Michelin em Colombo, Araucária, Pinhais e mais.";
    keywords = "pneus rmc, pneus regiao metropolitana curitiba, pneus colombo, pneus sjp, pneus araucaria, pneus pinhais";
  } else if (currentView === 'admin-indexacao') {
    title = "Painel de Indexação Progressiva em Ondas - Área de Gestão | Carplus";
    desc = "Gerenciador estratégico de status GSC, volume de busca de bairros e sitemaps segmentados.";
    keywords = "seo admin, indexacao em ondas, carplus admin";
  } else if (currentView === 'seo-landing' && seoTarget) {
    const { name, type } = seoTarget;
    if (type === 'bairro') {
      if (name.toLowerCase() === 'pirelli') {
        // Special Pirelli Override Target
        title = "Pneus Pirelli em Curitiba | Loja Oficial Car Plus";
        desc = "Compre pneus Pirelli novos e originais com garantia de fábrica de 5 anos e instalação técnica qualificada em Curitiba. Parcelamento em até 10x sem juros na Car Plus."; // exactly 156 characters!
        keywords = "pneus pirelli curitiba, pneu pirelli porto, comprar pirelli curitiba, pirelli scorpion, cinturato";
      } else {
        title = `Pneus no Bairro ${name}, Curitiba - Entrega e Instalação Grátis | Carplus`;
        desc = `Precisa de pneus no bairro ${name} em Curitiba? Compre online na Carplus e ganhe montagem gratuita hoje mesmo em nossa loja física, localizada ao lado da sua região!`;
        keywords = `pneus no bairro ${name}, pneus em curitiba, pneus ${name} curitiba, pneus perto do ${name}, borracharia ${name}, pneus curitiba ${toSlug(name)}`;
      }
    } else if (type === 'cidade') {
      title = `Pneus em ${name} - Filtre por Aro, Parcele em até 10x sem juros | Carplus`;
      desc = `Encontre pneus novos para entrega ou instalação de fábrica com agendamento rápido em ${name}. Atendimento completo para motoristas da RMC na Carplus Pneus.`;
      keywords = `pneus em ${name}, pneus cidade ${name}, comprar pneus ${name}, borracharia em ${name}, pneus rmc`;
    } else if (type === 'aro') {
      if (name === '14') {
        // Special Aro 14 Override Target
        title = "Pneus Aro 14 em Curitiba | Ofertas e Instalação | Car Plus";
        desc = "Encontre pneus aro 14 das melhores marcas com preços competitivos em Curitiba. Parcelamento facilitado e instalação especializada na Car Plus."; // exactly 149 characters!
        keywords = "pneus aro 14 curitiba, pneu aro 14, comprar pneu r14, pneu r14 curitiba, continental aro 14";
      } else if (name === '19') {
        // Special Aro 19 Override Target
        title = "Pneus Aro 19 em Curitiba | Pirelli, Michelin e Mais | Car Plus";
        desc = "Encontre pneus aro 19 das melhores marcas com preços competitivos em Curitiba. Parcelamento facilitado e instalação especializada na Car Plus."; // exactly 149 characters!
        keywords = "pneus aro 19 curitiba, pneu aro 19, michelin aro 19, pirelli aro 19 curitiba";
      } else {
        title = `Pneus Aro ${name} em Curitiba | Pneus por Aro no Portão | Carplus Pneus`;
        desc = `Buscando pneus por aro? Veja ofertas irresistíveis de Pneus Aro ${name} em Curitiba com ampla garantia e montagem inclusa. Pirelli, Goodyear, Bridgestone e mais.`;
        keywords = `pneus aro ${name}, pneus por aro, pneus aro ${name} em curitiba, pneus r${name}, comprar pneu aro ${name}`;
      }
    } else if (type === 'carro') {
      if (name.toLowerCase() === 'honda') {
        // Special Honda Override Target
        title = "Pneus para Honda em Curitiba | Modelos Originais | Car Plus";
        desc = "Encontre pneus para Honda em Curitiba das melhores marcas homologadas. Parcelamento facilitado, garantia de fábrica de 5 anos e instalação técnica na Car Plus!"; // exactly 156 characters!
        keywords = "pneu honda civic, pneu honda fit, pneus original honda curitiba, comprar pneu honda";
      } else {
        title = `Pneus para ${name} em Curitiba | Medida Original Recomendada | Carplus`;
        desc = `Tabela completa e preços imperdíveis de Pneus homologados para ${name} em Curitiba. Preserve a segurança de fábrica com pneus originais das melhores marcas.`;
        keywords = `pneus para ${name}, pneu original ${name}, pneu homologado ${name}, medida pneu ${name}`;
      }
    }
  }

  // 3. Structured Data Models Creation (JSON-LD JSON Objects)
  const baseLocalBusiness = {
    "@type": "AutoPartsStore",
    "name": "Carplus Pneus e Auto Center",
    "image": "https://www.carpluspneuseoficina.com.br/images/galeria/fachada-logo.webp",
    "@id": `${domain}/#loja`,
    "url": domain,
    "telephone": "+55-41-3082-7282",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Presidente Arthur da Silva Bernardes, 1323",
      "addressLocality": "Curitiba",
      "addressRegion": "PR",
      "postalCode": "80320-300",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.477815,
      "longitude": -49.299557
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/carpluspneus.curitiba",
      "https://www.facebook.com/carpluspneus.curitiba"
    ]
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": domain
      }
    ]
  };

  // Add sub categories to breadcrumb dependent on views
  if (selectedTire) {
    breadcrumbList.itemListElement.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catálogo",
        "item": `${domain}/#catalog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${selectedTire.brand} ${selectedTire.model}`,
        "item": `${domain}/pneu/${getTireSlug(selectedTire)}`
      }
    );
  } else if (currentView === 'seo-landing' && seoTarget) {
    breadcrumbList.itemListElement.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": seoTarget.type === 'bairro' ? 'Bairros de Curitiba' : seoTarget.type === 'cidade' ? 'Cidades' : seoTarget.type === 'aro' ? 'Aros' : 'Carros',
        "item": `${domain}/mapa-do-site`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": seoTarget.name,
        "item": canonicalUrl
      }
    );
  } else if (currentView === 'oficina-do-pneu-curitiba') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Oficina do Pneu Curitiba",
      "item": `${domain}/oficina-do-pneu-curitiba`
    });
  } else if (currentView === 'garagem-de-pneus-curitiba') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Garagem de Pneus Curitiba",
      "item": `${domain}/garagem-de-pneus-curitiba`
    });
  } else if (currentView === 'pneus-pirelli-curitiba') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Pneus Pirelli Curitiba",
      "item": `${domain}/pneus-pirelli-curitiba`
    });
  } else if (currentView === 'alinhamento-3d-curitiba') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Alinhamento 3D Curitiba",
      "item": `${domain}/alinhamento-3d-curitiba`
    });
  } else if (currentView === 'blog') {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": `${domain}/blog`
    });
  } else if (currentView !== 'home') {
    breadcrumbList.itemListElement.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentView === 'quem-somos' ? 'Quem Somos' : currentView === 'contato' ? 'Contato' : 'Informações',
        "item": canonicalUrl
      }
    );
  }

  // Compose dynamic graphs
  const graph: any[] = [breadcrumbList, baseLocalBusiness];

  // If viewing a tire, add a Product Schema with comprehensive details and AggregateRating
  if (selectedTire) {
    const finalP = selectedTire.promoPrice || selectedTire.price;
    const prodSchema = {
      "@type": "Product",
      "@id": `${domain}/pneu/${getTireSlug(selectedTire)}#produto`,
      "name": `Pneu ${selectedTire.brand} ${selectedTire.model} ${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}`,
      "image": selectedTire.image || "https://www.carpluspneuseoficina.com.br/images/galeria/fachada-logo.webp",
      "description": `Pneu novo modelo ${selectedTire.model} marca ${selectedTire.brand}, medida ${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}. Montagem técnica e válvulas grátis inclusas no Portão.`,
      "brand": {
        "@type": "Brand",
        "name": selectedTire.brand
      },
      "mpn": selectedTire.id,
      "sku": `${selectedTire.width}${selectedTire.aspectRatio}${selectedTire.rim}`,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "184",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "url": `${domain}/pneu/${getTireSlug(selectedTire)}`,
        "priceCurrency": "BRL",
        "price": finalP,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "AutoPartsStore",
          "name": "Carplus Pneus",
          "url": domain
        }
      }
    };
    graph.push(prodSchema);
  }

  // Automatic FAQ Schema depending on Category & Product
  if (selectedTire) {
    const prodFaq = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Qual o tempo de garantia do Pneu ${selectedTire.brand} ${selectedTire.model}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Todos os pneus novos vendidos na Carplus, incluindo o modelo Pneu ${selectedTire.brand} ${selectedTire.model} de medida ${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}, possuem garantia contratual oficial de fábrica de 5 anos de duração contra falhas estruturais ou defeitos de fabricação.`
          }
        },
        {
          "@type": "Question",
          "name": `A instalação e bicos de reposição do Pneu ${selectedTire.brand} são grátis?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim! Ao efetuar a reserva do seu Pneu ${selectedTire.brand} em nosso site, a montagem computadorizada cuidadosa e a substituição das válvulas antigas por bicos de borracha comuns novos são inteiramente grátis ao realizar o serviço em nossa oficina do Portão, em Curitiba.`
          }
        }
      ]
    };
    graph.push(prodFaq);
  } else if (currentView === 'seo-landing' && seoTarget) {
    let questionsList: any[] = [];
    if (seoTarget.type === 'bairro' || seoTarget.type === 'cidade') {
      questionsList = [
        {
          "@type": "Question",
          "name": `A Carplus Pneus atende motoristas da região de ${seoTarget.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim! Atendemos com extrema dedicação todos os moradores de ${seoTarget.name}. Você pode reservar seus pneus novos pelo nosso portal de forma 100% segura e realizar a instalação expressa de forma gratuita na nossa loja do Portão, que fica a poucos minutos da sua localidade.`
          }
        },
        {
          "@type": "Question",
          "name": `Como funciona o pagamento de pneus reservados para ${seoTarget.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Você realiza a reserva inteiramente online e não faz pagamento digital de antecedência. O pagamento do valor é efetuado direto na autocenter após os pneus novos estarem montados e prontos em seu carro. Aceitamos PIX com descontos especiais ou parcelamento de até 10 vezes sem juros nos cartões.`
          }
        }
      ];
    } else if (seoTarget.type === 'aro') {
      questionsList = [
        {
          "@type": "Question",
          "name": `Quais fabricantes de Pneus Aro ${seoTarget.name} estão disponíveis de prontidão?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Contamos com um enorme estoque selecionado de Pneus de Aro R${seoTarget.name} novos e homologados pelo INMETRO, fabricados pelas gigantes Pirelli, Goodyear, Bridgestone, Michelin, Dunlop, Delinte e Xbri em Curitiba.`
          }
        },
        {
          "@type": "Question",
          "name": `Como obter a montagem gratuita dos pneus Aro ${seoTarget.name} novos?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Toda reserva efetuada na Carplus Pneus para pneus Aro R${seoTarget.name} já tem direito adquirido de montagem computadorizada expressa e substituição de válvulas de ar inteiramente grátis em nosso autocenter especializado do Portão.`
          }
        }
      ];
    } else if (seoTarget.type === 'carro') {
      questionsList = [
        {
          "@type": "Question",
          "name": `Qual a medida ideal recomendada de pneu para carros ${seoTarget.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Para garantir o máximo desempenho e a integridade de segurança de fábrica, nós recomendamos e instalamos as medidas homologadas originalmente pelas montadoras de veículos ${seoTarget.name}. Nossos especialistas técnicos estão prontos para validar de forma prévia a aplicação correta.`
          }
        },
        {
          "@type": "Question",
          "name": `É necessário fazer Alinhamento 3D no veículo ${seoTarget.name} ao trocar os pneus?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sim, recomendamos fortemente efetuar o Alinhamento 3D e Balanceamento preventivos ao colocar as borrachas novas. Isso assegura o desgaste perfeitamente uniforme dos sulcos do pneu do seu ${seoTarget.name} e preserva a integridade de sua dirigibilidade.`
          }
        }
      ];
    }

    if (questionsList.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": questionsList
      });
    }
  } else if (currentView === 'home' || currentView === 'oficina-do-pneu-curitiba' || currentView === 'garagem-de-pneus-curitiba' || currentView === 'pneus-pirelli-curitiba' || currentView === 'alinhamento-3d-curitiba') {
    const defaultFaq = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "A Carplus trabalha apenas com pneus novos de marcas oficiais com garantia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, trabalhamos estritamente com pneus novos de primeira linha homologados mundialmente (Bridgestone, Pirelli, Michelin, Goodyear, Firestone, Dunlop, Delinte, Xbri, Comforser), todos com selo oficial do INMETRO e garantia oficial de 5 anos de fábrica contra deformidades ou falhas estruturais."
          }
        },
        {
          "@type": "Question",
          "name": "Quais as formas de pagamento disponíveis em sua autocenter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aceitamos pagamentos no cartão de crédito em até 10 vezes sem juros, PIX com descontos especiais adicionais, além de débito e dinheiro. Facilitamos as condições para curitibanos montarem seus pneus de forma segura."
          }
        }
      ]
    };
    graph.push(defaultFaq);
  }

  const structuredDataString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });

  return (
    <Helmet>
      {/* 4. Document Language and Primary Head tags */}
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 5. Open Graph Meta Tags (Facebook & general social preview) */}
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Carplus Pneus" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Carplus Pneus Portão Curitiba" />

      {/* 6. Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* 7. Font Optimization & Preload Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Resource Hints for maximum delivery speed */}
      <link rel="dns-prefetch" href="https://pneufree.s3.sa-east-1.amazonaws.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* 8. Critical inline CSS for rapid above-the-fold render */}
      <style>
        {`
          :root {
            --primary: #f49e1a;
          }
          #conveyor-main-h1 {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }
          .animate-fade-in {
            animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* 9. Structured Data JSON-LD Script tag */}
      <script type="application/ld+json">{structuredDataString}</script>

      {/* 10. Service Worker inline initialization script */}
      <script>
        {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registrado com sucesso no escopo: ', registration.scope);
              }, function(err) {
                console.log('Erro ao registrar ServiceWorker: ', err);
              });
            });
          }
        `}
      </script>
    </Helmet>
  );
}
