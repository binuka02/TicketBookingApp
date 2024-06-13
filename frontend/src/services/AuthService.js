// import axios from "axios";


// export const signup = (firstName, lastName, email, phone, cnp, password, confirmPassword) => {
//     return axios
//       .post(process.env.API_URL + "/signup", {
//         firstName, lastName, email, phone, cnp, password, confirmPassword
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }
  
//         return response.data;
//       });
//   };

//   export const login = (email, password) => {
//     return axios
//       .post(process.env.API_URL + "/login", {
//         email,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }
  
//         return response.data;
//       });
//   };

//   export const logout = () => {
//     localStorage.removeItem("user");
//   };
  
//   export const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
//   };
  
// // const authService = {
// //     signup,
// //     login,
// //     logout,
// //     getCurrentUser,
// //   };
  
// //   export default authService;



// services/AuthService.js

// services/AuthService.js

import axios from 'axios';

const API_URL = "http://localhost:8081/api/v1/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const signup = async (firstName, lastName, email, contact, cnp, password) => {
  const response = await axiosInstance.post('/signup', { firstName, lastName, email, contact, cnp, password});
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data.user;
};

export const login = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null; // Or whatever default value you want to return
};
