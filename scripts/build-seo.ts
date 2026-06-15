import * as fs from 'fs';
import * as path from 'path';
import { TIRES_DATA } from '../src/data';
import { isPageReleased, calculateLocalScore, AROS, CARS } from '../src/utils/seoWaves';

// Slugify helper
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getTireSlug(tire: { id: string; brand: string; name?: string; width: number; aspectRatio: number; rim: number; model: string }): string {
  const brand = tire.brand.toUpperCase();
  const width = tire.width;
  const aspect = tire.aspectRatio;
  const rim = tire.rim;
  const model = tire.model.toUpperCase()
    .replace(/[\s/]+/g, '-')
    .replace(/[^A-Z0-9-]/g, '');

  let loadSpeed = '';
  const tireName = tire.name || `${tire.brand} ${tire.model}`;
  const loadSpeedMatch = tireName.match(/\b(\d{2,3}[A-Z])\b/i);
  if (loadSpeedMatch) {
    loadSpeed = loadSpeedMatch[1].toUpperCase();
  }

  let parts = [brand, width, aspect, rim];
  if (loadSpeed) {
    parts.push(loadSpeed);
  }
  parts.push(model);

  return parts.join('+').replace(/[^a-zA-Z0-9+_-]/g, '').toLowerCase();
}

const DOMAIN = "https://www.carpluscwb.com.br";

const OFFICIAL_NEIGHBORHOODS = [
  "Abranches", "Água Verde", "Ahú", "Alto Boqueirão", "Alto da Glória",
  "Alto da Rua XV", "Atuba", "Augusta", "Bacacheri", "Bairro Alto",
  "Barreirinha", "Batel", "Bigorrilho", "Boa Vista", "Bom Retiro",
  "Boqueirão", "Butiatuvinha", "Cabral", "Cachoeira", "Cajuru",
  "Campina do Siqueira", "Campo Comprido", "Campo de Santana", "Capão Raso", "Capão da Imbuia",
  "Cascatinha", "Caximba", "Centro", "Centro Cívico", "Cidade Industrial (CIC)",
  "Cristo Rei", "Fanny", "Fazendinha", "Ganchinho", "Guabirotuba",
  "Guaíra", "Hauer", "Hugo Lange", "Jardim Botânico", "Jardim Social",
  "Jardim das Américas", "Juvevê", "Lamenha Pequena", "Lindóia", "Mercês",
  "Mossunguê", "Novo Mundo", "Orleans", "Parolin", "Pilarzinho",
  "Pinheirinho", "Portão", "Prado Velho", "Rebouças", "Riviera",
  "Santa Cândida", "Santa Felicidade", "Santa Quitéria", "Santo Inácio", "Seminário",
  "Sítio Cercado", "São Braz", "São Francisco", "São João", "São Lourenço",
  "São Miguel", "Taboão", "Tarumã", "Tatuquara", "Tingui",
  "Uberaba", "Umbará", "Vila Izabel", "Vista Alegre", "Xaxim"
];

const NON_OFFICIAL_NEIGHBORHOODS = [
  { name: "Vila Sandra", region: "Cidade Industrial" },
  { name: "Vila Verde", region: "Cidade Industrial" },
  { name: "Vila Nossa Senhora da Luz", region: "Cidade Industrial" },
  { name: "Vitória Régia", region: "Cidade Industrial" },
  { name: "Caiuá", region: "Cidade Industrial" },
  { name: "Sabará", region: "Cidade Industrial" },
  { name: "Gabineto", region: "Cidade Industrial" },
  { name: "Itatiaia", region: "Cidade Industrial" },
  { name: "Santa Helena", region: "Cidade Industrial" },
  { name: "Conquista", region: "Cidade Industrial" },
  { name: "Barigui", region: "Cidade Industrial" },
  { name: "Osvaldo Cruz", region: "Cidade Industrial" },
  { name: "Atenas", region: "Cidade Industrial" },
  { name: "Neoville", region: "Cidade Industrial" },
  { name: "Vila Pantanal", region: "Cajuru" },
  { name: "Vila Torres", region: "Rebouças / Prado Velho" },
  { name: "Vila Hauer", region: "Hauer" },
  { name: "Vila Oficinas", region: "Cajuru / Capão da Imbuia" },
  { name: "Vila Guaíra", region: "Guaíra" },
  { name: "Vila Osternack", region: "Sítio Cercado" },
  { name: "Vila São Pedro", region: "Xaxim / Capão Raso" },
  { name: "Vila Audi", region: "Uberaba" },
  { name: "Vila Parolin", region: "Parolin" },
  { name: "Vila das Torres", region: "Rebouças" },
  { name: "Jardim Gabineto", region: "Cidade Industrial" },
  { name: "Jardim Itatiaia", region: "Cidade Industrial" },
  { name: "Jardim da Ordem", region: "Tatuquara" },
  { name: "Jardim Kosmos", region: "Bairro Alto" },
  { name: "Jardim Alvorada", region: "Guaíra / Lindóia" }
];

const METROPOLITAN_CITIES = [
  "São José dos Pinhais", "Pinhais", "Colombo", "Araucária", "Almirante Tamandaré",
  "Campo Largo", "Campo Magro", "Fazenda Rio Grande", "Quatro Barras",
  "Campina Grande do Sul", "Mandirituba", "Balsa Nova", "Rio Branco do Sul",
  "Itaperuçu", "Tijucas do Sul"
];

function generateSitemaps() {
  console.log("Generating segmented sitemaps according to Wave Indexing Rules (Phase 1, rate=50)...");
  
  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // XML Header maker
  const makeSitemapxml = (urls: { loc: string; priority: string }[]) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach(u => {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    });
    xml += `</urlset>\n`;
    return xml;
  };

  const writeSitemapFile = (filename: string, content: string) => {
    fs.writeFileSync(path.join(publicDir, filename), content);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, filename), content);
    }
    console.log(`Sitemap written: ${filename}`);
  };

  // 1. sitemap-institucional.xml
  const instUrls = [
    { loc: DOMAIN, priority: "1.0" },
    { loc: `${DOMAIN}/quem-somos`, priority: "0.8" },
    { loc: `${DOMAIN}/contato`, priority: "0.8" },
    { loc: `${DOMAIN}/mapa-do-site`, priority: "0.8" },
    { loc: `${DOMAIN}/curitiba`, priority: "0.9" },
    { loc: `${DOMAIN}/regiao-metropolitana`, priority: "0.9" },
    { loc: `${DOMAIN}/politica-privacidades`, priority: "0.3" },
    { loc: `${DOMAIN}/politica-devolucao`, priority: "0.3" },
  ];
  TIRES_DATA.forEach(t => {
    instUrls.push({ loc: `${DOMAIN}/pneu/${getTireSlug(t)}`, priority: "0.8" });
  });
  writeSitemapFile('sitemap-institucional.xml', makeSitemapxml(instUrls));

  // 2. sitemap-bairros.xml (Only indexable under Phase 1: Priority Neighborhoods)
  const bairroUrls: { loc: string; priority: string }[] = [];
  OFFICIAL_NEIGHBORHOODS.forEach(n => {
    if (isPageReleased(n, 'bairro', 50)) {
      bairroUrls.push({ loc: `${DOMAIN}/bairro/${toSlug(n)}`, priority: "0.7" });
    }
  });
  NON_OFFICIAL_NEIGHBORHOODS.forEach(n => {
    if (isPageReleased(n.name, 'bairro', 50)) {
      bairroUrls.push({ loc: `${DOMAIN}/bairro/${toSlug(n.name)}`, priority: "0.7" });
    }
  });
  writeSitemapFile('sitemap-bairros.xml', makeSitemapxml(bairroUrls));

  // 3. sitemap-cidades.xml (Only indexable under Phase 1: Priority Cities)
  const cidadeUrls: { loc: string; priority: string }[] = [] as any;
  METROPOLITAN_CITIES.forEach(c => {
    if (isPageReleased(c, 'cidade', 50)) {
      cidadeUrls.push({ loc: `${DOMAIN}/cidade/${toSlug(c)}`, priority: "0.7" });
    }
  });
  writeSitemapFile('sitemap-cidades.xml', makeSitemapxml(cidadeUrls));

  // 4. sitemap-carros.xml (None in Phase 1, empty with root URL to stay clean)
  const carroUrls: { loc: string; priority: string }[] = [];
  CARS.forEach(car => {
    if (isPageReleased(car, 'carro', 50)) {
      carroUrls.push({ loc: `${DOMAIN}/carro/${toSlug(car)}`, priority: "0.6" });
    }
  });
  if (carroUrls.length === 0) {
    carroUrls.push({ loc: `${DOMAIN}/curitiba`, priority: "0.1" }); // placeholder
  }
  writeSitemapFile('sitemap-carros.xml', makeSitemapxml(carroUrls));

  // 5. sitemap-aros.xml (None in Phase 1, empty with root URL to stay clean)
  const aroUrls: { loc: string; priority: string }[] = [];
  AROS.forEach(a => {
    if (isPageReleased(a, 'aro', 50)) {
      aroUrls.push({ loc: `${DOMAIN}/aro/${a}`, priority: "0.6" });
    }
  });
  if (aroUrls.length === 0) {
    aroUrls.push({ loc: `${DOMAIN}/curitiba`, priority: "0.1" }); // placeholder
  }
  writeSitemapFile('sitemap-aros.xml', makeSitemapxml(aroUrls));

  // 6. sitemap-index.xml
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  const sitemaps = [
    'sitemap-institucional.xml',
    'sitemap-bairros.xml',
    'sitemap-cidades.xml',
    'sitemap-carros.xml',
    'sitemap-aros.xml'
  ];
  sitemaps.forEach(s => {
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${DOMAIN}/${s}</loc>\n`;
    indexXml += `  </sitemap>\n`;
  });
  indexXml += `</sitemapindex>\n`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml); // fallback default
  
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml);
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), indexXml);
  }
  console.log("Segmented Sitemaps fully created!");
}

function generateRobots() {
  console.log("Generating robots.txt pointing to the new index sitemap...");
  const content = `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap-index.xml\nSitemap: ${DOMAIN}/sitemap.xml\n`;
  
  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content);
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'robots.txt'), content);
  }
  console.log("Robots.txt created successfully.");
}

// Precompile Static HTML folders with custom index/noindex controls
function runPrerendering() {
  console.log("Running HTML static pre-rendering task with Wave Indexing Controls...");
  const distPath = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.log("Error: dist/index.html not found! Run 'npm run build' first before pre-rendering.");
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // List of all paths we will static-render
  const routes: { path: string; title: string; desc: string; keywords: string; schema: any; isIndexable: boolean }[] = [];

  // Helper to compose LocalBusiness Schema
  const makeLocalBusiness = (areaServedName?: string) => ({
    "@type": "AutoPartsStore",
    "name": "Carplus Pneus e Auto Center",
    "image": "https://www.carpluspneuseoficina.com.br/images/galeria/fachada-logo.webp",
    "@id": `${DOMAIN}/#loja`,
    "url": DOMAIN,
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
    ...(areaServedName ? { "areaServed": { "@type": "AdministrativeArea", "name": areaServedName } } : {})
  });

  // Adding Core routes (always indexable)
  routes.push({
    path: 'quem-somos',
    title: 'Quem Somos - Conheça a Carplus Pneus no Portão em Curitiba',
    desc: 'Conheça a história e estrutura da Carplus Pneus no bairro Portão, Curitiba. Oficina mecânica completa com alinhamento 3D, balanceamento de pneus e equipe especializada.',
    keywords: 'sobre a carplus, quem somos carplus, autocenter curitiba, pneus portao, mecanica curitiba',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Quem Somos", "url": `${DOMAIN}/quem-somos` }] },
    isIndexable: true
  });

  routes.push({
    path: 'contato',
    title: 'Fale Conosco, Agende e Como Chegar | Carplus Pneus',
    desc: 'Endereço, telefone e WhatsApp da Carplus Pneus no Portão, Curitiba. Agende sua troca de pneus e revisão preventiva com orçamento transparente.',
    keywords: 'contato carplus, telefone carplus, whatsapp carplus, como chegar carplus, agendar revisao',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Contato", "url": `${DOMAIN}/contato` }] },
    isIndexable: true
  });

  routes.push({
    path: 'mapa-do-site',
    title: 'Mapa do Site - Catálogo e Páginas de Pneus em Curitiba | Carplus',
    desc: 'Navegue pelo mapa de conteúdo completo da Carplus. Encontre pneus por aro, pneus aro 13, 14, 15, 16, 17, 18 e diretório de bairros de Curitiba.',
    keywords: 'mapa do site, catalogo de pneus, bairros de curitiba pneus, busca de pneus por aro',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Mapa do Site", "url": `${DOMAIN}/mapa-do-site` }] },
    isIndexable: true
  });

  routes.push({
    path: 'politica-privacidades',
    title: 'Política de Privacidade e Proteção de Dados | Carplus Pneus',
    desc: 'Conheça nossas diretrizes de privacidade, confidencialidade e segurança de dados pessoais na Carplus Pneus Auto Center.',
    keywords: 'privacidade carplus, termos de uso carplus, segurança site de pneus, dados protegidos',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] },
    isIndexable: true
  });

  routes.push({
    path: 'politica-devolucao',
    title: 'Política de Troca, Devolução e Garantia de 5 Anos | Carplus Pneus',
    desc: 'Confira a regulamentação para garantia oficial de 5 anos de fábrica contra defeitos, trocas de medidas e termos de devoluções da Carplus Pneus.',
    keywords: 'garantia de pneus, troca de medida de pneus, carplus garantia, devolucoes pneus curitiba',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] },
    isIndexable: true
  });

  // Hub 1: Curitiba (Always indexable)
  routes.push({
    path: 'curitiba',
    title: 'Pneus em Curitiba - O Guia Completo da Instalação Técnica por Bairros | Carplus',
    desc: 'Acesse o diretório completo e hubs de atendimento por bairros em Curitiba. Adquira pneus novos das principais marcas com montagem, bico e calibragem grátis no Portão.',
    keywords: 'pneus curitiba, bairros curitiba, comprar pneu curitiba, autocenter curitiba',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Pneus em Curitiba - Guia Legal", "url": `${DOMAIN}/curitiba` }] },
    isIndexable: true
  });

  // Hub 2: Região Metropolitana (Always indexable)
  routes.push({
    path: 'regiao-metropolitana',
    title: 'Pneus na Região Metropolitana de Curitiba (RMC) - Serviços de Autocenter | Carplus',
    desc: 'Selecione sua cidade na Região Metropolitana para pneus novos selecionados. Agende a montagem expressa em nosso Auto Center Portão na Av. Arthur Bernardes.',
    keywords: 'pneus rmc, pneus regiao metropolitana curitiba, pneus pinhais, pneus colombo, pneus sjp',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Pneus RMC", "url": `${DOMAIN}/regiao-metropolitana` }] },
    isIndexable: true
  });

  // Adding Official Neighborhoods (75)
  OFFICIAL_NEIGHBORHOODS.forEach(n => {
    routes.push({
      path: `bairro/${toSlug(n)}`,
      title: `Pneus no Bairro ${n}, Curitiba - Entrega e Instalação Grátis | Carplus`,
      desc: `Precisa de pneus no bairro ${n} em Curitiba? Compre online na Carplus e ganhe montagem gratuita hoje mesmo em nossa loja física, localizada ao lado da sua região!`,
      keywords: `pneus no bairro ${n}, pneus em curitiba, pneus ${n} curitiba, pneus perto do ${n}, borracharia ${n}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(n)] },
      isIndexable: isPageReleased(n, 'bairro', 50)
    });
  });

  // Adding Non-Official Neighborhoods (29)
  NON_OFFICIAL_NEIGHBORHOODS.forEach(n => {
    routes.push({
      path: `bairro/${toSlug(n.name)}`,
      title: `Pneus no Bairro ${n.name}, Curitiba - Entrega e Instalação Grátis | Carplus`,
      desc: `Precisa de pneus no bairro ${n.name} em Curitiba? Compre online na Carplus e ganhe montagem gratuita hoje mesmo em nossa loja física, localizada ao lado da sua região!`,
      keywords: `pneus no bairro ${n.name}, pneus em curitiba, pneus ${n.name} curitiba, pneus perto do ${n.name}, borracharia ${n.name}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(n.name)] },
      isIndexable: isPageReleased(n.name, 'bairro', 50)
    });
  });

  // Adding Metropolitan Cities (15)
  METROPOLITAN_CITIES.forEach(c => {
    routes.push({
      path: `cidade/${toSlug(c)}`,
      title: `Pneus em ${c} - Filtre por Aro, Parcele em até 10x sem juros | Carplus`,
      desc: `Encontre pneus novos para entrega ou instalação de fábrica com agendamento rápido em ${c}. Atendimento completo para motoristas da RMC na Carplus Pneus.`,
      keywords: `pneus em ${c}, pneus cidade ${c}, comprar pneus ${c}, borracharia em ${c}, pneus rmc`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(c)] },
      isIndexable: isPageReleased(c, 'cidade', 50)
    });
  });

  // Adding Aros (8)
  AROS.forEach(a => {
    routes.push({
      path: `aro/${a}`,
      title: `Pneus Aro ${a} em Curitiba | Pneus por Aro no Portão | Carplus Pneus`,
      desc: `Buscando pneus por aro? Veja ofertas irresistíveis de Pneus Aro ${a} em Curitiba com ampla garantia e montagem inclusa. Pirelli, Goodyear, Bridgestone e mais.`,
      keywords: `pneus aro ${a}, pneus por aro, pneus aro ${a} em curitiba, pneus r${a}, comprar pneu aro ${a}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] },
      isIndexable: isPageReleased(a, 'aro', 50)
    });
  });

  // Adding Cars (46)
  CARS.forEach(car => {
    routes.push({
      path: `carro/${toSlug(car)}`,
      title: `Pneus para ${car} em Curitiba | Medida Original Recomendada | Carplus`,
      desc: `Tabela completa e preços imperdíveis de Pneus homologados para ${car} em Curitiba. Preserve a segurança de fábrica com pneus originais das melhores marcas.`,
      keywords: `pneus para ${car}, pneu original ${car}, pneu homologado ${car}, medida pneu ${car}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] },
      isIndexable: isPageReleased(car, 'carro', 50)
    });
  });

  // Adding Tires (8)
  TIRES_DATA.forEach(t => {
    // 1. Primary Friendly Slug Route
    routes.push({
      path: `pneu/${getTireSlug(t)}`,
      title: `Pneu ${t.brand} ${t.model} ${t.width}/${t.aspectRatio} R${t.rim} Curitiba | Carplus`,
      desc: `Compre seu Pneu ${t.brand} ${t.model} original medida ${t.width}/${t.aspectRatio} R${t.rim} na Carplus Portão. Montagem computorizada e bicos de ar grátis inclusos!`,
      keywords: `pneu ${t.brand}, pneu ${t.brand} ${t.model}, pneu ${t.width} ${t.aspectRatio} r${t.rim}, pneus novos curitiba, pneu portao`,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          makeLocalBusiness(),
          {
            "@type": "Product",
            "name": `Pneu ${t.brand} ${t.model} ${t.width}/${t.aspectRatio} R${t.rim}`,
            "image": t.image,
            "description": `Pneu novo modelo ${t.model} marca ${t.brand}, medida ${t.width}/${t.aspectRatio} R${t.rim}. Montagem técnica e bicos de alta qualidade grátis inclusos no Portão.`,
            "brand": { "@type": "Brand", "name": t.brand },
            "offers": {
              "@type": "Offer",
              "price": t.promoPrice || t.price,
              "priceCurrency": "BRL",
              "availability": "https://schema.org/InStock"
            }
          }
        ]
      },
      isIndexable: true
    });

    // 2. Backward-compatible Classic parameter ID route
    routes.push({
      path: `pneu/${t.id}`,
      title: `Pneu ${t.brand} ${t.model} ${t.width}/${t.aspectRatio} R${t.rim} Curitiba | Carplus`,
      desc: `Compre seu Pneu ${t.brand} ${t.model} original medida ${t.width}/${t.aspectRatio} R${t.rim} na Carplus Portão. Montagem computorizada e bicos de ar grátis inclusos!`,
      keywords: `pneu ${t.brand}, pneu ${t.brand} ${t.model}, pneu ${t.width} ${t.aspectRatio} r${t.rim}, pneus novos curitiba, pneu portao`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] },
      isIndexable: true
    });
  });

  console.log(`Prerendering ${routes.length} paths with proper indexation robots definitions...`);

  // Write static pages sequentially
  routes.forEach(r => {
    const targetDir = path.join(distPath, r.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const robotsVal = r.isIndexable ? "index, follow" : "noindex, follow";

    // Replace header values inside index.html for this layout
    let rewritten = templateHtml
      // Replace Title placeholder
      .replace(/<title>[^<]*<\/title>/i, `<title>${r.title}</title>`)
      // Replace or insert description
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${r.desc}" />`)
      // Inject keywords & robots control dynamically
      .replace(/<head>/i, `<head>\n    <meta name="keywords" content="${r.keywords}" />\n    <meta name="robots" content="${robotsVal}" />\n    <link rel="canonical" href="${DOMAIN}/${r.path}" />`)
      // Inject custom JSON-LD Schema
      .replace(/<\/head>/i, `    <script type="application/ld+json">\n${JSON.stringify(r.schema, null, 2)}\n    </script>\n  </head>`);

    fs.writeFileSync(path.join(targetDir, 'index.html'), rewritten);
  });

  // Generate physical folders and redirect pages for legacy URLs
  const legacyRedirects = [
    { from: 'fale-conosco', to: 'contato' },
    { from: 'faleconosco', to: 'contato' },
    { from: 'quemsomos', to: 'quem-somos' }
  ];

  legacyRedirects.forEach(redir => {
    const targetDir = path.join(distPath, redir.from);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Redirecionando... | Carplus Pneus</title>
  <meta http-equiv="refresh" content="0; url=/${redir.to}" />
  <script>
    window.location.replace("/${redir.to}");
  </script>
</head>
<body>
  <p>Página movida. Redirecionando para <a href="/${redir.to}">/${redir.to}</a>...</p>
</body>
</html>`;
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    console.log(`Legacy redirect folder created: /dist/${redir.from} -> /${redir.to}`);
  });

  console.log("HTML static pre-rendering with Wave Indexing concluded smoothly!");
}

// Main execution block
try {
  generateSitemaps();
  generateRobots();
  runPrerendering();
} catch (e) {
  console.error("Error building SEO scripts: ", e);
}
