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
import { color } from "framer-motion";

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
      primary: "#94A9C9", secondary:"#1CC2E7", white:'#fff', black:'#000',mobile:'#E6F0FF',gray:'#66768f',pagination:'#222f43'
    },
    background: { default: "#0F172A", paper:'#0F172A' }
  },
  typography: {
    fontFamily:'"Noto Sans", sans-serif',
    h1: {
      fontSize: "64px",
      fontWeight: 800,
      "@media (max-width:767px)": { fontSize: "44px" },
      "@media (max-width:575px)": { fontSize: "34px" },
    },
    h2: {
      fontSize: "45px",
      fontWeight: 700,
      color:(theme)=>theme.palette.secondary.main,
       "@media (max-width:767px)": { fontSize: "35px" },
       "@media (max-width:575px)": { fontSize: "20px" },
    },
     h3: {
      fontSize: "24px",
      fontWeight: 700,
      "@media (max-width:767px)": { fontSize: "17px" },
    },

    h4: {
      fontSize: "20px",
      fontWeight: 700,
    },
    button: {
      fontSize: "14px",
      fontWeight: 400,
      textTransform: "capitalize",
    },
     buttonMain: {
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "capitalize",
    }
 
  },
  breakpoints: {
    values: {
      xs: 0,
      xxs:300,
      sm: 767,
      md: 991,
      lg: 1135,
      xl: 1200,
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
    MuiPaginationItem: {
      styleOverrides: {
        // Default style
        root: ({theme}) =>({
          color:theme.palette.text.white,
          background:theme.palette.text.pagination,
          '&.Mui-selected': {
            backgroundColor: theme.palette.text.white,
            color:theme.palette.primary.main
          },
          '&:hover': {
            backgroundColor: theme.palette.text.secondary,
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.text.secondary,
      },
        }),

      },
    },
     MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#1CC2E7',
          borderWidth: '2px',
          borderRadius:'8px'
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
