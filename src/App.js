import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
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
    setOpenBroker(null);
  }, [location]);

  const handleOpen = (broker) => setOpenBroker(broker);
  const handleClose = () => setOpenBroker(null);
  

    useEffect(() => {
    const postsRequest = axios.get(
      "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/posts?_embed"
    );
    const brokersRequest = axios.get(
      "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/brokers?orderby=menu_order&order=asc"
    );
        const ACFRequest = axios.get(
      "https://comparebestbrokers.com/cbb_wp/wp-json/acf/v2/options"
    );

    const categoriesRequest= axios.get("https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/categories");
    const menuRequest =axios.get("https://comparebestbrokers.com/cbb_wp/wp-json/wp-menus/v1/menus/navMenu",{});

    Promise.all([postsRequest, brokersRequest,menuRequest, categoriesRequest, ACFRequest])
      .then(([postsRes, brokersRes, menuRes, categoriesRes, ACFRes]) => {
        const simplifiedPosts = postsRes.data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          imageLarge: post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url || 'https://comparebestbrokers.com/cbb_wp/wp-content/uploads/2025/09/no-image-icon.webp',
          slug: post.slug,
          categoryName: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
          date:post.date.slice(0,10)
        }));

        const simplifiedMenu = menuRes.data.map((post) => ({
             id: post.ID,
          title: post.post_title,
          url: post.url,
          submenu: post.menu_item_parent,
        }));

        const simplifiedBrokers = brokersRes.data.map((broker) => ({
          id: broker.id,
          name: broker.acf?.broker_name || broker.title.rendered,  
          logo: broker.acf?.broker_logo?.url || 'https://comparebestbrokers.com/cbb_wp/wp-content/uploads/2025/08/picture_14534501.png',  
          rating: broker.acf?.rating || 0,
          minDeposit:broker.acf?.minimum_deposit,
          depositCurrencies: broker.acf?.deposit_currencies,
          fees: broker.acf?.fees ,
          maximum_leverage: broker.acf?.maximum_leverage || null,  
          button: broker.acf?.cta_button_url || null,
          ctaTop: broker.acf?.broker_cta_1 || null,
          ctaMid: broker.acf?.broker_cta_2 || null,
          ctaBottom: broker.acf?.broker_cta_3 || null,
          slug: broker.slug,
          shortDescription: broker.acf?.short_description || null,
          keyBenefits: broker.acf?.key_benefits || null,
        }));

        const simplifiedACF = {
          home: {
            heroImage: ACFRes.data.acf?.home?.hero_image || "",
            heroTitleWhite: ACFRes.data.acf?.home?.hero_title_white || "",
            heroTitleBlue: ACFRes.data.acf?.home?.hero_title_blue || "",
            heroSubtitle: ACFRes.data.acf?.home?.hero_subtitle || "",
            heroButtonLink: ACFRes.data.acf?.home?.hero_button_link || "",
            heroButtonText: ACFRes.data.acf?.home?.hero_button_text || "",
            bannerLink: ACFRes.data.acf?.home?.banner_link || "",
            bannerImage: ACFRes.data.acf?.home?.banner_image || "",
            banner2Link: ACFRes.data.acf?.home?.banner_2_link || "",
            banner2Image: ACFRes.data.acf?.home?.banner_2_image || "",
            banner3Link: ACFRes.data.acf?.home?.banner_3_link || "",
            banner3Image: ACFRes.data.acf?.home?.banner_3_image || "",
            homeBlogsTitle: ACFRes.data.acf?.home?.home_blogs_title || "",
            homeBlogsSubtitle: ACFRes.data.acf?.home?.home_blogs_subtitle || "",
            homeBrokersTitle: ACFRes.data.acf?.home?.home_brokers_title || "",
            homeBrokersSubtitle: ACFRes.data.acf?.home?.home_brokers_subtitle || "",
          },
          footer: {
            copyright: ACFRes.data.acf?.footer?.copyright_text || "",
            risk: ACFRes.data.acf?.footer?.risk_warning_text || "",
            facebook: ACFRes.data.acf?.footer?.facebook_link || "",
            instagram: ACFRes.data.acf?.footer?.instagram_link || "",
            linkedin: ACFRes.data.acf?.footer?.linkedin_link || "",
          },
          header: {
            logo: ACFRes.data.acf?.header?.logo || "",
          },
          blogs: {
            title: ACFRes.data.acf?.blogs?.blogs_title || "",
            subtitle: ACFRes.data.acf?.blogs?.blogs_subtitle || "",
          },
          brokers: {
            title: ACFRes.data.acf?.brokers?.brokers_title || "",
            subtitle: ACFRes.data.acf?.brokers?.brokers_subtitle || "",
          },
          sidebar: {
            brokersSidebarTitle: ACFRes.data.acf?.sidebar?.brokers_sidebar_title || "",
            sidebarBannerLink: ACFRes.data.acf?.sidebar?.sidebar_banner_link || "",
            sidebarBannerImage: ACFRes.data.acf?.sidebar?.sidebar_banner_image.url || "",
          },
          blog_2 :{
            title: ACFRes.data.acf?.blog_2?.blog_2_title || "",
            content: ACFRes.data.acf?.blog_2?.blog_2_content || "",
            image: ACFRes.data.acf?.blog_2?.blog_2_image || "",
          }
        };

      

        const allCategories =categoriesRes.data.map((categorie)=>categorie.name);
        const filteredCategories = allCategories.filter(cat => cat !== "Uncategorized");
        setCategories(filteredCategories);
        setPosts(simplifiedPosts);
        setBrokers(simplifiedBrokers);
        setMenus(simplifiedMenu);
        setAcf(simplifiedACF);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
