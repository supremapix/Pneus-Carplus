import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tire } from '../types';
import { toSlug, getTireSlug } from '../utils/slugify';
import { isPageReleased, getSavedGSCRate } from '../utils/seoWaves';
import { getBlogPostBySlug } from '../blog-data';
import { RIM_SEO_DATA } from '../data/rim-seo-data';

// Types definition for our EnhancedSEO component
interface EnhancedSEOProps {
  currentView: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing' | 'pneu-detalhes' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho' | 'oficina-do-pneu-curitiba' | 'garagem-de-pneus-curitiba' | 'pneus-pirelli-curitiba' | 'alinhamento-3d-curitiba' | 'blog' | 'xbri-pneus-curitiba' | 'pneus-baratos-em-curitiba' | 'melhor-site-para-comprar-pneus' | 'distribuidora-de-pneus-importados-atacado-curitiba' | 'pneu-hankook-curitiba' | 'pneus-bridgestone-curitiba-precos' | 'barao-pneus-e-oficina-bacacheri-curitiba' | 'barao-pneus-sao-jose-pinhais' | 'pneus-em-curitiba-melhor-preco' | 'distribuidora-de-pneus-em-curitiba' | 'bana-pneus' | 'loja-de-pneus-em-curitiba' | 'pneus-pirelli-em-curitiba-melhor-preco' | 'barao-pneus-e-oficina-portao' | 'pneus-byd-curitiba' | 'pneu-byd-dolphin-curitiba' | 'pneu-byd-dolphin-mini-curitiba' | 'pneu-byd-dolphin-gs-curitiba' | 'pneu-byd-king-curitiba' | 'pneu-175-55-r16-curitiba' | 'pneu-195-60-r16-curitiba' | 'pneu-205-50-r17-curitiba' | 'pneu-215-55-r17-curitiba' | 'pneu-225-60-r16-curitiba';
  seoTarget: { type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; } | null;
  selectedTire: Tire | null;
  selectedBlogSlug?: string | null;
}

export default function EnhancedSEO({ currentView, seoTarget, selectedTire, selectedBlogSlug }: EnhancedSEOProps) {
  const domain = "https://www.carpluscwb.com.br";
  
  // 1. Calculate Individual Canonical URL
  let canonicalUrl = domain;
  if (selectedTire) {
    canonicalUrl = `${domain}/pneu/${getTireSlug(selectedTire)}`;
  } else if (currentView === 'blog') {
    if (selectedBlogSlug) {
      canonicalUrl = `${domain}/blog/${selectedBlogSlug}`;
    } else {
      canonicalUrl = `${domain}/blog`;
    }
  } else if (currentView === 'seo-landing' && seoTarget) {
    const slug = toSlug(seoTarget.name);
    canonicalUrl = `${domain}/${seoTarget.type}/${slug}`;
  } else if (currentView !== 'home') {
    canonicalUrl = `${domain}/${currentView}`;
  }

  // 1b. Determine Robots Control (Indexable vs Technical/Admin/Cart)
  let robotsContent = "index, follow";
  if (currentView === 'carrinho') {
    robotsContent = "noindex, follow"; // Transacional / Carrinho: preserva link equity sem gastar crawl budget
  } else if (currentView === 'admin-indexacao') {
    robotsContent = "noindex, nofollow"; // Painel técnico administrativo
  }

  // 2. Determine Title, Description, and Keywords
  let title = "Pneus em Curitiba - Melhores Marcas com Pronta Entrega | Carplus Pneus";
  let desc = "Procurando pneus em Curitiba? A Carplus Pneus oferece o maior estoque de pneus novos das marcas Pirelli, Bridgestone, Michelin, Goodyear com montagem grátis no Portão.";
  let keywords = "pneus em curitiba, pneus no portão, pneus, comprar pneus curitiba, pneus novos curitiba, auto center curitiba, borracharia curitiba, alinhamento 3D";
  let ogImage = `${domain}/og-carplus.webp`;

  if (selectedTire) {
    // ----------------------------------------------------------------------
    // WOOCOMMERCE / PRODUCT SEO ENGINE
    // Standard format: Pneu + Marca + Medida + [Modelo] + em Curitiba | Car Plus
    // ----------------------------------------------------------------------
    const pBrand = selectedTire.brand.charAt(0).toUpperCase() + selectedTire.brand.slice(1).toLowerCase();
    const pMedida = `${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}`;
    const pModel = selectedTire.model || "";

    // Detect load speed rating inside name (e.g., 88V, 91W, etc.)
    let loadSpeed = "";
    const nameWords = (selectedTire.name || "").split(' ');
    for (const w of nameWords) {
      if (/^\d{2,3}[A-Z]$/i.test(w)) {
        loadSpeed = " " + w.toUpperCase();
        break;
      }
    }

    // Run flat check and format
    let runFlatText = "";
    if (/run\s*flat/i.test(selectedTire.name || "") || /run\s*flat/i.test(selectedTire.model || "")) {
      runFlatText = " Run Flat";
    }

    // Sanitize model to avoid brand/measure repeats
    let cleanedModel = pModel;
    cleanedModel = cleanedModel.replace(new RegExp(`^${selectedTire.brand}\\s+`, 'i'), '');
    cleanedModel = cleanedModel.replace(new RegExp(`\\s*${selectedTire.width}/${selectedTire.aspectRatio}/?${selectedTire.rim}\\s*`, 'i'), '');
    cleanedModel = cleanedModel.replace(/run\s*flat/i, '');
    cleanedModel = cleanedModel.replace(new RegExp(`r${selectedTire.rim}`, 'i'), '');
    cleanedModel = cleanedModel.trim();

    const modelSuffix = cleanedModel ? ` ${cleanedModel}` : '';
    title = `Pneu ${pBrand} ${pMedida}${modelSuffix}${runFlatText} em Curitiba | Car Plus`;

    // Factual meta description based only on confirmed product data
    const priceText = selectedTire.price ? ` A partir de R$ ${selectedTire.price.toFixed(2).replace('.', ',')}.` : '';
    let factualDesc = `Pneu ${pBrand} ${pMedida}${modelSuffix}${loadSpeed}${runFlatText} em Curitiba.${priceText} Veja especificações técnicas e atendimento na Car Plus no Portão.`;
    if (factualDesc.length < 135) {
      factualDesc = `Encontre Pneu ${pBrand} ${pMedida}${modelSuffix}${loadSpeed}${runFlatText} na Car Plus em Curitiba.${priceText} Atendimento na Av. Presidente Arthur Bernardes, Portão.`;
    }
    if (factualDesc.length > 160) {
      factualDesc = factualDesc.substring(0, 157) + "...";
    }

    desc = factualDesc;
    keywords = `pneu ${selectedTire.brand.toLowerCase()}, pneu ${selectedTire.brand.toLowerCase()} ${pMedida.toLowerCase()}, pneu ${selectedTire.width} ${selectedTire.aspectRatio} r${selectedTire.rim}, pneu curitiba, car plus pneus`;

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
    title = "Política de Troca e Devolução | Carplus Pneus";
    desc = "Confira a regulamentação para garantia de fábrica contra defeitos, trocas de medidas e termos de devoluções da Carplus Pneus em Curitiba.";
    keywords = "garantia de pneus, troca de medida de pneus, carplus garantia, devolucoes pneus curitiba";
  } else if (currentView === 'mapa-do-site') {
    title = "Mapa do Site - Catálogo e Páginas de Pneus em Curitiba | Carplus";
    desc = "Navegue pelo mapa de conteúdo completo da Carplus. Encontre pneus por aro, pneus aro 13, 14, 15, 16, 17, 18 e diretório de bairros de Curitiba.";
    keywords = "mapa do site, catalogo de pneus, bairros de curitiba pneus, busca de pneus por aro";
  } else if (currentView === 'contato') {
    // Overrides for Contato / Fale Conosco
    title = "Contato e Atendimento em Curitiba | Car Plus Pneus";
    desc = "Fale com a Car Plus Pneus em Curitiba para orçamentos, dúvidas ou agendamentos de serviços no Portão. Atendimento rápido e equipe técnica especializada.";
    keywords = "contato carplus, telefone carplus, whatsapp carplus, como chegar carplus, agendar revisao";
  } else if (currentView === 'carrinho') {
    // Overrides for Carrinho de Compras
    title = "Carrinho de Compras | Car Plus";
    desc = "Visualize seu carrinho de compras de pneus na Car Plus. Finalize o pedido e agende o atendimento em nossa loja física no Portão em Curitiba.";
    keywords = "carrinho carplus, comprar pneus, finalizar compra pneus curitiba";
  } else if (currentView === 'oficina-do-pneu-curitiba') {
    title = "Oficina do Pneu em Curitiba - Serviços de Auto Center | Carplus";
    desc = "Oficina mecânica especializada em pneus no Portão em Curitiba. Serviços de suspensão, freios, alinhamento 3D e troca de pneus na Car Plus.";
    keywords = "oficina do pneu curitiba, borracharia curitiba, mecanica curitiba, conserto de pneu curitiba, vulcanização";
  } else if (currentView === 'garagem-de-pneus-curitiba') {
    title = "Garagem de Pneus em Curitiba - Catálogo de Pneus | Carplus";
    desc = "Catálogo de pneus novos em Curitiba. Opções de pneus para veículos de passeio, SUVs e utilitários com atendimento especializado na Car Plus Portão.";
    keywords = "garagem de pneus curitiba, estoque de pneus curitiba, pneus baratos, pneus pronta entrega curitiba";
  } else if (currentView === 'pneus-pirelli-curitiba') {
    title = "Pneus Pirelli em Curitiba - Modelos Cinturato e Scorpion | Carplus";
    desc = "Pneus Pirelli em Curitiba. Modelos Cinturato, Scorpion e linhas para diversas medidas na loja Car Plus no bairro Portão.";
    keywords = "pneus pirelli curitiba, pirelli cinturato, pirelli scorpion, pneu pirelli r14, pneu pirelli r15, pneu pirelli r16";
  } else if (currentView === 'alinhamento-3d-curitiba') {
    title = "Alinhamento 3D em Curitiba - Geometria e Balanceamento | Carplus";
    desc = "Alinhamento 3D e balanceamento computadorizado em Curitiba. Serviços de geometria veicular e revisão de suspensão na Car Plus no Portão.";
    keywords = "alinhamento 3d curitiba, geometria curitiba, balanceamento de pneus curitiba, cambagem curitiba, rampa de alinhamento";
  } else if (currentView === 'blog') {
    if (selectedBlogSlug) {
      const activePost = getBlogPostBySlug(selectedBlogSlug);
      if (activePost) {
        title = activePost.metaTitle;
        desc = activePost.metaDescription;
        keywords = `${activePost.category.toLowerCase()}, oficina mecanica curitiba, ${activePost.title.toLowerCase()}, carplus blog, manutencao automotiva curitiba, pneus curitiba`;
        ogImage = activePost.featuredImage;
      } else {
        title = "Blog Automotivo e Dicas Mecânicas em Curitiba | Carplus";
        desc = "Artigos técnicos, dicas de manutenção preventiva, cuidados com pneus, suspensão, freios e alinhamento em Curitiba pela Carplus Pneus.";
        keywords = "blog automotivo curitiba, dicas mecanica, oficina mecanica portao curitiba, manutencao preventiva";
      }
    } else {
      title = "Blog da Carplus Pneus Curitiba - Dicas e Guias Automotivos";
      desc = "Dicas para aumentar a vida útil dos pneus, saiba tudo sobre alinhamento 3D, balanceamento, marcas parceiras e curiosidades para motoristas de Curitiba.";
      keywords = "blog de carros, dicas de pneus, quando trocar pneu, alinhamento de roda, calibragem de pneu Curitiba";
    }
  } else if (currentView === 'xbri-pneus-curitiba') {
    title = "Pneus Xbri em Curitiba - Catálogo e Medidas | Carplus";
    desc = "Pneus Xbri em Curitiba com ampla linha de medidas para carros de passeio e utilitários. Atendimento e consultoria técnica na Car Plus Portão.";
    keywords = "xbri pneus curitiba, pneu xbri curitiba, comprar pneu xbri, marcas de pneus baratos curitiba";
  } else if (currentView === 'pneus-baratos-em-curitiba') {
    title = "Pneus em Curitiba - Opções e Medidas Disponíveis | Carplus";
    desc = "Procurando pneus em Curitiba? Conheça opções de pneus nacionais e importados de diversas marcas e medidas na loja física da Car Plus no Portão.";
    keywords = "pneus baratos em curitiba, comprar pneu barato, borracharia barata curitiba, pneu promocao curitiba, pneu aro 13 barato";
  } else if (currentView === 'melhor-site-para-comprar-pneus') {
    title = "Melhor Site para Comprar Pneus em Curitiba | Carplus";
    desc = "Encontre pneus na Carplus Pneus: pesquise com transparência de catálogo, veja especificações e faça seu atendimento na loja física no Portão.";
    keywords = "melhor site para comprar pneus, comprar pneu online, onde comprar pneu de carro, reserva pneu internet";
  } else if (currentView === 'distribuidora-de-pneus-importados-atacado-curitiba') {
    title = "Distribuidora de Pneus em Curitiba - Atacado e Varejo | Carplus";
    desc = "Distribuição e comercialização de pneus em Curitiba. Atendimento a frotistas, empresas e motoristas na loja física Car Plus no Portão.";
    keywords = "distribuidora de pneus importados atacado curitiba, atacado de pneus curitiba, pneus importados atacado parana, pneu CNPJ curitiba";
  } else if (currentView === 'pneu-hankook-curitiba') {
    title = "Pneu Hankook em Curitiba - Modelos e Medidas | Carplus";
    desc = "Encontre pneus Hankook em Curitiba. Modelos para veículos de passeio e SUVs com atendimento especializado na Car Plus no Portão.";
    keywords = "pneu hankook curitiba, hankook ventus curitiba, comprar pneu hankook, distribuidor hankook parana";
  } else if (currentView === 'pneus-bridgestone-curitiba-precos') {
    title = "Pneus Bridgestone em Curitiba - Linha Turanza e Ecopia | Carplus";
    desc = "Pneus Bridgestone em Curitiba. Linha de modelos Turanza, Ecopia e medidas para veículos de passeio com atendimento na Car Plus Portão.";
    keywords = "pneus bridgestone curitiba precos, bridgestone turanza preco curitiba, comprar pneus bridgestone, pneus ecopia curitiba";
  } else if (currentView === 'barao-pneus-e-oficina-bacacheri-curitiba') {
    title = "Auto Center e Pneus em Curitiba | Carplus Portão";
    desc = "Conheça a estrutura da Carplus Pneus e Oficina no Portão em Curitiba. Equipamentos computadorizados 3D e atendimento automotivo completo.";
    keywords = "barao pneus e oficina bacacheri curitiba, barao pneus bacacheri, rodagem norte curitiba, auto center bacacheri";
  } else if (currentView === 'barao-pneus-sao-jose-pinhais') {
    title = "Pneus e Auto Center em Curitiba e Região | Carplus";
    desc = "Pneus novos e serviços mecânicos com acesso rápido pela Presidente Arthur Bernardes na Carplus Pneus no Portão, Curitiba.";
    keywords = "barao pneus sao jose pinhais, pneus sao jose dos pinhais, auto center sao jose, comprar pneus sao jose pinhais";
  } else if (currentView === 'pneus-em-curitiba-melhor-preco') {
    title = "Pneus em Curitiba - Catálogo de Marcas e Medidas | Carplus";
    desc = "Catálogo de pneus em Curitiba. Linha completa de marcas como Pirelli, Delinte, Xbri e Goodyear com atendimento especializado na Car Plus Portão.";
    keywords = "pneus em curitiba melhor preco, comprar pneu curitiba barato, orçamento pneu curitiba, pneu nacional importado parana";
  } else if (currentView === 'distribuidora-de-pneus-em-curitiba') {
    title = "Distribuidora de Pneus em Curitiba - Loja no Portão | Carplus";
    desc = "Pneus novos com atendimento direto para o motorista de Curitiba. Amplo catálogo de medidas com suporte técnico na Car Plus Portão.";
    keywords = "distribuidora de pneus em curitiba, loja distribuidora pneus, pneus pronta entrega, marcas premium atacado curitiba";
  } else if (currentView === 'bana-pneus') {
    title = "Pneus e Serviços Automotivos em Curitiba | Carplus";
    desc = "Conheça o atendimento da Carplus no Portão em Curitiba: linha variada de pneus e serviços de geometria 3D, freios e suspensão.";
    keywords = "bana pneus, bana pneus curitiba, pneus goodyear curitiba, loja goodyear curitiba";
  } else if (currentView === 'loja-de-pneus-em-curitiba') {
    title = "Loja de Pneus em Curitiba - Atendimento no Portão | Carplus";
    desc = "Venha conhecer a loja de pneus novos Carplus em Curitiba na Av. Presidente Arthur Bernardes, Portão. Serviços automotivos e linha completa de pneus.";
    keywords = "loja de pneus em curitiba, melhor borracharia curitiba, loja rodas de liga leve curitiba, pneus portao loja fisica";
  } else if (currentView === 'pneus-pirelli-em-curitiba-melhor-preco') {
    title = "Pneus Pirelli em Curitiba - Linha Completa | Carplus";
    desc = "Pneus originais Pirelli em Curitiba. Modelos Cinturato P1, P7 e Scorpion com suporte técnico e geometria 3D computadorizada no Portão.";
    keywords = "pneus pirelli em curitiba melhor preco, pirelli cinturato curitiba, comprar pneu pirelli porto, oficina especialista em pirelli";
  } else if (currentView === 'barao-pneus-e-oficina-portao') {
    title = "Pneus no Portão Curitiba - Loja de Pneus no Portão | Carplus Pneus";
    desc = "Loja de pneus no Portão em Curitiba. Troca de pneus, alinhamento 3D e balanceamento na Av. Presidente Arthur Bernardes na Carplus.";
    keywords = "pneus no portao curitiba, loja de pneus no portao, troca de pneus no portao, instalacao de pneus no portao, alinhamento e balanceamento no portao, pneu portao curitiba";
  } else if (currentView === 'pneus-byd-curitiba') {
    title = "Pneus para BYD em Curitiba | Dolphin, Dolphin Mini, King | Carplus";
    desc = "Encontre pneus para veículos BYD em Curitiba. Medidas para Dolphin, Dolphin Mini, Dolphin GS e King com montagem técnica, bicos novos e alinhamento 3D no Portão.";
    keywords = "pneu byd curitiba, pneus byd curitiba, pneu byd dolphin curitiba, pneu byd dolphin mini, pneu byd king, pneu 175 55 r16 curitiba, pneu 205 50 r17 curitiba, pneu 215 55 r17 curitiba, onde trocar pneu byd curitiba";
  } else if (currentView === 'pneu-byd-dolphin-curitiba') {
    title = "Pneu para BYD Dolphin em Curitiba | Medida 205/50 R17 | Carplus";
    desc = "Pneus compatíveis com BYD Dolphin em Curitiba. Medida oficial 205/50 R17 e 195/60 R16 com garantia, montagem computadorizada e alinhamento 3D no Portão.";
    keywords = "pneu byd dolphin curitiba, pneu byd dolphin preco, qual pneu usa o byd dolphin, pneu 205 50 r17 byd dolphin curitiba, onde comprar pneu byd dolphin";
  } else if (currentView === 'pneu-byd-dolphin-mini-curitiba') {
    title = "Pneu para BYD Dolphin Mini em Curitiba | Medida 175/55 R16 | Carplus";
    desc = "Pneu para BYD Dolphin Mini em Curitiba na medida 175/55 R16 80H. Pneus novos para EV com montagem de precisão, balanceamento e alinhamento 3D na Carplus.";
    keywords = "pneu byd dolphin mini, pneu byd dolphin mini curitiba, qual pneu usa o byd dolphin mini, medida pneu byd dolphin mini, pneu 175 55 r16 curitiba dolphin mini";
  } else if (currentView === 'pneu-byd-dolphin-gs-curitiba') {
    title = "Pneu para BYD Dolphin GS em Curitiba | Medidas e Modelos | Carplus";
    desc = "Opções de pneus para o BYD Dolphin GS em Curitiba. Medidas 205/50 R17 e 195/60 R16 com bicos novos, garantia de fábrica e instalação especializada no Portão.";
    keywords = "pneu byd dolphin gs, pneu byd dolphin gs original, pneu byd dolphin gs preco, pneu dolphin gs curitiba, medida pneu byd dolphin gs";
  } else if (currentView === 'pneu-byd-king-curitiba') {
    title = "Pneu para BYD King em Curitiba | Medida 215/55 R17 | Carplus";
    desc = "Pneus para o sedã híbrido BYD King em Curitiba. Medidas 215/55 R17 e 225/60 R16 com consultoria técnica, montagem especializada e alinhamento 3D no Portão.";
    keywords = "pneu byd king, pneu byd king curitiba, pneu byd king 215 55 r17, qual pneu usa o byd king, medida pneu byd king, pneu 215 55 r17 curitiba";
  } else if (currentView === 'pneu-175-55-r16-curitiba') {
    title = "Pneu 175/55 R16 em Curitiba | Aplicações e Modelos | Carplus Pneus";
    desc = "Pneu 175/55 R16 em Curitiba. Medida utilizada no BYD Dolphin Mini e compactos aro 16. Pneus novos com bicos de borracha inclusos e montagem grátis no Portão.";
    keywords = "pneu 175 55 r16 curitiba, comprar pneu 175 55 r16, pneu 175 55 16 curitiba, pneu aro 16 175 55 r16, pneu 175 55 r16 80h";
  } else if (currentView === 'pneu-195-60-r16-curitiba') {
    title = "Pneu 195/60 R16 em Curitiba | Melhores Marcas e Instalação | Carplus";
    desc = "Pneu 195/60 R16 em Curitiba com ampla disponibilidade de marcas. Aplicação para BYD Dolphin, Nissan Kicks e crossovers com montagem técnica no Portão.";
    keywords = "pneu 195 60 r16 curitiba, comprar pneu 195 60 16, pneu aro 16 195 60, pneus 195 60 r16 curitiba preco";
  } else if (currentView === 'pneu-205-50-r17-curitiba') {
    title = "Pneu 205/50 R17 em Curitiba | Medida para BYD Dolphin e Sedãs | Carplus";
    desc = "Pneu 205/50 R17 em Curitiba. Medida compatível com BYD Dolphin, Focus, Volvo e sedãs médios. Pneus novos com garantia e alinhamento 3D no Portão.";
    keywords = "pneu 205 50 r17 curitiba, comprar pneu 205 50 17, pneu 205 50 r17 byd dolphin, pneu aro 17 205 50 r17";
  } else if (currentView === 'pneu-215-55-r17-curitiba') {
    title = "Pneu 215/55 R17 em Curitiba | BYD King, HR-V, T-Cross | Carplus Pneus";
    desc = "Pneu 215/55 R17 em Curitiba. Aplicação para BYD King, Honda HR-V, VW T-Cross e sedãs com pneus de primeira linha, bicos inclusos e geometria 3D no Portão.";
    keywords = "pneu 215 55 r17 curitiba, comprar pneu 215 55 17, pneu byd king 215 55 r17, pneu aro 17 215 55 r17, michelin 215 55 r17, pirelli 215 55 r17";
  } else if (currentView === 'pneu-225-60-r16-curitiba') {
    title = "Pneu 225/60 R16 em Curitiba | Aplicações e Disponibilidade | Carplus";
    desc = "Pneu 225/60 R16 em Curitiba. Medida contemplada no manual do BYD King e veículos de grande porte. Pneus novos com montagem profissional no Portão.";
    keywords = "pneu 225 60 r16 curitiba, comprar pneu 225 60 16, pneu aro 16 225 60 r16, pneu 225 60 r16 byd king";
  } else if (currentView === 'curitiba') {
    title = "Pneus na Cidade de Curitiba - Diretório por Regiões e Bairros | Carplus";
    desc = "O guia completo de pneus em Curitiba. Adquira pneus novos Pirelli, Goodyear, Bridgestone e mais com atendimento no Portão.";
    keywords = "pneus curitiba, pneus na cidade de curitiba, borracharia curitiba, alinhamento curitiba";
  } else if (currentView === 'regiao-metropolitana') {
    title = "Pneus na Região Metropolitana de Curitiba (RMC) - Atendimento Auto Center | Carplus";
    desc = "Pneus para motoristas da RMC. Atendimento especializado em nossa loja sede do Portão, Curitiba, para Colombo, Araucária, Pinhais e São José dos Pinhais.";
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
      const cleanAroNum = name.replace(/\D/g, '');
      const rimConfig = RIM_SEO_DATA[cleanAroNum];
      if (rimConfig) {
        title = rimConfig.metaTitle;
        desc = rimConfig.metaDescription;
        keywords = `pneus aro ${cleanAroNum} em curitiba, pneu aro ${cleanAroNum} curitiba, pneus aro ${cleanAroNum}, comprar pneu aro ${cleanAroNum} curitiba, pneus aro ${cleanAroNum} menor preco, loja de pneus portao curitiba`;
      } else if (name === '14') {
        // Special Aro 14 Override Target
        title = "Pneus Aro 14 em Curitiba | Ofertas e Instalação | Car Plus";
        desc = "Encontre pneus aro 14 das melhores marcas com preços competitivos em Curitiba. Parcelamento facilitado e instalação especializada na Car Plus."; // exactly 149 characters!
        keywords = "pneus aro 14 curitiba, pneu aro 14, comprar pneu r14, pneu r14 curitiba, continental aro 14";
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
    "@type": ["TireShop", "AutomotiveBusiness"],
    "name": "Carplus Pneus",
    "legalName": "Carplus Pneus e Auto Center",
    "image": `${domain}/og-carplus.webp`,
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
    ]
  };

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${domain}/#website`,
    "url": domain,
    "name": "Carplus Pneus",
    "description": "Loja especializada em pneus novos em Curitiba com pronta entrega no Portão e montagem grátis.",
    "publisher": {
      "@id": `${domain}/#loja`
    }
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": title,
    "description": desc,
    "isPartOf": {
      "@id": `${domain}/#website`
    }
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
  const graph: any[] = [breadcrumbList, baseLocalBusiness, webSiteSchema, webPageSchema];

  // If viewing a tire, add a Product Schema with comprehensive details
  if (selectedTire) {
    const finalP = selectedTire.promoPrice || selectedTire.price;
    const prodSchema = {
      "@type": "Product",
      "@id": `${domain}/pneu/${getTireSlug(selectedTire)}#produto`,
      "name": `Pneu ${selectedTire.brand} ${selectedTire.model} ${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}`,
      "image": selectedTire.image || `${domain}/og-carplus.webp`,
      "description": `Pneu novo modelo ${selectedTire.model} marca ${selectedTire.brand}, medida ${selectedTire.width}/${selectedTire.aspectRatio} R${selectedTire.rim}. Montagem técnica e válvulas grátis inclusas no Portão.`,
      "brand": {
        "@type": "Brand",
        "name": selectedTire.brand
      },
      "mpn": selectedTire.id,
      "sku": `${selectedTire.width}${selectedTire.aspectRatio}${selectedTire.rim}`,
      "offers": {
        "@type": "Offer",
        "url": `${domain}/pneu/${getTireSlug(selectedTire)}`,
        "priceCurrency": "BRL",
        "price": finalP,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "TireShop",
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
      const cleanAroNum = seoTarget.name.replace(/\D/g, '');
      const rimConfig = RIM_SEO_DATA[cleanAroNum];
      const startingPrice = rimConfig ? rimConfig.priceFrom.replace('R$', '').trim().replace(',', '.') : '289.90';
      const brandsText = rimConfig ? rimConfig.recommendedBrands.join(', ') : 'Pirelli, Continental, Goodyear, Michelin, Delinte e Xbri';
      const measuresText = rimConfig ? rimConfig.topDimensions.map(d => d.measure).join(', ') : 'medidas homologadas';

      questionsList = [
        {
          "@type": "Question",
          "name": `Onde comprar Pneus Aro ${cleanAroNum || seoTarget.name} com menor preço em Curitiba?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Na Carplus Pneus & Oficina, localizada na Av. Presidente Arthur Bernardes, 1323, no Bairro Portão em Curitiba. Cobrimos qualquer orçamento de pneus Aro ${cleanAroNum || seoTarget.name} da concorrência e oferecemos montagem computadorizada e bicos novos 100% grátis.`
          }
        },
        {
          "@type": "Question",
          "name": `Quais fabricantes e medidas de Pneus Aro ${cleanAroNum || seoTarget.name} estão disponíveis de prontidão?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Contamos com um amplo estoque de Pneus Aro R${cleanAroNum || seoTarget.name} novos e homologados pelo INMETRO das marcas ${brandsText} em medidas populares como ${measuresText}.`
          }
        },
        {
          "@type": "Question",
          "name": `Como obter a montagem gratuita dos pneus Aro ${cleanAroNum || seoTarget.name} novos?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Toda reserva efetuada na Carplus Pneus para pneus Aro R${cleanAroNum || seoTarget.name} tem montagem computadorizada expressa, bicos novos e alinhamento 3D especializado em nosso autocenter no Portão.`
          }
        }
      ];

      // Add ProductCollection / ItemList Schema for Google Rich Snippets with "A partir de R$..." and 5.0 Stars
      const productCollectionSchema = {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        "name": `Pneus Aro ${cleanAroNum || seoTarget.name} em Curitiba`,
        "description": `Catálogo de pneus aro ${cleanAroNum || seoTarget.name} em Curitiba com menor preço garantido e montagem grátis no Portão.`,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "OfferCatalog",
          "name": `Catálogo Pneus Aro ${cleanAroNum || seoTarget.name} Curitiba`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": `Pneus Aro ${cleanAroNum || seoTarget.name} Novos Homologados`,
                "description": `Linha completa de pneus aro ${cleanAroNum || seoTarget.name} das marcas ${brandsText} com garantia de 5 anos e montagem grátis em Curitiba.`,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "reviewCount": "214",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              "priceCurrency": "BRL",
              "price": startingPrice,
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "TireShop",
                "name": "Carplus Pneus",
                "url": domain
              }
            }
          ]
        }
      };
      graph.push(productCollectionSchema);
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
  } else if (currentView === 'blog') {
    if (selectedBlogSlug) {
      const activePost = getBlogPostBySlug(selectedBlogSlug);
      if (activePost) {
        const blogPostingSchema = {
          "@type": "BlogPosting",
          "@id": `${canonicalUrl}#article`,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          },
          "headline": activePost.h1 || activePost.title,
          "description": activePost.metaDescription || activePost.summary,
          "image": [activePost.featuredImage],
          "datePublished": activePost.publishedIso,
          "dateModified": activePost.updatedIso || activePost.publishedIso,
          "inLanguage": "pt-BR",
          "author": {
            "@type": "Organization",
            "name": "Equipe Técnica Carplus Pneus e Oficina Mecânica",
            "url": domain
          },
          "publisher": {
            "@type": "AutoRepair",
            "name": "Carplus Pneus e Oficina Mecânica",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.carpluspneuseoficina.com.br/images/logos/logo-horizontal.svg"
            }
          },
          "articleSection": activePost.category
        };
        graph.push(blogPostingSchema);

        if (activePost.faqs && activePost.faqs.length > 0) {
          const blogFaqSchema = {
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            "mainEntity": activePost.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          };
          graph.push(blogFaqSchema);
        }
      }
    }
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

      {/* Dynamic Favicon */}
      <link rel="icon" type="image/png" sizes="512x512" href="https://img.supremasite.com.br/favicon-512x512.png" />
      <link rel="shortcut icon" type="image/png" href="https://img.supremasite.com.br/favicon-512x512.png" />
      <link rel="apple-touch-icon" href="https://img.supremasite.com.br/favicon-512x512.png" />

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

      {/* 10. Service Worker cleanup script (fixes white screen / cached assets issues) */}
      <script>
        {`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
              for (var i = 0; i < registrations.length; i++) {
                registrations[i].unregister().then(function(success) {
                  if (success) {
                    console.log('ServiceWorker removido com sucesso para resolver tela branca.');
                  }
                });
              }
            });
            if ('caches' in window) {
              caches.keys().then(function(keys) {
                keys.forEach(function(key) {
                  caches.delete(key);
                });
              });
            }
          }
        `}
      </script>
    </Helmet>
  );
}
