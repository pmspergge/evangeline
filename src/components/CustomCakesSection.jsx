import React from 'react';
import { Sparkles, MessageCircle, CalendarCheck, Palette, HeartHandshake } from 'lucide-react';

export const CustomCakesSection = ({ settings }) => {
  const customMessage = encodeURIComponent(
    '¡Hola Melisa! Me gustaría consultar por una torta personalizada para un evento especial en La Plata.'
  );

  // Carga la imagen del admin o usa una de respaldo de alta calidad
  const imageUrl = settings?.customCakeImage || 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop';

  return (
    <section id="personalizados" className="py-20 sm:py-32 bg-[#1C1917] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] bg-[#B89855]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#B89855]/30 text-[#B89855] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-sm bg-[#B89855]/5">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              Eventos Inolvidables
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1]">
              Tortas a Medida & <br/> Mesas Dulces <span className="text-[#B89855] italic font-medium">Personalizadas</span>
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F2]/70 font-light leading-relaxed max-w-xl">
              ¿Tenés un cumpleaños, casamiento, aniversario, bautismo o evento corporativo en La Plata? Diseñamos la torta de tus sueños: elegí la paleta de colores, sabores gourmet, flores naturales o detalles en pan de oro.
            </p>

            {/* Custom Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                { icon: Palette, title: "Diseño Único", desc: "Modelos exclusivos adaptados a tu temática" },
                { icon: CalendarCheck, title: "Reserva de Fecha", desc: "Agendamos con semanas de antelación" },
                { icon: HeartHandshake, title: "Degustación", desc: "Boxes para elegir rellenos especiales" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-sm bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 hover:border-[#B89855]/40 transition-colors flex flex-col items-start gap-3">
                  <item.icon className="w-5 h-5 text-[#B89855]" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FAF7F2] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#FAF7F2]/50 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-6">
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '5492215551234'}?text=${customMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#B89855] hover:bg-[#99783D] active:scale-95 text-[#1C1917] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold rounded-sm shadow-[0_8px_20px_-6px_rgba(184,152,85,0.3)] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#1C1917] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span>Consultar por Torta</span>
              </a>
            </div>

          </div>

          {/* Right Column Imagery Showcase */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              
              {/* Premium Image Container */}
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#B89855]/30 bg-[#1C1917] relative group">
                <img
                  src={imageUrl}
                  alt="Torta de autor personalizada Evangeline"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>

              {/* Floating Quote badge */}
              <div className="absolute -bottom-8 -left-4 sm:-left-10 bg-[#FAF7F2] text-[#1C1917] p-6 rounded-sm border border-[#1C1917]/10 shadow-xl max-w-[280px]">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3 h-3 text-[#B89855]" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-sm font-light italic text-[#1C1917]/80 leading-relaxed">
                  "El sabor y la presentación de la torta fueron increíbles. ¡Todos los invitados fascinados!"
                </p>
                <span className="text-[9px] text-[#1C1917]/50 font-bold block mt-4 uppercase tracking-widest">
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