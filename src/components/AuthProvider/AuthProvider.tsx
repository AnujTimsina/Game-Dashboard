import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUser } from 'src/api/user';
import { BACKEND_URL } from 'src/config/config';
import { IUser } from 'src/interfaces/user';
import { updateUser } from 'src/store/user/slices/userSlice';
import { api } from 'src/utils/api';

interface DecodedToken {
  userName: string;
  role: string;
  sub: string;
  iat: number;
  exp: number;
  type: string;
}
interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (newToken: string | null) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [refreshToken, setRefreshToken_] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const setRefreshToken = (newToken: string | null) => {
    setRefreshToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
      const user = jwtDecode<DecodedToken>(token);
      api
        .get(`${BACKEND_URL}/users/${user.sub}`)
        .then((response) => dispatch(updateUser(response.data as IUser)));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [token, refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo<AuthContextType>(
    () => ({
      token,
      setToken,
      refreshToken,
      setRefreshToken,
    }),
    [token, refreshToken]
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
