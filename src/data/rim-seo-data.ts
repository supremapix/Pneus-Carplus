export interface RimSeoConfig {
  aro: string;
  number: number;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  profileCategory: 'Popular & Custo-Benefício' | 'Alta Performance & SUVs' | 'Exclusividade & Super SUVs';
  recommendedBrands: string[];
  vehicleExamples: string[];
  topDimensions: {
    measure: string;
    vehicles: string;
    loadSpeed: string;
  }[];
  technicalText: string;
  antiScratchAssurance: string;
  priceFrom: string;
  ctaText: string;
}

export const RIM_SEO_DATA: Record<string, RimSeoConfig> = {
  '13': {
    aro: '13',
    number: 13,
    h1: 'Pneu Aro 13 em Curitiba: Cobrimos qualquer orçamento com Montagem Grátis',
    metaTitle: 'Pneu Aro 13 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Pneu Aro 13 em Curitiba com preço de atacado e montagem grátis no Portão. Marcas Xbri, Delinte, Itaro e Pirelli para Mobi, Kwid, Uno, Celta e Palio. Cobrimos orçamentos!',
    profileCategory: 'Popular & Custo-Benefício',
    recommendedBrands: ['Xbri (Fastway)', 'Delinte (DH2)', 'Itaro', 'Pirelli (Cinturato P1)', 'Goodyear (Kelly Edge)'],
    vehicleExamples: ['Fiat Mobi', 'Renault Kwid', 'Fiat Uno', 'Chevrolet Celta', 'Fiat Palio', 'Ford Ka (antigo)', 'Chevrolet Corsa'],
    topDimensions: [
      { measure: '165/70 R13', vehicles: 'Fiat Mobi, Renault Kwid, Fiat Uno Mille, Ford Ka, Corsa Wind', loadSpeed: '79T (Até 190 km/h)' },
      { measure: '175/70 R13', vehicles: 'Fiat Palio, Chevrolet Celta, Classic, Gol G2/G3/G4, Ford Fiesta', loadSpeed: '82T (Até 190 km/h)' }
    ],
    technicalText: 'O Aro 13 é o campeão absoluto em economia de combustível e baixo custo de manutenção para quem roda no trânsito diário de Curitiba. Na Carplus Portão, você encontra pneus com estrutura reforçada contra buracos, alta durabilidade quilométrica e composto especial que reduz o custo por KM rodado.',
    antiScratchAssurance: 'Montagem computadorizada expressa com troca de bicos grátis e alinhamento 3D rápido para você economizar tempo e dinheiro.',
    priceFrom: 'R$ 219,90',
    ctaText: 'Procurando pneu Aro 13 barato em Curitiba? Cobrimos qualquer orçamento da internet ou da concorrência no Portão. Chame agora no WhatsApp (41) 3082-7282!'
  },
  '14': {
    aro: '14',
    number: 14,
    h1: 'Pneu Aro 14 em Curitiba: Cobrimos qualquer orçamento com Montagem Grátis',
    metaTitle: 'Pneu Aro 14 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Compre Pneu Aro 14 em Curitiba pelo menor preço garantido com montagem inclusa. Xbri, Delinte, Itaro, Pirelli e Continental para HB20, Onix, Gol, Fox e Ka no Portão.',
    profileCategory: 'Popular & Custo-Benefício',
    recommendedBrands: ['Xbri (Ecology)', 'Delinte (DH2)', 'Itaro', 'Pirelli (Cinturato P1 Plus)', 'Continental (PowerContact 2)', 'Goodyear (Direction)'],
    vehicleExamples: ['Hyundai HB20', 'Chevrolet Onix', 'VW Gol G5/G6/G7', 'Ford Ka', 'VW Fox / Up!', 'Fiat Siena / Grand Siena', 'VW Voyage'],
    topDimensions: [
      { measure: '175/65 R14', vehicles: 'Hyundai HB20, Ford Ka, Fiat Uno Way, Peugeot 206/207, Clio', loadSpeed: '82T / 82H' },
      { measure: '185/60 R14', vehicles: 'VW Gol, Fox, Voyage, Fiat Palio Attractive, Chevrolet Corsa Sedan', loadSpeed: '82H (Até 210 km/h)' },
      { measure: '185/65 R14', vehicles: 'Chevrolet Onix Joy, Prisma, Renault Sandero/Logan, Ford Fiesta', loadSpeed: '86T / 86H' }
    ],
    technicalText: 'O Aro 14 equipa os carros mais vendidos de Curitiba e exige pneus de alta durabilidade e frenagem segura na chuva. O atacarejo de pneus da Carplus no Portão oferece opções com 5 anos de garantia de fábrica, excelente índice de tração A e menor resistência ao rolamento.',
    antiScratchAssurance: 'Montagem técnica imediata com válvulas novas cortesia, balanceamento computadorizado e alinhamento 3D de alta precisão.',
    priceFrom: 'R$ 249,90',
    ctaText: 'Pneu Aro 14 para HB20, Onix ou Gol em Curitiba? Venha para a Carplus no Portão e saia rodando com montagem 100% grátis. WhatsApp (41) 3082-7282!'
  },
  '15': {
    aro: '15',
    number: 15,
    h1: 'Pneu Aro 15 em Curitiba: Cobrimos qualquer orçamento com Montagem Grátis',
    metaTitle: 'Pneu Aro 15 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Pneu Aro 15 em Curitiba com preço imbatível de atacado e montagem grátis. Delinte, Xbri, Itaro, Continental e Pirelli para Polo, Virtus, Etios, Yaris, Sandero e Argo.',
    profileCategory: 'Popular & Custo-Benefício',
    recommendedBrands: ['Delinte (DH2)', 'Xbri (Sport Plus / Ecology)', 'Itaro', 'Continental (PowerContact 2)', 'Pirelli (Cinturato P7)', 'Bridgestone (Turanza ER300)'],
    vehicleExamples: ['VW Polo', 'VW Virtus', 'Toyota Etios / Yaris', 'Renault Sandero / Logan', 'Fiat Argo / Cronos', 'Chevrolet Spin / Cobalt', 'Hyundai HB20X'],
    topDimensions: [
      { measure: '185/60 R15', vehicles: 'Toyota Etios, Yaris, VW Polo, Fiat Argo, Honda City/Fit', loadSpeed: '84H / 88H XL' },
      { measure: '185/65 R15', vehicles: 'Renault Sandero, Logan, Nissan Versa, Hyundai HB20, Onix Plus', loadSpeed: '88H (Até 210 km/h)' },
      { measure: '195/55 R15', vehicles: 'VW Gol Rallye, Fox Rock in Rio, Saveiro Cross, Ford Fiesta Mexicano', loadSpeed: '85V (Até 240 km/h)' },
      { measure: '195/60 R15', vehicles: 'Chevrolet Astra, Vectra, Fiat Punto, Linea, Peugeot 208', loadSpeed: '88H / 88V' },
      { measure: '195/65 R15', vehicles: 'Chevrolet Spin, Cobalt, Honda Civic antigo, Toyota Corolla antigo', loadSpeed: '91H / 91V' }
    ],
    technicalText: 'O Aro 15 é a medida favorita de motoristas de aplicativo, frotistas e famílias em Curitiba pela combinação perfeita de conforto, dirigibilidade e custo por quilômetro. Na Carplus você encontra as melhores opções com ranhuras longitudinais anti-aquaplanagem projetadas para o clima chuvoso de Curitiba.',
    antiScratchAssurance: 'Montagem técnica computadorizada na hora, bicos novos sem custo e checagem preventiva gratuita da suspensão e freios.',
    priceFrom: 'R$ 269,90',
    ctaText: 'Orçamento sem compromisso para Pneu Aro 15 em Curitiba? Cobrimos qualquer oferta com montagem na hora no Portão. Fale no WhatsApp (41) 3082-7282!'
  },
  '16': {
    aro: '16',
    number: 16,
    h1: 'Pneu Aro 16 em Curitiba: Cobrimos qualquer orçamento com Montagem Grátis',
    metaTitle: 'Pneu Aro 16 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Pneus Aro 16 em Curitiba com preço de atacado e montagem grátis no Portão. Estoque pronta entrega Xbri, Delinte, Pirelli e Continental para Civic, Corolla, Renegade e SUVs.',
    profileCategory: 'Popular & Custo-Benefício',
    recommendedBrands: ['Xbri (Forza)', 'Delinte (DH2 / DS2)', 'Itaro', 'Pirelli (Cinturato P1/P7)', 'Continental (PowerContact 2)', 'Goodyear (EfficientGrip)'],
    vehicleExamples: ['Honda Civic', 'Toyota Corolla', 'Jeep Renegade', 'VW Nivus / T-Cross', 'Nissan Kicks', 'Chevrolet Tracker', 'BYD Dolphin Mini (175/55 R16)'],
    topDimensions: [
      { measure: '205/55 R16', vehicles: 'Honda Civic, Toyota Corolla, VW Golf, Focus, Cruze, Astra, Sandero RS', loadSpeed: '91V / 91W / 94V XL' },
      { measure: '205/60 R16', vehicles: 'Jeep Renegade, VW Nivus, Ford EcoSport, Nissan Kicks, Citroën C4 Cactus', loadSpeed: '92H / 92V' },
      { measure: '195/55 R16', vehicles: 'VW Polo, Virtus, Honda Fit/City, HB20, Onix Plus, Peugeot 208', loadSpeed: '87H / 87V' },
      { measure: '195/60 R16', vehicles: 'Nissan Kicks, Hyundai Creta, Citroën C3 Aircross, Chevrolet Spin', loadSpeed: '89H / 89V' },
      { measure: '215/65 R16', vehicles: 'Renault Duster, Oroch, Jeep Renegade Sport, Fiat Toro Endurance', loadSpeed: '98H / 102T' },
      { measure: '175/55 R16', vehicles: 'BYD Dolphin Mini 100% Elétrico', loadSpeed: '80H EV Extra Load' }
    ],
    technicalText: 'O Aro 16 é o padrão mais versátil do mercado, equipando sedãs médios, SUVs compactos e carros elétricos em Curitiba. Na Carplus Portão, você tem o atacarejo de pneus com o menor preço garantido, durabilidade estendida e compostos de alta aderência para rodovias e avenidas de Curitiba.',
    antiScratchAssurance: 'Montagem computadorizada expressa com bicos novos cortesia e alinhamento 3D de alta precisão que preserva os pneus.',
    priceFrom: 'R$ 289,90',
    ctaText: 'Pneu Aro 16 com o menor preço de Curitiba? Cobrimos orçamentos comprovados na hora com montagem inclusa no Portão. WhatsApp (41) 3082-7282!'
  },
  '17': {
    aro: '17',
    number: 17,
    h1: 'Pneus Aro 17 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 17 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Compre Pneus Aro 17 em Curitiba pelo menor preço garantido. Linha completa Pirelli Cinturato/Scorpion, Continental, Michelin e Delinte para Corolla, Compass, HR-V e BYD King.',
    profileCategory: 'Popular & Custo-Benefício',
    recommendedBrands: ['Pirelli (Cinturato P7 / Scorpion)', 'Continental (UltraContact / MaxContact MC6)', 'Michelin (Primacy 4+)', 'Goodyear (Eagle Sport 2)', 'Bridgestone (Turanza T005)', 'Delinte (DH2)'],
    vehicleExamples: ['Jeep Compass Sport', 'Toyota Corolla Altis', 'Honda HR-V', 'VW T-Cross Highline', 'Audi A3', 'BMW Série 1/3', 'BYD King EV/DM-i'],
    topDimensions: [
      { measure: '225/45 R17', vehicles: 'Golf GTI, Audi A3, Corolla Altis, Civic G10, Jetta TSI, BMW Série 3', loadSpeed: '91W / 94Y XL' },
      { measure: '215/50 R17', vehicles: 'Cruze Turbo, Focus Titanium, Cerato, Sentra, Civic EXL', loadSpeed: '91V / 95W XL' },
      { measure: '215/55 R17', vehicles: 'HR-V, T-Cross Highline, Nivus, Tracker Premier, Camry, BYD King', loadSpeed: '94V / 98W XL' },
      { measure: '225/50 R17', vehicles: 'Audi A4, BMW 320i F30, Volvo V40, Fusion, Peugeot 3008', loadSpeed: '94W / 98Y XL' },
      { measure: '225/65 R17', vehicles: 'Jeep Compass, Fiat Toro, Toyota RAV4, Honda CR-V, Haval H6 HEV', loadSpeed: '102H / 102V' },
      { measure: '205/50 R17', vehicles: 'BYD Dolphin Plus, Sandero R.S., Subaru Impreza', loadSpeed: '89W / 93W XL' }
    ],
    technicalText: 'Os Pneus Aro 17 exigem rigidez lateral superior e compostos de alta aderência para rodovias como a BR-277 e BR-376. Oferecemos opções homologadas com banda de rodagem assimétrica, baixa resistência ao rolamento e índices de carga elevados para sedãs médios e SUVs.',
    antiScratchAssurance: 'Rampas pantográficas de acesso ultra suave e garras com proteção de polímero para instalação impecável em rodas diamantadas sem marcas.',
    priceFrom: 'R$ 349,90',
    ctaText: 'Cotação rápida para Pneus Aro 17 em Curitiba com cobertura de qualquer orçamento comprovado da concorrência!'
  },
  '18': {
    aro: '18',
    number: 18,
    h1: 'Pneus Aro 18 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 18 em Curitiba | Menor Preço e Montagem Grátis | Carplus',
    metaDescription: 'Pneus Aro 18 em Curitiba com preço de atacado e montagem técnica grátis. Michelin Pilot Sport, Pirelli P Zero/Scorpion, Continental para BMW 320i, Compass, Tesla e SUVs.',
    profileCategory: 'Alta Performance & SUVs',
    recommendedBrands: ['Michelin (Pilot Sport 4 / 5)', 'Pirelli (P Zero / Scorpion Verde All Season)', 'Continental (PremiumContact 6 / SportContact)', 'Bridgestone (Potenza Sport)', 'Delinte (DS2 / Desert Storm II)', 'Xbri (Forza)'],
    vehicleExamples: ['BMW 320i M Sport', 'Audi A4 / A5', 'Mercedes Classe C / CLA', 'Jeep Compass Limited / Trailhawk', 'Tesla Model 3', 'BYD Seal RWD', 'VW Tiguan Allspace'],
    topDimensions: [
      { measure: '225/40 R18', vehicles: 'Audi A3/S3, Golf GTI MK7/MK8, BMW 320i M Sport, Mercedes CLA, Civic Touring', loadSpeed: '92Y XL' },
      { measure: '225/45 R18', vehicles: 'BMW 320i G20, Mercedes C180/C200/C300, Audi A4, Lexus IS', loadSpeed: '95Y XL / Run Flat' },
      { measure: '235/45 R18', vehicles: 'Tesla Model 3, BYD Seal RWD, Passat TSI, Honda Accord Turbo', loadSpeed: '98Y XL / EV Elect' },
      { measure: '225/55 R18', vehicles: 'Jeep Compass Limited/Trailhawk, Renegade Trailhawk, Eclipse Cross', loadSpeed: '98V / 102V XL' },
      { measure: '235/50 R18', vehicles: 'VW Tiguan Allspace, Audi Q3, Mercedes GLA 200, Volvo XC40', loadSpeed: '97V / 101W XL' },
      { measure: '235/60 R18', vehicles: 'Hyundai Santa Fe, Kia Sorento, Volvo XC60 T5, Land Rover Discovery Sport', loadSpeed: '103V / 107V XL' }
    ],
    technicalText: 'O Aro 18 é a transição para a alta performance. Contamos com modelos com tecnologia Run Flat e carcaças com cabos de aço reforçados, capazes de suportar velocidades de até 300 km/h (índice Y) mantendo a precisão de direção e conforto acústico.',
    antiScratchAssurance: 'Desmontadora automática moderna com braço de apoio pneumático que não força o talão e elimina 100% o risco de danos ao aro ou sensores TPMS.',
    priceFrom: 'R$ 439,90',
    ctaText: 'Precisa de Pneu Aro 18 Run Flat ou convencional em Curitiba? Estoque completo no Portão. Ligue ou chame no WhatsApp (41) 3082-7282!'
  },
  '19': {
    aro: '19',
    number: 19,
    h1: 'Pneus Aro 19 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 19 em Curitiba | Pirelli, Michelin e Menor Preço | Carplus',
    metaDescription: 'Estoque exclusivo de Pneus Aro 19 em Curitiba para BYD Seal, Haval H6, Volvo XC60, Porsche Macan e BMW. Pirelli Elect, Michelin Pilot Sport com menor preço garantido.',
    profileCategory: 'Alta Performance & SUVs',
    recommendedBrands: ['Michelin (Pilot Sport 4 SUV / Pilot Sport 5)', 'Pirelli (P Zero PZ4 / Scorpion Elect)', 'Continental (SportContact 7 / EcoContact 6 Q)', 'Yokohama (Advan Sport V105)', 'Bridgestone (Alenza 001)'],
    vehicleExamples: ['BYD Seal AWD (245/45 R19)', 'GWM Haval H6 GT', 'Volvo XC60 Recharge (235/55 R19)', 'Porsche Macan', 'Audi A6 / S4', 'BMW Série 5 / X3', 'Tesla Model Y'],
    topDimensions: [
      { measure: '245/45 R19', vehicles: 'BYD Seal AWD 531cv, GWM Haval H6 GT, Hyundai Tucson Turbo, Genesis G80', loadSpeed: '98Y / 102Y XL EV Homologado' },
      { measure: '235/55 R19', vehicles: 'Volvo XC60 Recharge, BYD Song Plus, Audi Q5, Porsche Macan Dianteiro', loadSpeed: '101V / 105W XL Elect' },
      { measure: '235/35 R19', vehicles: 'Audi RS3, Golf R, Mercedes A35/A45 AMG, Honda Civic Type R', loadSpeed: '91Y XL' },
      { measure: '245/40 R19', vehicles: 'Audi A6, BMW Série 5 M Sport, Mercedes Classe E, Porsche Cayman', loadSpeed: '98Y XL' },
      { measure: '255/50 R19', vehicles: 'BMW X5 F15, Porsche Macan Traseiro, Mercedes GLE 350d', loadSpeed: '103Y / 107Y XL' },
      { measure: '235/40 R19', vehicles: 'Tesla Model 3 Performance, BYD Han EV, Peugeot 508 PSE', loadSpeed: '96Y XL' }
    ],
    technicalText: 'Pneus de Aro 19 para carros elétricos e esportivos premium exigem tecnologia de absorção acústica interna (espuma PNCS/SoundComfort) e carcaças High Load (HL) para segurar o torque instantâneo de veículos que passam de 500 cavalos.',
    antiScratchAssurance: 'Ferramental especial com ponteira de teflon e alinhamento 3D computadorizado que garante dirigibilidade perfeita sem arranhões em rodas aro 19.',
    priceFrom: 'R$ 579,90',
    ctaText: 'Procurando pneus homologados para seu BYD Seal, Haval H6 ou Volvo em Curitiba? Menor preço de Aro 19 comprovado no Portão!'
  },
  '20': {
    aro: '20',
    number: 20,
    h1: 'Pneus Aro 20 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 20 em Curitiba | Menor Preço e Montagem Especializada | Carplus',
    metaDescription: 'Pneus Aro 20 em Curitiba com pronta entrega para Volvo XC90, Porsche Cayenne, BMW X5, Defender e RAM 1500. Maquinário touchless que não risca rodas.',
    profileCategory: 'Exclusividade & Super SUVs',
    recommendedBrands: ['Pirelli (P Zero Elect / Scorpion Zero All Season)', 'Michelin (Latitude Sport 3 / Pilot Sport 4 SUV)', 'Continental (CrossContact RX / SportContact 6)', 'Yokohama (Geolandar X-CV)'],
    vehicleExamples: ['Volvo XC90 / XC60 Polestar', 'Porsche Cayenne / Macan GTS', 'BMW X5 / X6', 'Land Rover Defender / Discovery 5', 'RAM 1500 Classic/Rebel', 'Audi Q7 / Q8'],
    topDimensions: [
      { measure: '245/45 R20', vehicles: 'Volvo XC60 Polestar, XC90, Range Rover Evoque, Velar, Jaguar E-Pace', loadSpeed: '99Y / 103Y XL' },
      { measure: '255/50 R20', vehicles: 'Land Rover Defender 110, Discovery 5, Ford Explorer, Jeep Grand Cherokee', loadSpeed: '109Y / 109V XL' },
      { measure: '255/45 R20', vehicles: 'Audi SQ5, Porsche Macan GTS Dianteiro, Mercedes GLC 43 AMG', loadSpeed: '101Y / 105Y XL' },
      { measure: '275/40 R20', vehicles: 'BMW X5 Dianteiro, Porsche Cayenne, Chevrolet Camaro SS', loadSpeed: '106Y XL' },
      { measure: '315/35 R20', vehicles: 'BMW X5 / X6 Traseiro, Porsche Panamera Traseiro', loadSpeed: '110Y XL' },
      { measure: '275/55 R20', vehicles: 'RAM 1500 Rebel/Classic, Chevrolet Silverado High Country, Ford F-150', loadSpeed: '113T / 117H' }
    ],
    technicalText: 'Rodas aro 20 requerem pneus com capacidade de carga reforçada (103Y a 117H) para suportar pesos brutos acima de 2,5 toneladas e tração integral AWD sem deformações em alta velocidade.',
    antiScratchAssurance: 'Maquinário de montagem 100% Touchless com destalonador sincronizado a laser. Suas rodas aro 20 diamantadas ou pretas brilhantes saem impecáveis, sem qualquer marca metálica.',
    priceFrom: 'R$ 789,90',
    ctaText: 'Estoque completo de Pneus Aro 20 para SUVs Premium e Picapes em Curitiba com montagem especializada. Chame a equipe no WhatsApp!'
  },
  '21': {
    aro: '21',
    number: 21,
    h1: 'Pneus Aro 21 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 21 em Curitiba | BYD Tan, Porsche, Audi e BMW | Carplus',
    metaDescription: 'Pneus Aro 21 em Curitiba a pronta entrega para BYD Tan EV, Porsche Cayenne, Audi e-tron, Volvo XC90 e BMW X7. Menor preço garantido e montagem de alta precisão.',
    profileCategory: 'Exclusividade & Super SUVs',
    recommendedBrands: ['Michelin (Pilot Sport 4 SUV / Pilot Sport EV)', 'Pirelli (P Zero Corsa / P Zero PZ4 Elect)', 'Continental (SportContact 6 / 7)', 'Goodyear (Eagle F1 Asymmetric 3 SUV)'],
    vehicleExamples: ['BYD Tan EV (265/45 R21)', 'Porsche Cayenne Turbo / GTS', 'Audi e-tron / Q8 e-tron', 'Volvo XC90 Excellence', 'BMW X7 / X5 M', 'Range Rover Sport'],
    topDimensions: [
      { measure: '265/45 R21', vehicles: 'BYD Tan EV 100% Elétrico 517cv, Audi e-tron, Audi Q8 e-tron Sportback', loadSpeed: '104W / 108Y XL EV Homologado' },
      { measure: '275/40 R21', vehicles: 'Volvo XC90 T8 Recharge, Range Rover Sport, BMW X7 Dianteiro', loadSpeed: '107Y XL Elect' },
      { measure: '285/40 R21', vehicles: 'Audi Q7 3.0 TFSI, Porsche Cayenne Turbo Dianteiro, Mercedes GLS 450', loadSpeed: '109Y XL' },
      { measure: '295/35 R21', vehicles: 'Porsche Cayenne GTS, Maserati Levante Trofeo, BMW X5 M Dianteiro', loadSpeed: '107Y XL' },
      { measure: '315/35 R21', vehicles: 'BMW X6 M / X7 Traseiro, Porsche Panamera Turbo Traseiro', loadSpeed: '111Y XL' }
    ],
    technicalText: 'O Aro 21 é a medida padrão de hiper-SUVs elétricos e esportivos como o BYD Tan e Porsche Cayenne. A Carplus oferece pneus com índice HL (High Load), homologação original de montadora (marcações AO, N0, *, e Elect) e compostos de borracha de alta temperatura.',
    antiScratchAssurance: 'Equipamentos calibrados com garras de nylon e balanceador de precisão a laser com chumbos ocultos estéticos que mantêm o visual perfeito das suas rodas aro 21.',
    priceFrom: 'R$ 990,00',
    ctaText: 'Pneus para BYD Tan ou Hiper-SUVs Aro 21 em Curitiba? Cobrimos orçamentos de concessionária com instalação imediata no Portão!'
  },
  '22': {
    aro: '22',
    number: 22,
    h1: 'Pneus Aro 22 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 22 em Curitiba | Porsche Cayenne, Urus, RAM e BMW | Carplus',
    metaDescription: 'Pneus Aro 22 em Curitiba a pronta entrega. Linha exclusiva para Porsche Cayenne Coupe, Audi RSQ8, BMW X6 M, Range Rover e RAM 1500. Montagem touchless sem riscar rodas.',
    profileCategory: 'Exclusividade & Super SUVs',
    recommendedBrands: ['Pirelli (P Zero PZ4 / Scorpion All Season)', 'Michelin (Pilot Sport 4S / Pilot Sport EV)', 'Continental (SportContact 7)', 'Yokohama (Advan Sport)'],
    vehicleExamples: ['Porsche Cayenne Turbo GT / Coupe', 'Audi RSQ8 / RS6 Avant', 'BMW X5 M / X6 M Competition', 'Range Rover Vogue / Autobiography', 'RAM 1500 Limited', 'Cadillac Escalade'],
    topDimensions: [
      { measure: '285/35 R22', vehicles: 'Porsche Cayenne Coupe, Audi RSQ8 Dianteiro, Bentley Bentayga, Urus', loadSpeed: '106Y XL' },
      { measure: '315/30 R22', vehicles: 'BMW X5 M / X6 M Competition Traseiro, Porsche Cayenne Coupe Traseiro', loadSpeed: '107Y XL' },
      { measure: '275/40 R22', vehicles: 'BMW X7 M50i, Range Rover Vogue / Sport, Mercedes-Maybach GLS', loadSpeed: '107Y / 108Y XL' },
      { measure: '265/35 R22', vehicles: 'BYD Tan Personalizado, Audi RS6 Avant, Jaguar F-Pace SVR', loadSpeed: '102Y XL' },
      { measure: '285/45 R22', vehicles: 'RAM 1500 Limited, Cadillac Escalade, Lincoln Navigator, GMC Yukon', loadSpeed: '114H / 114V XL' },
      { measure: '325/35 R22', vehicles: 'Mercedes-AMG GLE 63 S Coupe Traseiro, Aston Martin DBX', loadSpeed: '110Y / 114Y XL' }
    ],
    technicalText: 'Pneus de Aro 22 operam em condições extremas de perfil ultra-baixo (séries 30 e 35) e exigem carcaças com dupla lona de aço e poliamida para resistir a buracos urbanos sem formação de bolhas laterais, suportando velocidades superiores a 300 km/h.',
    antiScratchAssurance: 'Montagem executada por técnicos seniores em equipamento especial para aros gigantes sem uso de espátulas metálicas diretas. Garantia total contra qualquer avaria estética na roda.',
    priceFrom: 'R$ 1.290,00',
    ctaText: 'Procurando Aro 22 com preço justo em Curitiba e sem risco de riscar a roda? Fale direto com nossos especialistas no WhatsApp (41) 3082-7282!'
  },
  '23': {
    aro: '23',
    number: 23,
    h1: 'Pneus Aro 23 em Curitiba: Menor Preço e Estoque Pronta Entrega',
    metaTitle: 'Pneus Aro 23 em Curitiba | Lamborghini Urus, DBX, RSQ8 e Maybach | Carplus',
    metaDescription: 'Pneus Aro 23 em Curitiba para Super SUVs de ultra-luxo: Lamborghini Urus, Aston Martin DBX 707, Audi RSQ8, Range Rover SV e Maybach. Atendimento VIP na Carplus Portão.',
    profileCategory: 'Exclusividade & Super SUVs',
    recommendedBrands: ['Pirelli (P Zero Trofeo R / P Zero PZ4 Corsa)', 'Continental (SportContact 7)', 'Michelin (Pilot Sport 4S N0/MO1)'],
    vehicleExamples: ['Lamborghini Urus / Urus Performante', 'Aston Martin DBX 707', 'Audi RSQ8 Performance', 'Range Rover SV / Autobiography 23"', 'Mercedes-Maybach GLS 600', 'Mercedes-AMG G63'],
    topDimensions: [
      { measure: '285/35 R23', vehicles: 'Lamborghini Urus Dianteiro, Audi RSQ8, Aston Martin DBX 707 Dianteiro', loadSpeed: '107Y XL (300+ km/h)' },
      { measure: '325/30 R23', vehicles: 'Lamborghini Urus Traseiro, Aston Martin DBX 707 Traseiro', loadSpeed: '109Y XL (300+ km/h)' },
      { measure: '285/40 R23', vehicles: 'Mercedes-Maybach GLS 600, Range Rover SV Long Wheelbase', loadSpeed: '111Y XL' },
      { measure: '295/35 R23', vehicles: 'Audi RSQ8 Carbon Edition, Mercedes-AMG GLE 63 S Edition 1', loadSpeed: '108Y XL' }
    ],
    technicalText: 'O Aro 23 representa o ápice da engenharia pneumática global para super SUVs com mais de 650 cv e velocidade máxima superior a 305 km/h. Na Carplus Portão, disponibilizamos compostos homologados de pista para rua com aderência extrema em piso seco e drenagem máxima no piso molhado de Curitiba.',
    antiScratchAssurance: 'Protocolo VIP de Atendimento: montagem robotizada assistida por computador com proteção integral para rodas forjadas e alinhamento 3D milimétrico dedicado a superesportivos.',
    priceFrom: 'R$ 1.890,00',
    ctaText: 'Não encontrou seu Pneu Aro 23 na concessionária de Curitiba? Temos o maior estoque e menor preço com atendimento exclusivo no Portão. Chame agora no (41) 3082-7282!'
  }
};
