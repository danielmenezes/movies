import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import image from "@/assets/background-app.jpg";

export default function Layout() {
  return (
    <div className="absolute inset-0 w-full h-screen flex flex-col">
      <div className="relative w-full h-2/5">
        <header className="w-full fixed top-0 left-0 z-20">
          <Header />
        </header>

        <img
          src={image}
          alt="Capa"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black from-[40%] to-transparent" />
      </div>

      {/* Área de conteúdo com degradê vertical */}
      <div className="flex-1 bg-gradient-to-b from-black via-gray-900 to-gray-800">
        <Outlet />
      </div>
    </div>
  );
}
