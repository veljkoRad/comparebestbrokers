import { Routes, Route } from 'react-router-dom';
import { Box } from "@mui/material";
import Brokers from './pages/Brokers';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/brokers" element={<Brokers />} />

    </Routes>
  );
}

export default App;
