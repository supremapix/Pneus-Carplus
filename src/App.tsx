import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TireCard from './components/TireCard';
import CartDrawer from './components/CartDrawer';
import ServiceHistory from './components/ServiceHistory';
import TireFinderWizard from './components/TireFinderWizard';
import LiveWhatsAppChat from './components/LiveWhatsAppChat';
import ScrollToTop from './components/ScrollToTop';
import CompanyPages from './components/CompanyPages';
import TireDetail from './components/TireDetail';
import { TIRES_DATA, MOST_SEARCHED_MEASURES, getBrandFallbackImage } from './data';
import { toSlug, getTireSlug } from './utils/slugify';
import EnhancedSEO from './components/EnhancedSEO';
import CarplusVideosSection from './components/CarplusVideosSection';
import InstagramFeed from './components/InstagramFeed';
import { Tire, CartItem } from './types';
import FloatingShare from './components/FloatingShare';

const BRAND_LOGOS: Record<string, string> = {
  BRIDGESTONE: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg",
  PIRELLI: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg",
  MICHELIN: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg",
  CONTINENTAL: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/continental.svg",
  GOODYEAR: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-goodyear.svg",
  YOKOHAMA: "https://icon2.cleanpng.com/20180516/evq/avr9ddjh0.webp",
  FIRESTONE: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-firestone.svg",
  DELINTE: "https://s19532.pcdn.co/wp-content/uploads/2019/12/Delinte-Logo-1.jpg",
  COMFORSER: "https://www.gtiresinternational.us/wp-content/uploads/2022/10/Comforser-Tires.png",
  XBRI: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/xbri.svg",
  PRINX: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRauciXYNudC8XaeVj_7c3o5urb17rrs_uw&s",
  LINGLONG: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-linglong.svg",
  SPEEDMAX: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6La6GWmZDeZMCxlH4OA8rJcNjLj8mrjpW4A&s"
};
import { 
  OFFICIAL_NEIGHBORHOODS, NON_OFFICIAL_NEIGHBORHOODS, POPULAR_REGIONS, 
  METROPOLITAN_CITIES, getRouteInstructions 
} from './seo-data';
import { 
  Search, ShieldCheck, Settings, PenTool as Tool, Sparkles, Navigation, 
  Map, Phone, Bookmark, Zap, SlidersHorizontal, CheckCircle, Info, Flame, ThumbsUp,
  ChevronUp, ChevronDown, Globe, Award, Car
} from 'lucide-react';

export default function App() {
  // Global States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'quem-somos' | 'politica-privacidades' | 'politica-devolucao' | 'mapa-do-site' | 'seo-landing' | 'pneu-detalhes' | 'contato' | 'curitiba' | 'regiao-metropolitana' | 'admin-indexacao' | 'carrinho' | 'oficina-do-pneu-curitiba' | 'garagem-de-pneus-curitiba' | 'pneus-pirelli-curitiba' | 'alinhamento-3d-curitiba' | 'blog' | 'xbri-pneus-curitiba' | 'pneus-baratos-em-curitiba' | 'melhor-site-para-comprar-pneus' | 'distribuidora-de-pneus-importados-atacado-curitiba' | 'pneu-hankook-curitiba' | 'pneus-bridgestone-curitiba-precos' | 'barao-pneus-e-oficina-bacacheri-curitiba' | 'barao-pneus-sao-jose-pinhais' | 'pneus-em-curitiba-melhor-preco' | 'distribuidora-de-pneus-em-curitiba' | 'bana-pneus' | 'loja-de-pneus-em-curitiba' | 'pneus-pirelli-em-curitiba-melhor-preco' | 'barao-pneus-e-oficina-portao'>('home');
  const [seoTarget, setSeoTarget] = useState<{ type: 'bairro' | 'cidade' | 'aro' | 'carro'; name: string; region?: string; detail?: string; } | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [activeHomeFaqIdx, setActiveHomeFaqIdx] = useState<number | null>(null);
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);
  const [isConveyorPaused, setIsConveyorPaused] = useState(false);

  // Search and Filter States
  const [keyword, setKeyword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedRim, setSelectedRim] = useState<'Todos' | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20>('Todos');
  const [filterWidth, setFilterWidth] = useState('Todos');
  const [filterProfile, setFilterProfile] = useState('Todos');
  const [onlyOffers, setOnlyOffers] = useState(false);

  // High-Fidelity Categories Portal Sub-Tabs
  const [activeCategoryTab, setActiveCategoryTab] = useState<'aro' | 'marcas' | 'carros'>('aro');
  const [carSearchQuery, setCarSearchQuery] = useState('');
  const [carSelectedBrand, setCarSelectedBrand] = useState('Todos');

  // Large vehicle application reference database (Which tire goes on which car?)
  const ALL_BRANDS_CARS = [
    { brand: 'Fiat', model: 'Mobi', years: '2016-2026', measure: '175/65/14', engine: '1.0 Fire' },
    { brand: 'Fiat', model: 'Palio G3/G4', years: '2005-2018', measure: '175/65/14', engine: '1.0 / 1.4' },
    { brand: 'Fiat', model: 'Uno G2 (Novo)', years: '2010-2021', measure: '175/65/14', engine: '1.0 Evo' },
    { brand: 'Fiat', model: 'Uno Mille Antigo', years: '1990-2013', measure: '175/70/13', engine: '1.0 Smart' },
    { brand: 'Fiat', model: 'Argo Drive', years: '2017-2026', measure: '185/60/15', engine: '1.0 / 1.3 Firefly' },
    { brand: 'Fiat', model: 'Cronos', years: '2018-2026', measure: '185/60/15', engine: '1.3 Flex' },
    { brand: 'Fiat', model: 'Strada (Aro 14)', years: '2010-2020', measure: '175/70/14', engine: '1.4 Fire' },
    { brand: 'Fiat', model: 'Strada Novo Modelo', years: '2020-2026', measure: '185/60/15', engine: '1.3 Firefly' },
    { brand: 'Fiat', model: 'Siena / Grand Siena', years: '2008-2021', measure: '175/65/14', engine: '1.0 / 1.4' },
    { brand: 'Fiat', model: 'Toro Freedom', years: '2016-2025', measure: '215/65/16', engine: '1.8 Flex' },

    { brand: 'Volkswagen', model: 'Gol G4/G5/G6/G7', years: '2008-2023', measure: '175/65/14', engine: '1.0 / 1.6 MSi' },
    { brand: 'Volkswagen', model: 'Gol (R13)', years: '1996-2008', measure: '175/70/13', engine: '1.0 MI / 1.6 AP' },
    { brand: 'Volkswagen', model: 'Voyage MSi', years: '2008-2023', measure: '175/65/14', engine: '1.0 / 1.6' },
    { brand: 'Volkswagen', model: 'Fox Trend', years: '2005-2021', measure: '195/55/15', engine: '1.0 / 1.6' },
    { brand: 'Volkswagen', model: 'Polo Comfortline', years: '2018-2026', measure: '185/60/15', engine: '1.0 TSI' },
    { brand: 'Volkswagen', model: 'Virtus', years: '2018-2026', measure: '195/55/15', engine: '1.6 MSi / 1.0T' },
    { brand: 'Volkswagen', model: 'Saveiro Trend / Robust', years: '2012-2026', measure: '185/60/15', engine: '1.6 MSi' },
    { brand: 'Volkswagen', model: 'T-Cross Sense / 200 TSI', years: '2019-2026', measure: '205/55/17', engine: '1.0 TSI' },
    { brand: 'Volkswagen', model: 'Nivus Comfortline / Highline', years: '2020-2026', measure: '205/55/17', engine: '1.0 TSI' },
    { brand: 'Volkswagen', model: 'Amarok Highline', years: '2011-2025', measure: '265/60/18', engine: '2.0 / 3.0 V6 TDI' },

    { brand: 'Chevrolet', model: 'Onix Joy / Joy Plus', years: '2016-2021', measure: '175/65/14', engine: '1.0 SPE/4' },
    { brand: 'Chevrolet', model: 'Onix LT / LTZ', years: '2013-2019', measure: '185/65/15', engine: '1.4 SPE/4' },
    { brand: 'Chevrolet', model: 'Onix Premier Turbo', years: '2020-2026', measure: '195/55/16', engine: '1.0 Turbo' },
    { brand: 'Chevrolet', model: 'Prisma LTZ', years: '2013-2019', measure: '185/65/15', engine: '1.4 SPE/4' },
    { brand: 'Chevrolet', model: 'Corsa Classic', years: '2004-2016', measure: '175/70/13', engine: '1.0 VHC' },
    { brand: 'Chevrolet', model: 'Celta Spirit / Super', years: '2000-2015', measure: '175/70/13', engine: '1.0 VHC' },
    { brand: 'Chevrolet', model: 'Spin LT / LTZ', years: '2012-2026', measure: '195/65/15', engine: '1.8 EconoFlex' },
    { brand: 'Chevrolet', model: 'Cruze Sport6 LT/LTZ', years: '2016-2025', measure: '205/55/16', engine: '1.4 Turbo' },
    { brand: 'Chevrolet', model: 'S10 Advantage / LTZ', years: '2012-2025', measure: '265/60/18', engine: '2.5 / 2.8 CTDI' },

    { brand: 'Hyundai', model: 'HB20 Sense / Unique', years: '2012-2026', measure: '175/65/14', engine: '1.0 Kappa 12V' },
    { brand: 'Hyundai', model: 'HB20 Comfort / Evolution', years: '2013-2026', measure: '185/60/15', engine: '1.0 Turbo / 1.6' },
    { brand: 'Hyundai', model: 'HB20S Sedan Platinum', years: '2016-2026', measure: '185/60/15', engine: '1.0 Turbo' },
    { brand: 'Hyundai', model: 'Creta Action', years: '2017-2024', measure: '205/65/16', engine: '1.6 Gamma' },

    { brand: 'Renault', model: 'Kwid Zen / Intense / Outsider', years: '2017-2026', measure: '165/70/14', engine: '1.0 SCe' },
    { brand: 'Renault', model: 'Sandero Authentique', years: '2008-2022', measure: '185/65/15', engine: '1.0 16V' },
    { brand: 'Renault', model: 'Logan Zen / Life', years: '2008-2024', measure: '185/65/15', engine: '1.0 / 1.6' },
    { brand: 'Renault', model: 'Duster Expression', years: '2011-2020', measure: '205/60/16', engine: '1.6 / 2.0' },

    { brand: 'Ford', model: 'Ka Hatch SE', years: '2014-2021', measure: '175/65/14', engine: '1.0 TiVCT' },
    { brand: 'Ford', model: 'Ka+ Sedan SE', years: '2014-2021', measure: '195/55/15', engine: '1.5 Sigma' },
    { brand: 'Ford', model: 'Fiesta Rocam', years: '2004-2014', measure: '175/65/14', engine: '1.0 / 1.6' },
    { brand: 'Ford', model: 'EcoSport SE', years: '2013-2021', measure: '205/60/16', engine: '1.6 Sigma' },

    { brand: 'Toyota', model: 'Etios Hatch', years: '2012-2021', measure: '175/65/14', engine: '1.3 / 1.5' },
    { brand: 'Toyota', model: 'Yaris XL / XS', years: '2018-2026', measure: '185/60/15', engine: '1.5 Dual VVT-i' },
    { brand: 'Toyota', model: 'Corolla GLi G10/G11', years: '2009-2019', measure: '205/55/16', engine: '1.8 / 2.0' },
    { brand: 'Toyota', model: 'Corolla XEi G11/G12', years: '2015-2023', measure: '215/50/17', engine: '2.0 Flex' },

    { brand: 'Honda', model: 'Fit LX', years: '2008-2021', measure: '185/60/15', engine: '1.5 i-VTEC' },
    { brand: 'Honda', model: 'Fit EXL / Twist', years: '2015-2021', measure: '185/55/16', engine: '1.5 Flex' },
    { brand: 'Honda', model: 'Civic LXS / LXR G9', years: '2012-2016', measure: '205/55/16', engine: '1.8 / 2.0' },
    { brand: 'Honda', model: 'Civic EX / Sporting G10', years: '2016-2021', measure: '215/50/17', engine: '2.0 i-VTEC' }
  ];

  // Unique manufacturers in our listing
  const carManufacturers = ['Todos', 'Fiat', 'Volkswagen', 'Chevrolet', 'Hyundai', 'Renault', 'Ford', 'Toyota', 'Honda'];

  // Filter lists mapped from original dataset
  const uniqueBrands = ['Todas', ...Array.from(new Set(TIRES_DATA.map(t => t.brand)))];
  const uniqueRims = ['Todos', ...Array.from(new Set(TIRES_DATA.map(t => t.rim))).sort((a,b) => a - b)];
  const uniqueWidths = ['Todos', ...Array.from(new Set(TIRES_DATA.map(t => t.width))).sort((a,b) => a - b)];
  const uniqueProfiles = ['Todos', ...Array.from(new Set(TIRES_DATA.map(t => t.aspectRatio))).sort((a,b) => a - b)];

  // Refs for scrolling smoothly
  const homeRef = useRef<HTMLDivElement>(null);
  const finderRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mapsRef = useRef<HTMLDivElement>(null);

  // Cache cart items
  useEffect(() => {
    const saved = localStorage.getItem('carplus_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('carplus_cart', JSON.stringify(items));
  };

  // Cart operations
  const handleAddToCart = (tire: Tire, qty: number) => {
    const items = [...cartItems];
    const matchIdx = items.findIndex(item => item.tire.id === tire.id);
    if (matchIdx > -1) {
      items[matchIdx].quantity += qty;
    } else {
      items.push({ tire, quantity: qty });
    }
    saveCart(items);
    setIsCartOpen(true); // Open the side view to show progress
  };

  const handleRemoveFromCart = (tireId: string) => {
    const updated = cartItems.filter(item => item.tire.id !== tireId);
    saveCart(updated);
  };

  const handleUpdateQuantity = (tireId: string, quantity: number) => {
    const updated = cartItems.map(item => {
      if (item.tire.id === tireId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Dedicated standalone views that switch the main layout view
  const PAGE_VIEWS = [
    'quem-somos',
    'blog',
    'contato',
    'alinhamento-3d-curitiba',
    'curitiba',
    'regiao-metropolitana',
    'politica-privacidades',
    'politica-devolucao',
    'mapa-do-site',
    'oficina-do-pneu-curitiba',
    'garagem-de-pneus-curitiba',
    'pneus-pirelli-curitiba',
    'xbri-pneus-curitiba',
    'pneus-baratos-em-curitiba',
    'melhor-site-para-comprar-pneus',
    'distribuidora-de-pneus-importados-atacado-curitiba',
    'pneu-hankook-curitiba',
    'pneus-bridgestone-curitiba-precos',
    'barao-pneus-e-oficina-bacacheri-curitiba',
    'barao-pneus-sao-jose-pinhais',
    'pneus-em-curitiba-melhor-preco',
    'distribuidora-de-pneus-em-curitiba',
    'bana-pneus',
    'loja-de-pneus-em-curitiba',
    'pneus-pirelli-em-curitiba-melhor-preco',
    'barao-pneus-e-oficina-portao',
    'admin-indexacao'
  ];

  // Scroll handler and page navigation mapping
  const handleScrollToSection = (sectionId: string) => {
    // Normalization & Aliases
    let targetView = sectionId;
    if (sectionId === 'servicos' || sectionId === 'alinhamento') {
      targetView = 'alinhamento-3d-curitiba';
    } else if (sectionId === 'fale-conosco' || sectionId === 'faleconosco') {
      targetView = 'contato';
    }

    // 1. Check if it is a standalone company/institutional page
    if (PAGE_VIEWS.includes(targetView)) {
      setSelectedTire(null);
      setSeoTarget(null);
      setSelectedBlogSlug(null);
      setCurrentView(targetView as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Home page top
    if (sectionId === 'home' || sectionId === '#home') {
      setSelectedTire(null);
      setSeoTarget(null);
      setSelectedBlogSlug(null);
      setCurrentView('home');
      setTimeout(() => {
        const targetElement = homeRef.current;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
      return;
    }

    // 3. Section on the home page ('catalog', 'finder', 'categories', 'maps-section', etc.)
    setSelectedTire(null);
    setSeoTarget(null);
    setSelectedBlogSlug(null);
    setCurrentView('home');

    setTimeout(() => {
      let targetElement: HTMLElement | null = null;
      if (sectionId === 'finder' || sectionId === 'simulador') targetElement = finderRef.current;
      else if (sectionId === 'catalog' || sectionId === 'ofertas' || sectionId === 'estoque') targetElement = catalogRef.current;
      else if (sectionId === 'categories' || sectionId === 'categorias') targetElement = categoriesRef.current;
      else if (sectionId === 'maps-section' || sectionId === 'endereco' || sectionId === 'localizacao') targetElement = mapsRef.current || document.getElementById('maps-section');

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Quick measure filter applier (e.g. from Google searched list)
  const handleSearchMeasure = (ratioStr: string) => {
    // ratioStr is like "175/65/14" or "185/60/15"
    const parts = ratioStr.split('/');
    if (parts.length >= 3) {
      setFilterWidth(parts[0]);
      setFilterProfile(parts[1]);
      setSelectedRim(Number(parts[2]) as any);
      // Clear key filter
      setKeyword('');
      setSelectedBrand('Todas');
      setOnlyOffers(false);
      // Scroll directly to catalog list
      setTimeout(() => {
        handleScrollToSection('catalog');
      }, 50);
    }
  };

  const handleShowTireDetail = (tire: Tire) => {
    setSelectedTire(tire);
    setCurrentView('pneu-detalhes');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Reset all catalog filters
  const resetFilters = () => {
    setKeyword('');
    setSelectedBrand('Todas');
    setSelectedRim('Todos');
    setFilterWidth('Todos');
    setFilterProfile('Todos');
    setOnlyOffers(false);
  };

  // Filter core logic
  const filteredTires = TIRES_DATA.filter((tire) => {
    // 1. Keyword search (fits name, brand or custom terms)
    if (keyword.trim()) {
      const q = keyword.toLowerCase().trim();
      const inName = tire.name.toLowerCase().includes(q);
      const inBrand = tire.brand.toLowerCase().includes(q);
      const inModel = tire.model.toLowerCase().includes(q);
      const exactDim = `${tire.width}/${tire.aspectRatio}/${tire.rim}`.includes(q) || `${tire.width} ${tire.aspectRatio} ${tire.rim}`.includes(q);
      if (!inName && !inBrand && !inModel && !exactDim) {
        return false;
      }
    }

    // 2. Brand selected
    if (selectedBrand !== 'Todas' && tire.brand !== selectedBrand) {
      return false;
    }

    // 3. Rim selected
    if (selectedRim !== 'Todos' && tire.rim !== selectedRim) {
      return false;
    }

    // 4. Width selected
    if (filterWidth !== 'Todos' && tire.width !== Number(filterWidth)) {
      return false;
    }

    // 5. Profile selected
    if (filterProfile !== 'Todos' && tire.aspectRatio !== Number(filterProfile)) {
      return false;
    }

    // 6. Only promo offer
    if (onlyOffers && !tire.isOffer) {
      return false;
    }

    return true;
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTires.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTires = filteredTires.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, selectedBrand, selectedRim, filterWidth, filterProfile, onlyOffers]);

  // --- INTEGRATED SPA CLIENT-SIDE URL ROUTING ENGINE ---
  const parsePathAndSetState = () => {
    const rawPath = window.location.pathname;
    const parts = rawPath.split('/').filter(Boolean);
    
    if (parts.length === 0) {
      setCurrentView('home');
      setSeoTarget(null);
      setSelectedTire(null);
      return;
    }

    const firstRoute = parts[0].toLowerCase();

    // Specific SEO vanity URLs matching
    if (firstRoute === 'aro-14') {
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'aro', name: '14' });
      setSelectedTire(null);
    } else if (firstRoute === 'aro-19') {
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'aro', name: '19' });
      setSelectedTire(null);
    } else if (firstRoute === 'pirelli') {
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'bairro', name: 'Pirelli' });
      setSelectedTire(null);
    } else if (firstRoute === 'honda') {
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'carro', name: 'Honda' });
      setSelectedTire(null);
    } else if (firstRoute === 'sobre-a-carplus' || firstRoute === 'sobre') {
      setCurrentView('quem-somos');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'carrinho') {
      setCurrentView('carrinho');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'quem-somos' || firstRoute === 'quemsomos') {
      setCurrentView('quem-somos');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'curitiba') {
      setCurrentView('curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'regiao-metropolitana' || firstRoute === 'regiaometropolitana') {
      setCurrentView('regiao-metropolitana');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if ((firstRoute === 'admin' && parts[1] === 'indexacao') || firstRoute === 'admin-indexacao') {
      setCurrentView('admin-indexacao');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'politica-privacidades') {
      setCurrentView('politica-privacidades');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'politica-devolucao') {
      setCurrentView('politica-devolucao');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'mapa-do-site') {
      setCurrentView('mapa-do-site');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'contato' || firstRoute === 'fale-conosco' || firstRoute === 'faleconosco') {
      setCurrentView('contato');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'oficina-do-pneu-curitiba') {
      setCurrentView('oficina-do-pneu-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'garagem-de-pneus-curitiba') {
      setCurrentView('garagem-de-pneus-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneus-pirelli-curitiba') {
      setCurrentView('pneus-pirelli-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'alinhamento-3d-curitiba') {
      setCurrentView('alinhamento-3d-curitiba');
      setSelectedBlogSlug(null);
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'blog') {
      setCurrentView('blog');
      const secondPart = parts[1];
      if (secondPart) {
        setSelectedBlogSlug(secondPart);
      } else {
        setSelectedBlogSlug(null);
      }
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'xbri-pneus-curitiba') {
      setCurrentView('xbri-pneus-curitiba');
      setSelectedBlogSlug(null);
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneus-baratos-em-curitiba') {
      setCurrentView('pneus-baratos-em-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'melhor-site-para-comprar-pneus') {
      setCurrentView('melhor-site-para-comprar-pneus');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'distribuidora-de-pneus-importados-atacado-curitiba') {
      setCurrentView('distribuidora-de-pneus-importados-atacado-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneu-hankook-curitiba') {
      setCurrentView('pneu-hankook-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneus-bridgestone-curitiba-precos') {
      setCurrentView('pneus-bridgestone-curitiba-precos');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'barao-pneus-e-oficina-bacacheri-curitiba') {
      setCurrentView('barao-pneus-e-oficina-bacacheri-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'barao-pneus-sao-jose-pinhais') {
      setCurrentView('barao-pneus-sao-jose-pinhais');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneus-em-curitiba-melhor-preco') {
      setCurrentView('pneus-em-curitiba-melhor-preco');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'distribuidora-de-pneus-em-curitiba') {
      setCurrentView('distribuidora-de-pneus-em-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'bana-pneus') {
      setCurrentView('bana-pneus');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'loja-de-pneus-em-curitiba') {
      setCurrentView('loja-de-pneus-em-curitiba');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneus-pirelli-em-curitiba-melhor-preco') {
      setCurrentView('pneus-pirelli-em-curitiba-melhor-preco');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'barao-pneus-e-oficina-portao' || firstRoute === 'pneus-portao-curitiba' || firstRoute === 'pneus-no-portao-curitiba') {
      setCurrentView('barao-pneus-e-oficina-portao');
      setSeoTarget(null);
      setSelectedTire(null);
    } else if (firstRoute === 'pneu' && parts[1]) {
      const tireParam = decodeURIComponent(parts[1]).trim().toLowerCase().replace(/[\s+]+/g, '+');
      // Look for match by direct ID or normalized friendly slug
      const matched = TIRES_DATA.find(t => {
        const idMatch = t.id.toLowerCase() === tireParam;
        const slugMatch = getTireSlug(t).toLowerCase().replace(/[\s+]+/g, '+') === tireParam;
        return idMatch || slugMatch;
      });
      if (matched) {
        setCurrentView('pneu-detalhes');
        setSelectedTire(matched);
        setSeoTarget(null);
      } else {
        setCurrentView('home');
        setSeoTarget(null);
        setSelectedTire(null);
      }
    } else if (firstRoute.startsWith('pneus-no-') || firstRoute.startsWith('pneus-em-')) {
      const isPneusNo = firstRoute.startsWith('pneus-no-');
      const locationSlug = isPneusNo 
        ? firstRoute.substring('pneus-no-'.length) 
        : firstRoute.substring('pneus-em-'.length);
      
      if (locationSlug === 'curitiba' || locationSlug === 'curitiba-melhor-preco') {
        setCurrentView('curitiba');
        setSeoTarget(null);
        setSelectedTire(null);
        return;
      }

      // Check official neighborhood
      let matchedOfficial = OFFICIAL_NEIGHBORHOODS.find(n => toSlug(n) === locationSlug);
      if (locationSlug === 'cic') {
        matchedOfficial = "Cidade Industrial (CIC)";
      }
      if (matchedOfficial) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'bairro', name: matchedOfficial });
        setSelectedTire(null);
        return;
      }

      // Check non-official neighborhood
      let matchedNon = NON_OFFICIAL_NEIGHBORHOODS.find(n => toSlug(n.name) === locationSlug);
      if (locationSlug === 'neo-ville') {
        matchedNon = NON_OFFICIAL_NEIGHBORHOODS.find(n => n.name === 'Neoville');
      }
      if (matchedNon) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'bairro', name: matchedNon.name, region: matchedNon.region });
        setSelectedTire(null);
        return;
      }

      // Check city
      const matchedCity = METROPOLITAN_CITIES.find(c => toSlug(c) === locationSlug);
      if (matchedCity) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'cidade', name: matchedCity });
        setSelectedTire(null);
        return;
      }

      // Fallback
      const fallbackName = locationSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const detectedType = isPneusNo ? 'bairro' : 'cidade';
      setCurrentView('seo-landing');
      setSeoTarget({ type: detectedType, name: fallbackName });
      setSelectedTire(null);
    } else if (firstRoute === 'bairro' && parts[1]) {
      const slug = parts[1].toLowerCase();
      let matchedOfficial = OFFICIAL_NEIGHBORHOODS.find(n => toSlug(n) === slug);
      if (slug === 'cic') {
        matchedOfficial = "Cidade Industrial (CIC)";
      }
      if (matchedOfficial) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'bairro', name: matchedOfficial });
        setSelectedTire(null);
        return;
      }
      let matchedNon = NON_OFFICIAL_NEIGHBORHOODS.find(n => toSlug(n.name) === slug);
      if (slug === 'neo-ville') {
        matchedNon = NON_OFFICIAL_NEIGHBORHOODS.find(n => n.name === 'Neoville');
      }
      if (matchedNon) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'bairro', name: matchedNon.name, region: matchedNon.region });
        setSelectedTire(null);
        return;
      }
      const fallbackName = parts[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'bairro', name: fallbackName });
      setSelectedTire(null);
    } else if (firstRoute === 'cidade' && parts[1]) {
      const slug = parts[1].toLowerCase();
      const matchedCity = METROPOLITAN_CITIES.find(c => toSlug(c) === slug);
      if (matchedCity) {
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'cidade', name: matchedCity });
        setSelectedTire(null);
      } else {
        const fallbackName = parts[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setCurrentView('seo-landing');
        setSeoTarget({ type: 'cidade', name: fallbackName });
        setSelectedTire(null);
      }
    } else if (firstRoute === 'aro' && parts[1]) {
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'aro', name: parts[1] });
      setSelectedTire(null);
    } else if (firstRoute === 'carro' && parts[1]) {
      const fallbackName = parts[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setCurrentView('seo-landing');
      setSeoTarget({ type: 'carro', name: fallbackName });
      setSelectedTire(null);
    } else {
      setCurrentView('home');
      setSeoTarget(null);
      setSelectedTire(null);
    }
  };

  useEffect(() => {
    parsePathAndSetState();
    
    const handlePopState = () => {
      parsePathAndSetState();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    let idealPath = '/';
    if (selectedTire) {
      idealPath = `/pneu/${getTireSlug(selectedTire)}`;
    } else if (currentView === 'seo-landing' && seoTarget) {
      const slugName = toSlug(seoTarget.name);
      const currentPath = window.location.pathname.toLowerCase();
      const expectedPneusNo = `/pneus-no-${slugName}`;
      const expectedPneusEm = `/pneus-em-${slugName}`;
      if (currentPath === expectedPneusNo || currentPath === expectedPneusEm) {
        idealPath = window.location.pathname;
      } else {
        idealPath = `/${seoTarget.type}/${slugName}`;
      }
    } else if (currentView === 'curitiba') {
      idealPath = '/curitiba';
    } else if (currentView === 'regiao-metropolitana') {
      idealPath = '/regiao-metropolitana';
    } else if (currentView === 'admin-indexacao') {
      idealPath = '/admin/indexacao';
    } else if (currentView === 'blog') {
      idealPath = selectedBlogSlug ? `/blog/${selectedBlogSlug}` : '/blog';
    } else if (currentView !== 'home') {
      idealPath = `/${currentView}`;
    }

    if (window.location.pathname !== idealPath) {
      window.history.pushState(null, '', idealPath);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, seoTarget, selectedTire, selectedBlogSlug]);

  // Hot offers in stock to highlight
  const spotlightOffers = TIRES_DATA.filter(t => t.isOffer);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-[#f49e1a] selection:text-gray-950" id="carplus-root">
      
      {/* Dynamic Advanced Helmet-driven Head & Structured Data Management */}
      <EnhancedSEO 
        currentView={currentView} 
        seoTarget={seoTarget} 
        selectedTire={selectedTire} 
        selectedBlogSlug={selectedBlogSlug}
      />
      
      {/* Dynamic Navbar */}
      <Navbar 
        onScrollToSection={handleScrollToSection}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Layout */}
      {currentView === 'pneu-detalhes' && selectedTire ? (
        <main className="flex-1 w-full bg-white">
          <TireDetail 
            tire={selectedTire}
            onBack={() => {
              setCurrentView('home');
              setSelectedTire(null);
            }}
            onAddToCart={handleAddToCart}
          />
        </main>
      ) : currentView !== 'home' ? (
        <main className="flex-1 w-full bg-white">
          <CompanyPages 
            view={currentView}
            seoTarget={seoTarget}
            selectedBlogSlug={selectedBlogSlug}
            onSelectBlogSlug={(slug) => {
              setSelectedBlogSlug(slug);
            }}
            onNavigateHome={() => {
              setCurrentView('home');
              setSeoTarget(null);
              setSelectedBlogSlug(null);
            }}
            onNavigateToPage={(page) => {
              setCurrentView(page);
              setSeoTarget(null);
              setSelectedBlogSlug(null);
            }}
            onSelectSeoTarget={(target) => {
              setCurrentView('seo-landing');
              setSeoTarget(target);
            }}
            onAddToCart={handleAddToCart}
            onSelectTire={handleShowTireDetail}
            onSelectRimFromSeo={(rim) => {
              setSelectedRim(rim);
              setCurrentView('home');
              setTimeout(() => {
                handleScrollToSection('catalog');
              }, 50);
            }}
            onSelectBrandFromSeo={(brand) => {
              setSelectedBrand(brand);
              setCurrentView('home');
              setTimeout(() => {
                handleScrollToSection('catalog');
              }, 50);
            }}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        </main>
      ) : (
        <main className="flex-1 w-full pb-16 bg-white">

          {/* Fully Automatic 100% Dynamic Tire Conveyor Belt (Esteira de Pneus) */}
          <div 
            ref={homeRef}
            className="w-full bg-gray-50 border-b border-gray-200 py-6 px-4 md:px-6 relative z-10 select-none shadow-sm"
            id="conveyor-belt-section"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <div>
                  <span className="bg-black text-white font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-black shadow-sm animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-white" />
                    ESTEIRA AUTOMÁTICA DE OFERTAS
                  </span>
                  <h1 className="text-2xl sm:text-3.5xl font-black uppercase text-gray-950 mt-2 tracking-tight leading-tight" id="conveyor-main-h1">
                    Promoções de Pneus em Destaque no Portão • <span className="text-[#f49e1a]">Menor Preço de Curitiba</span>
                  </h1>
                </div>
                <span className="bg-yellow-500/10 text-yellow-700 text-xs font-black px-4 py-2 rounded-xl border border-yellow-250 shrink-0 hidden md:inline">
                  ● Montagem inclusa + bicos de ar novos grátis
                </span>
              </div>

              {/* Conveyor Track Container */}
              <div 
                className="overflow-hidden relative bg-white border border-gray-200 rounded-3xl py-6 px-4 cursor-grab active:cursor-grabbing shadow-inner"
                id="conveyor-belt-container"
                onTouchStart={() => setIsConveyorPaused(true)}
                onTouchEnd={() => setIsConveyorPaused(false)}
                onMouseEnter={() => setIsConveyorPaused(true)}
                onMouseLeave={() => setIsConveyorPaused(false)}
                onClick={() => setIsConveyorPaused(!isConveyorPaused)}
              >
                {/* Repeating list for seamless slider loops */}
                <div className={`flex gap-6 animate-marquee ${isConveyorPaused ? 'animate-marquee-paused' : ''}`}>
                  {[...spotlightOffers, ...spotlightOffers, ...spotlightOffers, ...spotlightOffers, ...spotlightOffers].map((t, index) => (
                    <div 
                      key={`conveyor-tile-${t.id}-${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowTireDetail(t);
                      }}
                      className="w-72 sm:w-80 bg-white border-2 border-gray-250 hover:border-yellow-500 rounded-2xl p-5 flex flex-col justify-between shrink-0 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center h-48 sm:h-52 overflow-hidden shadow-sm">
                        <span className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-black px-2.5 py-1 rounded shadow">
                          Aro {t.rim}
                        </span>
                        <img 
                          src={t.image} 
                          alt={t.name} 
                          className="h-38 sm:h-44 object-contain transition duration-500 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getBrandFallbackImage(t.brand, t.id);
                          }}
                        />
                      </div>
                      
                      <div className="mt-4 flex-grow text-center lg:text-left min-h-[95px] flex flex-col justify-between">
                        <div>
                          {BRAND_LOGOS[t.brand.toUpperCase()] ? (
                            <div className="flex items-center justify-center lg:justify-start h-12 select-none my-1">
                              <img 
                                src={BRAND_LOGOS[t.brand.toUpperCase()]} 
                                alt={t.brand} 
                                className="h-10 w-auto max-w-[120px] object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-950 bg-gray-100 px-2.5 py-1 rounded shadow-sm font-mono tracking-wider font-black inline-block uppercase border border-gray-200">{t.brand}</span>
                          )}
                          <h4 className="text-sm sm:text-base font-black text-gray-950 leading-tight mt-1 line-clamp-2 hover:text-yellow-600 transition" title={t.name}>
                            {t.name}
                          </h4>
                        </div>
                        
                        <div className="mt-3 flex items-baseline justify-center lg:justify-start gap-1.5">
                          <span className="text-sm font-black text-[#1ebd53] uppercase tracking-wider">Sob Consulta</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowTireDetail(t);
                        }}
                        className="w-full mt-4 bg-gray-950 text-white group-hover:bg-[#f49e1a] group-hover:text-black transition-all font-black py-2.5 rounded-xl text-xs uppercase tracking-wider block text-center shadow-md border border-transparent group-hover:border-black"
                      >
                        Ver Detalhes Técnicos
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informative description paragraph under the conveyor belt for senior readability and prominence */}
              <div className="mt-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4 sm:p-5 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-800 font-black text-justify leading-relaxed">
                  Adquira pneus novos e originais de alta durabilidade com condições imbatíveis. Na Carplus Pneus, você tem direito a <strong>montagem avançada inclusa</strong>, <strong>substituição preventiva dos bicos de ar de graça</strong> e check-up de suspensão completo sem taxas embutidas. Toque em qualquer pneu da esteira acima para consultar aplicações no seu carro ou falar com nossa gerência no WhatsApp!
                </p>
              </div>

              {/* Brand Logos Conveyor Track Container (Sliding opposite direction very slowly) */}
              <div 
                className="overflow-hidden relative bg-white border border-gray-150 rounded-2xl py-3 px-4 mt-4 shadow-sm"
                id="brands-conveyor-belt-container"
              >
                <div className="flex gap-12 items-center animate-marquee-reverse">
                  {[1, 2, 3, 4, 5, 6].flatMap(() => [
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/continental.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/xbri.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-goodyear.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-linglong.svg",
                    "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-firestone.svg"
                  ]).map((url, idx) => (
                    <div 
                      key={`brand-logo-${idx}`} 
                      className="h-10 w-28 shrink-0 flex items-center justify-center filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300 pointer-events-none select-none"
                    >
                      <img 
                        src={url} 
                        alt="Logo Marca Parceira Carplus" 
                        className="h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        
          {/* Banner/Hero Section (High-Contrast White Theme optimized for Seniors) */}
          <div 
            className="relative bg-white text-gray-900 overflow-hidden py-16 px-6 border-b border-gray-200"
            id="hero-banner"
          >
            {/* Subtle Ambient light bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Info Text */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <span className="bg-yellow-500/10 text-yellow-600 font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-full inline-flex items-center gap-1.5 border border-yellow-300">
                  <Flame className="w-4 h-4 text-yellow-600 animate-pulse" />
                  <span>MULTIPLICADOR DE BENEFÍCIOS • PORTÃO CARPLUS PNEUS</span>
                </span>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-950 uppercase leading-none select-none">
                  Pneus em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f49e1a] to-yellow-600">Curitiba</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-wide select-none">
                  Oficina Mecânica Mecânica <span className="text-yellow-600 font-extrabold">Completa</span>
                </h2>

                <p className="text-gray-700 text-lg sm:text-xl font-bold leading-relaxed text-justify max-w-2xl px-1 sm:px-0">
                  Pneus novos das melhores marcas com preços imbatíveis sob consulta. Com montagem inclusa gratuita de bicos de ar novos, atendimento premium de oficina mecânica no Portão e parcelamento em até <strong className="text-gray-950">10x sem juros</strong> direto no ato da instalação física!
                </p>

                {/* Direct call layout */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2" id="hero-action-buttons">
                  <button
                    onClick={() => handleScrollToSection('finder')}
                    className="w-full sm:w-auto bg-[#f49e1a] hover:bg-yellow-500 text-gray-950 font-black px-8 py-4.5 rounded-2xl text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#d68516]"
                    id="goto-finder-btn"
                  >
                    <Search className="w-5 h-5 shrink-0 text-gray-950" />
                    Buscar Pneus em Curitiba
                  </button>
                  <a
                    href="tel:4130827282"
                    className="w-full sm:w-auto border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-black px-8 py-4.5 rounded-2xl text-sm uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 shadow"
                    id="hero-call-now"
                  >
                    <Phone className="w-5 h-5 shrink-0 text-yellow-600 animate-bounce" />
                    Telefone: (41) 3082-7282
                  </a>
                </div>
              </div>

              {/* Senior-Readable Quick Shortcuts Panel */}
              <div className="lg:col-span-5 bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4" id="hero-quick-shortcuts">
                <h4 className="text-sm uppercase font-extrabold text-gray-900 tracking-wider flex items-center gap-2 justify-center lg:justify-start">
                  <Sparkles className="w-5 h-5 text-yellow-600 animate-spin" />
                  Mais Procurados no Google Curitiba (Aros)
                </h4>
                <p className="text-xs text-gray-600 font-semibold text-center lg:text-left">
                  Dimensões e aros campeões de vendas na capital. Toque em uma medida para filtrar o estoque e conferir nossas ofertas:
                </p>
                
                <div className="grid grid-cols-2 gap-2" id="quick-searches-grid">
                  {MOST_SEARCHED_MEASURES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchMeasure(item.query)}
                      className="p-3 bg-white hover:bg-yellow-50 text-gray-900 hover:text-black border border-gray-250 hover:border-yellow-500 rounded-xl transition text-left flex flex-col justify-between cursor-pointer group shadow-sm"
                    >
                      <span className="font-black text-sm sm:text-base font-mono tracking-tight text-gray-900 group-hover:text-yellow-600">{item.text}</span>
                      <span className="text-[10px] text-gray-500 font-bold mt-0.5">{item.searches}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 flex items-center justify-between text-xs text-gray-600 font-bold">
                  <span>Total cadastrado: <strong className="text-gray-950 font-extrabold">{TIRES_DATA.length} pneus</strong></span>
                  <span className="text-[#15803d] font-bold">● Loja Portão Aberta</span>
                </div>
              </div>
            </div>
          </div>

        {/* Wizard application guide (Qual pneu vai no meu carro?) */}
        <section ref={finderRef} className="max-w-7xl mx-auto px-4 mt-8" id="finder">
          <TireFinderWizard 
            onSearchMeasure={handleSearchMeasure}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Full-Fidelity Interactive Solutions Hub (Aros, Marcas, Carros Lookups) */}
        <section ref={categoriesRef} className="max-w-7xl mx-auto px-4 mt-10" id="categories">
          <div className="bg-white text-gray-900 rounded-3xl p-6 border border-gray-200 shadow-lg mb-6">
            <div className="text-center md:text-justify mb-6">
              <span className="bg-[#f49e1a]/10 text-gray-850 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Portal de Busca & Diretório Premium
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 mt-2 tracking-tight select-none">
                Guias Rápidos de <span className="text-[#f49e1a]">Medidas & Marcas</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-3xl text-justify leading-relaxed">
                Navegue pelas páginas oficiais de marcas consagradas, filtre pneus novos pelo tamanho do aro da sua roda ou consulte em nosso guia qual a rota ideal para o modelo de seu veículo.
              </p>
            </div>

            {/* Quick switcher buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
              <button 
                onClick={() => setActiveCategoryTab('aro')}
                className={`py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeCategoryTab === 'aro' 
                    ? 'bg-[#f49e1a] text-black shadow-md font-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span>Pneus por Aro (Wheel Size)</span>
              </button>
              <button 
                onClick={() => setActiveCategoryTab('marcas')}
                className={`py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeCategoryTab === 'marcas' 
                    ? 'bg-[#f49e1a] text-black shadow-md font-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Award className="w-4 h-4 shrink-0" />
                <span>Marcas no Catálogo</span>
              </button>
              <button 
                onClick={() => setActiveCategoryTab('carros')}
                className={`py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeCategoryTab === 'carros' 
                    ? 'bg-[#f49e1a] text-black shadow-md font-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Car className="w-4 h-4 shrink-0" />
                <span>Qual Pneu vai em qual Carro?</span>
              </button>
            </div>

            {/* Tab content 1: Pneus por Aro */}
            {activeCategoryTab === 'aro' && (
              <div className="mt-6 space-y-6" id="tab-pneus-aro">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs text-gray-600 text-justify">
                  Selecione um tamanho de <strong>Aro (Rín)</strong> abaixo para aplicar o filtro imediatamente ao nosso catálogo de vendas. Atendemos desde dimensões populares portabilidade até pick-ups robustas de passeio urbano e de carga.
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                  {[13, 14, 15, 16, 17, 18, 19, 20, 'Todos'].map((rimVal) => {
                    const isSelected = selectedRim === rimVal || (rimVal === 'Todos' && selectedRim === 'Todos');
                    const isAll = rimVal === 'Todos';
                    return (
                      <button
                        key={`rim-portal-${rimVal}`}
                        onClick={() => {
                          setSelectedRim(isAll ? 'Todos' : Number(rimVal) as any);
                          handleScrollToSection('catalog');
                        }}
                        className={`p-4 rounded-2xl transition-all duration-300 border text-center flex flex-col justify-between items-center gap-2 relative overflow-hidden group ${
                          isSelected 
                            ? 'bg-[#f49e1a] border-[#f49e1a] text-black shadow-lg scale-102 font-black' 
                            : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                        }`}
                      >
                        {/* Tread decorative icon wheel */}
                        <div className={`w-10 h-10 rounded-full border-4 border-dashed flex items-center justify-center font-black text-xs font-mono group-hover:rotate-45 transition duration-500 ${
                          isSelected ? 'border-black text-black' : 'border-gray-200 text-gray-400 bg-gray-50'
                        }`}>
                          {isAll ? 'ALL' : `R${rimVal}`}
                        </div>
                        <div className="mt-1">
                          <div className="text-xs font-bold leading-none">{isAll ? 'Aros Completos' : `Aro ${rimVal}`}</div>
                          <div className={`text-[9px] mt-1 ${isSelected ? 'text-black/80 font-medium' : 'text-gray-500'}`}>
                            {isAll ? 'Exibir Tudo' : `${TIRES_DATA.filter(t => t.rim === rimVal).length} modelos`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-meta details box of current Rims */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {[
                    { rim: '13 e 14', desc: 'Siena, Uno, Gol, Palio, Classic, Celta, Kwid', common: '175/65/R14, 175/70/R13, 185/60/R14', badge: 'Retífica & Compactos' },
                    { rim: '15 e 16', desc: 'Argo, Polo, Fox, Civic, Corolla, Sandero, HB20, Spin', common: '185/60/R15, 195/55/R15, 205/55/R16', badge: 'Hatchs & Sedans Médios' },
                    { rim: '17 e 18', desc: 'T-Cross, Nivus, Corolla Altis, Jeep Compass, Hilux, S10', common: '205/55/R17, 215/50/R17, 265/60/R18', badge: 'SUVs & Pickups' },
                    { rim: '19 e 20', desc: 'Jeep Compass S, Equinox, Mercedes GLA, Tiguan, SUVs Premium', common: '235/45/R19, 245/40/R20, 265/50/R20', badge: 'Premium & EV High Performance' },
                  ].map((det, id) => (
                    <div key={id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-xs uppercase text-gray-900 border-b-2 border-[#f49e1a] pb-0.5 font-bold">{det.badge}</span>
                          <span className="text-[10px] text-gray-500">Aro {det.rim}</span>
                        </div>
                        <p className="text-[11px] text-gray-650 text-justify mt-1">
                          <strong>Principais:</strong> {det.desc}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 text-[10px] text-gray-500 font-mono">
                        Medidas recomendadas: {det.common}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab content 2: Marcas */}
            {activeCategoryTab === 'marcas' && (
              <div className="mt-6 space-y-4" id="tab-marcas">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs text-gray-650 text-justify">
                  Trabalhamos com marcas certificadas com a maior nota do Inmetro. Selecione uma fabricante de pneus oficial abaixo para navegar diretamente em seus produtos correspondentes em estoque.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: 'BRIDGESTONE', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/bridgestone.svg", slogan: 'Suavidade Japonesa', style: 'Origem japonesa. Máxima durabilidade nas rodovias, frenagem macia e excelente controle acústico de ruídos.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'PIRELLI', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/pirelli.svg", slogan: 'Desempenho Italiano', style: 'Tradição italiana mundial. Grande aderência em pistas secas e molhadas sob condições adversas.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'MICHELIN', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/michelin.svg", slogan: 'Máxima Performance', style: 'Padrão mundial em segurança e durabilidade lendária. Menor desgaste e resistência a rolamentos.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'CONTINENTAL', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/continental.svg", slogan: 'Engenharia Alemã', style: 'Pneus alemães de alta proteção contra furos e aquaplanagens. Excelente tração em curvas sinuosas.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'GOODYEAR', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-goodyear.svg", slogan: 'Segurança Longa Pista', style: 'Excelente estabilidade estrutural e aderência ideal em asfalto ondulado ou de terra.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'YOKOHAMA', logo: "https://icon2.cleanpng.com/20180516/evq/avr9ddjh0.webp", slogan: 'Linha Premium Racing', style: 'Excelente esportividade e performance em alta velocidade para veículos esportivos e de luxo.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'FIRESTONE', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-firestone.svg", slogan: 'Robustez Reconhecida', style: 'Subdivisão Bridgestone reconhecida pela alta durabilidade em veículos civis e comerciais leves.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'DELINTE', logo: "https://s19532.pcdn.co/wp-content/uploads/2019/12/Delinte-Logo-1.jpg", slogan: 'Tecnologia Inovadora', style: 'Banda de rodagem inovadora, rodar extremamente seguro e ótimos custos de aquisição direta.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'COMFORSER', logo: "https://www.gtiresinternational.us/wp-content/uploads/2022/10/Comforser-Tires.png", slogan: 'Durabilidade Diária', style: 'Excelente maciez e resistência na pavimentação urbana nacional. Custo-benefício de destaque.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'XBRI', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/SVGBrands/xbri.svg", slogan: 'Excelente Tração Diária', style: 'Casing robusto projetado com asfalto nacional em mente. Ótimas notas de maciez diárias.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'PRINX', logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRauciXYNudC8XaeVj_7c3o5urb17rrs_uw&s", slogan: 'Equilíbrio e Conforto', style: 'Pneus silenciosos inovadores excelentes para o dia-a-dia em metrópoles.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'LINGLONG', logo: "https://pneufree.s3.sa-east-1.amazonaws.com/PneufreeReact/Images/Quem-somos/marcas/lg-linglong.svg", slogan: 'Inovação Silenciosa', style: 'Firme aderência e escoamento hídrico exemplar para curvas e frenagens em dias chuvosos.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' },
                    { name: 'SPEEDMAX', logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6La6GWmZDeZMCxlH4OA8rJcNjLj8mrjpW4A&s", slogan: 'Trabalho Pesado Eficiente', style: 'Marca robusta projetada para render mais quilometragem com desgaste lateral uniforme.', color: 'from-white to-gray-50', pMin: 'Sob Consulta' }
                  ].map((brandMeta) => {
                    const isSelected = selectedBrand.toUpperCase() === brandMeta.name;
                    return (
                      <button
                        key={`brand-portal-${brandMeta.name}`}
                        onClick={() => {
                          setSelectedBrand(brandMeta.name);
                          handleScrollToSection('catalog');
                        }}
                        className={`p-4 rounded-xl transition-all duration-300 border text-left flex flex-col justify-between bg-gradient-to-br relative overflow-hidden group ${brandMeta.color} ${
                          isSelected 
                            ? 'border-[#f49e1a] ring-4 ring-[#f49e1a]/15 bg-yellow-50/10 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full gap-2">
                          <img
                            src={brandMeta.logo}
                            alt={brandMeta.name}
                            className="h-9 max-h-[36px] w-auto max-w-[120px] object-contain opacity-90 group-hover:opacity-100 transition rounded"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[9px] bg-[#f49e1a]/15 px-2 py-0.5 rounded text-gray-950 font-bold font-mono shrink-0">
                            {brandMeta.slogan}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-3 leading-relaxed text-justify">
                          {brandMeta.style}
                        </p>
                        <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center text-[10px]">
                          <span className="text-gray-400 font-medium font-mono">Preço:</span>
                          <span className="font-extrabold text-[#1ebd53] text-xs uppercase font-mono">{brandMeta.pMin}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab content 3: Veículos guia de aplicação */}
            {activeCategoryTab === 'carros' && (
              <div className="mt-6 space-y-4" id="tab-carros-lookup">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs text-gray-650 text-justify font-sans leading-relaxed">
                  Encontre a medida ideal homologada para o seu veículo em nosso amplo diretório de montadoras. Busque um veículo abaixo ou filtre por montadora. Clique em <strong>"Aplicar Medida"</strong> para ajustar o estoque à dimensão exata recomendada de fábrica.
                </div>

                {/* Internal Search Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                      type="text"
                      value={carSearchQuery}
                      onChange={(e) => setCarSearchQuery(e.target.value)}
                      placeholder="Busque modelo do veículo (Ex: Onix, Gol, Civic, Argo)..."
                      className="w-full text-xs font-semibold bg-white border border-gray-300 text-gray-900 pl-9 pr-3 py-2.5 rounded-xl placeholder:text-gray-400 focus:outline-[#f49e1a]"
                    />
                  </div>

                  <div className="sm:col-span-8 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {carManufacturers.map((manu) => (
                      <button
                        key={`manu-tab-${manu}`}
                        onClick={() => setCarSelectedBrand(manu)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wide transition ${
                          carSelectedBrand === manu 
                            ? 'bg-[#f49e1a] text-black font-black' 
                            : 'bg-gray-100 border border-gray-250 text-gray-700 hover:bg-gray-200 hover:text-black'
                        }`}
                      >
                        {manu}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Table scroll list */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-72 overflow-y-auto bg-white shadow-inner">
                  <table className="w-full text-left text-xs text-gray-700">
                    <thead className="bg-gray-100 text-[10px] text-gray-600 uppercase tracking-wider font-extrabold sticky top-0 border-b border-gray-250">
                      <tr>
                        <th className="px-4 py-3">Montadora</th>
                        <th className="px-4 py-3">Modelo do Veículo</th>
                        <th className="px-4 py-3">Anos / Motorização</th>
                        <th className="px-4 py-3 text-center">Medida Ideal</th>
                        <th className="px-4 py-3 text-right">Ação Direta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ALL_BRANDS_CARS.filter((item) => {
                        if (carSelectedBrand !== 'Todos' && item.brand !== carSelectedBrand) {
                          return false;
                        }
                        if (carSearchQuery.trim()) {
                          const query = carSearchQuery.toLowerCase();
                          const inModel = item.model.toLowerCase().includes(query);
                          const inBrand = item.brand.toLowerCase().includes(query);
                          const inMeasure = item.measure.includes(query);
                          if (!inModel && !inBrand && !inMeasure) return false;
                        }
                        return true;
                      }).length > 0 ? (
                        ALL_BRANDS_CARS.filter((item) => {
                          if (carSelectedBrand !== 'Todos' && item.brand !== carSelectedBrand) {
                            return false;
                          }
                          if (carSearchQuery.trim()) {
                            const query = carSearchQuery.toLowerCase();
                            const inModel = item.model.toLowerCase().includes(query);
                            const inBrand = item.brand.toLowerCase().includes(query);
                            const inMeasure = item.measure.includes(query);
                            if (!inModel && !inBrand && !inMeasure) return false;
                          }
                          return true;
                        }).map((item, idx) => (
                          <tr key={`car-ref-${idx}`} className="hover:bg-gray-50 transition duration-155">
                            <td className="px-4 py-3 font-extrabold text-gray-900 uppercase">{item.brand}</td>
                            <td className="px-4 py-3 font-semibold text-gray-850">{item.model}</td>
                            <td className="px-4 py-3 text-gray-500 font-mono text-[11px]">
                              {item.years} ({item.engine})
                            </td>
                            <td className="px-4 py-3 text-center font-bold font-mono text-[#f49e1a]">
                              {item.measure.split('/').join(' / ')}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleSearchMeasure(item.measure)}
                                className="bg-white hover:bg-[#f49e1a] hover:text-black border border-gray-200 hover:border-[#f49e1a] text-gray-700 font-extrabold text-[10px] px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                Aplicar Medida
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-10 text-gray-500">
                            Nenhum veículo cadastrado com esse critério. Tente outro termo!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-150 shadow-sm text-gray-800" id="filter-controls-panel">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-4 border-b border-gray-150">
              <div className="text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-1.5 justify-center sm:justify-start">
                  <SlidersHorizontal className="w-5 h-5 text-[#f49e1a]" />
                  Catálogo de Busca & Filtros
                </h3>
                <p className="text-xs text-gray-500 text-justify mt-0.5">
                  Filtre por largura, perfil, aro e marcas ou use o campo de busca textual livre abaixo.
                </p>
              </div>

              {((keyword || selectedBrand !== 'Todas' || selectedRim !== 'Todos' || filterWidth !== 'Todos' || filterProfile !== 'Todos' || onlyOffers)) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-black border-b border-black hover:bg-black hover:text-white px-2 py-1 rounded"
                  id="reset-all-filters"
                >
                  Limpar Todos os Filtros (X)
                </button>
              )}
            </div>

            {/* Quick Brand Logo Filter row styling */}
            <div className="mb-6 bg-gray-50 border border-gray-150 p-4 rounded-2xl select-none" id="brand-logo-filtering-row">
              <p className="text-[11px] font-black uppercase text-gray-700 mb-2.5 tracking-wider font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f49e1a]" />
                Filtrar com 1 Toque por Fabricante Oficial:
              </p>
              <div className="flex flex-wrap gap-2 items-center justify-start">
                <button
                  onClick={() => setSelectedBrand('Todas')}
                  style={selectedBrand === 'Todas' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.9)' } : undefined}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase transition-all duration-300 cursor-pointer ${
                    selectedBrand === 'Todas'
                      ? 'bg-black text-white border-black shadow'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Todas Marcas
                </button>
                {Object.entries(BRAND_LOGOS).map(([bName, bUrl]) => {
                  const isSelected = selectedBrand.toUpperCase() === bName.toUpperCase();
                  return (
                    <button
                      key={`btn-logo-filter-${bName}`}
                      onClick={() => setSelectedBrand(bName)}
                      className={`h-11 px-3 py-1.5 rounded-xl border bg-white flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-xs ${
                        isSelected
                          ? 'border-[#f49e1a] ring-2 ring-[#f49e1a]/25 scale-105 shadow-xs bg-yellow-50/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      title={`Filtrar somente ${bName}`}
                    >
                      <img
                        src={bUrl}
                        alt={bName}
                        className="h-full max-h-[22px] w-auto max-w-[80px] object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Selector drop-downs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              
              {/* Brand filter */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Escolher Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-sm font-bold border-2 border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:bg-yellow-50/10 focus:border-[#f49e1a]"
                  id="brand-dropdown"
                >
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Rim selector */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Aro (Rín)</label>
                <select
                  value={selectedRim}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedRim(val === 'Todos' ? 'Todos' : Number(val) as any);
                  }}
                  className="w-full text-sm font-bold border-2 border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:bg-yellow-50/10 focus:border-[#f49e1a]"
                  id="rim-dropdown"
                >
                  <option value="Todos">Todos os Aros</option>
                  {uniqueRims.filter(r => r !== 'Todos').map((rim) => (
                    <option key={rim} value={rim}>Aro R{rim}</option>
                  ))}
                </select>
              </div>

              {/* Width Selector */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Largura (mm)</label>
                <select
                  value={filterWidth}
                  onChange={(e) => setFilterWidth(e.target.value)}
                  className="w-full text-sm font-bold border-2 border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:bg-yellow-50/10 focus:border-[#f49e1a]"
                  id="width-dropdown"
                >
                  <option value="Todos">Todas</option>
                  {uniqueWidths.filter(w => w !== 'Todos').map((w) => (
                    <option key={w} value={w}>{w} mm</option>
                  ))}
                </select>
              </div>

              {/* Profile selection */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1">Perfil (%)</label>
                <select
                  value={filterProfile}
                  onChange={(e) => setFilterProfile(e.target.value)}
                  className="w-full text-sm font-bold border-2 border-gray-300 rounded-xl p-3 bg-white text-gray-905 focus:bg-yellow-50/10 focus:border-[#f49e1a]"
                  id="profile-dropdown"
                >
                  <option value="Todos">Todos</option>
                  {uniqueProfiles.filter(p => p !== 'Todos').map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Toggle Offers */}
              <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start">
                <label className="flex items-center gap-2 cursor-pointer pt-3 md:pt-4" id="only-offers-toggle">
                  <input
                    type="checkbox"
                    checked={onlyOffers}
                    onChange={(e) => setOnlyOffers(e.target.checked)}
                    className="w-5 h-5 rounded text-yellow-600 border-gray-300 focus:ring-yellow-500 cursor-pointer"
                  />
                  <span className="text-sm font-black text-gray-900 uppercase tracking-tight select-none">Só Pneus em Oferta</span>
                </label>
              </div>
            </div>

            {/* Keyword block */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Busque por largura, aro, marca ou modelo (Ex: Michelin, 175/65, 185/60/15)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-sm sm:text-base border-2 border-gray-300 rounded-xl pl-10 pr-4 py-3.5 bg-white text-gray-950 font-medium placeholder-gray-400 focus:border-[#f49e1a]"
                id="catalog-search-input"
              />
            </div>
          </div>
        </section>

        {/* Global Catalog list container */}
        <section ref={catalogRef} className="max-w-7xl mx-auto px-4 mt-6" id="catalog">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
            <h3 className="font-extrabold text-gray-900 border-l-4 border-[#f49e1a] pl-3 leading-tight tracking-tight uppercase text-center sm:text-left">
              Pneus Disponíveis para Encomenda • ({filteredTires.length} modelos)
            </h3>
            
            {/* Show search tags applied */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {selectedBrand !== 'Todas' && (
                <span className="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  Marca: {selectedBrand}
                </span>
              )}
              {selectedRim !== 'Todos' && (
                <span className="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  Aro: R{selectedRim}
                </span>
              )}
            </div>
          </div>

          {/* Grid Tires list */}
          {filteredTires.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="catalog-tires-grid">
                {paginatedTires.map((tire) => (
                  <TireCard 
                    key={tire.id}
                    tire={tire}
                    onAddToCart={handleAddToCart}
                    onSelectTire={handleShowTireDetail}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {filteredTires.length > itemsPerPage && (
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm select-none" id="catalog-pagination">
                  <span className="text-xs text-gray-500 text-center sm:text-left">
                    Exibindo pneus <strong>{startIndex + 1}</strong> a <strong>{Math.min(startIndex + itemsPerPage, filteredTires.length)}</strong> de um total de <strong>{filteredTires.length}</strong>
                  </span>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center min-w-0">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
                      }}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 h-10 sm:h-9 rounded-xl text-xs uppercase font-extrabold transition-all duration-200 border cursor-pointer flex items-center justify-center shrink-0 ${
                        currentPage === 1
                          ? 'bg-gray-100 border-gray-150 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-[#f49e1a] hover:bg-gray-50'
                      }`}
                    >
                      Anterior
                    </button>

                    <div className="flex items-center gap-1 sm:gap-1.5 max-w-full overflow-x-auto scrollbar-none py-1 px-1 justify-center">
                      {(() => {
                        const maxNeighbours = 1;
                        const pages: (number | string)[] = [];
                        if (totalPages <= 5) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          const start = Math.max(2, currentPage - maxNeighbours);
                          const end = Math.min(totalPages - 1, currentPage + maxNeighbours);
                          if (start > 2) pages.push('...');
                          for (let i = start; i <= end; i++) pages.push(i);
                          if (end < totalPages - 1) pages.push('...');
                          pages.push(totalPages);
                        }
                        return pages.map((p, idx) => {
                          if (typeof p === 'string') {
                            return (
                              <span key={`ellipsis-${idx}`} className="px-1.5 text-xs font-mono font-bold text-gray-450 select-none">
                                {p}
                              </span>
                            );
                          }
                          const isCurrent = p === currentPage;
                          return (
                            <button
                              key={`page-num-${p}`}
                              onClick={() => {
                                setCurrentPage(p);
                                setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
                              }}
                              className={`w-10 h-10 sm:w-9 sm:h-9 rounded-xl text-xs font-mono font-extrabold transition-all duration-200 border cursor-pointer shrink-0 flex items-center justify-center ${
                                isCurrent
                                  ? 'bg-[#f49e1a] border-[#f49e1a] text-black shadow-md'
                                  : 'bg-white border-gray-200 text-gray-700 hover:border-[#f49e1a] hover:bg-gray-50'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        });
                      })()}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
                      }}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 h-10 sm:h-9 rounded-xl text-xs uppercase font-extrabold transition-all duration-200 border cursor-pointer flex items-center justify-center shrink-0 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 border-gray-150 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-[#f49e1a] hover:bg-gray-50'
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 p-6 flex flex-col items-center justify-center">
              <Zap className="w-12 h-12 text-[#f49e1a] animate-bounce mb-3" />
              <p className="font-bold text-sm text-gray-800">Sem resultados para seu filtro</p>
              <p className="text-xs text-gray-400 mt-1 text-center max-w-sm">
                Experimente limpar os filtros de aro ou marca no painel acima para abrir novas possibilidades no estoque.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-gray-900 hover:bg-[#f49e1a] text-white hover:text-white font-extrabold text-xs px-5 py-2 rounded-xl transition"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}
                id="reset-filter-fallback-btn"
              >
                Remover Todos os Filtros
              </button>
            </div>
          )}
        </section>

        {/* Benefits Row (Visual Appeal) */}
        <section className="max-w-7xl mx-auto px-4 mt-12" id="benefits-section">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-justify text-gray-800">
            
            <div className="bg-white rounded-2xl p-5 border border-gray-150 flex flex-col items-center sm:items-start text-center sm:text-justify shadow-sm">
              <div className="bg-yellow-100 text-yellow-800 p-2.5 rounded-xl mb-3">
                <ShieldCheck className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 uppercase">Instalação Inclusa</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Comprando conosco seu pneu já sai instalado! Realizamos a troca de bico comum e montagem correta na hora em Curitiba.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-150 flex flex-col items-center sm:items-start text-center sm:text-justify shadow-sm">
              <div className="bg-yellow-100 text-yellow-800 p-2.5 rounded-xl mb-3">
                <Tool className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 uppercase">Geometria e Alinhamento</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Dispomos de equipamentos 3D computadorizados de última geração para alinhar seu eixo dianteiro e traseiro com precisão milimétrica.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-150 flex flex-col items-center sm:items-start text-center sm:text-justify shadow-sm">
              <div className="bg-yellow-100 text-yellow-800 p-2.5 rounded-xl mb-3">
                <Info className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 uppercase">Estoque Multimarcas</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Sempre com pneus novos e carimbados pelo INMETRO. Segurança nas curvas e pistas molhadas sob o clima de Curitiba.
              </p>
            </div>

          </div>
        </section>

        {/* Verification Videos Section for Elderly and High Trust */}
        <section className="max-w-7xl mx-auto px-4">
          <CarplusVideosSection />
        </section>

        {/* Real Structure Image Gallery Section (Carplus Authentic Showroom) */}
        <section className="max-w-7xl mx-auto px-4 mt-12 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm" id="carplus-real-gallery">
          <div className="text-center sm:text-left space-y-2 mb-6">
            <span className="bg-[#f49e1a]/10 text-gray-900 border border-[#f49e1a]/20 font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
              Estrutura Física Garantida
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display">
              Nossa Autocenter em Curitiba
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
              Conheça as instalações da Carplus Pneus localizada na Avenida Arthur Bernardes. Contamos com pátio de manobras, sala de espera climatizada e maquinário computadorizado de alta tecnologia para carros, SUVs e caminhonetes:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/fachada-logo.webp', label: 'Fachada e Logo Carplus Portão' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/loja-de-pneus-portao-curitiba-pirelli.png', label: 'Showroom de Medidas Pirelli' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/alinhamento-jeep.webp', label: 'Alinhamento 3D Computadorizado' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/mecanicos-trabalho.webp', label: 'Nossa Equipe de Técnicos Habilitados' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/troca-pneu.webp', label: 'Troca de Pneus de Alta Performance' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/oficina-carros.webp', label: 'Rampa de Geometria e Freio' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/montagem-pneu.webp', label: 'Montagem Técnica Inclusa de Cortesia' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/rodas-pretas.webp', label: 'Troca de Rodas de Liga Leve' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/display-pneus.webp', label: 'Mostruário Especial de Pneus Novos' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/escritorio.webp', label: 'Recepção e Espera Climatizada' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/caminhonete.webp', label: 'Serviço em Camionetes e SUVs' },
              { url: 'https://www.carpluspneuseoficina.com.br/images/galeria/proprietario-pneu.webp', label: 'Consultoria e Avaliação Estrutural' }
            ].map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl bg-gray-55 border border-gray-200 transition shadow">
                <img 
                  src={img.url} 
                  alt={img.label} 
                  loading="lazy"
                  className="h-36 sm:h-44 w-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end p-2 sm:p-3">
                  <p className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider truncate w-full">
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Homepage Interactive FAQ Accordions */}
        <section className="max-w-7xl mx-auto px-4 mt-12 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm" id="carplus-home-faq">
          <div className="text-center sm:text-left space-y-2 mb-6">
            <span className="bg-[#f49e1a]/10 text-gray-950 border border-[#f49e1a]/20 font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
              Dúvidas Claras e Seguras
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display">
              Perguntas Frequentes (FAQ) da Carplus
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
              Consulte as respostas diretas para as principais dúvidas sobre nossa mecânica expressa, marcas oficiais homologadas, agendamentos on-line e políticas de pagamentos inclusas na entrega técnica:
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                q: "Como faço para reservar um pneu em oferta e garantir a montagem inclusa?",
                a: "É super simples! Navegue em nosso catálogo, verifique as medidas desejadas e adicione ao carrinho de reserva online. Ao concluir o agendamento, você é direcionado ao atendimento integrado no WhatsApp para confirmar o melhor horário de atendimento. Não há cobrança prévia: você só realiza o pagamento na nossa sede física do Portão, após os pneus novos estarem instalados e balanceados no carro!"
              },
              {
                q: "A montagem técnica dos pneus e as válvulas novas de ar são realmente cortesia?",
                a: "Sim, absolutamente! Na compra de qualquer pneu de passeio, SUV ou comercial leve na Carplus Pneus, a montagem especializada de alta precisão e a substituição técnica das válvulas (bicos de borracha comum) estão completas e inclusas na cortesia, sem taxas extras surpresas no balcão."
              },
              {
                q: "A Carplus trabalha apenas com pneus novos de marcas oficiais com garantia?",
                a: "Sim, trabalhamos estritamente com pneus novos de primeira linha homologados mundialmente (Bridgestone, Pirelli, Michelin, Goodyear, Firestone, Dunlop, Delinte, Xbri, Comforser), todos com selo oficial do INMETRO e garantia oficial de 5 anos de fábrica contra deformidades ou falhas estruturais."
              },
              {
                q: "Quais as formas de pagamento disponíveis em sua autocenter?",
                a: "Aceitamos pagamento presencial em PIX com bônus de desconto adicional, cartões de débito tradicionais e cartões de crédito físicos, possibilitando o parcelamento em até 10 vezes sem juros no momento em que seu veículo for entregue."
              },
              {
                q: "Quais outros tipos de serviços de mecânica a Carplus executa?",
                a: "Além de montagem e balanceamento precisos, executamos serviços indispensáveis de geometria computadorizada com Alinhamento 3D de alta definição, diagnóstico rápido de fluídos e troca de pastilhas de freios dianteiros/traseiros, manutenção preventiva de suspensão (amortecedores, kits batentes, pivôs, buchas, braços axiais) e sapatas."
              }
            ].map((faq, idx) => {
              const isOpen = activeHomeFaqIdx === idx;
              return (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveHomeFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left text-gray-900 hover:text-[#f49e1a] transition cursor-pointer font-bold text-xs sm:text-sm uppercase"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#f49e1a] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#f49e1a] shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="p-4 pt-4 border-t border-gray-200/60 text-xs text-gray-500 leading-relaxed text-justify">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Google Maps Integration details / directions */}
        <section className="max-w-7xl mx-auto px-4 mt-12 mb-6" id="maps-section">

          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-md text-gray-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Context/Instructions (7 Columns) */}
            <div className="md:col-span-5 space-y-4 text-center md:text-justify">
              <span className="bg-yellow-500/10 text-yellow-600 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                Como Chegar
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight uppercase">
                Fácil Acesso no Portão, Curitiba
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-500 text-justify leading-relaxed">
                Estamos localizados na <strong>Av. Presid. Arthur da Silva Bernardes, 1323</strong>, no tradicional bairro Portão em Curitiba – PR (CEP: 80320-300). 
              </p>
              
              <p className="text-xs text-gray-400 text-justify">
                Avenida de pista dupla com facilidade para estacionar. Suba seu veículo nos elevadores de última geração da Carplus Pneus enquanto toma um café em nossa sala de espera climatizada.
              </p>

              <div className="bg-black border border-yellow-500/20 p-4 rounded-2xl text-white text-xs space-y-2">
                <p className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-yellow-500 shrink-0" />
                  <span><strong>Endereço:</strong> Av. Presidente Arthur da Silva Bernardes, 1323</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-500 shrink-0" />
                  <span><strong>Telefone de Suporte:</strong> (41) 3082-7282</span>
                </p>
                <p className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-yellow-500 shrink-0" />
                  <span><strong>Referência:</strong> Próximo à rotatória e canaletas expressas do Portão.</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Av.+Pres.+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR,+80320-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-yellow-500 hover:text-gray-950 text-[#f49e1a] font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wide transition inline-flex items-center gap-1.5 shadow"
                  id="google-maps-directions-link"
                >
                  <Navigation className="w-4 h-4 shrink-0" />
                  Navegar Agora (Celular / Waze)
                </a>
                <a
                  href="tel:4130827282"
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wide transition inline-flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Ligar na Loja
                </a>
              </div>
            </div>

            {/* Embedded Live Google Maps Iframe (7 Columns) */}
            <div className="md:col-span-7 bg-[#f9fafb] border border-gray-150 p-2.5 rounded-3xl h-[280px] sm:h-[350px] relative overflow-hidden flex flex-col justify-between shadow-inner">
              <iframe
                title="Google Maps Carplus Pneus Arthur Bernardes Curitiba"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.8153096896264!2d-49.29955748858296!3d-25.477815134730646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce308bc6ec871%3A0xe74ce958b449b28b!2sAv.%20Pres.%20Arthur%20da%20Silva%20Bernardes%2C%201323%20-%20Port%C3%A3o%2C%20Curitiba%20-%20PR%2C%2080320-300!5e0!3m2!1spt-BR!2sbr!4v1718040000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1.25rem' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full p-2"
              ></iframe>
            </div>

          </div>
        </section>

      </main>)}

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Floating Live Chat & Booking trigger */}
      <LiveWhatsAppChat />
      <ScrollToTop />
      <FloatingShare currentView={currentView} seoTarget={seoTarget} selectedTire={selectedTire} />

      {/* Structured Footer */}
      <Footer onNavigate={(page) => {
        setCurrentView(page);
        setSeoTarget(null);
      }} />

      {/* Cart side panel Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onNavigateToCart={() => {
          setIsCartOpen(false);
          setCurrentView('carrinho');
          setSeoTarget(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '/carrinho');
        }}
      />

    </div>
  );
}
