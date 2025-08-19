import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const MenuHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex gap-4">
      <Button
        variant={location.pathname === "/" ? "contained" : "text"}
        color="primary"
        onClick={() => handleNavigation("/")}
      >
        Home
      </Button>
      <Button
        variant={location.pathname === "/movies" ? "contained" : "text"}
        color="primary"
        onClick={() => handleNavigation("/movies")}
      >
        Filmes
      </Button>
      <Button
        variant={location.pathname === "/series" ? "contained" : "text"}
        color="primary"
        onClick={() => handleNavigation("/series")}
      >
        Séries
      </Button>
      <Button
        variant={location.pathname === "/favorites" ? "contained" : "text"}
        color="primary"
        onClick={() => handleNavigation("/favorites")}
      >
        Favoritos
      </Button>
    </div>
  );
};

export default MenuHeader;
