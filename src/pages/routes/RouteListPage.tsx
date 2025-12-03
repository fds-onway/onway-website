import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../components/RouteList';
import type { CreateRouteDTO } from '../../types/route';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export default function RouteListPage() {
  const [routes, setRoutes] = useState<CreateRouteDTO[]>([]);
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

  function handleEdit(route: CreateRouteDTO) {
    // Navegar para página de edição ou abrir modal (implementar conforme necessidade)
    toast.info(`Editar rota: ${route.name}`);
  }

  async function handleDelete(route: CreateRouteDTO & { id?: string }) {
    try {
      if (!route.id) throw new Error('ID da rota não encontrado');
      await api.delete(`/route/${route.id}`);
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
          onClick={() => navigate('/routes/create')}
        >
          + Adicionar rota
        </button>
      </div>
      {loading ? (
        <div className="text-blue-600">Carregando...</div>
      ) : (
        <RouteList routes={routes} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
