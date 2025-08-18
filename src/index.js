import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#133d54",
    },
    secondary: {
      main: "#f5f8fa",
    },
    white: {
      main: "#fff",
    },
    black: {
      main: "#231f20",
    },
    background: { default: "#fff" },
  },
  typography: {
    h1: {
      fontSize: "56px",
      fontWeight: 700,
      "@media (max-width:766px)": { fontSize: "32px" },
    },
    h2: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 400,
    },
    button: {
      fontSize: "16px",
      fontWeight: 600,
      textTransform: "capitalize",
    }
 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 991,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          color: theme.palette.info.main,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper:({theme})=> ({
          backgroundColor: theme.palette.primary.main
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.white.main,
          textDecoration: "none",
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "72px",
          justifyContent: "space-between",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
