import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { publicRoutes } from './routes/public';
import { privateRoutes } from './routes/private';

function PrivateRoute({ element }: { element: React.ReactElement }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {/* Rotas privadas */}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute element={route.element} />}
        />
      ))}
      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
