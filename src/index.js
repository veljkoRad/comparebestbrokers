import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import '@fontsource/lato'
import '@fontsource/lato/100.css'; 
import '@fontsource/lato/400.css'; 
import '@fontsource/lato/700.css'; 
import App from './App';

const theme = createTheme({
  spacing:4,
    palette: {
    primary: {
      main: "#133d54",
      light: "#012423",
      dark: '#0D1B1B80'
    },
    secondary: {
      main: "#000",
      dark: '#02706d'
    },
    info: {
      main: '#fff'
    },
    error: {
      main: '#c62828'
    },
    success: {
      main: '#1b5e20'
    },    
    background: { default: '#fff' },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily:"Lato, 'Trebuchet MS', serif",
    h1: {
      fontSize: '56px',
      fontWeight: 700,
      '@media (max-width:766px)': { fontSize: '32px' }

    },
    h2: {
      fontSize: '32px',
      fontWeight: 700
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700
    },
    button: {
      fontSize: '16px',
      fontWeight:600,
      textTransform:'capitalize'
    },
    description: {
      fontWeight:'100',
      fontSize: '16px'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 991,
      lg: 1200,
      xl: 1440,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root:({theme}) => ({
          textDecoration:'none',
          color:theme.palette.info.main
        })
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fff',
          textDecoration: 'none'
        },
      },
    },
        MuiList: {
      styleOverrides: {
        root: {
          padding:'0'
        },
      },
    },
    MuiToolbar: {
       styleOverrides: {
        root: {
           minHeight: '72px', 
           justifyContent: 'space-between'
        },
      },
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
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
