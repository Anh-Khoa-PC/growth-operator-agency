
import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from "react";


const mockAPI = {
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (email === 'user@example.com' && password === 'password123') {
      return {
        success: true,
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe'
        },
        token: 'mock-jwt-token-12345'
      };
    }

    throw new Error('Invalid credentials');
  },

  validateToken: async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (token === 'mock-jwt-token-12345') {
      return {
        valid: true,
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe'
        }
      };
    }

    return { valid: false };
  }
};

type UserModel = {
  id: number | string;
  name: string;
  email: string;

}

type AuthContextProps = {
  user: UserModel | null,
  loading: boolean,
  login: (email: string, password: string) => Promise<{ success: boolean; error?: unknown }>;
  logout: () => void,
  isAuthenticated: boolean
};

const initAuthContextPropsState = {
  user: null,
  loading: false,
  login: () => Promise.resolve({ success: false }),
  logout: () => { },
  isAuthenticated: false
};

// Auth Context
const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

// Auth Provider Component
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      // In a real app, you'd get this from localStorage
      const savedToken = token;

      if (savedToken) {
        try {
          const response = await mockAPI.validateToken(savedToken);
          if (response.valid) {
            setUser(response.user as UserModel);
            setToken(savedToken);
          }
        } catch (error) {
          console.error('Token validation failed:', error);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await mockAPI.login(email, password);
      setUser(response.user);
      setToken(response.token as string);
      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value} >
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