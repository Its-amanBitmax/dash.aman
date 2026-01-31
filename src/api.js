import axios from 'axios';

const api = axios.create({
    baseURL: 'https://portfolio-48mo.onrender.com',
});

export default api;