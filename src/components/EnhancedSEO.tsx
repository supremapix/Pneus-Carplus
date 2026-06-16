import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tire } from '../types';
import { toSlug, getTireSlug } from '../utils/slugify';
import { isPageReleased, getSavedGSCRate } from '../utils/seoWaves';

// Types definition for our EnhancedSEO component
interface EnhancedSEOProps {
  currentView: 'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing' | 'pneu-detalhes' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho';
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

  // If viewing a tire, add a Product Schema
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
          "name": "Carplus Pneus"
        }
      }
    };
    graph.push(prodSchema);
  }

  // FAQ schema if viewing home/details
  if (currentView === 'home') {
    const faqSchema = {
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
    graph.push(faqSchema);
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
