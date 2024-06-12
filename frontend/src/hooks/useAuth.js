import { useState, createContext, useContext } from 'react';
import * as AuthService from "../services/AuthService";
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser() || null);

  const login = async (email, password) => {
    try {
      const user = await AuthService.login(email, password);
      setUser(user);
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const signup = async data => {
    try {
      const user = await AuthService.signup(data);
      setUser(user);
      toast.success('Signup Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);