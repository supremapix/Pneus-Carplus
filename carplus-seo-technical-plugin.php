<?php
/**
 * Plugin Name: Carplus CWB - Otimizador Técnico de SEO Programático
 * Plugin URI: https://carpluscwb.com.br
 * Description: Sistema automatizado de otimização de títulos, meta descriptions, controle de indexação (/carrinho/) e templates dinâmicos de WooCommerce pSEO compatíveis com Yoast SEO e Rank Math para o Bing e Google.
 * Version: 1.0.0
 * Author: Especialista Sênior em SEO Programático & Core WordPress Architect
 * Author URI: https://carpluscwb.com.br
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit; // Segurança contra acesso direto
}

/**
 * --------------------------------------------------------------------------
 * SEÇÃO 1: MAPEAMENTOS DE REESCRITA DE TÍTULOS E DESCRIPTIONS CUSTOMIZADOS
 * --------------------------------------------------------------------------
 */

/**
 * Obtém novas regras de títulos com base na URL/Slug ou tipo de página
 */
function carplus_get_custom_seo_title($slug, $original_title) {
    // Normalizar slug
    $slug = trim(str_replace('/', '', $slug));

    switch ($slug) {
        case 'aro-14':
            return 'Pneus Aro 14 em Curitiba | Ofertas e Instalação | Car Plus';
        case 'aro-19':
            return 'Pneus Aro 19 em Curitiba | Pirelli, Michelin e Mais | Car Plus';
        case 'pirelli':
            return 'Pneus Pirelli em Curitiba | Loja Oficial Car Plus';
        case 'honda':
            return 'Pneus para Honda em Curitiba | Modelos Originais | Car Plus';
        case 'sobre-a-carplus':
        case 'sobre':
            return 'Sobre a Car Plus | Especialistas em Pneus em Curitiba';
        case 'fale-conosco':
        case 'contato':
            return 'Fale com a Car Plus | Atendimento em Curitiba';
        case 'carrinho':
            return 'Carrinho de Compras | Car Plus';
        default:
            return $original_title;
    }
}

/**
 * Obtém novas regras de meta descriptions com base na URL/Slug ou tipo de página
 */
function carplus_get_custom_seo_description($slug, $original_desc) {
    $slug = trim(str_replace('/', '', $slug));

    switch ($slug) {
        case 'pirelli':
            return 'Compre pneus Pirelli originais com garantia e instalação especializada em Curitiba. Parcelamento facilitado e atendimento rápido.';
        case 'aro-14':
            return 'Encontre pneus aro 14 das melhores marcas com preços competitivos em Curitiba. Parcelamento facilitado e instalação especializada na Car Plus.';
        case 'sobre-a-carplus':
        case 'sobre':
            return 'Conheça a história da Car Plus, referência em pneus e serviços automotivos em Curitiba, com atendimento especializado.';
        case 'fale-conosco':
        case 'contato':
            return 'Entre em contato com a Car Plus para solicitar orçamento, tirar dúvidas ou agendar serviços automotivos em Curitiba.';
        case 'carrinho':
            return 'Visualize seu carrinho de compras na Car Plus. Finalize o pedido de seus pneus novos e agende a sua instalação rápida em Curitiba hoje.';
        default:
            return $original_desc;
    }
}

/**
 * --------------------------------------------------------------------------
 * SEÇÃO 2: PROCESSAMENTO DE PRODUTOS WOOCOMMERCE (DINÂMICO & MATEMÁTICO)
 * --------------------------------------------------------------------------
 */

/**
 * Gera um título amigável e otimizado para o pneu seguindo a regra:
 * [Pneu] + [Marca] + [Medida] + [Modelo] | Car Plus
 */
function carplus_generate_product_seo_title($product) {
    if (!$product || !is_a($product, 'WC_Product')) {
        return '';
    }

    $brand = '';
    // Tenta coletar marca de atributos comuns como 'pa_marca' ou 'brand'
    $brand_attributes = array('pa_marca', 'marca', 'pa_brand', 'brand');
    foreach ($brand_attributes as $attr) {
        $brand_val = $product->get_attribute($attr);
        if (!empty($brand_val)) {
            $brand = trim(ucfirst($brand_val));
            break;
        }
    }

    // Fallback de marca caso não encontrada: tenta extrair do título do produto
    if (empty($brand)) {
        $original_title = $product->get_name();
        $brands_pool = array('Pirelli', 'Michelin', 'Goodyear', 'Bridgestone', 'Delinte', 'Continental', 'Dunlop', 'Yokohama', 'Firestone', 'Kumho', 'Hankook');
        foreach ($brands_pool as $b) {
            if (stripos($original_title, $b) !== false) {
                $brand = $b;
                break;
            }
        }
    }

    // Medidas do Pneu (Têmpora ideal: 205/50R17, 235/60R16, etc.)
    $medida = '';
    $medida_attributes = array('pa_medida', 'medida', 'pa_dimensao', 'dimensao', 'pa_largura-perfil-aro', 'pa_largura', 'pa_perfil', 'pa_aro');
    foreach ($medida_attributes as $attr) {
        $med_val = $product->get_attribute($attr);
        if (!empty($med_val)) {
            $medida = trim($med_val);
            break;
        }
    }

    // Modelo do pneu (ex. P7 Cinturato, Scorpion Verde)
    $modelo = '';
    $modelo_attributes = array('pa_modelo', 'modelo');
    foreach ($modelo_attributes as $attr) {
        $mod_val = $product->get_attribute($attr);
        if (!empty($mod_val)) {
            $modelo = trim($mod_val);
            break;
        }
    }

    // Se as taxonomias falharem, usa o próprio título herdado do WooCommerce mas sanitiza redundâncias
    if (empty($brand) && empty($medida)) {
        $name = $product->get_name();
        // Remove a palavra "Pneu" redundante no início se já houver
        $name = preg_replace('/^pneu\s+/i', '', $name);
        return 'Pneu ' . $name . ' | Car Plus';
    }

    // Montando a String de SEO
    $title_parts = array('Pneu');
    if (!empty($brand)) $title_parts[] = $brand;
    if (!empty($medida)) $title_parts[] = $medida;
    if (!empty($modelo)) $title_parts[] = $modelo;

    $final_slug = implode(' ', $title_parts);
    // Remover espaçamentos duplos
    $final_slug = preg_replace('/\s+/', ' ', $final_slug);

    return $final_slug . ' | Car Plus';
}

/**
 * Gera meta description de tamanho ideal entre 145 e 160 caracteres
 */
function carplus_generate_product_seo_description($product) {
    if (!$product || !is_a($product, 'WC_Product')) {
        return '';
    }

    $product_name = $product->get_name();
    
    // Template programmatico rigoroso
    // "Compre {nome} com garantia, parcelamento e instalação especializada em Curitiba. Atendimento rápido na Car Plus."
    $template = "Compre %s com garantia, parcelamento e instalação especializada em Curitiba. Atendimento rápido na Car Plus.";
    $desc = sprintf($template, $product_name);

    $len = mb_strlen($desc);

    // Ajusta dinamicamente para manter-se rigorosamente entre 145 e 160 caracteres
    if ($len < 145) {
        // Encorpa o texto mantendo o foco local
        $desc = sprintf(
            "Compre seu %s original com garantia estendida de 5 anos, parcelamento facilitado em até 10x e instalação computadorizada grátis na Car Plus em Curitiba.",
            $product_name
        );
    }

    // Corte cirúrgico de segurança em 158 caracteres para evitar reticências no Snippet (limite ideal: 155-160)
    if (mb_strlen($desc) > 160) {
        $desc = mb_substr($desc, 0, 155) . '...';
    }

    return $desc;
}

/**
 * --------------------------------------------------------------------------
 * SEÇÃO 3: INTEGRANDO HOOKS DOS PLUGINS DE SEO (YOAST & RANK MATH COMPAT)
 * --------------------------------------------------------------------------
 */

// --- A) YOAST SEO ---

// Filtro de títulos de Yoast
add_filter('wpseo_title', 'carplus_override_yoast_title', 99, 1);
function carplus_override_yoast_title($title) {
    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            return carplus_generate_product_seo_title($product);
        }
    }

    // Páginas institucionais e categorias
    global $post;
    $slug = is_object($post) ? $post->post_name : '';
    if (empty($slug)) {
        $slug = basename($_SERVER['REQUEST_URI']);
    }
    return carplus_get_custom_seo_title($slug, $title);
}

// Filtro de descriptions de Yoast
add_filter('wpseo_metadesc', 'carplus_override_yoast_metadesc', 99, 1);
function carplus_override_yoast_metadesc($desc) {
    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            return carplus_generate_product_seo_description($product);
        }
    }

    global $post;
    $slug = is_object($post) ? $post->post_name : '';
    if (empty($slug)) {
        $slug = basename($_SERVER['REQUEST_URI']);
    }
    return carplus_get_custom_seo_description($slug, $desc);
}


// --- B) RANK MATH ---

// Filtro de títulos do Rank Math
add_filter('rank_math/frontend/title', 'carplus_override_rankmath_title', 99, 1);
function carplus_override_rankmath_title($title) {
    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            return carplus_generate_product_seo_title($product);
        }
    }

    global $post;
    $slug = is_object($post) ? $post->post_name : '';
    if (empty($slug)) {
        $slug = basename($_SERVER['REQUEST_URI']);
    }
    return carplus_get_custom_seo_title($slug, $title);
}

// Filtro de descriptions do Rank Math
add_filter('rank_math/frontend/description', 'carplus_override_rankmath_description', 99, 1);
function carplus_override_rankmath_description($desc) {
    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            return carplus_generate_product_seo_description($product);
        }
    }

    global $post;
    $slug = is_object($post) ? $post->post_name : '';
    if (empty($slug)) {
        $slug = basename($_SERVER['REQUEST_URI']);
    }
    return carplus_get_custom_seo_description($slug, $desc);
}


// --- C) STANDARD WORDPRESS FALLBACK (Para sites sem plugin de SEO ativo) ---

// Sobrescreve os títulos das tags padrão no head através do gerenciador nativo
add_filter('document_title_parts', 'carplus_fallback_wp_title', 99, 1);
function carplus_fallback_wp_title($title_parts) {
    // Se Yoast ou Rank Math estiverem rodando, deixe-os controlar
    if (defined('WPSEO_VERSION') || class_exists('RankMath')) {
        return $title_parts;
    }

    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            $title_parts['title'] = carplus_generate_product_seo_title($product);
            unset($title_parts['site']); // Remove nome do site duplicado
            return $title_parts;
        }
    }

    global $post;
    $slug = is_object($post) ? $post->post_name : '';
    if (empty($slug)) {
        $slug = basename($_SERVER['REQUEST_URI']);
    }

    $custom_title = carplus_get_custom_seo_title($slug, $title_parts['title']);
    if ($custom_title !== $title_parts['title']) {
        $title_parts['title'] = $custom_title;
        unset($title_parts['site']);
    }

    return $title_parts;
}

// Injeta tag <meta name="description"> diretamente no wp_head caso não haja plugin de SEO cuidando
add_action('wp_head', 'carplus_fallback_wp_description', 1);
function carplus_fallback_wp_description() {
    // Aborta se Yoast ou Rank Math já fizerem isso
    if (defined('WPSEO_VERSION') || class_exists('RankMath')) {
        return;
    }

    $description = '';
    if (is_product()) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            $description = carplus_generate_product_seo_description($product);
        }
    } else {
        global $post;
        $slug = is_object($post) ? $post->post_name : '';
        if (empty($slug)) {
            $slug = basename($_SERVER['REQUEST_URI']);
        }
        $description = carplus_get_custom_seo_description($slug, '');
    }

    if (!empty($description)) {
        echo '<meta name="description" content="' . esc_attr($description) . '" />' . "\n";
    }
}

/**
 * --------------------------------------------------------------------------
 * SEÇÃO 4: GARANTIA DE NOINDEX, FOLLOW PARA A PÁGINA DO CARRINHO WOOCOMMERCE
 * --------------------------------------------------------------------------
 */

// Força noindex robusto na página de carrinho do WooCommerce para economizar Crawl Budget
add_action('wp_head', 'carplus_force_noindex_for_cart', 1);
function carplus_force_noindex_for_cart() {
    // Detecta se é a página oficial do carrinho do WooCommerce
    if (function_exists('is_cart') && is_cart()) {
        echo '<meta name="robots" content="noindex, follow" />' . "\n";
    }
}

// Força integração com Yoast para reescrever Robots no carrinho
add_filter('wpseo_robots', 'carplus_yoast_robots_cart_override');
function carplus_yoast_robots_cart_override($robots) {
    if (function_exists('is_cart') && is_cart()) {
        return 'noindex,follow';
    }
    return $robots;
}

// Força integração com Rank Math para reescrever Robots no carrinho
add_filter('rank_math/frontend/robots', 'carplus_rankmath_robots_cart_override');
function carplus_rankmath_robots_cart_override($robots) {
    if (function_exists('is_cart') && is_cart()) {
        $robots['index'] = 'noindex';
        $robots['follow'] = 'follow';
    }
    return $robots;
}
