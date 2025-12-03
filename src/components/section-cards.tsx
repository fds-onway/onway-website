import { useEffect, useState } from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getTotalUsers,
  getTotalRoutes,
  getTotalRoutesInProgress,
  getTotalRoutesCompleted,
} from '@/services/dashboard';

export function SectionCards() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalRoutes, setTotalRoutes] = useState<number | null>(null);
  const [routesInProgress, setRoutesInProgress] = useState<number | null>(null);
  const [routesCompleted, setRoutesCompleted] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndicators() {
      setLoading(true);
      try {
        const [usersRes, routesRes, inProgressRes, completedRes] =
          await Promise.all([
            getTotalUsers(),
            getTotalRoutes(),
            getTotalRoutesInProgress(),
            getTotalRoutesCompleted(),
          ]);
        setTotalUsers(usersRes.data ?? 0);
        setTotalRoutes(routesRes.data ?? 0);
        setRoutesInProgress(inProgressRes.data ?? 0);
        setRoutesCompleted(completedRes.data ?? 0);
      } catch (err) {
        console.error('Failed to fetch indicators:', err);
        setTotalUsers(0);
        setTotalRoutes(0);
        setRoutesInProgress(0);
        setRoutesCompleted(0);
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Usuários</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? '...' : totalUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {/* Indicador de tendência pode ser ajustado conforme dados reais */}
              +
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Usuários totais <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Indicador geral de usuários
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Rotas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? '...' : totalRoutes}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />+
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rotas totais <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Indicador geral de rotas</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rotas em andamento</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? '...' : routesInProgress}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />+
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rotas em andamento <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Indicador de rotas ativas</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rotas concluídas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? '...' : routesCompleted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />+
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rotas concluídas <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Indicador de rotas finalizadas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
