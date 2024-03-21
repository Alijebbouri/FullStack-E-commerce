import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:8000' ,
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    
  },
  mode: 'cors',
  withCredentials: true,
  withXSRFToken : true
});
axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })
export {axiosClient}