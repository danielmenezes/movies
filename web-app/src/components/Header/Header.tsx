import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuHeader from "./components/MenuHeader";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState<string>('');
  const [tagUserName, setTagUserName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    setUserName(name!)

    setTagUserName(name!.split(" ")
                .slice(0, 2) // pega apenas os dois primeiros nomes
                .map((n) => n[0])
                .join("")
                .toUpperCase())
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
    handleCloseMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Filmes&Séries
        </Typography>

        <MenuHeader />

        {/* Avatar que abre o menu */}
        <Avatar
          alt="Usuário"
          sx={{ cursor: "pointer", bgcolor: "primary.main" }}
          onClick={handleOpenMenu}
        >
          {tagUserName}
        </Avatar>

        {/* Menu dropdown */}
        <Menu
          sx={{ mt: 1 }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}

        >
           <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.5,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {tagUserName}
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bold">
              {userName}
            </Typography>
          </Box>

          <Divider />

          <MenuItem
            sx={{ height: '30px' }}
            onClick={() => navigate('/cadastro-titulo')}
          >
            Adicionar Título
          </MenuItem>
          <MenuItem
            sx={{ height: '30px' }}
            onClick={() => navigate('/cadastro-usuario')}
          >
            Adicionar Usuário
          </MenuItem>
          <MenuItem
            sx={{ height: '30px' }}
            onClick={handleLogout}
          >
            Logout
            <LogoutIcon sx={{ ml: 1 }} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;