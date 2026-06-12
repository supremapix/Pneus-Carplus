import React from 'react';

const VIDEOS = [
  {
    id: "E7ixIfYP2xs",
    title: "Pneus Pluscar",
    desc: "Confira a rapidez operacional e a precisão do alinhamento 3D realizado em nossa estrutura integrada."
  },
  {
    id: "1fWqUJdCdRg",
    title: "Carplus Borracharia",
    desc: "Veja como funciona o balanceamento dinâmico a laser e a montagem tática de pneus Goodyear, Pirelli e Michelin."
  },
  {
    id: "4FpPSM5vYE8",
    title: "Carplus Borracharia Portão",
    desc: "Tour completo por nossa autocenter na Av. Arthur Bernardes em Curitiba. Boxes amplos, rampa de geometria e atendimento premium."
  }
];

export default function CarplusVideosSection() {
  return (
    <div className="bg-neutral-900 border-2 border-[#f49e1a]/25 rounded-3xl p-6 sm:p-8 space-y-6 text-white my-8 select-none" id="carplus-videos-gallery">
      <div className="text-center sm:text-left space-y-1">
        <span className="bg-[#f49e1a] text-black font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block">
          Carplus em Vídeo • Verificação 100% Real
        </span>
        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight pt-1">
          Nossa Oficina & Atendimento em Ação (9:16 Shorts)
        </h3>
        <p className="text-xs text-gray-300 max-w-2xl leading-relaxed text-justify sm:text-left">
          Assista pelas lentes reais de nossos clientes a infraestrutura, equipamentos 3D e rigor técnico de montagem e balanceamento de pneus em Curitiba. Transparência de ponta a ponta.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {VIDEOS.map((vid, idx) => (
          <div 
            key={vid.id + "-" + idx} 
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-[#f49e1a]/40 transition duration-300 shadow-lg group hover:shadow-2xl"
          >
            <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow">
              <iframe
                src={`https://www.youtube.com/embed/${vid.id}?autoplay=0&mute=1&rel=0`}
                title={vid.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
            <div className="mt-4 text-center sm:text-left">
              <span className="bg-[#f49e1a]/20 text-[#f49e1a] font-mono font-black text-[9px] uppercase px-2 py-0.5 rounded border border-[#f49e1a]/20">
                Shorts {idx + 1}
              </span>
              <h4 className="text-sm font-black uppercase tracking-tight text-white mt-1.5 leading-none group-hover:text-[#f49e1a] transition">
                {vid.title}
              </h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed text-justify">
                {vid.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
