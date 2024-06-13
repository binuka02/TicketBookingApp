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




import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

export const signup = async (firstName, lastName, email, phone, cnp, password, confirmPassword) => {
  const response = await axios.post(`${API_URL}/signup`, { firstName, lastName, email, phone, cnp, password, confirmPassword });
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data.user;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
