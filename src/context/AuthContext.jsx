import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for auth state on mount
    const authStatus = localStorage.getItem('chromaksa_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Hash for 'Ciko Coki Chester Marki 2026'
      const targetHash = 'ddabdbd634a9e4f259dd9bc8de1869af33ff27ecc91ecae0b887e4f3e0669bdd';

      if (email === 'admin@chromaksa.studio' && hashHex === targetHash) {
        setIsAuthenticated(true);
        localStorage.setItem('chromaksa_auth', 'true');
        return true;
      }
      return false;
    } catch (e) {
      console.error('Hashing error', e);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('chromaksa_auth');
  };

  if (loading) return null; // or a loading spinner

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
