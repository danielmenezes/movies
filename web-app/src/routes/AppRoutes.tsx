import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Home from "../pages/home/Home";
import PrivateRoute from "./PrivateRoutes";
import Movies from "@/pages/movies/Movies";
import Series from "@/pages/series/Series";
import Favorites from "@/pages/favorites/Favorites";
import Layout from "@/pages/layout/Layout";
import CadastroTitulo from "@/pages/cadastro-titulo/CadastroTitulo";
import CadastroUsuario from "@/pages/cadastro-usuario/CadastroUsuario";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas dentro do Layout */}
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/cadastro-titulo" element={<CadastroTitulo />} />
        </Route>
      </Route>

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
