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

  const login = (email, password) => {
    // Hardcoded credentials for simple internal admin tool
    if (email === 'admin@chromaksa.studio' && password === 'chromaksa2026') {
      setIsAuthenticated(true);
      localStorage.setItem('chromaksa_auth', 'true');
      return true;
    }
    return false;
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
