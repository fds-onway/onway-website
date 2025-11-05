import Dashboard from '../pages/private/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';

export const privateRoutes = [
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
];
