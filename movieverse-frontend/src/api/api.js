// // src/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3002'; // your backend URL

// // Function to make GET requests
// export const getData = async (endpoint) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
//         return response.data;
//     } catch (error) {
//         console.error("There was an error fetching data!", error);
//         return null;
//     }
// };

// // Function to make POST requests
// export const postData = async (endpoint, data) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
//         return response.data;
//     } catch (error) {
//         console.error("There was an error posting data!", error);
//         return null;
//     }
// };
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3002',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
