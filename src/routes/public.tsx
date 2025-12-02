import PublicRoute from './PublicRoute';
import PublicLayout from '../layouts/PublicLayout';
import Login from '../pages/public/Login';
import Register from '@/pages/public/Register';
import ForgotPassword from '@/pages/public/ForgotPassword';
import ResetPassword from '@/pages/public/ResetPassword';

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
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <PublicLayout>
          <ForgotPassword />
        </PublicLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoute>
        <PublicLayout>
          <ResetPassword />
        </PublicLayout>
      </PublicRoute>
    ),
  }
];
