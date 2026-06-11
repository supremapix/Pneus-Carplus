import { Tire, CarModel, ServiceRecord } from './types';

// Large dataset of real tires from the provided spreadsheet:
const RAW_TIRES_DATA: Tire[] = [
  // BRIDGESTONE
  {
    id: 'b1',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 185/55/16 83V ECOPIA EP150',
    price: 619.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 185,
    aspectRatio: 55,
    rim: 16,
    model: 'ECOPIA EP150'
  },
  {
    id: 'b2',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 185/60/15 84H ECOPIA EP150 OE',
    price: 519.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'ECOPIA EP150',
    isOffer: true
  },
  {
    id: 'b3',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 195/55/15 ECOPIA EP150 85H',
    price: 489.00,
    promoPrice: 459.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 195,
    aspectRatio: 55,
    rim: 15,
    model: 'ECOPIA EP150',
    isOffer: true
  },
  {
    id: 'b4',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 205/55/16 ECOPIA EP150 91V',
    price: 519.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 205,
    aspectRatio: 55,
    rim: 16,
    model: 'ECOPIA EP150'
  },
  {
    id: 'b5',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 205/55/17 TURANZA T005 91V',
    price: 839.00,
    image: 'https://www.acheipneus.com.br/media/catalog/product/p/n/pneu-20555r17-goodyear-wrangler-territory-ht-91v-1.png?width=800&height=800&optimize=low',
    width: 205,
    aspectRatio: 55,
    rim: 17,
    model: 'TURANZA T005'
  },
  {
    id: 'b6',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 215/60/17 100H ALENZA 001',
    price: 759.00,
    image: 'https://www.acheipneus.com.br/media/catalog/product/p/n/pneu-20555r17-goodyear-wrangler-territory-ht-91v-1.png?width=800&height=800&optimize=low',
    width: 215,
    aspectRatio: 60,
    rim: 17,
    model: 'ALENZA 001'
  },
  {
    id: 'b7',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 215/65/16 98H T005 TURANZA',
    price: 719.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 215,
    aspectRatio: 65,
    rim: 16,
    model: 'TURANZA T005'
  },
  {
    id: 'b8',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 235/45/18 94V TURANZA T005 AA',
    price: 1199.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_bridgestone_aro_15_ecopia_ep150_19555r15_bl85_1_20260424103219_554d143d730b.jpg',
    width: 235,
    aspectRatio: 45,
    rim: 18,
    model: 'TURANZA T005'
  },
  {
    id: 'b9',
    brand: 'BRIDGESTONE',
    name: 'BRIDGESTONE 265/60/18 110T DUELER HT 684 II',
    price: 1079.00,
    image: 'https://1stpneus.com.br/wp-content/uploads/2022/10/CROSSWIND-AT.jpg',
    width: 265,
    aspectRatio: 60,
    rim: 18,
    model: 'DUELER HT 684'
  },

  // COMFORSER
  {
    id: 'c1',
    brand: 'COMFORSER',
    name: 'COMFORSER 185/60/14 82H CF510',
    price: 239.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg',
    width: 185,
    aspectRatio: 60,
    rim: 14,
    model: 'CF510',
    isOffer: true
  },
  {
    id: 'c2',
    brand: 'COMFORSER',
    name: 'COMFORSER 185/60/15 84H CF510',
    price: 269.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'CF510'
  },
  {
    id: 'c3',
    brand: 'COMFORSER',
    name: 'COMFORSER 185/65/15 88H CF510',
    price: 299.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'CF510'
  },
  {
    id: 'c4',
    brand: 'COMFORSER',
    name: 'COMFORSER 195/55/15 85V CF510',
    price: 289.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg',
    width: 195,
    aspectRatio: 55,
    rim: 15,
    model: 'CF510'
  },
  {
    id: 'c5',
    brand: 'COMFORSER',
    name: 'COMFORSER 205/55/16 91V CF510',
    price: 319.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg',
    width: 205,
    aspectRatio: 55,
    rim: 16,
    model: 'CF510',
    isOffer: true
  },
  {
    id: 'c6',
    brand: 'COMFORSER',
    name: 'COMFORSER 265/70/16 111T CF1000 A/T',
    price: 709.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_26570r16_comforser_cf1000_at_111t_letra_branc_1_20260114085328_49be2a5050d5.jpg',
    width: 265,
    aspectRatio: 70,
    rim: 16,
    model: 'CF1000 A/T'
  },

  // CONTINENTAL
  {
    id: 'co1',
    brand: 'CONTINENTAL',
    name: 'CONTINENTAL 175/65/14 CONTIPOWERCONT 82T',
    price: 379.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_continental_contipowercontact_82t_1_20251222152416_f9cbacb94d08.jpg',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'CONTIPOWERCONT'
  },
  {
    id: 'co2',
    brand: 'CONTINENTAL',
    name: 'CONTINENTAL 175/65/14 POWERCONTACT 2 82T',
    price: 399.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_continental_contipowercontact_82t_1_20251222152416_f9cbacb94d08.jpg',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'POWERCONTACT 2'
  },
  {
    id: 'co3',
    brand: 'CONTINENTAL',
    name: 'CONTINENTAL 185/65/15 88H POWERCONTACT2',
    price: 529.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_continental_contipowercontact_82t_1_20251222152416_f9cbacb94d08.jpg',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'POWERCONTACT 2'
  },
  {
    id: 'co4',
    brand: 'CONTINENTAL',
    name: 'CONTINENTAL 195/55/15 85H POWERCONTACT 2',
    price: 509.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_continental_contipowercontact_82t_1_20251222152416_f9cbacb94d08.jpg',
    width: 195,
    aspectRatio: 55,
    rim: 15,
    model: 'POWERCONTACT 2'
  },
  {
    id: 'co5',
    brand: 'CONTINENTAL',
    name: 'CONTINENTAL 205/55/16 91V FR POWERCONTACT 2',
    price: 509.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_continental_contipowercontact_82t_1_20251222152416_f9cbacb94d08.jpg',
    width: 205,
    aspectRatio: 55,
    rim: 16,
    model: 'POWERCONTACT 2'
  },

  // DELINTE
  {
    id: 'd1',
    brand: 'DELINTE',
    name: 'DELINTE 185/60/15 DH2 84H',
    price: 329.00,
    promoPrice: 299.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_775428-MLU76889830244_062024-F.webp',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'DH2 84H',
    isOffer: true
  },
  {
    id: 'd2',
    brand: 'DELINTE',
    name: 'DELINTE 185/65/15 88H DH2',
    price: 339.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_775428-MLU76889830244_062024-F.webp',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'DH2'
  },
  {
    id: 'd3',
    brand: 'DELINTE',
    name: 'DELINTE 205/55/16 94W DS2',
    price: 399.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_775428-MLU76889830244_062024-F.webp',
    width: 205,
    aspectRatio: 55,
    rim: 16,
    model: 'DS2'
  },
  {
    id: 'd4',
    brand: 'DELINTE',
    name: 'DELINTE 215/65/16C 109/107T DV2 CARGA',
    price: 689.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_775428-MLU76889830244_062024-F.webp',
    width: 215,
    aspectRatio: 65,
    rim: 16,
    model: 'DV2 CARGA'
  },

  // FIRESTONE
  {
    id: 'f1_tire',
    brand: 'FIRESTONE',
    name: 'FIRESTONE 175/65/14 F700 82T',
    price: 379.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_firestone_f700_82t_1_20250911111043_865d44577d85.jpg',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'F700 82T'
  },
  {
    id: 'f2_tire',
    brand: 'FIRESTONE',
    name: 'FIRESTONE 175/70/14 F700 88T',
    price: 449.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_firestone_f700_82t_1_20250911111043_865d44577d85.jpg',
    width: 175,
    aspectRatio: 70,
    rim: 14,
    model: 'F700'
  },
  {
    id: 'f3_tire',
    brand: 'FIRESTONE',
    name: 'FIRESTONE 205/55/16 91V F-700',
    price: 449.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17565r14_firestone_f700_82t_1_20250911111043_865d44577d85.jpg',
    width: 205,
    aspectRatio: 55,
    rim: 16,
    model: 'F-700'
  },

  // GOODYEAR
  {
    id: 'g1',
    brand: 'GOODYEAR',
    name: 'GOODYEAR 205/55/17 91V WRANGL TERRITORY',
    price: 789.00,
    promoPrice: 729.00,
    image: 'https://www.acheipneus.com.br/media/catalog/product/p/n/pneu-20555r17-goodyear-wrangler-territory-ht-91v-1.png?width=800&height=800&optimize=low',
    width: 205,
    aspectRatio: 55,
    rim: 17,
    model: 'WRANGL TERRITORY',
    isOffer: true
  },
  {
    id: 'g2',
    brand: 'GOODYEAR',
    name: 'GOODYEAR 265/60/18 WRANGLER TERRITORY HT 110T',
    price: 989.00,
    image: 'https://www.acheipneus.com.br/media/catalog/product/p/n/pneu-20555r17-goodyear-wrangler-territory-ht-91v-1.png?width=800&height=800&optimize=low',
    width: 265,
    aspectRatio: 60,
    rim: 18,
    model: 'WRANGLER TERRITORY'
  },

  // HIFLY
  {
    id: 'hi1',
    brand: 'HIFLY',
    name: 'HIFLY 185/60/14 82H HF261',
    price: 269.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_18560r14_hifly_hf261_82h_1_20250912182338_fa8f9c5baa8e.jpg',
    width: 185,
    aspectRatio: 60,
    rim: 14,
    model: 'HF261'
  },

  // JK TYRE / JKTYRE
  {
    id: 'jk1',
    brand: 'JK TYRE',
    name: 'JK TYRE 175/70/13 82T TURBO',
    price: 269.00,
    image: 'https://www.alvespneus.com.br/image/catalog/Jk-Tyre/pneu-aro-13-175-70r13-jk-tyre-82t-tl-turbo.png',
    width: 175,
    aspectRatio: 70,
    rim: 13,
    model: 'TURBO'
  },
  {
    id: 'jk2',
    brand: 'JK TYRE',
    name: 'JK TYRE 175/65/14 VECTRA 82H',
    price: 269.00,
    image: 'https://www.alvespneus.com.br/image/catalog/Jk-Tyre/pneu-aro-13-175-70r13-jk-tyre-82t-tl-turbo.png',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'VECTRA'
  },

  // LINGLONG
  {
    id: 'l1',
    brand: 'LINGLONG',
    name: 'LINGLONG 195/60/15 GREEN-MAX HP010 88H',
    price: 289.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_958386-MLA99823472497_112025-F.webp',
    width: 195,
    aspectRatio: 60,
    rim: 15,
    model: 'GREEN-MAX HP010'
  },
  {
    id: 'l2',
    brand: 'LINGLONG',
    name: 'LINGLONG 205/60/16 92V GREEN-MAX HP010',
    price: 379.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_958386-MLA99823472497_112025-F.webp',
    width: 205,
    aspectRatio: 60,
    rim: 16,
    model: 'GREEN-MAX HP010'
  },

  // MAXTREK
  {
    id: 'm1',
    brand: 'MAXTREK',
    name: 'MAXTREK 185/65/15 88H MAXIMUS M2',
    price: 299.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_maxtrek_aro_16_maximus_m2_20565r15_94h_sl_1_20260218135248_7d79f0f6def4.jpg',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'MAXIMUS M2'
  },
  {
    id: 'm2',
    brand: 'MAXTREK',
    name: 'MAXTREK 195/60/15 88H MAXIMUS M1',
    price: 299.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1445393/pneu_maxtrek_aro_16_maximus_m2_20565r15_94h_sl_1_20260218135248_7d79f0f6def4.jpg',
    width: 195,
    aspectRatio: 60,
    rim: 15,
    model: 'MAXIMUS M1'
  },

  // MICHELIN
  {
    id: 'mic1',
    brand: 'MICHELIN',
    name: 'MICHELIN 205/55/17 95V PRIMACY 4',
    price: 859.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_967456-MLA79828137217_102024-F.webp',
    width: 205,
    aspectRatio: 55,
    rim: 17,
    model: 'PRIMACY 4',
    isOffer: true
  },
  {
    id: 'mic2',
    brand: 'MICHELIN',
    name: 'MICHELIN 215/50/17 95W PRIMACY 4 +',
    price: 749.00,
    promoPrice: 699.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_967456-MLA79828137217_102024-F.webp',
    width: 215,
    aspectRatio: 50,
    rim: 17,
    model: 'PRIMACY 4 +',
    isOffer: true
  },

  // PIRELLI
  {
    id: 'p1_tire',
    brand: 'PIRELLI',
    name: 'PIRELLI 175/65/14 82H P400EVO',
    price: 379.00,
    image: 'https://www.pensepneus.com.br/media/catalog/product/cache/e5c188f9fa76550a763b93b91095e130/p/4/p400_evo_1.webp',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'P400EVO'
  },
  {
    id: 'p2_tire',
    brand: 'PIRELLI',
    name: 'PIRELLI 185/60/15 88H P1 CINTURATO',
    price: 499.00,
    image: 'https://www.pensepneus.com.br/media/catalog/product/cache/e5c188f9fa76550a763b93b91095e130/p/4/p400_evo_1.webp',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'P1 CINTURATO'
  },
  {
    id: 'p3_tire',
    brand: 'PIRELLI',
    name: 'PIRELLI 185/65/15 88H P1 CINTURATO',
    price: 544.00,
    image: 'https://www.pensepneus.com.br/media/catalog/product/cache/e5c188f9fa76550a763b93b91095e130/p/4/p400_evo_1.webp',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'P1 CINTURATO'
  },

  // PRINX
  {
    id: 'pr1',
    brand: 'PRINX',
    name: 'PRINX 185/55/16 HH2 83H',
    price: 459.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_18555r16_prinx_hh2_hicity_83h_1_20250909002931_6e7b2d587166.jpg',
    width: 185,
    aspectRatio: 55,
    rim: 16,
    model: 'HH2 83H'
  },
  {
    id: 'pr2',
    brand: 'PRINX',
    name: 'PRINX 215/55/17 94W HZ2',
    price: 619.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_18555r16_prinx_hh2_hicity_83h_1_20250909002931_6e7b2d587166.jpg',
    width: 215,
    aspectRatio: 55,
    rim: 17,
    model: 'HZ2'
  },

  // PROVATO
  {
    id: 'pro1',
    brand: 'PROVATO',
    name: 'PROVATO 265/60/18 CROSSWIND A/T 110T',
    price: 639.00,
    image: 'https://1stpneus.com.br/wp-content/uploads/2022/10/CROSSWIND-AT.jpg',
    width: 265,
    aspectRatio: 60,
    rim: 18,
    model: 'CROSSWIND'
  },

  // SPEEDMAX
  {
    id: 'sm1',
    brand: 'SPEEDMAX',
    name: 'SPEEDMAX 175/55/16 80H ENERGRIP SPM022',
    price: 489.00,
    promoPrice: 429.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17555r16_speedmax_energrip_spm022_ev_80h_1_20260522095029_33f1e899ed35.jpg',
    width: 175,
    aspectRatio: 55,
    rim: 16,
    model: 'ENERGRIP',
    isOffer: true
  },
  {
    id: 'sm2',
    brand: 'SPEEDMAX',
    name: 'SPEEDMAX 215/65/16 102H PANGEA AT',
    price: 659.00,
    image: 'https://images.tcdn.com.br/img/img_prod/1411063/pneu_17555r16_speedmax_energrip_spm022_ev_80h_1_20260522095029_33f1e899ed35.jpg',
    width: 215,
    aspectRatio: 65,
    rim: 16,
    model: 'PANGEA AT'
  },

  // TORNEL
  {
    id: 't1',
    brand: 'TORNEL',
    name: 'TORNEL 175/70/14 ASTRAL NEO 84T',
    price: 279.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_785643-MLB110473824363_042026-F.webp',
    width: 175,
    aspectRatio: 70,
    rim: 14,
    model: 'ASTRAL NEO'
  },

  // XBRI
  {
    id: 'x1',
    brand: 'XBRI',
    name: 'XBRI 175/65/14 FASTWAY B2 82H',
    price: 289.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_686334-MLA100095996251_122025-F.webp',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'FASTWAY B2'
  },
  {
    id: 'x2',
    brand: 'XBRI',
    name: 'XBRI 175/75/14 86T FASTWAY A5',
    price: 269.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_686334-MLA100095996251_122025-F.webp',
    width: 175,
    aspectRatio: 75,
    rim: 14,
    model: 'FASTWAY A5'
  },
  {
    id: 'x3',
    brand: 'XBRI',
    name: 'XBRI 185/60/15 ECOLOGY 88H',
    price: 269.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_686334-MLA100095996251_122025-F.webp',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'ECOLOGY'
  },
  {
    id: 'x4',
    brand: 'XBRI',
    name: 'XBRI 195/55/15 85V FASTWAY Y1',
    price: 329.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_686334-MLA100095996251_122025-F.webp',
    width: 195,
    aspectRatio: 55,
    rim: 15,
    model: 'FASTWAY Y1'
  },

  // YOKOHAMA
  {
    id: 'y1_tire',
    brand: 'YOKOHAMA',
    name: 'YOKOHAMA 175/65/14 ES32 82T',
    price: 399.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_714535-MLB107513343737_022026-F.webp',
    width: 175,
    aspectRatio: 65,
    rim: 14,
    model: 'ES32 82T'
  },
  {
    id: 'y2_tire',
    brand: 'YOKOHAMA',
    name: 'YOKOHAMA 185/60/15 ES32 84H',
    price: 459.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_714535-MLB107513343737_022026-F.webp',
    width: 185,
    aspectRatio: 60,
    rim: 15,
    model: 'ES32 84H'
  },
  {
    id: 'y3_tire',
    brand: 'YOKOHAMA',
    name: 'YOKOHAMA 185/65/15 ES32 88H',
    price: 429.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_714535-MLB107513343737_022026-F.webp',
    width: 185,
    aspectRatio: 65,
    rim: 15,
    model: 'ES32'
  },

  // ZMAX
  {
    id: 'z1',
    brand: 'ZMAX',
    name: 'ZMAX 225/65/16C VANMEJOR 112/110R -CARGA',
    price: 559.00,
    image: 'https://http2.mlstatic.com/D_930543-MLA112057599751_052026-C.jpg',
    width: 225,
    aspectRatio: 65,
    rim: 16,
    model: 'VANMEJOR'
  }
];

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

// Let's create the interactive car finder data
export const FIAT_CARS: CarModel[] = [
  { id: 'f1', brand: 'Fiat', name: 'Palio / Palio Weekend', yearRange: '2005 - 2018', recommendedTireRatio: '175/65/14' },
  { id: 'f2', brand: 'Fiat', name: 'Uno / Novo Uno', yearRange: '2010 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'f3', brand: 'Fiat', name: 'Argo', yearRange: '2017 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'f4', brand: 'Fiat', name: 'Cronos', yearRange: '2018 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'f5', brand: 'Fiat', name: 'Mobi', yearRange: '2016 - 2026', recommendedTireRatio: '175/65/14' },
  { id: 'f6', brand: 'Fiat', name: 'Siena / Grand Siena', yearRange: '2008 - 2021', recommendedTireRatio: '175/65/14' },
  { id: 'f7', brand: 'Fiat', name: 'Strada (Aro 14)', yearRange: '2010 - 2020', recommendedTireRatio: '175/70/14' },
  { id: 'f8', brand: 'Fiat', name: 'Strada (Aro 15)', yearRange: '2015 - 2026', recommendedTireRatio: '185/65/15' },
];

export const VOLKSWAGEN_CARS: CarModel[] = [
  { id: 'vw1', brand: 'Volkswagen', name: 'Gol', yearRange: '2008 - 2023', recommendedTireRatio: '175/65/14' },
  { id: 'vw2', brand: 'Volkswagen', name: 'Voyage', yearRange: '2008 - 2023', recommendedTireRatio: '175/65/14' },
  { id: 'vw3', brand: 'Volkswagen', name: 'Polo / Novo Polo', yearRange: '2018 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'vw4', brand: 'Volkswagen', name: 'Fox / CrossFox', yearRange: '2005 - 2021', recommendedTireRatio: '195/55/15' },
  { id: 'vw5', brand: 'Volkswagen', name: 'Virtus', yearRange: '2018 - 2026', recommendedTireRatio: '195/55/15' },
  { id: 'vw6', brand: 'Volkswagen', name: 'Saveiro', yearRange: '2010 - 2026', recommendedTireRatio: '185/60/15' },
  { id: 'vw7', brand: 'Volkswagen', name: 'T-Cross (Aro 17)', yearRange: '2019 - 2026', recommendedTireRatio: '205/55/17' },
  { id: 'vw8', brand: 'Volkswagen', name: 'Nivus', yearRange: '2020 - 2026', recommendedTireRatio: '205/55/17' },
];

// Google most searched tire measures in Brazil / Curitiba
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
