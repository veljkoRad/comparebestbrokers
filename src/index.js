import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App";

import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/800.css";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#0F172A",
      light:"#131C31"
    },
    secondary: {
      main: "#b9e0f2", 
    },
    text: {
      primary: "#94A9C9", secondary:"#1CC2E7", white:'#fff', black:'#000',mobile:'#E6F0FF'
    },
    background: { default: "#0F172A" },
  },
  typography: {
    fontFamily:'"Noto Sans", sans-serif',
    h1: {
      fontSize: "64px",
      fontWeight: 800,
      "@media (max-width:766px)": { fontSize: "32px" },
    },
    h2: {
      fontSize: "45px",
      fontWeight: 700,
    },
     h3: {
      fontSize: "24px",
      fontWeight: 700,
    },

    h4: {
      fontSize: "18px",
      fontWeight: 400,
    },
    button: {
      fontSize: "14px",
      fontWeight: 400,
      textTransform: "capitalize",
    }
 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 991,
      lg: 1135,
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
          color: theme.palette.text.primary,
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
