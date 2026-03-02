import axios from "axios";

const API = axios.create({
  // baseURL: "https://miniurl-backend.onrender.com",
    baseURL: "http://localhost:5001/",

});

//  Attach token automatically (for protected routes)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token--", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
