import DashboardLayout from '@/layouts/DashboardLayout';
import Dashboard from '@/pages/private/Dashboard';
import CreateRoute from '@/pages/routes/CreateRoute';
import RouteListPage from '@/pages/routes/RouteListPage';
import EditRoute from '@/pages/routes/EditRoute';

export const privateRoutes = [
  {
    path: '/routes',
    element: (
      <DashboardLayout>
        <RouteListPage />
      </DashboardLayout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: '/routes/create',
    element: (
      <DashboardLayout>
        <CreateRoute />
      </DashboardLayout>
    ),
  },
  {
    path: '/routes/edit/:id',
    element: (
      <DashboardLayout>
        <EditRoute />
      </DashboardLayout>
    ),
  },
];
