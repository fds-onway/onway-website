import Dashboard from '../pages/private/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import CreateRoute from '../pages/routes/CreateRoute';

export const privateRoutes = [
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
];
