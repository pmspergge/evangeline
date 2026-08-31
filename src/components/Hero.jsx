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
    <section id="hero" className="relative bg-[#FAF7F2] pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-[#1C1917]/10 overflow-hidden">
      
      {/* Brillo sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#B89855]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Etiqueta superior */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-8 sm:w-12 bg-[#B89855]/40"></div>
          <span className="text-[#B89855] text-[10px] tracking-[0.3em] uppercase font-semibold">
            By {settings?.ownerName || 'Melisa Leyes'}
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-[#B89855]/40"></div>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1C1917] leading-[1.1] mb-6 font-light">
          El arte de la repostería <br className="hidden md:block" />
          fina en <span className="text-[#B89855] italic font-medium">La Plata</span>
        </h1>

        {/* Subtítulo */}
        <p className="max-w-2xl mx-auto text-[#1C1917]/60 text-sm sm:text-base mb-12 font-light leading-relaxed px-4">
          Tortas de autor, tartas clásicas, boxes de regalo y delicias dulces horneadas a pedido con ingredientes nobles y amor en cada detalle.
        </p>

        {/* Botones de acción iterativos */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24 px-4">
          <button
            onClick={scrollToCatalog}
            className="group w-full sm:w-auto bg-[#1C1917] text-[#FAF7F2] px-8 py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[#292524] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold"
          >
            Ver Menú & Pedir 
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={scrollToCustom}
            className="group w-full sm:w-auto border border-[#B89855]/50 text-[#1C1917] px-8 py-4 rounded-sm hover:border-[#B89855] hover:bg-[#B89855]/5 active:scale-95 transition-all duration-300 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-3"
          >
            <Sparkles size={16} className="text-[#B89855] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
            Tortas Personalizadas
          </button>
        </div>

        {/* Tarjetas de características refinadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
          {[
            { icon: Award, title: "Materia Prima", desc: "Chocolates finos y manteca pura" },
            { icon: Heart, title: "100% Artesanal", desc: "Hecho a mano con dedicación" },
            { icon: Clock, title: "Frescura Exacta", desc: "Horneado exclusivo para tu fecha" },
            { icon: MapPin, title: "La Plata & Zona", desc: "Retiro céntrico o envío a domicilio" }
          ].map((item, idx) => (
            <div key={idx} className="group bg-transparent border border-[#1C1917]/10 p-6 sm:p-8 rounded-sm text-center flex flex-col items-center gap-4 hover:border-[#B89855]/40 hover:-translate-y-1 hover:shadow-sm transition-all duration-500 cursor-default">
              <div className="w-12 h-12 rounded-full bg-[#B89855]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#B89855]/20 transition-all duration-500">
                <item.icon className="text-[#B89855]" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#1C1917] font-semibold text-[10px] uppercase tracking-widest mb-2">{item.title}</h3>
                <p className="text-[#1C1917]/50 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};