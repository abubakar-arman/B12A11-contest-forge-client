import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://contestforge.vercel.app/', 
  baseURL: 'http://localhost:3000/',
  timeout: 5000, // Abort if request takes longer than 5s
  headers: { 'X-Custom-Header': 'foobar' }
});

export default api