import { createContext, useEffect, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token expired
          localStorage.removeItem('auth_token');
          setUser(null);
        } else {
          // Valid token
          setUser({
            id: decodedToken.sub,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
          });
        }
      } catch (err) {
        setError('Invalid token');
        localStorage.removeItem('auth_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    try {
      localStorage.setItem('auth_token', token);
      const decodedToken = jwtDecode<any>(token);
      
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      });
      
      toast.success('Successfully logged in!');
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication failed');
      toast.error('Authentication failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};