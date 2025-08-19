import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Home from "../pages/home/Home";
import PrivateRoute from "./PrivateRoutes";
import Movies from "@/pages/movies/Movies";
import Series from "@/pages/series/Series";
import Favorites from "@/pages/favorites/Favorites";
import Layout from "@/pages/layout/Layout";
import Profile from "@/pages/profile/Profile";

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
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
