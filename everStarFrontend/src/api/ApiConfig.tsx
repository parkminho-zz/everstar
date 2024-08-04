// apiClient.ts
import axios from 'axios';

export const ApiConfig = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
