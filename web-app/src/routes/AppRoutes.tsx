import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/login/Login';
import Home from '../features/home/Home';
import PrivateRoute from './PrivateRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        
      </Route>
    </Routes>
  );
}
