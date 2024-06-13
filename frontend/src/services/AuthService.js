import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/auth";

export const signup = (firstName, lastName, email, phone, cnp, password, confirmPassword) => {
    return axios
      .post(API_URL + "/signup", {
        firstName, lastName, email, phone, cnp, password, confirmPassword
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  export const login = (email, password) => {
    return axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  export const logout = () => {
    localStorage.removeItem("user");
  };
  
  export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
// const authService = {
//     signup,
//     login,
//     logout,
//     getCurrentUser,
//   };
  
//   export default authService;