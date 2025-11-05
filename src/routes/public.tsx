import Login from '../pages/public/Login';
import PublicLayout from '../layouts/PublicLayout';
import Register from '@/pages/public/Register';
import PublicRoute from './PublicRoute';

export const publicRoutes = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <PublicLayout>
          <Login />
        </PublicLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <PublicLayout>
          <Register />
        </PublicLayout>
      </PublicRoute>
    ),
  },
];
