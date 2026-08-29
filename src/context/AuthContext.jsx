import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local session
    const localSession = localStorage.getItem('evangeline_admin_logged');
    if (localSession === 'true') {
      setUser({ email: 'admin@evangeline.com', role: 'admin', name: 'Melisa Leyes' });
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser(fbUser);
          localStorage.setItem('evangeline_admin_logged', 'true');
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithPassword = async (password, email = 'admin@evangeline.com') => {
    // If Firebase is configured, try Firebase Auth
    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        localStorage.setItem('evangeline_admin_logged', 'true');
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    // Default PIN / Master password fallback
    const validPasswords = ['evangeline', 'melisa123', 'pasteleria2026', 'admin'];
    if (validPasswords.includes(password.trim().toLowerCase())) {
      const adminObj = { email: 'melisa@evangeline.com', role: 'admin', name: 'Melisa Leyes' };
      setUser(adminObj);
      localStorage.setItem('evangeline_admin_logged', 'true');
      return { success: true };
    } else {
      return { success: false, error: 'Contraseña incorrecta. Por defecto podés usar: evangeline' };
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    localStorage.removeItem('evangeline_admin_logged');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithPassword, logout, isAdmin: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
