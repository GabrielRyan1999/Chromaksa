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

      // Hash for 'chromaksa2026'
      const targetHash = '0939d8852a1eb6893608d22c8ed25954df1de0188e2aa8dd0410db256f6a04f4';

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
