import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-ten-mu.now.sh',
})

export default api;