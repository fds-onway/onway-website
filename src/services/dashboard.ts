import { api } from './api';

export async function getTotalUsers() {
  return await api.get('/dashboard/users/count');
}

export async function getTotalRoutes() {
  return await api.get('/dashboard/routes/count');
}

export async function getTotalRoutesInProgress() {
  return await api.get('/dashboard/routes/active/count');
}

export async function getTotalRoutesCompleted() {
  return await api.get('/dashboard/routes/completed/count');
}
