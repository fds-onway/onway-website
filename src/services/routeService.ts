import type { ImageDTO } from '../types/route';
import { api } from './api';

// Função para upload de imagem na API pública
export async function uploadImage(file: File): Promise<ImageDTO> {
  const formData = new FormData();
  formData.append('file', file);
  try {
      // 1. Obter presigned URL
  // Gerar nome único para o arquivo
  const ext = file.name.split('.').pop();
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  const fileName = `${uniqueId}.${ext}`;
      const fileType = file.type;
      const presignedRes = await api.get('/cdn/presigned-url', {
        params: {
          folder: 'routes',
          fileName,
          fileType,
        },
      });
      const { url: presignedUrl } = presignedRes.data;

      if (!presignedUrl) throw new Error('URL de upload não recebida');

      // 2. Upload do arquivo para a presigned URL
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: file,
      });

      // 3. Retornar a URL recebida da API
      return {
        fileName,
        imageUrl: `https://onway-cdn-bucket.s3.us-east-1.amazonaws.com/routes/${fileName}`,
      };
  } catch (err: any) {
    throw new Error(err?.message || 'Erro ao fazer upload da imagem');
  }
}
import type { CreateRouteDTO } from '../types/route';

const API_URL = '/route';

export async function createRoute<T = unknown>(
  data: CreateRouteDTO,
): Promise<T> {
  try {
    const response = await api.post(API_URL, data);
    return response.data as T;
  } catch (err: any) {
    throw new Error(err?.message || 'Erro ao criar rota');
  }
}

// Adicione outros métodos (listar, editar, excluir) conforme necessário
