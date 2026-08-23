import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Tag, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Share2, 
  MessageCircle,
  Wrench,
  ChevronUp
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost, getBlogPostBySlug, getRelatedBlogPosts } from '../blog-data';
import { CATALOGO_PNEUS } from '../data/catalogo-pneus';
import CatalogTireCard from './CatalogTireCard';
import { CatalogTire } from '../types';
import { Sparkles } from 'lucide-react';

interface BlogViewProps {
  currentSlug?: string | null;
  onNavigateBlog: (slug?: string) => void;
  onNavigateHome: () => void;
  onNavigateUrl?: (url: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  currentSlug,
  onNavigateBlog,
  onNavigateHome,
  onNavigateUrl
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // If a slug is passed, locate the article
  const currentPost = useMemo(() => {
    if (!currentSlug) return null;
    return getBlogPostBySlug(currentSlug);
  }, [currentSlug]);

  const handleSelectCatalogTire = (tire: CatalogTire) => {
    if (onNavigateUrl) {
      onNavigateUrl(`/pneu/${tire.slug}`);
    } else {
      window.history.pushState(null, '', `/pneu/${tire.slug}`);
      window.dispatchEvent(new Event('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Find tires referenced or relevant to this article from official catalog
  const matchingCatalogTires = useMemo(() => {
    if (!currentPost) return [];
    if (currentPost.slug === 'pneus-para-carro-eletrico-em-curitiba') {
      return CATALOGO_PNEUS.filter(t => 
        t.nome.toLowerCase().includes('ev') || 
        t.categoria.toLowerCase().includes('elétr') ||
        t.medida === '175/55R16' ||
        t.medida === '195/60R16' ||
        t.medida === '205/50R17' ||
        t.medida === '215/55R17' ||
        t.medida === '235/50R19'
      ).slice(0, 4);
    }
    if (currentPost.slug === 'como-escolher-rodas-carro') {
      return CATALOGO_PNEUS.filter(t => t.aro >= 17 && (t.destaque || t.novoModelo)).slice(0, 4);
    }
    if (
      currentPost.slug === 'pneu-desgastando-de-um-lado' || 
      currentPost.slug === 'carro-puxando-para-o-lado' || 
      currentPost.slug === 'quando-fazer-alinhamento-balanceamento' ||
      currentPost.slug === 'volante-vibrando-causas'
    ) {
      return CATALOGO_PNEUS.filter(t => 
        t.medida === '175/65R14' || 
        t.medida === '185/60R15' || 
        t.medida === '205/55R16' || 
        t.medida === '215/50R17'
      ).slice(0, 4);
    }
    if (currentPost.slug === 'revisao-carro-antes-de-viajar') {
      return CATALOGO_PNEUS.filter(t => 
        t.categoria.toLowerCase().includes('suv') || 
        t.medida === '205/55R16' || 
        t.medida === '215/65R16' || 
        t.medida === '225/65R17'
      ).slice(0, 4);
    }
    return CATALOGO_PNEUS.filter(t => t.destaque).slice(0, 4);
  }, [currentPost]);

  // Filter posts for the list view
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Related posts for current article
  const relatedPosts = useMemo(() => {
    if (!currentPost) return [];
    return getRelatedBlogPosts(currentPost);
  }, [currentPost]);

  const handleWhatsApp = (customMessage?: string) => {
    const defaultMsg = 'Olá Carplus! Estava lendo o Blog e gostaria de tirar uma dúvida sobre manutenção.';
    const message = customMessage || defaultMsg;
    const url = `https://wa.me/5541997380064?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: `https://www.carpluscwb.com.br/blog/${post.slug}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`https://www.carpluscwb.com.br/blog/${post.slug}`);
      alert('Link do artigo copiado para a área de transferência!');
    }
  };

  // ----------------------------------------------------
  // ARTICLE DETAIL VIEW
  // ----------------------------------------------------
  if (currentPost) {
    return (
      <article id={`blog-post-${currentPost.slug}`} className="min-h-screen bg-slate-50 text-slate-900 pb-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
              <li>
                <button 
                  onClick={onNavigateHome}
                  className="hover:text-amber-600 transition-colors font-medium cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline" />
              </li>
              <li>
                <button 
                  onClick={() => onNavigateBlog()}
                  className="hover:text-amber-600 transition-colors font-medium cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline" />
              </li>
              <li className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
                {currentPost.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Article Header & Main Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => onNavigateBlog()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para todos os artigos
            </button>
          </div>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              {currentPost.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              Publicado em {currentPost.publishedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4 text-slate-400" />
              {currentPost.readingTime}
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {currentPost.h1}
          </h1>

          {/* Summary Lead */}
          <div className="p-4 sm:p-5 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl mb-8 text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
            {currentPost.summary}
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-md bg-slate-200 border border-slate-200">
            <img
              src={currentPost.featuredImage}
              alt={currentPost.imageAlt}
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
            />
            <div className="bg-white px-4 py-2 text-xs text-slate-500 italic border-t border-slate-100">
              {currentPost.imageAlt}
            </div>
          </div>

          {/* Article Body Content */}
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xs border border-slate-200 space-y-8">
            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {currentPost.intro}
            </p>

            {/* Structured Sections */}
            {currentPost.sections.map((section, idx) => (
              <section key={idx} className="pt-2 border-t border-slate-100 first:border-0 first:pt-0 space-y-4">
                {section.title && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
                    {section.title}
                  </h2>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base text-slate-700 leading-relaxed">
                    {para}
                  </p>
                ))}

                {section.listItems && section.listItems.length > 0 && (
                  <ul className="space-y-2.5 my-3 pl-2">
                    {section.listItems.map((item, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Callout Box */}
                {section.callout && (
                  <div className={`p-4 sm:p-5 rounded-xl border my-4 flex items-start gap-3.5 ${
                    section.callout.type === 'warning' 
                      ? 'bg-red-50 border-red-200 text-red-900' 
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}>
                    {section.callout.type === 'warning' && <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
                    {section.callout.type === 'tip' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                    {section.callout.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base mb-1">{section.callout.title}</h4>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-90">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* Contextual Internal Links */}
                {section.internalLinks && section.internalLinks.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                    {section.internalLinks.map((link, linkIdx) => (
                      <div
                        key={linkIdx}
                        onClick={() => {
                          if (link.url.startsWith('/blog/')) {
                            const targetSlug = link.url.replace('/blog/', '').replace(/\/$/, '');
                            onNavigateBlog(targetSlug);
                          } else if (onNavigateUrl) {
                            onNavigateUrl(link.url);
                          }
                        }}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-1">
                            <Wrench className="w-3.5 h-3.5" />
                            Serviço Recomendado
                          </div>
                          <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                            {link.text}
                          </span>
                          {link.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {link.description}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Ver detalhes <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Interactive FAQ Section */}
            {currentPost.faqs && currentPost.faqs.length > 0 && (
              <section className="pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Perguntas Frequentes sobre {currentPost.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentPost.faqs.map((faq, fIdx) => {
                    const isExpanded = expandedFaqIndex === fIdx;
                    return (
                      <div 
                        key={fIdx} 
                        className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer text-sm sm:text-base"
                          aria-expanded={isExpanded}
                        >
                          <span>{faq.question}</span>
                          <span className="shrink-0 text-slate-500">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5" />}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="p-4 sm:p-5 pt-0 text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* E-E-A-T Editorial Disclaimer Block */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Conteúdo revisado pela equipe técnica da Carplus Pneus e Oficina Mecânica
              </div>
              <p className="leading-relaxed">
                Este artigo tem finalidade exclusivamente educativa e informativa. A identificação precisa de anomalias mecânicas, folgas de suspensão e a segurança do seu veículo dependem de uma inspeção presencial detalhada realizada por profissionais qualificados com ferramentas adequadas.
              </p>
            </div>

            {/* Local Business Reference */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-amber-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Carplus Pneus e Oficina Mecânica — Portão, Curitiba
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Av. Presidente Arthur da Silva Bernardes, 1323 • Portão • Curitiba - PR
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Atendimento de Segunda a Sexta das 08h às 18h e Sábados das 08h às 12h
                </p>
              </div>
              <a
                href="tel:4130827282"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shrink-0 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                (41) 3082-7282
              </a>
            </div>

            {/* Catalog Tires Referenced & Recommended */}
            {matchingCatalogTires.length > 0 && (
              <section className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 border border-yellow-500/30 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#f49e1a]/20 border border-[#f49e1a]/40 text-[#f49e1a] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3" />
                      Catálogo Oficial Carplus • 1.962 Modelos
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                      Pneus Citados no Conteúdo & Pronta Entrega
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigateUrl ? onNavigateUrl('/pneus') : onNavigateHome()}
                    className="text-xs font-bold text-[#f49e1a] hover:text-white flex items-center gap-1 transition"
                  >
                    <span>Ver catálogo completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchingCatalogTires.map((tire) => (
                    <CatalogTireCard
                      key={tire.id}
                      tire={tire}
                      onSelect={handleSelectCatalogTire}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Dynamic CTA Block */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl text-white shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  {currentPost.ctaTitle || 'Precisa avaliar seu veículo em Curitiba?'}
                </h3>
                <p className="text-sm sm:text-base text-slate-900 max-w-xl font-medium">
                  {currentPost.ctaText || 'Se você identificou algum desses sinais, uma inspeção técnica na Carplus pode ajudar a encontrar a origem do problema.'}
                </p>
              </div>
              <button
                onClick={() => handleWhatsApp(currentPost.whatsappMessage)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                {currentPost.ctaButtonText || 'SOLICITAR ORÇAMENTO'}
              </button>
            </div>

            {/* Social Share & Back */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={() => onNavigateBlog()}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver todos os artigos do blog
              </button>
              <button
                onClick={() => handleShare(currentPost)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar artigo
              </button>
            </div>
          </div>

          {/* Related Articles Carousel / Grid */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Artigos Relacionados
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <div
                    key={post.id}
                    onClick={() => onNavigateBlog(post.slug)}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <img
                          src={post.featuredImage}
                          alt={post.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 mt-2">
                      <span>{post.readingTime}</span>
                      <span className="font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Ler <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // ----------------------------------------------------
  // MAIN BLOG LIST VIEW (/blog/)
  // ----------------------------------------------------
  return (
    <div id="carplus-blog-main" className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
            <li>
              <button 
                onClick={onNavigateHome}
                className="hover:text-amber-600 transition-colors font-medium cursor-pointer"
              >
                Início
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline" />
            </li>
            <li className="text-slate-900 font-semibold">
              Blog Automotivo
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Header / Banner */}
      <header className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Conteúdo Especializado Carplus
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Dicas de Manutenção Automotiva em Curitiba
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Informação para cuidar melhor do seu carro. Confira orientações sobre pneus, suspensão, freios, alinhamento, revisão preventiva e manutenção automotiva preparadas pela Carplus Pneus e Oficina Mecânica, no bairro Portão, em Curitiba.
            </p>
          </div>

          {/* Search bar & Category chips */}
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por assunto (ex: suspensão, barulho, alinhamento)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('Todas')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === 'Todas'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todas ({BLOG_POSTS.length})
              </button>
              {BLOG_CATEGORIES.map(cat => {
                const count = BLOG_POSTS.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Grid of Articles: 3 columns desktop / 1 mobile */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum artigo encontrado</h3>
            <p className="text-sm text-slate-500 mt-1">
              Tente buscar por outro termo ou selecione uma categoria diferente.
            </p>
            <button
              onClick={() => { setSelectedCategory('Todas'); setSearchTerm(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-600 cursor-pointer"
            >
              Ver todos os artigos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => onNavigateBlog(post.slug)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={post.featuredImage}
                      alt={post.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-xs text-amber-400 text-xs font-bold border border-slate-800">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Carplus Oficina
                  </span>
                  <button 
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 group-hover:text-amber-700 transition-colors"
                  >
                    Ler matéria completa
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Local SEO & Services Banner */}
        <section className="mt-16 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                Oficina Mecânica e Auto Center em Curitiba
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Carplus Pneus e Oficina Mecânica — Bairro Portão
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Além de conteúdo informativo, nossa equipe está pronta para receber seu veículo com equipamentos modernos de alinhamento 3D, balanceamento, troca de pneus, diagnóstico de suspensão, freios e troca de óleo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => handleWhatsApp('Olá! Gostaria de tirar uma dúvida mecânica ou agendar um serviço na Carplus Portão.')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                Falar no WhatsApp
              </button>
              <a
                href="tel:4130827282"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                (41) 3082-7282
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogView;
