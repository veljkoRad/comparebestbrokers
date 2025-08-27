import Hero from "./Hero";

import { Box } from "@mui/material";
import RecentBlogs from "./RecentBlogs";
import BestBrokers from "./BestBrokers";

const Home = ({ posts, brokers, handleOpen, handleClose, openBroker, acf }) => {
  return (
    <Box component="main">
      <Hero acf={acf} />
      <RecentBlogs posts={posts} acf={acf} />
      <BestBrokers brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} acf={acf} />
    </Box>
  );
};

export default Home;
