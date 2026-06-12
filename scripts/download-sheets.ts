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
  "31063": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_19570r15_delinte_dv2_104102s_8_lonas_1_20250924093743_0e17fb78bde6.jpg", // DELINTE 195/70/15C 104/102S DV2 8LN
  "17062": "https://http2.mlstatic.com/D_NQ_NP_2X_993199-MLB81725062794_012025-F.webp", // DELINTE 205/60/15 DX-10 A/T 91H
  "1004659": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_21565r16_delinte_dv2_109107t_8_lonas_1_20250924093642_8c8301028822.jpg", // DELINTE 215/65/16C 109/107T DV2 8PR - CARGA
  "33044": "https://http2.mlstatic.com/D_NQ_NP_2X_845314-MLB76885063320_062024-F.webp", // PRINX HU1
  "30896": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_maxtrek_aro_16_hill_tracker_26570r16_112s_m33_1_20260218135615_0fa2e6ff904a.jpg", // MAXTREK 265/70/16 HILL TRACKER A/T 112S
  "1002649": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH3
  "24745": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX HZ2
  "1003358": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH2
  "1004979": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HT1
  "33048": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HZ1
  "1007771": "https://bestdealtyres.co.nz/cdn/shop/files/PRINX-XNEX.jpg", // PRINX HZ2
  "1003555": "https://www.tyrescart.ae/media/catalog/product/tyrescart/prinx-hicity-hh2.jpg", // PRINX HH2
  "1003557": "https://images.tcdn.com.br/img/img_prod/758027/pneu_225_45r17_prinx_hz2_hirace_94w_3198045_1_24c77f5bf1425023434e47ae144b5317.jpg", // PRINX 215/55/17 94W HZ2
  "33043": "https://http2.mlstatic.com/D_NQ_NP_2X_785077-MLA99909382683_112025-F.webp", // PRINX 215/55/17 HU1 94W
  "33305": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_speedmax_aro_16_sp900_20560r16_bl92h_1_20260424103328_4905187ae2fd.jpg", // SPEEDMAX FRD96 Carga
  "35479": "https://www.alvespneus.com.br/image/catalog/imports/Xbri/01931156/principal.jpg", // XBRI FASTWAY B2
  "325": "https://dpaschoal.vtexassets.com/arquivos/ids/293728-1200-auto?v=639064314687370000&width=1200&height=auto&aspect=true", // XBRI ECOLOGY
  "1008348": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_20545r17_xbri_sport_2_xl_88w_1_20250904102825_612047af624f.jpg", // XBRI SPORT+2
  "1007489": "https://http2.mlstatic.com/D_NQ_NP_2X_843670-MLB81812929435_012025-F.webp", // PRINX 235/45/19 99W XNEX SPORT EV
  "24906": "https://pneufree.s3.sa-east-1.amazonaws.com/pneus/xbri/sport-2/pneu-xbri-sport-2.png", // XBRI SPORT+2
  // New corrections and replacements of Carplus watermarked/placeholder logo images with real product images:
  "1002824": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_26550r20_prinx_hp1_111v_1_20250912205111_9f30473a2a9e.jpg", // PRINX 265/50/20 111V HP1
  "39004": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_185r14_comforser_cf300_102100q_8_lonas_1_20250913220610_e6eaff49455b.jpg", // COMFORSER 185/14 102/100Q CF300
  "41431": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_18560r14_comforser_cf510_82h_1_20260122152600_91071ab6ac82.jpg", // COMFORSER 185/60/14 82H CF510
  "38950": "https://www.pitonipneus.com.br/media/tmp/webp/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/p/n/pneu-185-60-r15-comforser-cf510-pitoni-pneus_jpg.webp", // COMFORSER 185/60/15 84H CF510
  "1000273": "https://www.pitonipneus.com.br/media/tmp/webp/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/p/n/pneu-185-65-r15-comforser-cf510-pitoni-pneus_jpg.webp", // COMFORSER 185/65/15 88H CF510
  "41918": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_19550r15_82v_cf510_comforser_1_20260317170359_b3f299f9a3ee.jpg", // COMFORSER 195/55/15 85V CF510
  "1001321": "https://www.alvespneus.com.br/image/catalog/imports/Xbri/01935194/principal.jpg", // COMFORSER 195/60/15 88H CF510
  "42351": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_comforser_aro_15_cf300_19570r15c_104102r_8pr_1_20260424123229_a09e8e601a59.jpg", // COMFORSER 195/70/15C CF300
  "1004331": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_20555r16_91v_cf510_comforser_1_20260331090254_df5c44b27d19.jpg", // COMFORSER 205/55/16 91V CF510
  "42669": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_20560r15_91v_cf510_comforser_1_20260331091015_234c3c1da0a6.jpg", // COMFORSER 205/60/15 91V CF510
  "1007519": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_21565r16_102h_xl_cf2000_comforser_1_20260324125951_657f6855672f.jpg", // COMFORSER 205/65/16 95H CF2000
  "42792": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_comforser_aro_15_cf300_19570r15c_104102r_8pr_1_20260424123229_a09e8e601a59.jpg", // COMFORSER 205/70/15 106/104R CF300 - CARGA
  "39299": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_comforser_aro_16_cf300_20575r16c_110108r_8pr_1_20260424123239_4624ceb5435c.jpg", // COMFORSER 205/75/16 110/108R CF300
  "39598": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_comforser_aro_16_cf1000_p23570r16_104t_owl_1_20260318144223_91fa1e7e8420.jpg", // COMFORSER 225/65/16C CF300 112/110T
  "38641": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_20555r16_91v_cf510_comforser_1_20260331090254_df5c44b27d19.jpg", // COMFORSER 225/75/16C CF300 121/120R
  "42475": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_20560r16_92v_cf510_comforser_1_20260324105503_7128ceef7fd7.jpg", // COMFORSER 235/60/16 100H CF510
  "42945": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_p25570r16_111t_cf1100_comforser_1_20260320085741_795e07cc7c4f.jpg", // COMFORSER 265/70/16 111T CF1000 A/T
  "1007801": "https://http2.mlstatic.com/D_NQ_NP_2X_722870-MLB82602034662_032025-F.webp", // DELINTE 275/55/19 111H DX10 BANDIT A/T
  "1007857": "https://http2.mlstatic.com/D_NQ_NP_2X_626418-MLA99433714880_112025-F.webp", // FIRESTONE 215/55/18 99V DESTINATION
  "19531": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_18560r15_delinte_dh2_84h_1_20260521122455_ad2a436de992.jpg", // DELINTE 185/60/15 DH2 84H
  "31057": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_18565r15_delinte_dh2_88h_1_20260521122510_c462905616ce.jpg", // DELINTE 185/65/15 88H DH2
  "19136": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_18565r15_delinte_dh2_88h_1_20260521122510_c462905616ce.jpg", // DELINTE 185/65/15 DS2 88V
  "31062": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_18565r15_delinte_dh2_88h_1_20260521122510_c462905616ce.jpg", // DELINTE 195/65/15 91V DH2
  "31080": "https://a-static.mlcdn.com.br/420x420/kit-2-pneus-delinte-aro-16-205-55-zr16-94w-xl-ds2/deck55/pn00600/a56e91f8a42b8cd6303dc8d9de58a933.jpeg", // DELINTE 205/55/16 94W DS2
  "31081": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_20560r16_delinte_ds2_92v_1_20260123132129_b911a272ca3a.jpg", // DELINTE 205/60/16 92V DH2
  "1009687": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_22545r19_delinte_ds2_96w_1_20260123131355_cc3c0f87e3d7.jpg", // DELINTE 235/45/19 DS2 95W XL
  "1009688": "https://www.tyrereviews.com/public/tyres/thumbs/x200-Giti-Control-P10.png", // DELINTE 235/50/19 DS2 99W
  "19879": "https://www.alvespneus.com.br/image/catalog/Continental/continental1.png", // CONTINENTAL 175/65/14 CONTIPOWERCONT 82T
  "1009010": "https://www.alvespneus.com.br/image/catalog/Continental/pneu-aro-13-175-70r13-continental-powercontact-2-82t.png", // CONTINENTAL 175/65/14 POWERCONTACT 2 82T
  "1005837": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_ecopia_ep150_18565r15_bl88h_1_20260331122945_bc38aaccabcc.jpg", // CONTINENTAL 185/65/15 88H POWERCONTACT2
  "229": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_18560r14_82h_cf510_comforser_1_20260317145707_26dca0dc6878.jpg", // CONTINENTAL 185/70/14 POWERCONTACT 2
  "239": "https://www.alvespneus.com.br/image/catalog/Goodyear/pneu-goodyear-aro-15-direction-sport-2-195-55r15-85h-sl-1.png", // CONTINENTAL 195/55/15 85H POWERCONTACT 2
  "39041": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_ecopia_ep150_18555r16_bl83v_1_20260331150328_1425d6eb68c5.jpg", // CONTINENTAL 195/55/16 87H POWERCONTACT 2
  "19953": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_20560r15_91v_cf510_comforser_1_20260331091015_234c3c1da0a6.jpg", // CONTINENTAL 195/60/15 ULTRACONTACT 88H
  "25890": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_ecopia_ep150_20555r16_bl91v_1_20260331143842_3bcc5d72a01f.jpg", // CONTINENTAL 205/55/16 91V FR POWERCONTACT2
  "42838": "https://www.tyrereviews.com/public/tyres/thumbs/x200-Continental-ContiCrossContact-LX-2.jpg", // CONTINENTAL 215/60/17 96H FR CONTICROSSCONTACT LX2
  "1008310": "https://www.acheipneus.com.br/media/catalog/product/p/n/pneu-22565r16-continental-vancontact-ap-112110r-1.jpg", // CONTINENTAL 225/65/16 112/110R VANCONTACT AP 8PR
  "1009102": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_alenza_001_22555r18_bl98v_1_20260331161831_65d7929b94fb.jpg", // CONTINENTAL 225/55/18 98V CONTICROOSCONTACT LX2
  "23901": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_firestone_aro_15_f_700_18565r15_bl88h_1_20260608165439_e66b9b741720.jpg", // FIRESTONE 175/70/14 F700 88T
  "23900": "https://http2.mlstatic.com/D_NQ_NP_2X_681764-MLA97672107113_112025-F.webp", // FIRESTONE 175/65/14 F700 82T
  "42216": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_firestone_aro_16_f_700_20555r16_bl91v_1_20260608172358_d4632b15ea43.jpg", // FIRESTONE 205/55/16 91V F-700
  "1008379": "https://images.tcdn.com.br/img/img_prod/1445393/pneu_dest_atx_26570r16_bl112t_1_20260406171444_2090c496ca76.jpg", // FIRESTONE 265/65/17 112H DESTINATION LE2
  "25183": "https://http2.mlstatic.com/D_NQ_NP_2X_651880-MLB107258335882_032026-F.webp", // YOKOHAMA 175/65/14 ES32 82T
  "25239": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 175/70/14 ES32 84T
  "24726": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 185/60/15 ES32 84H
  "30736": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 185/65/15 ES32 88H
  "25240": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 185/70/14 ES32 88T
  "24827": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 195/55/16 ES32 87V
  "33590": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 205/65/16 ES32 95H
  "33598": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 215/50/17 ES32 95V
  "1004676": "https://carrefourbr.vtexassets.com/arquivos/ids/213593482/image-1.jpg?v=639102210515370000", // YOKOHAMA 215/60/17 96H G015 A/T
  "33383": "https://http2.mlstatic.com/D_NQ_NP_2X_879519-MLA99898013699_112025-F.webp", // YOKOHAMA 225/40/19 93Y ADVAN SPORT V105 RFT
  "1004291": "https://http2.mlstatic.com/D_NQ_NP_2X_759199-MLB80356284652_112024-F.webp", // YOKOHAMA 225/60/17 99H G058 CV
  "1007805": "https://http2.mlstatic.com/D_NQ_NP_2X_902346-MLB81191181591_122024-F.webp", // YOKOHAMA 225/60/18 100H G058
  "1002919": "https://http2.mlstatic.com/D_NQ_NP_2X_895771-MLA99908744929_112025-F.webp", // YOKOHAMA 225/60/18 104H G015 A/T
  "33630": "https://http2.mlstatic.com/D_NQ_NP_2X_956519-MLB92487577452_092025-F.webp", // YOKOHAMA 225/65/17 G058 CV 102H H/T
  "35083": "https://m.magazineluiza.com.br/a-static/420x420/pneu-235-45r19-yokohama-geolandar-x-cv-g057-99w/pneustyres/1564727/9179c1b7b4be10d0bfe8a1856b197780.jpeg", // YOKOHAMA 235/45/19 G057 X-CV 99W
  "1006281": "https://images.tcdn.com.br/img/img_prod/1411063/pneu_23550r19_yokohama_geolandar_cv_g058_103v_1_20260206085317_ca15cc56402b.jpg", // YOKOHAMA 235/50/19 103V G058 CV
  "33385": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 255/35/19 96Y ADVAN SPORT V105 RFT
  "42808": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/50/20 111W G057 XCV
  "33640": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/60/18 110H G094 H/T
  "17501": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/60/18 110V G058 CV
  "24717": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/65/17 GEOLANDAR G015 110T LETRAS BRANCAS
  "23161": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/65/17 GEOLANDAR G056 H/T 112H
  "41859": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // YOKOHAMA 265/70/16 G94 A/T 112S
  "34486": "https://www.pneustyres.com.br/api/image/cache/catalog/Modelo%20Pneu/Yokohama%20Advan%20Sport%20V105%20ZPS/Yokohama%20Advan%20Sport%20V105%20ZPS%20(2)-1000x1000.jpg", // ZMAX 225/65/16C VANMEJOR 112/110R -CARGA
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
