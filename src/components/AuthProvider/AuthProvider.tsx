import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  xtoken: string | null;
  setxToken: (newToken: string | null) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem('token')
  );

  const [xtoken, setxToken_] = useState<string | null>(
    localStorage.getItem('xtoken')
  );

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const setxToken = (newToken: string | null) => {
    setxToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (xtoken) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      axios.defaults.headers.common['x-id-token'] = xtoken;

      localStorage.setItem('xtoken', xtoken);
    } else {
      delete axios.defaults.headers.common['x-id-token'];
      localStorage.removeItem('xtoken');
    }
  }, [xtoken]);

  // Memoized value of the authentication context
  const contextValue = useMemo<AuthContextType>(
    () => ({
      token,
      setToken,
      setxToken,
      xtoken,
    }),
    [token, xtoken]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export default AuthProvider;
