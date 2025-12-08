// import { useState } from 'react';
import { toast } from 'sonner';
import { RouteForm } from '../../components/routes/RouteForm';
import { createRoute } from '../../services/routeService';
import type { CreateRouteDTO } from '../../types/route';
import { useNavigate } from 'react-router-dom';

export default function CreateRoute() {
  const navigate = useNavigate();

  async function handleSubmit(data: CreateRouteDTO) {
    try {
      await createRoute(data);
      toast.success('Rota criada com sucesso!');
      navigate('/routes');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao criar rota');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar nova rota</h1>
      <RouteForm onSubmit={handleSubmit} />
    </div>
  );
}
