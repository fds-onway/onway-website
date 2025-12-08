import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../components/RouteList';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import type { RouteListItem } from '@/types/route';

export default function RouteListPage() {
  const [routes, setRoutes] = useState<RouteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const res = await api.get('/route');
        setRoutes(res.data);
      } catch (err: any) {
        toast.error('Erro ao carregar rotas: ' + (err.message || ''));
      } finally {
        setLoading(false);
      }
    }
    fetchRoutes();
  }, []);

  function handleEdit(route: RouteListItem) {
    if (route.id !== undefined && route.id !== null) {
      navigate(`/routes/edit/${route.id}`);
    } else {
      toast.error('ID da rota não encontrado');
    }
  }

  async function handleDelete(route: RouteListItem) {
    try {
      if (route.id === undefined || route.id === null)
        throw new Error('ID da rota não encontrado');
      await api.delete(`/route/${String(route.id)}`);
      setRoutes((prev) => prev.filter((r) => r.id !== route.id));
      toast.success('Rota excluída com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao excluir rota: ' + (err.message || ''));
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rotas cadastradas</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          onClick={() => {
            navigate('/routes/create');
          }}
        >
          + Adicionar rota
        </button>
      </div>
      {loading ? (
        <div className="text-blue-600">Carregando...</div>
      ) : (
        <RouteList
          routes={routes}
          onEdit={handleEdit}
          onDelete={(route) => {
            void handleDelete(route);
          }}
        />
      )}
    </div>
  );
}
