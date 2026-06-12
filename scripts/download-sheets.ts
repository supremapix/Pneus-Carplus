import * as fs from 'fs';
import * as path from 'path';

interface Tire {
  id: string;
  brand: string;
  name: string;
  price: number;
  promoPrice?: number;
  image: string;
  width: number;
  aspectRatio: number;
  rim: number;
  model: string;
  isOffer?: boolean;
}

// Hand-curated image corrections of bad/suspicious/meme links from the online sheets
const IMAGE_CORRECTIONS: Record<string, string> = {
  "33281": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX 245/40/20 XNEX SPORT EV
  "33024": "https://llantas24.com/wp-content/uploads/2025/03/Prinx-HA1-LADO-6.jpg", // PRINX 245/70/16 HA1 A/T
  "31063": "https://http2.mlstatic.com/D_NQ_NP_2X_622551-MLB109979070159_042026-F.webp", // DELINTE 195/70/15C
  "17062": "https://http2.mlstatic.com/D_NQ_NP_2X_957821-MLB100071594987_122025-F.webp", // DELINTE DX-10 A/T
  "1004659": "https://www.tyrereviews.com/public/tyres/thumbs/x200-Delinte-DV2.jpg", // DELINTE 215/65/16C DV2
  "33044": "https://http2.mlstatic.com/D_NQ_NP_2X_845314-MLB76885063320_062024-F.webp", // PRINX HU1
  "30896": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_maxtrek_aro_16_hill_tracker_26570r16_112s_m33_1_20260218135615_0fa2e6ff904a.jpg", // MAXTREK 265/70/16 HILL TRACKER A/T 112S
  "1002649": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH3
  "24745": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX HZ2
  "1003358": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH2
  "1004979": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HT1
  "33048": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HZ1
  "1007771": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX HZ2
  "1003555": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH2
  "1003557": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX HZ2 (cleaner link)
  "33305": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_speedmax_aro_16_sp900_20560r16_bl92h_1_20260424103328_4905187ae2fd.jpg", // SPEEDMAX FRD96 Carga
  "35479": "https://pneufree.s3.sa-east-1.amazonaws.com/pneus/xbri/fastway/pneu-xbri-fastway.png", // XBRI FASTWAY B2
  "325": "https://pneufree.s3.sa-east-1.amazonaws.com/pneus/xbri/ecology/pneu-xbri-ecology.png", // XBRI ECOLOGY
  "1008348": "https://pneufree.s3.sa-east-1.amazonaws.com/pneus/xbri/sport-2/pneu-xbri-sport-2.png", // XBRI SPORT+2
  "24906": "https://pneufree.s3.sa-east-1.amazonaws.com/pneus/xbri/sport-2/pneu-xbri-sport-2.png", // XBRI SPORT+2
  // New corrections and replacements of Carplus watermarked/placeholder logo images with real product images:
  "1002824": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_26550r20_prinx_hp1_111v_1_20250912205111_9f30473a2a9e.jpg", // PRINX 265/50/20 111V HP1
  "39004": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_185r14_comforser_cf300_102100q_8_lonas_1_20250913220610_e6eaff49455b.jpg", // COMFORSER 185/14 102/100Q CF300
  "1007801": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_25555r19_delinte_dx10_bandit_at_xl_111h_1_20260520093729_98345bb285c5.jpg", // DELINTE 275/55/19 111H DX10 BANDIT A/T
  "1007857": "https://http2.mlstatic.com/D_NQ_NP_2X_626418-MLA99433714880_112025-F.webp", // FIRESTONE 215/55/18 99V DESTINATION
  "1009102": "https://http2.mlstatic.com/D_NQ_NP_2X_876779-MLA108023547849_032026-F.webp", // CONTINENTAL 225/55/18 98V CONTICROOSCONTACT LX2
  "1009010": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 175/65/14 POWERCONTACT 2 82T
  "1005837": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 185/65/15 88H POWERCONTACT2
  "229": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 185/70/14 POWERCONTACT 2
  "239": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 195/55/15 85H POWERCONTACT 2
  "39041": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 195/55/16 87H POWERCONTACT 2
  "19953": "https://http2.mlstatic.com/D_NQ_NP_2X_750438-MLU72688005391_112023-F.webp", // CONTINENTAL 195/60/15 ULTRACONTACT 88H
  "25890": "https://http2.mlstatic.com/D_NQ_NP_2X_733596-MLU73663673522_012024-F.webp", // CONTINENTAL 205/55/16 91V FR POWERCONTACT2
  "1008310": "https://http2.mlstatic.com/D_NQ_NP_2X_613919-MLB72905080064_112023-F.webp", // CONTINENTAL 225/65/16 112/110R VANCONTACT AP 8PR
  "23901": "https://http2.mlstatic.com/D_NQ_NP_2X_769357-MLA72807963283_112023-F.webp", // FIRESTONE 175/70/14 F700 88T
  "1008379": "https://http2.mlstatic.com/D_NQ_NP_2X_892285-MLA74676571520_022024-F.webp", // FIRESTONE 265/65/17 112H DESTINATION LE2
};

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function main() {
  const url = 'https://docs.google.com/spreadsheets/d/1jVynFSPysvfx1G2AjfrMywmeyavo4qRZihMJzNeVJtU/export?format=csv&gid=1950727399';
  console.log("Fetching and compiling online sheet dataset into src/data.ts...");
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const lines = csvText.split('\n');
    console.log(`Successfully fetched ${lines.length} lines.`);

    const parsedTires: Tire[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseCSVLine(line);
      if (cols.length < 3) continue;

      const id = cols[0];
      const desc = cols[1];
      const priceStr = cols[2];
      const imageUrl = cols[4] || '';

      if (!id || !desc || !priceStr) continue;

      // Extract raw numeric price from format like "R$ 619,00"
      const cleanPrice = priceStr.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
      const priceVal = parseFloat(cleanPrice);
      if (isNaN(priceVal)) continue;

      // Parse width, aspect ratio, rim
      const specRegex = /(\d{3})\/(\d{2,3})[\s\/]?[R]?(\d{1,2})(C)?/i;
      const match = desc.match(specRegex);

      let width = 0;
      let aspectRatio = 0;
      let rim = 0;

      if (match) {
        width = parseInt(match[1]);
        aspectRatio = parseInt(match[2]);
        rim = parseInt(match[3]);
      } else {
        // Alt parsing regex
        const altSpecRegex = /(\d{3})[\s_](\d{2})[\s_]R?(\d{1,2})/i;
        const altMatch = desc.match(altSpecRegex);
        if (altMatch) {
          width = parseInt(altMatch[1]);
          aspectRatio = parseInt(altMatch[2]);
          rim = parseInt(altMatch[3]);
        } else {
          console.warn(`Dimensions parse fallback skipped Row ${i}: "${desc}"`);
          continue;
        }
      }

      const brand = desc.split(' ')[0].toUpperCase();

      // Extract model: clean remaining words after removing brand & spec
      let model = desc.replace(new RegExp(brand, 'i'), '').trim();
      if (match) {
        model = model.replace(match[0], '').trim();
      }
      const loadSpeedRegex = /\b\d{2,3}(\/\d{2,3})?[A-Z]\b/i;
      model = model.replace(loadSpeedRegex, '').trim();
      model = model.replace(/^[-_\s]+|[-_\s]+$/g, '').trim().toUpperCase();

      // Check for manual image correction, fallback to global standard otherwise
      let finalImage = imageUrl.trim();
      if (IMAGE_CORRECTIONS[id]) {
        finalImage = IMAGE_CORRECTIONS[id];
      } else if (!finalImage || finalImage.includes("lovecell") || finalImage.includes("viajabonito")) {
        finalImage = 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg';
      }

      parsedTires.push({
        id,
        brand,
        name: desc,
        price: priceVal,
        promoPrice: priceVal,
        image: finalImage,
        width,
        aspectRatio,
        rim,
        model,
        isOffer: true
      });
    }

    console.log(`Processed ${parsedTires.length} total valid tires. Writing to src/data.ts...`);

    const dataContents = `import { Tire, CarModel, ServiceRecord } from './types';

// Large dataset of real tires from the provided Google Sheet (176 promotion tires):
const RAW_TIRES_DATA: Tire[] = ${JSON.stringify(parsedTires, null, 2)};

// Dynamic conversion booster: Make every tire have a discount where original price is markup simulated (R$49 to R$150)
export const TIRES_DATA: Tire[] = RAW_TIRES_DATA.map(tire => {
  const charCodeSum = tire.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 10);
  const simulatedMarkup = 49 + (charCodeSum % 102); // Guaranteed between R$ 49 and R$ 150
  
  const promoPrice = tire.promoPrice || tire.price;
  const price = promoPrice + simulatedMarkup;

  return {
    ...tire,
    price,
    promoPrice,
    isOffer: true // Boost conversion: Show every single tire with dynamic, beautiful offers!
  };
});

// Complete list of popular car brand models in Brazil with homologated tire ratios
export const CAR_MODELS_DATA: CarModel[] = [
  // FIAT
  { id: 'f1', brand: 'Fiat', name: 'Palio / Palio Weekend', yearRange: '2005 - 2018', recommendedTireRatio: '175/65/14' },
  { id: 'f2', brand: 'Fiat', name: 'Uno / Novo Uno', yearRange: '2010 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'f3', brand: 'Fiat', name: 'Argo', yearRange: '2017 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'f4', brand: 'Fiat', name: 'Cronos', yearRange: '2018 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'f5', brand: 'Fiat', name: 'Mobi', yearRange: '2016 - 2026', recommendedTireRatio: '175/65/14' },
  { id: 'f6', brand: 'Fiat', name: 'Siena / Grand Siena', yearRange: '2008 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'f7', brand: 'Fiat', name: 'Strada (Aro 14)', yearRange: '2010 - 2020', recommendedTireRatio: '175/70/14' },
  { id: 'f8', brand: 'Fiat', name: 'Strada (Aro 15)', yearRange: '2015 - 2026', recommendedTireRatio: '185/65/15' },

  // VOLKSWAGEN
  { id: 'vw1', brand: 'Volkswagen', name: 'Gol', yearRange: '2008 - 2023', recommendedTireRatio: '175/65/14' },
  { id: 'vw2', brand: 'Volkswagen', name: 'Voyage', yearRange: '2008 - 2023', recommendedTireRatio: '175/65/14' },
  { id: 'vw3', brand: 'Volkswagen', name: 'Polo / Novo Polo', yearRange: '2018 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'vw4', brand: 'Volkswagen', name: 'Fox / CrossFox', yearRange: '2005 - 2021', recommendedTireRatio: '195/55/15' },
  { id: 'vw5', brand: 'Volkswagen', name: 'Virtus', yearRange: '2018 - 2026', recommendedTireRatio: '195/55/15' },
  { id: 'vw6', brand: 'Volkswagen', name: 'Saveiro', yearRange: '2010 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'vw7', brand: 'Volkswagen', name: 'T-Cross (Aro 17)', yearRange: '2019 - 2026', recommendedTireRatio: '205/55/17' },
  { id: 'vw8', brand: 'Volkswagen', name: 'Nivus', yearRange: '2020 - 2026', recommendedTireRatio: '205/55/17' },

  // CHEVROLET
  { id: 'ch1', brand: 'Chevrolet', name: 'Onix', yearRange: '2012 - 2026', recommendedTireRatio: '185/65/15' },
  { id: 'ch2', brand: 'Chevrolet', name: 'Prisma', yearRange: '2013 - 2019', recommendedTireRatio: '185/65/15' },
  { id: 'ch3', brand: 'Chevrolet', name: 'Spin', yearRange: '2012 - 2026', recommendedTireRatio: '195/65/15' },
  { id: 'ch4', brand: 'Chevrolet', name: 'Cruze', yearRange: '2011 - 2023', recommendedTireRatio: '215/50/17' },
  { id: 'ch5', brand: 'Chevrolet', name: 'Tracker', yearRange: '2013 - 2026', recommendedTireRatio: '215/60/17' },
  { id: 'ch6', brand: 'Chevrolet', name: 'Celta', yearRange: '2000 - 2015', recommendedTireRatio: '165/70/13' },
  { id: 'ch7', brand: 'Chevrolet', name: 'Corsa', yearRange: '1996 - 2012', recommendedTireRatio: '175/65/14' },
  { id: 'ch8', brand: 'Chevrolet', name: 'S10 (Aro 18)', yearRange: '2012 - 2026', recommendedTireRatio: '265/60/18' },

  // HYUNDAI
  { id: 'hy1', brand: 'Hyundai', name: 'HB20', yearRange: '2012 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'hy2', brand: 'Hyundai', name: 'HB20S', yearRange: '2013 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'hy3', brand: 'Hyundai', name: 'Creta (Aro 16)', yearRange: '2017 - 2026', recommendedTireRatio: '205/65/16' },
  { id: 'hy4', brand: 'Hyundai', name: 'Creta (Aro 17)', yearRange: '2017 - 2026', recommendedTireRatio: '215/60/17' },
  { id: 'hy5', brand: 'Hyundai', name: 'Tucson', yearRange: '2005 - 2022', recommendedTireRatio: '215/65/16' },

  // TOYOTA
  { id: 'ty1', brand: 'Toyota', name: 'Corolla (Aro 16)', yearRange: '2008 - 2019', recommendedTireRatio: '205/55/16' },
  { id: 'ty2', brand: 'Toyota', name: 'Corolla (Aro 17)', yearRange: '2015 - 2026', recommendedTireRatio: '215/50/17' },
  { id: 'ty3', brand: 'Toyota', name: 'Etios', yearRange: '2012 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'ty4', brand: 'Toyota', name: 'Yaris', yearRange: '2018 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'ty5', brand: 'Toyota', name: 'Hilux (Aro 17)', yearRange: '2005 - 2026', recommendedTireRatio: '265/65/17' },
  { id: 'ty6', brand: 'Toyota', name: 'Hilux (Aro 18)', yearRange: '2015 - 2026', recommendedTireRatio: '265/60/18' },

  // HONDA
  { id: 'hn1', brand: 'Honda', name: 'Civic (Aro 16)', yearRange: '2006 - 2016', recommendedTireRatio: '205/55/16' },
  { id: 'hn2', brand: 'Honda', name: 'Civic (Aro 17)', yearRange: '2012 - 2021', recommendedTireRatio: '215/50/17' },
  { id: 'hn3', brand: 'Honda', name: 'Fit', yearRange: '2003 - 2021', recommendedTireRatio: '185/55/16' },
  { id: 'hn4', brand: 'Honda', name: 'HR-V', yearRange: '2015 - 2026', recommendedTireRatio: '215/55/17' },
  { id: 'hn5', brand: 'Honda', name: 'City', yearRange: '2009 - 2026', recommendedTireRatio: '185/55/16' },

  // RENAULT
  { id: 'rn1', brand: 'Renault', name: 'Sandero', yearRange: '2007 - 2024', recommendedTireRatio: '185/65/15' },
  { id: 'rn2', brand: 'Renault', name: 'Logan', yearRange: '2007 - 2024', recommendedTireRatio: '185/65/15' },
  { id: 'rn3', brand: 'Renault', name: 'Duster', yearRange: '2011 - 2026', recommendedTireRatio: '215/65/16' },
  { id: 'rn4', brand: 'Renault', name: 'Kwid', yearRange: '2017 - 2026', recommendedTireRatio: '165/70/14' },

  // FORD
  { id: 'fr1', brand: 'Ford', name: 'Ka', yearRange: '2008 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'fr2', brand: 'Ford', name: 'Fiesta', yearRange: '2002 - 2019', recommendedTireRatio: '195/55/15' },
  { id: 'fr3', brand: 'Ford', name: 'EcoSport (Aro 15)', yearRange: '2003 - 2012', recommendedTireRatio: '205/65/15' },
  { id: 'fr4', brand: 'Ford', name: 'EcoSport (Aro 16)', yearRange: '2012 - 2021', recommendedTireRatio: '205/60/16' },
  { id: 'fr5', brand: 'Ford', name: 'Ranger', yearRange: '2012 - 2026', recommendedTireRatio: '265/65/17' },

  // JEEP
  { id: 'jp1', brand: 'Jeep', name: 'Compass (Aro 18)', yearRange: '2016 - 2026', recommendedTireRatio: '225/55/18' },
  { id: 'jp2', brand: 'Jeep', name: 'Compass (Aro 19)', yearRange: '2016 - 2026', recommendedTireRatio: '235/45/19' },
  { id: 'jp3', brand: 'Jeep', name: 'Renegade (Aro 16)', yearRange: '2015 - 2026', recommendedTireRatio: '215/65/16' },
  { id: 'jp4', brand: 'Jeep', name: 'Renegade (Aro 17)', yearRange: '2015 - 2026', recommendedTireRatio: '215/60/17' },
  { id: 'jp5', brand: 'Jeep', name: 'Renegade (Aro 18)', yearRange: '2015 - 2026', recommendedTireRatio: '225/55/18' }
];

// google most searched tire measures in Brazil / Curitiba
export const MOST_SEARCHED_MEASURES = [
  { text: '175/65 R14', query: '175/65/14', searches: '74.000 buscas/mês' },
  { text: '185/60 R15', query: '185/60/15', searches: '60.500 buscas/mês' },
  { text: '195/55 R15', query: '195/55/15', searches: '49.000 buscas/mês' },
  { text: '185/60 R14', query: '185/60/14', searches: '33.100 buscas/mês' },
  { text: '205/55 R17', query: '205/55/17', searches: '27.400 buscas/mês' },
  { text: '175/70 R14', query: '175/70/14', searches: '22.800 buscas/mês' }
];

// Initial mock service records that users can search on the store
export const DEFAULT_SERVICE_HISTORY: ServiceRecord[] = [
  {
    id: 'H1',
    plate: 'AAA-1234',
    vehicle: 'Fiat Palio 1.4',
    ownerName: 'Ricardo Silva',
    date: '10/05/2026',
    services: ['Troca de 2 Pneus Firestone 175/65/14', 'Alinhamento 3D', 'Balanceamento'],
    total: 828.00,
    status: 'Concluído',
    km: 84320
  },
  {
    id: 'H2',
    plate: 'BBB-5678',
    vehicle: 'VW Gol Trend',
    ownerName: 'Mariana Santos',
    date: '28/04/2026',
    services: ['Troca de 4 Pneus Continental 175/65/14', 'Manutenção Suspensão Dianteira', 'Higienização de Ar'],
    total: 1616.00,
    status: 'Concluído',
    km: 112000
  },
  {
    id: 'H3',
    plate: 'COP-2026',
    vehicle: 'Fiat Argo Drive',
    ownerName: 'Cleverson Ramos',
    date: '11/06/2026',
    services: ['Troca de 2 Pneus Delinte 185/60/15', 'Balanceamento das Rodas', 'Alinhamento'],
    total: 698.00,
    status: 'Agendado',
    km: 45000
  },
  {
    id: 'H4',
    plate: 'CAR-0990',
    vehicle: 'VW Polo TSI',
    ownerName: 'Juliana Portão',
    date: '08/06/2026',
    services: ['Revisão de Freios e Pastilhas', 'Alinhamento Técnico'],
    total: 390.00,
    status: 'Em Andamento',
    km: 31200
  }
];
`;

    fs.writeFileSync(path.join(process.cwd(), 'src/data.ts'), dataContents);
    console.log("data.ts has been successfully compiled and written!");
  } catch (err: any) {
    console.error("Failed compiling data.ts:", err.message);
  }
}

main();
