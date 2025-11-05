import { useState } from 'react';
import { RouteForm } from '../../components/routes/RouteForm';
import { createRoute } from '../../services/routeService';
import type { CreateRouteDTO } from '../../types/route';

export default function CreateRoute() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CreateRouteDTO) {
    setLoading(true);
    setError(null);
    try {
      await createRoute(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar rota');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar nova rota</h1>
      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          Rota cadastrada com sucesso!
        </div>
      ) : (
        <RouteForm
          onSubmit={(data) => {
            handleSubmit(data);
          }}
        />
      )}
      {loading && <div className="mt-4 text-blue-600">Salvando...</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
