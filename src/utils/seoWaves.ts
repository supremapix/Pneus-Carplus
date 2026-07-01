import { OFFICIAL_NEIGHBORHOODS, NON_OFFICIAL_NEIGHBORHOODS, METROPOLITAN_CITIES } from '../seo-data';

// 1. Priority Lists for Phase 1
export const PRIORITY_NEIGHBORHOODS = [
  "Portão", "Batel", "Água Verde", "Bigorrilho", "Cabral", 
  "Ecoville", "Seminário", "Santa Felicidade", "Xaxim", "Boqueirão", 
  "Hauer", "Rebouças", "Centro", "Juvevê", "Cristo Rei", 
  "Jardim das Américas", "Vila Izabel", "Campina do Siqueira", "Mossunguê", "Novo Mundo"
];

export const PRIORITY_CITIES = [
  "São José dos Pinhais", "Araucária", "Pinhais", "Colombo", "Fazenda Rio Grande"
];

// 2. All Aros & Cars
export const AROS = ["13", "14", "15", "16", "17", "18", "19", "20"];

export const CARS = [
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

interface ScoreMetrics {
  volumeBusca: number;
  proximidade: number;
  potencialConversao: number;
}

// 3. Local Score Calculator
export function calculateLocalScore(name: string, type: 'bairro' | 'cidade' | 'carro' | 'aro'): number {
  let volumeBusca = 50;
  let proximidade = 50;
  let potencialConversao = 50;

  const cleanName = name.trim();
  const lower = cleanName.toLowerCase();

  if (type === 'bairro') {
    // Volume de busca weights
    if (["portão", "batel", "água verde", "boqueirão", "centro", "santa felicidade", "cidade industrial (cic)", "cic", "neoville", "neo ville"].some(v => lower.includes(v))) {
      volumeBusca = 100;
    } else if (["cabral", "juvevê", "bigorrilho", "ecoville", "novo mundo", "xaxim", "hauer", "rebouças", "jardim das américas"].some(v => lower.includes(v))) {
      volumeBusca = 90;
    } else if (["seminário", "cristo rei", "vila izabel", "campina do siqueira", "mossunguê", "alto da glória", "jardim botânico", "mercês", "pinheirinho", "capão raso"].some(v => lower.includes(v))) {
      volumeBusca = 80;
    } else {
      volumeBusca = 60;
    }

    // Proximidade to Av Presidente Arthur Bernardes, 1323 (Portão)
    if (["portão", "vila izabel", "água verde"].some(v => lower.includes(v))) {
      proximidade = 100;
    } else if (["seminário", "novo mundo", "fazendinha", "santa quitéria", "lindóia", "fanny", "guaíra", "parolin", "neoville", "neo ville"].some(v => lower.includes(v))) {
      proximidade = 90;
    } else if (["batel", "bigorrilho", "rebouças", "campina do siqueira"].some(v => lower.includes(v))) {
      proximidade = 85;
    } else if (["centro", "cidade industrial", "cic", "hauer", "xaxim"].some(v => lower.includes(v))) {
      proximidade = 75;
    } else if (["boqueirão", "cabral", "juvevê", "cristo rei", "jardim das américas", "ecoville", "mossunguê"].some(v => lower.includes(v))) {
      proximidade = 65;
    } else if (["santa felicidade", "pinheirinho", "sítio cercado", "uberaba", "barreirinha", "boa vista", "bacacheri", "bairro alto"].some(v => lower.includes(v))) {
      proximidade = 50;
    } else if (["caximba", "ganchinho", "tatuquara", "riviera", "abranches"].some(v => lower.includes(v))) {
      proximidade = 25;
    } else {
      proximidade = 55;
    }

    // Potencial de Conversão
    if (["batel", "cabral", "ecoville", "mossunguê", "bigorrilho", "juvevê", "jardim social", "alto da glória"].some(v => lower.includes(v))) {
      potencialConversao = 100;
    } else if (["portão", "água verde", "centro", "boqueirão", "xaxim", "novo mundo", "cidade industrial", "cic", "neoville", "neo ville"].some(v => lower.includes(v))) {
      potencialConversao = 95;
    } else if (["rebouças", "cristo rei", "hauer", "santa felicidade", "jardim das américas", "seminário", "vila izabel", "campina do siqueira", "mercês", "bacacheri"].some(v => lower.includes(v))) {
      potencialConversao = 85;
    } else {
      potencialConversao = 60;
    }
  } else if (type === 'cidade') {
    // Cidades
    if (["pinhais", "são josé", "sjp"].some(v => lower.includes(v))) {
      volumeBusca = 90;
      proximidade = 80;
      potencialConversao = 90;
    } else if (["araucária", "colombo", "fazenda"].some(v => lower.includes(v))) {
      volumeBusca = 85;
      proximidade = 70;
      potencialConversao = 85;
    } else if (["pinhais", "campo largo"].some(v => lower.includes(v))) {
      volumeBusca = 80;
      proximidade = 65;
      potencialConversao = 80;
    } else {
      volumeBusca = 50;
      proximidade = 40;
      potencialConversao = 50;
    }
  } else if (type === 'carro') {
    // Carros
    if (["onix", "hb20", "gol", "palio", "uno", "ka", "sandero", "compass"].some(v => lower.includes(v))) {
      volumeBusca = 90;
      proximidade = 60;
      potencialConversao = 85;
    } else {
      volumeBusca = 70;
      proximidade = 60;
      potencialConversao = 75;
    }
  } else if (type === 'aro') {
    // Aros
    if (["14", "15", "16", "17"].some(v => lower.includes(v))) {
      volumeBusca = 100;
      proximidade = 60;
      potencialConversao = 95;
    } else {
      volumeBusca = 80;
      proximidade = 60;
      potencialConversao = 80;
    }
  }

  // Weight combination: (volume de busca * 0.4) + (proximidade da loja * 0.3) + (potencial de conversão * 0.3)
  const score = (volumeBusca * 0.4) + (proximidade * 0.3) + (potencialConversao * 0.3);
  return Math.round(score);
}

// Helper to normalized lists of all items
export function getAllNeighborhoods(): string[] {
  const all: string[] = [];
  OFFICIAL_NEIGHBORHOODS.forEach(n => {
    if (!all.includes(n)) all.push(n);
  });
  NON_OFFICIAL_NEIGHBORHOODS.forEach(n => {
    if (!all.includes(n.name)) all.push(n.name);
  });
  return all;
}

export function getAllCities(): string[] {
  return [...METROPOLITAN_CITIES];
}

// 4. Wave Release Calculations
// Sorted list of non-priority neighborhoods and cities dynamically computed by LOCAL_SCORE
let cachedWave2Bairros: string[] | null = null;
let cachedWave2Cidades: string[] | null = null;

export function getWave2Bairros(): string[] {
  if (cachedWave2Bairros) return cachedWave2Bairros;
  const neighborhoods = getAllNeighborhoods();
  const nonPriority = neighborhoods.filter(n => !PRIORITY_NEIGHBORHOODS.includes(n));
  
  // Sort by score desc, pick top 20
  const sorted = nonPriority.map(n => ({
    name: n,
    score: calculateLocalScore(n, 'bairro')
  })).sort((a, b) => b.score - a.score);

  cachedWave2Bairros = sorted.slice(0, 20).map(s => s.name);
  return cachedWave2Bairros;
}

export function getWave2Cidades(): string[] {
  if (cachedWave2Cidades) return cachedWave2Cidades;
  const cities = getAllCities();
  const nonPriority = cities.filter(c => !PRIORITY_CITIES.includes(c));

  // Sort by score desc, pick top 5
  const sorted = nonPriority.map(c => ({
    name: c,
    score: calculateLocalScore(c, 'cidade')
  })).sort((a, b) => b.score - a.score);

  cachedWave2Cidades = sorted.slice(0, 5).map(s => s.name);
  return cachedWave2Cidades;
}

// Core checker to see if a link is indexable based on current simulation GSC rate
export function isPageReleased(name: string, type: 'bairro' | 'cidade' | 'carro' | 'aro', gscIndexationRate: number): boolean {
  if (gscIndexationRate >= 90) {
    // Phase 3: ALL is released
    return true;
  }

  if (gscIndexationRate >= 80) {
    // Phase 2: Priority + Wave 2 elements
    if (type === 'bairro') {
      return PRIORITY_NEIGHBORHOODS.includes(name) || getWave2Bairros().includes(name);
    }
    if (type === 'cidade') {
      return PRIORITY_CITIES.includes(name) || getWave2Cidades().includes(name);
    }
    // Cars and Aros are released only in Phase 3
    return false;
  }

  // Phase 1 (Initial / GSC Indexation rate < 80)
  if (type === 'bairro') {
    return PRIORITY_NEIGHBORHOODS.includes(name);
  }
  if (type === 'cidade') {
    return PRIORITY_CITIES.includes(name);
  }
  return false;
}

// Retrieve GSC indexing state from localStorage (client only) or fall back to standard Phase 2 rate (80%)
export function getSavedGSCRate(): number {
  if (typeof window === 'undefined') {
    // In build-time (Node.js), we are compiling Phase 2 (80%)!
    return 80;
  }
  const saved = localStorage.getItem('carplus_gsc_indexing_rate');
  if (saved !== null) {
    const rate = parseFloat(saved);
    if (!isNaN(rate)) return rate;
  }
  return 80; // default initial simulated indexation rate is 80% (Phase 2)
}

export function saveGSCRate(rate: number) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('carplus_gsc_indexing_rate', rate.toString());
  }
}
