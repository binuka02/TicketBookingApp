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

import axios from '../Interceptors/axiosInstance';

const API_URL = "http://localhost:8081/api/v1/auth";
const TOKEN_KEY = 'access_token';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const signup = async (firstName, lastName, email, contact, cnp, password) => {
  try {
    const response = await axiosInstance.post('/signup', { firstName, lastName, email, contact, cnp, password });
    const { token, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (err) {
    throw err; // Handle error appropriately in your Signup component
  }
};


export const login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('access_token', token);
    return response.data.user; // Assuming you return the user object from your backend
  } catch (err) {
    throw err; // Handle error appropriately in your Login component
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () =>
  localStorage.getItem('access_token')
    ? JSON.parse(localStorage.getItem('access_token'))
    : null;