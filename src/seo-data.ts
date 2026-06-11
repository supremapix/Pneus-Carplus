export interface SeoItem {
  id: string;
  name: string;
  type: 'bairro-oficial' | 'bairro-nao-oficial' | 'regiao-popular' | 'rmc' | 'aro';
  slug: string;
  detailText?: string;
}

export const OFFICIAL_NEIGHBORHOODS: string[] = [
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

export const NON_OFFICIAL_NEIGHBORHOODS: { name: string; region: string }[] = [
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

export const POPULAR_REGIONS: { name: string; subtitle: string; subAreas: string[] }[] = [
  {
    name: "Região Central & Rebouças",
    subtitle: "Prado Velho, Vila Torres, Vila das Torres, Vila Prado, Centro",
    subAreas: ["Vila Torres", "Vila das Torres", "Vila Oficinas", "Vila Prado", "Centro Cívico", "Rebouças"]
  },
  {
    name: "Região Cidade Industrial (CIC)",
    subtitle: "CIC Central, Vila Sandra, Vila Verde, Vitória Régia, Sabará, Neoville",
    subAreas: ["Vila Sandra", "Vila Verde", "Nossa Senhora da Luz", "Vitória Régia", "Caiuá", "Sabará", "Conquista", "Gabineto", "Itatiaia", "Santa Helena", "Atenas", "Osvaldo Cruz", "Barigui", "Neoville"]
  },
  {
    name: "Região Sul (Pinheirinho / Sítio Cercado / Umbará)",
    subtitle: "Pinheirinho Velho, Sítio Cercado Velho, Umbará de Baixo e de Cima, Capão Raso Velho",
    subAreas: ["Pinheirinho Velho", "Sítio Cercado Velho", "Umbará de Baixo", "Umbará de Cima", "Capão Raso Velho", "Vila Osternack", "Tatuquara"]
  },
  {
    name: "Região Boqueirão / Hauer / Xaxim",
    subtitle: "Carmo, Hauer Velho, Xaxim Velho, Boqueirão Alto, Boqueirão Velho",
    subAreas: ["Carmo", "Hauer Velho", "Xaxim Velho", "Boqueirão Alto", "Boqueirão Velho", "Vila Hauer", "Fanny", "Lindóia"]
  },
  {
    name: "Região Leste (Cajuru / Uberaba / Capão da Imbuia)",
    subtitle: "Vila Pantanal, Cajuru Alto, Uberaba Velho, Uberaba de Cima, Jardim das Torres",
    subAreas: ["Vila Pantanal", "Cajuru Alto", "Uberaba Velho", "Uberaba de Cima", "Jardim das Torres", "Vila Audi", "Cristo Rei"]
  },
  {
    name: "Região Norte (Boa Vista / Bairro Alto / Tingui)",
    subtitle: "Bairro Alto Norte, Bairro Alto Velho, Tingui Velho, Boa Vista Norte",
    subAreas: ["Bairro Alto Norte", "Bairro Alto Velho", "Tingui Velho", "Boa Vista Norte", "Jardim Kosmos", "Atuba", "Santa Cândida"]
  },
  {
    name: "Região Oeste (Santa Felicidade / Orleans / São Braz)",
    subtitle: "Orleans Velho, São Braz Alto, Santa Felicidade Norte",
    subAreas: ["Orleans Velho", "São Braz Alto", "Santa Felicidade Norte", "Butiatuvinha", "Santo Inácio", "Cascatinha"]
  }
];

export const METROPOLITAN_CITIES: string[] = [
  "São José dos Pinhais", "Pinhais", "Colombo", "Araucária", "Almirante Tamandaré",
  "Campo Largo", "Campo Magro", "Fazenda Rio Grande", "Quatro Barras",
  "Campina Grande do Sul", "Mandirituba", "Balsa Nova", "Rio Branco do Sul",
  "Itaperuçu", "Tijucas do Sul"
];

// Curitiba-centric directions to Carplus Portão on Av. Arthur Bernardes, 1323
export function getRouteInstructions(locationName: string, type: string): { route: string; distance: string; time: string } {
  const norm = locationName.toLowerCase();

  // Region calculations/simulated routing descriptions
  if (norm.includes("são josé dos pinhais") || norm.includes("sjp")) {
    return {
      route: "Siga pela Av. das Torres (BR-376) sentido Curitiba, pegue a Linha Verde (BR-116) sentido Sul e acesse a Av. Presidente Wenceslau Braz. Continue direto e vire à direita na Av. Presidente Arthur da Silva Bernardes. A Carplus estará à sua direita no número 1323.",
      distance: "16.8 km",
      time: "22 min"
    };
  }
  if (norm.includes("araucária") || norm.includes("araucaria")) {
    return {
      route: "Siga pela Rodovia do Xisto (BR-476) sentido Curitiba, entre na Av. Juscelino Kubitschek de Oliveira (CIC) e acesse a Av. Winston Churchill / Linha Verde. Siga em direção ao bairro Portão via Av. República Argentina e vire à esquerda na Av. Arthur Bernardes buscando o número 1323.",
      distance: "18.2 km",
      time: "24 min"
    };
  }
  if (norm.includes("pinhais")) {
    return {
      route: "Siga pela Av. Victor Ferreira do Amaral, acesse a Rodovia BR-277 sentido Curitiba/Centro, entre na Av. Prefeito Omar Sabbag / Viaduto do Capanema. Siga pela Av. Silva Jardim até o Seminário, vire à esquerda na Av. Arthur Bernardes e prossiga até o 1323.",
      distance: "14.5 km",
      time: "19 min"
    };
  }
  if (norm.includes("colombo")) {
    return {
      route: "Acesse a Rodovia da Uva (PR-417) sentido Sul, siga pela Av. Anita Garibaldi e entre no Barreirinha. Continue pela rápida sentido Cabral/Centro e pegue a Av. Arthur Bernardes cruzando o Seminário direto até o número 1323.",
      distance: "19.5 km",
      time: "28 min"
    };
  }
  if (norm.includes("campo largo")) {
    return {
      route: "Siga pela Rodovia BR-277 sentido Curitiba (Parque Barigui), entre no Mossunguê pela canaleta/via rápida e pegue a Av. Mário Tourinho sentido Portão. Prossiga pela Av. Arthur Bernardes direto até a nossa oficina.",
      distance: "26.0 km",
      time: "25 min"
    };
  }
  if (norm.includes("fazenda rio grande")) {
    return {
      route: "Siga pela BR-116 (Régis Bittencourt) sentido Norte, acesse o contorno e entre no Pinheirinho via marginal da Linha Verde. Cruze o Capão Raso via Av. Winston Churchill e Av. República Argentina, e dobre à esquerda na Av. Arthur Bernardes.",
      distance: "23.4 km",
      time: "26 min"
    };
  }
  if (norm.includes("cic") || norm.includes("cidade industrial") || norm.includes("sandra") || norm.includes("verde") || norm.includes("régia")) {
    return {
      route: "Siga pela Av. Juscelino Kubitschek de Oliveira ou Av. João Bettega sentido Leste/Portão. Atravesse os cruzamentos principais da João Bettega e vire à esquerda na Av. Arthur da Silva Bernardes. Siga até o número 1323.",
      distance: "6.5 km",
      time: "11 min"
    };
  }
  if (norm.includes("água verde") || norm.includes("agua verde")) {
    return {
      route: "Estamos bem do lado! Acesse a Av. República Argentina ou a Av. Getúlio Vargas sentido Seminário/Portão, contorne pela Av. President Arthur Bernardes e pare no número 1323 para a sua instalação rápida.",
      distance: "1.9 km",
      time: "4 min"
    };
  }
  if (norm.includes("sítio cercado") || norm.includes("sitio cercado") || norm.includes("osternack")) {
    return {
      route: "Siga pela Av. Izaac Ferreira da Cruz, suba sentido Pinheirinho pela Winston Churchill, pegue a rápida sentido Centro e vire na Av. Arthur Bernardes direto até o número 1323.",
      distance: "11.2 km",
      time: "18 min"
    };
  }
  if (norm.includes("boqueirão") || norm.includes("hauer") || norm.includes("xaxim")) {
    return {
      route: "Siga pela Av. Marechal Floriano Peixoto ou Winston Churchill sentido Portão, pegue o binário da Wenceslau Braz sentido Leste e continue direto para a Av. Arthur Bernardes.",
      distance: "7.8 km",
      time: "13 min"
    };
  }
  if (norm.includes("santa felicidade") || norm.includes("orleans") || norm.includes("são braz")) {
    return {
      route: "Siga pela Av. Manoel Ribas sentido Centro, contorne no Mercês sentido Seminário via Av. Mário Tourinho, continue por ela até se tornar Av. Arthur Bernardes, siga direto até o 1323.",
      distance: "9.5 km",
      time: "14 min"
    };
  }
  if (norm.includes("cajuru") || norm.includes("uberaba") || norm.includes("capão da imbuia") || norm.includes("imbuia")) {
    return {
      route: "Acesse a Av. das Torres ou a BR-277 no sentido Centro, entre na Av. Silva Jardim, cruze a Rebouças, cruze o Batel, vire à esquerda na Av. Arthur Bernardes e siga até o número 1323.",
      distance: "9.9 km",
      time: "15 min"
    };
  }

  // Default close standard route from any Curitiba suburb
  return {
    route: "Dirija-se à Avenida Presidente Arthur da Silva Bernardes (pista dupla importante de ligação no Portão / Seminário). A Carplus se encontra no número 1323, entre as esquinas do Portão e Seminário, com fácil acesso de retorno por ambos os lados.",
    distance: "4.5 km",
    time: "8 min"
  };
}
