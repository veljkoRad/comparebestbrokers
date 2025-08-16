import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Brokers from "./pages/brokers/Brokers";
import Home from "./pages/home/Home";
import News from "./pages/News";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        const simplifiedPosts = response.data.map((post) => ({
          id: post.id,
          // This .rendered is for displaying as html it is concecnted with dangerouslySetInnerHTML
          title: post.title.rendered,
          content: post.content.rendered,
          imageUrl:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
          slug: post.slug,
          categoryName:
            post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
        }));
        console.log(simplifiedPosts);
        setPosts(simplifiedPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/brokers" element={<Brokers />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </>
  );
}

export default App;
