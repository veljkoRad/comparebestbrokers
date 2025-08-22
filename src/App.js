import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Brokers from "./pages/brokers/Brokers";
import Home from "./pages/home/Home";
import News from "./pages/News";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SinglePost from "./components/SinglePost";

function App() {
  const [posts, setPosts] = useState([]);
  const [brokers, setBrokers] = useState([]);

   const [openBroker, setOpenBroker] = useState(null);

  const handleOpen = (broker) => setOpenBroker(broker);
  const handleClose = () => setOpenBroker(null);
  

    useEffect(() => {
    const postsRequest = axios.get(
      "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/posts?_embed"
    );
    const brokersRequest = axios.get(
      "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/brokers"
    );

    Promise.all([postsRequest, brokersRequest])
      .then(([postsRes, brokersRes]) => {
        const simplifiedPosts = postsRes.data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          imageLarge: post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url || null,
          slug: post.slug,
          categoryName: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
          date:post.date.slice(0,10)
        }));

        const simplifiedBrokers = brokersRes.data.map((broker) => ({
          id: broker.id,
          name: broker.acf?.broker_name || broker.title.rendered,  
          logo: broker.acf?.broker_logo?.url || null,  
          rating: broker.acf?.rating || 0,
          minDeposit:broker.acf?. minimum_deposit,
          depositCurrencies: broker.acf?.deposit_currencies,
          fees: broker.acf?.fees ,
          maximum_leverage: broker.acf?.maximum_leverage || null,  
          button: broker.acf?.cta_button_url || null,
          slug: broker.slug,
        }));

        setPosts(simplifiedPosts);
        setBrokers(simplifiedBrokers);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} />} />
        <Route path="/brokers" element={<Brokers />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<SinglePost posts={posts} brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
