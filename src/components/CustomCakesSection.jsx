import React from 'react';
import { Sparkles, MessageCircle, CalendarCheck, Palette, HeartHandshake } from 'lucide-react';

export const CustomCakesSection = ({ settings }) => {
  const customMessage = encodeURIComponent(
    '¡Hola Melisa! Me gustaría consultar por una torta personalizada para un evento especial en La Plata.'
  );

  return (
    <section id="personalizados" className="py-16 sm:py-24 bg-[#1C1917] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Eventos & Momentos Inolvidables
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Tortas a Medida & Mesas Dulces <span className="gold-gradient-text">Personalizadas</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              ¿Tenés un cumpleaños, casamiento, aniversario, bautismo o evento corporativo en La Plata? Diseñamos la torta de tus sueños: elegí la paleta de colores, sabores gourmet, flores naturales o detalles en pan de oro.
            </p>

            {/* Custom Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Palette className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Diseño Único</h4>
                <p className="text-[11px] text-stone-400 mt-1">Modelos exclusivos adaptados a tu temática</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <CalendarCheck className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Reserva de Fecha</h4>
                <p className="text-[11px] text-stone-400 mt-1">Agendamos con semanas de antelación</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <HeartHandshake className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Degustación</h4>
                <p className="text-[11px] text-stone-400 mt-1">Boxes para elegir rellenos especiales</p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-4">
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '5492215551234'}?text=${customMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#c49f2b] active:scale-98 text-[#1C1917] font-bold text-sm rounded-full shadow-xl transition-all group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#1C1917] group-hover:scale-110 transition-transform" />
                <span>Consultar por Torta Personalizada</span>
              </a>
            </div>

          </div>

          {/* Right Column Imagery Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              <div className="aspect-4/5 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=80"
                  alt="Torta de autor personalizada Evangeline"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote badge */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#FAF7F2] text-[#1C1917] p-4 rounded-2xl border border-[#D4AF37] shadow-xl max-w-xs">
                <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-medium italic text-stone-800">
                  "El sabor y la presentación de la torta fueron increíbles. ¡Todos los invitados fascinados!"
                </p>
                <span className="text-[10px] text-[#8A6D3B] font-bold block mt-1 uppercase">
                  Cliente Evangeline • La Plata
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
