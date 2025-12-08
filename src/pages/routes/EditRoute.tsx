import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RouteForm } from '../../components/routes/RouteForm';
import { updateRoute, getRouteById } from '../../services/routeService';
import type { CreateRouteDTO } from '../../types/route';
import { toast } from 'react-toastify';

export default function EditRoute() {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<CreateRouteDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoute() {
      try {
        if (!id) throw new Error('ID da rota não informado');
        const data = await getRouteById(id);
        setInitialData(data);
      } catch (err: any) {
        toast.error(err?.message || 'Erro ao carregar rota');
        navigate('/routes');
      } finally {
        setLoading(false);
      }
    }
    fetchRoute();
  }, [id, navigate]);

  async function handleSubmit(data: CreateRouteDTO) {
    try {
      if (!id) throw new Error('ID da rota não informado');
      await updateRoute(id, data);
      toast.success('Rota atualizada com sucesso!');
      navigate('/routes');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao atualizar rota');
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>;
  if (!initialData) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar rota</h1>
      <RouteForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}
