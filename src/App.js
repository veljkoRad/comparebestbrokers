import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Brokers from "./pages/Brokers";
import Home from "./pages/home/Home";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SinglePost from "./components/SinglePost";
import SingleBroker from "./components/SingleBroker";
import { Box, CircularProgress } from "@mui/material";
import SearchResult from "./components/SearchResult";
import Blog2 from "./pages/Blog2";
import Page404 from "./components/Page404";
import { loadInitialData } from "./services/wordpressApi";

function App() {
  const [posts, setPosts] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [categories, setCategories]= useState([])
  const [menus, setMenus] = useState([]);
  const [acf, setAcf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBroker, setOpenBroker] = useState(null);
  
  const location=useLocation();


  useEffect(() => {
    window.dispatchEvent(new Event('app-hydrated'));
  loadInitialData()
    .then(({ posts, brokers, menus, categories, acf }) => {
      setPosts(posts);
      setBrokers(brokers);
      setMenus(menus);
      setCategories(categories);
      setAcf(acf);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

// When we open Broker card on home page, and when I go to other route, than go back i want this card to be turned off
   useEffect(() => {
    setOpenBroker(null);
  }, [location]);

  const handleOpen = (broker) => setOpenBroker(broker);
  const handleClose = () => setOpenBroker(null);
return (
  <>
    {loading ? (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" size={60} thickness={5}  />
      </Box>
    ) : (
      <>
        <Navbar menus={menus} acf={acf} posts={posts} brokers={brokers} />
        <Routes>
          <Route path="/"  element={<Home posts={posts} brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} acf={acf} />} />
          <Route path={`/${menus[1]?.title.toLowerCase().replace(/\s+/g, '-')}`}  element={<Brokers brokers={brokers} acf={acf} />} />
          <Route path={`/${menus[1]?.title.toLowerCase().replace(/\s+/g, '-')}/:slug`} element={<SingleBroker brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} categories={categories} acf={acf}  />} />
          <Route path={`/${menus[2]?.title.toLowerCase().replace(/\s+/g, '-')}`} element={<Blogs posts={posts} acf={acf} />} />
          <Route path={`/${menus[2]?.title.toLowerCase().replace(/\s+/g, '-')}/:slug`} element={<SinglePost posts={posts} brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} categories={categories} acf={acf} />}  />
          <Route path={`/${menus[3]?.title.toLowerCase().replace(/\s+/g, '-')}`}  element={<Blog2 acf={acf}  />} />
          <Route path="/search" element={<SearchResult posts={posts} brokers={brokers} />} />
          <Route path="*" element={<Page404  />} />
        </Routes>
        
        <Footer menus={menus} acf={acf} />
      </>
    )}
  </>
);
}

export default App;
