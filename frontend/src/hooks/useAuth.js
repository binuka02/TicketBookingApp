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
      toast.error(err.response.data.message);
    }
  };

  const signup = async (firstName, lastName, email, phone, cnp, password, confirmPassword) => {
    try {
      const user = await AuthService.signup(firstName, lastName, email, phone, cnp, password, confirmPassword);
      setUser(user);
      toast.success('Signup Successful');
    } catch (err) {
      toast.error(err.response.data.message);
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