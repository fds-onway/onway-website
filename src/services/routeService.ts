import type { CreateRouteDTO } from '../types/route';

const API_URL = '/route';

export async function createRoute<T = unknown>(
  data: CreateRouteDTO,
): Promise<T> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar rota');
  }
  return response.json() as Promise<T>;
}

// Adicione outros métodos (listar, editar, excluir) conforme necessário
