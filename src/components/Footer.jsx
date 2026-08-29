import React from 'react';
import { Sparkles, MapPin, Phone, ExternalLink, Lock, Heart } from 'lucide-react';

export const Footer = ({ settings, onOpenAdmin }) => {
  return (
    <footer id="contacto" className="bg-[#FAF7F2] border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200">
          
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-sm bg-[#EFE9DF]">
                <img 
                  src="/logo.png" 
                  alt="Evangeline Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold tracking-widest text-[#1C1917]">
                  EVANGELINE
                </span>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A6D3B] font-cormorant font-semibold">
                  Bakehouse by Melisa Leyes
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-light mx-auto md:mx-0">
              Pastelería boutique y repostería artesanal creada con pasión. Horneamos momentos dulces e inolvidables en la ciudad de La Plata.
            </p>
          </div>

          {/* Col 2: Info & Retiro */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center justify-center md:justify-start gap-1.5 font-cinzel">
              <MapPin className="w-4 h-4 text-[#8A6D3B]" />
              Punto de Retiro & Envíos
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              📍 {settings?.pickupAddress || 'Zona Centro / Plaza Paso, La Plata'}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              🛵 Envíos a todo el casco urbano de La Plata, Gonnet, City Bell, Villa Elisa y alrededores.
            </p>
            <p className="text-xs text-[#8A6D3B] font-medium">
              ⏰ Anticipación mínima para pedidos: {settings?.minNoticeHours || 48} horas.
            </p>
          </div>

          {/* Col 3: Redes & Contacto */}
          <div className="md:col-span-3 space-y-4 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-cinzel">
              Conectá con Evangeline
            </h4>
            
            <div className="flex flex-col items-center md:items-start gap-2.5">
              <a
                href={`https://wa.me/${settings?.whatsappNumber}?text=¡Hola%20Melisa!%20Te%20escribo%20desde%20la%20tienda%20online.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 hover:text-[#1C1917] hover:underline"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp: +{settings?.whatsappNumber}</span>
              </a>

              <a
                href={`https://instagram.com/${settings?.instagramUser || 'evangeline.bakehouse'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 hover:text-[#1C1917] hover:underline"
              >
                <div className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <span>@{settings?.instagramUser || 'evangeline.bakehouse'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Evangeline Bakehouse • Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>en La Plata, Argentina.</span>
          </div>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-stone-400 hover:text-[#1C1917] transition-colors cursor-pointer text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>Acceso Administración Melisa</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
