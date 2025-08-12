// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Ativa modo escuro global
    primary: {
      main: "#e50914",
    },
    secondary: {
      main: "#ff9800", // Laranja para destaques
    },
    background: {
      default: "#121212", // Fundo principal
      paper: "#1e1e1e",   // Fundo de cards
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h5: {
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.3px",
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
