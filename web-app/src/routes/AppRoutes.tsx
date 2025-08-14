import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import Home from '../pages/home/Home';
import PrivateRoute from './PrivateRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
