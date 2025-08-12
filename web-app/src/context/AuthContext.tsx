import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function verify() {
      const token = localStorage.getItem('access_token');
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    }
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
