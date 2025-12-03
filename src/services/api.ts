import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Instância do axios com configurações padrão
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui pode-se tratar erros globais, como expiração de token, etc.
    if (error && error.response && error.response.data) {
      return Promise.reject(
        new Error(error.response.data.message || 'Erro na requisição'),
      );
    }
    return Promise.reject(
      error instanceof Error
        ? error
        : new Error('Erro desconhecido na requisição'),
    );
  },
);
