import 'dotenv/config';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proffy-v1.herokuapp.com/',
});

export default api;
