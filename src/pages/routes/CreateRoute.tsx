// import { useState } from 'react';
import { RouteForm } from '../../components/routes/RouteForm';
import { createRoute } from '../../services/routeService';
import type { CreateRouteDTO } from '../../types/route';

export default function CreateRoute() {

  async function handleSubmit(data: CreateRouteDTO) {
    await createRoute(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar nova rota</h1>
      <RouteForm onSubmit={handleSubmit} />
    </div>
  );
}
