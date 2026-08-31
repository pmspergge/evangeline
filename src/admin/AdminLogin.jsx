import React, { useState } from 'react';
import { X, Lock, KeyRound, ArrowRight } from 'lucide-react';
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
      setError(result.error || 'Clave incorrecta');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-sm shadow-2xl border border-[#1C1917]/10 p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#1C1917]/50 hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-sm bg-[#1C1917] text-[#FAF7F2] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wide">
            Acceso Privado
          </h3>
          <p className="text-xs text-[#1C1917]/50 mt-2 font-light uppercase tracking-widest">
            Gestión exclusiva Evangeline
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/5 border border-red-900/20 text-red-800 text-[10px] uppercase tracking-widest text-center font-bold rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1C1917] mb-3">
              <KeyRound className="w-3 h-3 text-[#B89855]" strokeWidth={1.5} />
              Contraseña
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm p-4 rounded-sm border border-[#1C1917]/20 focus:border-[#B89855] focus:ring-0 bg-transparent outline-none transition-colors tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group cursor-pointer w-full bg-[#1C1917] text-[#FAF7F2] px-6 py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[#B89855] hover:text-white active:scale-95 active:bg-[#99783D] transition-all duration-300 uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            <span>{loading ? 'Verificando...' : 'Ingresar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
          </button>
        </form>

      </div>
    </div>
  );
};