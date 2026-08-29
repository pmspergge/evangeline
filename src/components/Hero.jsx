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
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#D4AF37]/20">
      {/* Subtle background decorative ornament circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Circular Luxury Badge */}
          <div className="mb-6 relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#99783D] via-[#D4AF37] to-[#E9D5A1] shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center p-2">
                <img 
                  src="/logo.png" 
                  alt="Evangeline Bakehouse Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#1C1917] text-[#D4AF37] text-[11px] font-semibold tracking-wider px-3.5 py-0.5 rounded-full border border-[#D4AF37]/60 shadow-sm whitespace-nowrap">
              PASTELERÍA ARTESANAL
            </div>
          </div>

          {/* Subtitle / Brand Origin */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#D4AF37]"></span>
            <span className="font-cormorant text-base sm:text-lg italic text-[#8A6D3B] tracking-widest uppercase">
              By {settings?.ownerName || 'Melisa Leyes'}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-[#D4AF37]"></span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] max-w-3xl leading-tight">
            El arte de la repostería fina en <span className="gold-gradient-text">La Plata</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
            Tortas de autor, tartas clásicas, boxes de regalo y delicias dulces horneadas a pedido con ingredientes nobles y amor en cada detalle.
          </p>

          {/* Call to actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={scrollToCatalog}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] font-semibold text-sm rounded-full hover:bg-[#292524] active:scale-98 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40 group"
            >
              <span>Ver Menú & Pedir</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToCustom}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#FAF7F2] text-[#1C1917] font-semibold text-sm rounded-full hover:bg-[#EFE9DF] active:scale-98 transition-all border border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#8A6D3B]" />
              <span>Tortas Personalizadas</span>
            </button>
          </div>

          {/* Feature highlights bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#D4AF37]/20 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#8A6D3B]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1917]">Materia Prima Premium</h4>
                <p className="text-[11px] text-stone-500">Chocolates finos & manteca pura</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#D4AF37]/20 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-[#8A6D3B]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1917]">100% Artesanal</h4>
                <p className="text-[11px] text-stone-500">Hecho a mano con dedicación</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#D4AF37]/20 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#8A6D3B]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1917]">Frescura Garantizada</h4>
                <p className="text-[11px] text-stone-500">Horneado para tu fecha</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#D4AF37]/20 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#8A6D3B]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1917]">La Plata & Alrededores</h4>
                <p className="text-[11px] text-stone-500">Retiro céntrico o envío</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
