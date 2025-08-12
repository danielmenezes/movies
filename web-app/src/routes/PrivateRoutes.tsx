import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
