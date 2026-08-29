import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, Calendar, Clock, CreditCard, Copy, Check, Sparkles, Send, Truck, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storage } from '../services/storage';
import confetti from 'canvas-confetti';

export const CheckoutModal = ({ settings }) => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, totalAmount, clearCart } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'
  const [address, setAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('Casco Urbano La Plata');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('15:00 a 18:00 hs');
  const [paymentMethod, setPaymentMethod] = useState('transferencia'); // 'transferencia' | 'efectivo' | 'mercadopago'
  const [generalNotes, setGeneralNotes] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  // Calculate delivery fee
  const deliveryFee = deliveryType === 'delivery' ? (settings?.deliveryCostBase || 2500) : 0;
  const finalTotal = totalAmount + deliveryFee;

  const formattedFinalTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(finalTotal);

  // Minimum date calculation (48 hours from now by default)
  const getMinDate = () => {
    const minHours = settings?.minNoticeHours || 48;
    const date = new Date();
    date.setHours(date.getHours() + minHours);
    return date.toISOString().split('T')[0];
  };

  const handleCopyAlias = () => {
    if (settings?.bankAlias) {
      navigator.clipboard.writeText(settings.bankAlias);
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryDate) {
      alert('Por favor completá tu nombre, teléfono de contacto y fecha deseada de entrega.');
      return;
    }

    setIsSubmitting(true);

    // 1. Prepare Order Object
    const orderData = {
      customerName,
      customerPhone,
      deliveryType,
      address: deliveryType === 'delivery' ? `${address} (${deliveryZone})` : 'Retiro en punto Evangeline La Plata',
      deliveryDate,
      timeSlot,
      paymentMethod,
      items: cart,
      subtotal: totalAmount,
      deliveryFee,
      total: finalTotal,
      generalNotes,
    };

    // 2. Save order to system
    const savedOrder = storage.createOrder(orderData);

    // 3. Trigger Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF7F2', '#1C1917', '#C5A880'],
      });
    } catch (err) {
      console.log('Confetti triggered', err);
    }

    // 4. Construct formatted WhatsApp message
    let message = `*¡Hola Melisa! Quiero encargar un pedido en Evangeline 🎂*\n\n`;
    message += `*📋 Código de Pedido:* #${savedOrder.id}\n`;
    message += `*👤 Cliente:* ${customerName}\n`;
    message += `*📱 Teléfono:* ${customerPhone}\n\n`;
    
    message += `*🍰 DETALLE DEL PEDIDO:*\n`;
    cart.forEach((item, index) => {
      const itemSubtotal = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(item.price * item.quantity);

      message += `• ${item.quantity}x *${item.name}* (${itemSubtotal})\n`;
      if (item.customNote) {
        message += `   _Nota/Dedicatoria:_ "${item.customNote}"\n`;
      }
    });

    message += `\n*📦 ENTREGA:* ${deliveryType === 'delivery' ? 'Envío a Domicilio' : 'Retiro en La Plata'}\n`;
    if (deliveryType === 'delivery') {
      message += `*📍 Dirección:* ${address} - ${deliveryZone}\n`;
    }
    message += `*📅 Fecha Deseada:* ${deliveryDate}\n`;
    message += `*⏰ Franja Horaria:* ${timeSlot}\n\n`;

    message += `*💳 FORMA DE PAGO:* ${paymentMethod.toUpperCase()}\n`;
    if (deliveryFee > 0) {
      message += `• Subtotal: $${totalAmount.toLocaleString('es-AR')}\n`;
      message += `• Envío: $${deliveryFee.toLocaleString('es-AR')}\n`;
    }
    message += `*💰 TOTAL FINAL: $${finalTotal.toLocaleString('es-AR')}*\n`;

    if (generalNotes) {
      message += `\n*💬 Comentarios adicionales:* ${generalNotes}\n`;
    }

    message += `\n_Quedo a la espera de tu confirmación de agenda y seña. ¡Muchas gracias!_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '5492215551234'}?text=${encodedMessage}`;

    setIsSuccess(true);
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
    }, 800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1C1917] text-[#D4AF37] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#1C1917]">
                Completar Pedido Evangeline
              </h3>
              <p className="text-xs text-stone-500">Coordinación directa por WhatsApp</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-[#1C1917] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto border border-[#25D366]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-[#1C1917]">
                ¡Pedido generado con éxito!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Estamos abriendo WhatsApp con el detalle completo de tu pedido para que Melisa confirme la agenda y los datos de pago.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#1C1917] text-[#D4AF37] font-semibold text-xs rounded-full hover:bg-[#292524] transition-all cursor-pointer"
                >
                  Volver a la tienda
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* 1. Customer Personal Data */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  1. Tus Datos de Contacto
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej: Carolina Fernández"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ej: 221 555-6789"
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Method */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  2. Método de Entrega en La Plata
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'border-[#D4AF37] bg-[#F4EFEA] ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Store className="w-4 h-4 text-[#8A6D3B]" />
                      <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        Gratis
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#1C1917]">Retiro en Punto</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">Centro / La Plata</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'border-[#D4AF37] bg-[#F4EFEA] ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Truck className="w-4 h-4 text-[#8A6D3B]" />
                      <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                        +${settings?.deliveryCostBase || 2500}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#1C1917]">Envío a Domicilio</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">La Plata & zonas</span>
                  </button>
                </div>

                {deliveryType === 'delivery' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-2xl border border-stone-200">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                        Dirección (Calle, Nro, Piso/Dpto) *
                      </label>
                      <input
                        type="text"
                        required={deliveryType === 'delivery'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej: Calle 50 e/ 7 y 8 N° 624"
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                        Zona de La Plata
                      </label>
                      <select
                        value={deliveryZone}
                        onChange={(e) => setDeliveryZone(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-[#FAF7F2]"
                      >
                        <option value="Casco Urbano La Plata">Casco Urbano La Plata</option>
                        <option value="Gonnet">Gonnet</option>
                        <option value="City Bell">City Bell</option>
                        <option value="Villa Elisa">Villa Elisa</option>
                        <option value="Tolosa">Tolosa</option>
                        <option value="Los Hornos">Los Hornos</option>
                        <option value="Villa Elvira">Villa Elvira</option>
                        <option value="Ensenada / Berisso">Ensenada / Berisso</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Date & Time Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  3. Fecha y Franja Horaria Deseada
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                      Fecha de Entrega/Retiro *
                    </label>
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-500 block mt-1">
                      Mínimo {settings?.minNoticeHours || 48}hs de anticipación
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                      Franja Horaria
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white"
                    >
                      <option value="10:00 a 13:00 hs (Mañana)">10:00 a 13:00 hs (Mañana)</option>
                      <option value="15:00 a 18:00 hs (Tarde)">15:00 a 18:00 hs (Tarde)</option>
                      <option value="18:00 a 20:00 hs (Tarde/Noche)">18:00 a 20:00 hs (Tarde/Noche)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Payment method */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  4. Forma de Pago Preferida
                </h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'transferencia'
                        ? 'border-[#D4AF37] bg-[#F4EFEA] ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    Transferencia
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mercadopago')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'mercadopago'
                        ? 'border-[#D4AF37] bg-[#F4EFEA] ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    Mercado Pago
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'efectivo'
                        ? 'border-[#D4AF37] bg-[#F4EFEA] ring-1 ring-[#D4AF37]'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    Efectivo
                  </button>
                </div>

                {/* Bank alias copy box */}
                {paymentMethod === 'transferencia' && settings?.bankAlias && (
                  <div className="p-3 bg-white rounded-2xl border border-[#D4AF37]/40 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-semibold">
                        Alias para seña / transferencia
                      </span>
                      <span className="font-mono font-bold text-[#1C1917] tracking-wider">
                        {settings.bankAlias}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        Titular: {settings.bankHolder || 'Melisa Leyes'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAlias}
                      className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-stone-300 rounded-xl font-semibold text-[11px] text-[#1C1917] flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copiedAlias ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#8A6D3B]" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Additional Notes */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1C1917] mb-1">
                  Notas o especificaciones adicionales
                </label>
                <textarea
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Alguna preferencia de horario exacto, timbre o detalle para Melisa..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] bg-white resize-none"
                />
              </div>

              {/* Summary & Submit */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase block tracking-wider font-semibold">
                      Total a pagar
                    </span>
                    <span className="text-2xl font-bold text-[#1C1917] font-serif">
                      {formattedFinalTotal}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <span className="text-[11px] text-stone-500">
                      Incluye envío (${deliveryFee.toLocaleString('es-AR')})
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Enviar Pedido por WhatsApp</span>
                </button>
                <span className="block text-[11px] text-center text-stone-400 mt-2">
                  Se abrirá WhatsApp con el resumen listo para enviar
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
