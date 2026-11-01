import { createContext, useContext, useEffect, useState } from 'react';
import { authApi, userApi } from '../api/endpoints.js';
import { getToken, setToken } from '../api/client.js';

const AuthContext = createContext(null);

// Keeps the logged-in user for the whole app.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken())); // only wait if there is a saved token

  // On page load: if a token is saved, ask the server who it belongs to.
  useEffect(() => {
    if (!getToken()) return;
    userApi.me().then(setUser).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  // The API client fires this when the token expires.
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, []);

  async function authenticate(request) {
    const { token, user } = await request;
    setToken(token);
    setUser(user);
  }

  const login = (identifier, password) => authenticate(authApi.login({ identifier, password }));
  const register = (username, email, password) => authenticate(authApi.register({ username, email, password }));
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
