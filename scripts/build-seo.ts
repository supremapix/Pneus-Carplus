import * as fs from 'fs';
import * as path from 'path';

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

// Data Lists for Sitemap and Pre-renderer
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

const AROS = ["13", "14", "15", "16", "17", "18", "19", "20"];

const CARS = [
  "Fiat Palio", "Fiat Uno", "Fiat Argo", "Fiat Cronos", "Fiat Mobi", "Fiat Siena", "Fiat Strada",
  "VW Gol", "VW Voyage", "VW Polo", "VW Fox", "VW Virtus", "VW Saveiro", "VW T-Cross", "VW Nivus",
  "Chevrolet Onix", "Chevrolet Prisma", "Chevrolet Spin", "Chevrolet Cruze", "Chevrolet Tracker", "Chevrolet Cobalt",
  "Honda Civic", "Honda Fit", "Honda HR-V", "Honda City",
  "Toyota Corolla", "Toyota Etios", "Toyota Yaris", "Toyota Hilux",
  "Hyundai HB20", "Hyundai HB20S", "Hyundai Creta", "Hyundai Tucson",
  "Ford Ka", "Ford Fiesta", "Ford EcoSport", "Ford Focus", "Ford Ranger",
  "Renault Sandero", "Renault Logan", "Renault Duster", "Renault Kwid",
  "Jeep Compass", "Jeep Renegade", "Nissan Versa", "Nissan Kicks"
];

const TIRES_DATA = [
  { id: 'b1', brand: 'Bridgestone', model: 'Ecopia EP150', price: 349, promoPrice: 299, width: 175, aspectRatio: 65, rim: 14, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg' },
  { id: 'b2', brand: 'Bridgestone', model: 'Turanza T005', price: 429, promoPrice: 389, width: 185, aspectRatio: 60, rim: 15, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg' },
  { id: 'b3', brand: 'Bridgestone', model: 'Dueler H/T 684', price: 829, promoPrice: 779, width: 205, aspectRatio: 60, rim: 16, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg' },
  { id: 'p1_tire', brand: 'Pirelli', model: 'Cinturato P1', price: 339, promoPrice: 289, width: 175, aspectRatio: 65, rim: 14, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg' },
  { id: 'p2_tire', brand: 'Pirelli', model: 'Cinturato P7', price: 459, promoPrice: 419, width: 205, aspectRatio: 55, rim: 16, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg' },
  { id: 'm1', brand: 'Michelin', model: 'Primacy 4', price: 549, promoPrice: 499, width: 205, aspectRatio: 55, rim: 16, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg' },
  { id: 'm2', brand: 'Michelin', model: 'LTX Force', price: 929, promoPrice: 879, width: 215, aspectRatio: 60, rim: 17, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg' },
  { id: 'co1', brand: 'Continental', model: 'PowerContact 2', price: 389, promoPrice: 349, width: 185, aspectRatio: 60, rim: 15, image: 'https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/continental.svg' }
];

function generateSitemap() {
  console.log("Generating sitemap.xml...");
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Helper to add URL node
  function addUrl(loc: string, priority: string = "0.7") {
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 1. Root and Core pages
  addUrl(DOMAIN, "1.0");
  addUrl(`${DOMAIN}/quem-somos`, "0.8");
  addUrl(`${DOMAIN}/contato`, "0.8");
  addUrl(`${DOMAIN}/mapa-do-site`, "0.8");
  addUrl(`${DOMAIN}/politica-privacidades`, "0.3");
  addUrl(`${DOMAIN}/politica-devolucao`, "0.3");

  // 2. Official Neighborhoods (75)
  OFFICIAL_NEIGHBORHOODS.forEach(n => {
    addUrl(`${DOMAIN}/bairro/${toSlug(n)}`, "0.7");
  });

  // 3. Non-Official Neighborhoods (29)
  NON_OFFICIAL_NEIGHBORHOODS.forEach(n => {
    addUrl(`${DOMAIN}/bairro/${toSlug(n.name)}`, "0.7");
  });

  // 4. Metropolitan Cities (15)
  METROPOLITAN_CITIES.forEach(c => {
    addUrl(`${DOMAIN}/cidade/${toSlug(c)}`, "0.7");
  });

  // 5. Aros (8)
  AROS.forEach(a => {
    addUrl(`${DOMAIN}/aro/${a}`, "0.6");
  });

  // 6. Cars (46)
  CARS.forEach(car => {
    addUrl(`${DOMAIN}/carro/${toSlug(car)}`, "0.6");
  });

  // 7. Tires (8)
  TIRES_DATA.forEach(t => {
    addUrl(`${DOMAIN}/pneu/${t.id}`, "0.8");
  });

  xml += `</urlset>\n`;

  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');

  // Write to public directory so it accumulates in development
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log("Sitemap successfully written to /public/sitemap.xml");

  // Write to dist directory if it exists (for active build copy)
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
    console.log("Sitemap copied to /dist/sitemap.xml");
  }
}

function generateRobots() {
  console.log("Generating robots.txt...");
  const content = `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`;
  
  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content);
  console.log("Robots.txt successfully written to /public/robots.txt");

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'robots.txt'), content);
    console.log("Robots.txt copied to /dist/robots.txt");
  }
}

// Precompile Static HTML folders to support "View Source" (Ctrl+U) on all SEO pages
function runPrerendering() {
  console.log("Running HTML static pre-rendering task...");
  const distPath = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.log("Error: dist/index.html not found! Run 'npm run build' first before pre-rendering.");
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // List of all paths we will static-render
  const routes: { path: string; title: string; desc: string; keywords: string; schema: any }[] = [];

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

  // Adding Core routes
  routes.push({
    path: 'quem-somos',
    title: 'Quem Somos - Conheça a Carplus Pneus no Portão em Curitiba',
    desc: 'Conheça a história e estrutura da Carplus Pneus no bairro Portão, Curitiba. Oficina mecânica completa com alinhamento 3D, balanceamento de pneus e equipe especializada.',
    keywords: 'sobre a carplus, quem somos carplus, autocenter curitiba, pneus portao, mecanica curitiba',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Quem Somos", "url": `${DOMAIN}/quem-somos` }] }
  });

  routes.push({
    path: 'contato',
    title: 'Fale Conosco, Agende e Como Chegar | Carplus Pneus',
    desc: 'Endereço, telefone e WhatsApp da Carplus Pneus no Portão, Curitiba. Agende sua troca de pneus e revisão preventiva com orçamento transparente.',
    keywords: 'contato carplus, telefone carplus, whatsapp carplus, como chegar carplus, agendar revisao',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Contato", "url": `${DOMAIN}/contato` }] }
  });

  routes.push({
    path: 'mapa-do-site',
    title: 'Mapa do Site - Catálogo e Páginas de Pneus em Curitiba | Carplus',
    desc: 'Navegue pelo mapa de conteúdo completo da Carplus. Encontre pneus por aro, pneus aro 13, 14, 15, 16, 17, 18 e diretório de bairros de Curitiba.',
    keywords: 'mapa do site, catalogo de pneus, bairros de curitiba pneus, busca de pneus por aro',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(), { "@type": "WebPage", "name": "Mapa do Site", "url": `${DOMAIN}/mapa-do-site` }] }
  });

  routes.push({
    path: 'politica-privacidades',
    title: 'Política de Privacidade e Proteção de Dados | Carplus Pneus',
    desc: 'Conheça nossas diretrizes de privacidade, confidencialidade e segurança de dados pessoais na Carplus Pneus Auto Center.',
    keywords: 'privacidade carplus, termos de uso carplus, segurança site de pneus, dados protegidos',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] }
  });

  routes.push({
    path: 'politica-devolucao',
    title: 'Política de Troca, Devolução e Garantia de 5 Anos | Carplus Pneus',
    desc: 'Confira a regulamentação para garantia oficial de 5 anos de fábrica contra defeitos, trocas de medidas e termos de devoluções da Carplus Pneus.',
    keywords: 'garantia de pneus, troca de medida de pneus, carplus garantia, devolucoes pneus curitiba',
    schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] }
  });

  // Adding Official Neighborhoods (75)
  OFFICIAL_NEIGHBORHOODS.forEach(n => {
    routes.push({
      path: `bairro/${toSlug(n)}`,
      title: `Pneus no Bairro ${n}, Curitiba - Entrega e Instalação Grátis | Carplus`,
      desc: `Precisa de pneus no bairro ${n} em Curitiba? Compre online na Carplus e ganhe montagem gratuita hoje mesmo em nossa loja física, localizada ao lado da sua região!`,
      keywords: `pneus no bairro ${n}, pneus em curitiba, pneus ${n} curitiba, pneus perto do ${n}, borracharia ${n}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(n)] }
    });
  });

  // Adding Non-Official Neighborhoods (29)
  NON_OFFICIAL_NEIGHBORHOODS.forEach(n => {
    routes.push({
      path: `bairro/${toSlug(n.name)}`,
      title: `Pneus no Bairro ${n.name}, Curitiba - Entrega e Instalação Grátis | Carplus`,
      desc: `Precisa de pneus no bairro ${n.name} em Curitiba? Compre online na Carplus e ganhe montagem gratuita hoje mesmo em nossa loja física, localizada ao lado da sua região!`,
      keywords: `pneus no bairro ${n.name}, pneus em curitiba, pneus ${n.name} curitiba, pneus perto do ${n.name}, borracharia ${n.name}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(n.name)] }
    });
  });

  // Adding Metropolitan Cities (15)
  METROPOLITAN_CITIES.forEach(c => {
    routes.push({
      path: `cidade/${toSlug(c)}`,
      title: `Pneus em ${c} - Filtre por Aro, Parcele em até 10x sem juros | Carplus`,
      desc: `Encontre pneus novos para entrega ou instalação de fábrica com agendamento rápido em ${c}. Atendimento completo para motoristas da RMC na Carplus Pneus.`,
      keywords: `pneus em ${c}, pneus cidade ${c}, comprar pneus ${c}, borracharia em ${c}, pneus rmc`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness(c)] }
    });
  });

  // Adding Aros (8)
  AROS.forEach(a => {
    routes.push({
      path: `aro/${a}`,
      title: `Pneus Aro ${a} em Curitiba | Pneus por Aro no Portão | Carplus Pneus`,
      desc: `Buscando pneus por aro? Veja ofertas irresistíveis de Pneus Aro ${a} em Curitiba com ampla garantia e montagem inclusa. Pirelli, Goodyear, Bridgestone e mais.`,
      keywords: `pneus aro ${a}, pneus por aro, pneus aro ${a} em curitiba, pneus r${a}, comprar pneu aro ${a}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] }
    });
  });

  // Adding Cars (46)
  CARS.forEach(car => {
    routes.push({
      path: `carro/${toSlug(car)}`,
      title: `Pneus para ${car} em Curitiba | Medida Original Recomendada | Carplus`,
      desc: `Tabela completa e preços imperdíveis de Pneus homologados para ${car} em Curitiba. Preserve a segurança de fábrica com pneus originais das melhores marcas.`,
      keywords: `pneus para ${car}, pneu original ${car}, pneu homologado ${car}, medida pneu ${car}`,
      schema: { "@context": "https://schema.org", "@graph": [makeLocalBusiness()] }
    });
  });

  // Adding Tires (8)
  TIRES_DATA.forEach(t => {
    routes.push({
      path: `pneu/${t.id}`,
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
      }
    });
  });

  console.log(`Prerendering ${routes.length} paths into static directories...`);

  // Write static pages sequentially
  routes.forEach(r => {
    const targetDir = path.join(distPath, r.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Replace header values inside index.html for this layout
    let rewritten = templateHtml
      // Replace Title placeholder
      .replace(/<title>[^<]*<\/title>/i, `<title>${r.title}</title>`)
      // Replace or insert description
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${r.desc}" />`)
      // Inject keywords
      .replace(/<head>/i, `<head>\n    <meta name="keywords" content="${r.keywords}" />\n    <link rel="canonical" href="${DOMAIN}/${r.path}" />`)
      // Inject custom JSON-LD Schema
      .replace(/<\/head>/i, `    <script type="application/ld+json">\n${JSON.stringify(r.schema, null, 2)}\n    </script>\n  </head>`);

    fs.writeFileSync(path.join(targetDir, 'index.html'), rewritten);
  });

  console.log("HTML static pre-rendering task completed successfully!");
}

// Main execution block
try {
  generateSitemap();
  generateRobots();
  runPrerendering();
} catch (e) {
  console.error("Error building SEO scripts: ", e);
}
