import { api } from './api';
import type { AuthResponse } from '../types/auth';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/user', { email, password });
  return response.data as AuthResponse; // Deve conter o token JWT
}

export function setToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function logout() {
  localStorage.removeItem('authToken');
}
