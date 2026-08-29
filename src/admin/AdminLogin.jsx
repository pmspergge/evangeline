import React, { useState } from 'react';
import { X, Lock, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = ({ isOpen, onClose }) => {
  const { loginWithPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginWithPassword(password);
    setLoading(false);

    if (result.success) {
      setPassword('');
      onClose();
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#1C1917] rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#1C1917] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917]">
            Panel de Administración
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Gestión de catálogo, precios y pedidos de Evangeline
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#8A6D3B]" />
              Contraseña de Acceso
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresá tu clave (ej: evangeline)"
              className="w-full text-sm p-3.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-white transition-all"
            />
            <span className="block text-[11px] text-stone-400 mt-1">
              Clave predeterminada inicial: <strong className="text-stone-600">evangeline</strong>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1C1917] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#292524] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-[#D4AF37]/50"
          >
            <span>{loading ? 'Accediendo...' : 'Ingresar al Panel'}</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </form>

      </div>
    </div>
  );
};
