import React from 'react';
import { Sparkles, ArrowRight, Heart, Clock, MapPin, Award } from 'lucide-react';

export const Hero = ({ settings }) => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustom = () => {
    const el = document.getElementById('personalizados');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#FAF7F2] pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-[#1C1917]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Etiqueta superior */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-[#B89855]/40"></div>
          <span className="text-[#B89855] text-xs tracking-[0.3em] uppercase font-medium">
            By {settings?.ownerName || 'Melisa Leyes'}
          </span>
          <div className="h-[1px] w-12 bg-[#B89855]/40"></div>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-[#1C1917] leading-tight mb-6">
          El arte de la repostería <br className="hidden md:block" />
          fina en <span className="text-[#B89855] italic">La Plata</span>
        </h1>

        {/* Subtítulo */}
        <p className="max-w-2xl mx-auto text-[#1C1917]/70 text-base sm:text-lg mb-12 font-light px-4">
          Tortas de autor, tartas clásicas, boxes de regalo y delicias dulces horneadas a pedido con ingredientes nobles y amor en cada detalle.
        </p>

        {/* Botones de acción vinculados al scroll */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 px-4">
          <button
            onClick={scrollToCatalog}
            className="bg-[#1C1917] text-[#FAF7F2] px-8 py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-[#1C1917]/90 transition-colors uppercase tracking-wider text-sm shadow-sm"
          >
            Ver Menú & Pedir <ArrowRight size={18} />
          </button>
          <button
            onClick={scrollToCustom}
            className="border border-[#B89855] text-[#B89855] px-8 py-4 rounded-sm hover:bg-[#B89855]/10 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Tortas Personalizadas
          </button>
        </div>

        {/* Tarjetas de características */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
          {[
            { icon: Award, title: "Materia Prima Premium", desc: "Chocolates finos y manteca pura" },
            { icon: Heart, title: "100% Artesanal", desc: "Hecho a mano con dedicación" },
            { icon: Clock, title: "Frescura Garantizada", desc: "Horneado para tu fecha" },
            { icon: MapPin, title: "La Plata & Alrededores", desc: "Retiro céntrico o envío" }
          ].map((item, idx) => (
            <div key={idx} className="bg-transparent border border-[#1C1917]/10 p-6 rounded-sm text-left flex flex-col gap-3 hover:border-[#B89855]/50 transition-colors">
              <item.icon className="text-[#B89855]" size={24} strokeWidth={1.5} />
              <div>
                <h3 className="text-[#1C1917] font-medium text-sm tracking-wide mb-1">{item.title}</h3>
                <p className="text-[#1C1917]/60 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};