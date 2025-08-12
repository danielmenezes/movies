import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

export default function PrivateRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) return <CircularProgress size={24} sx={{ color: 'white' }} />;

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
