import Hero from "./Hero";
import { useEffect } from "react";
import { Box } from "@mui/material";
import RecentBlogs from "./RecentBlogs";
import BestBrokers from "./BestBrokers";

const Home = ({ posts, brokers, handleOpen, handleClose, openBroker, acf }) => {
  return (
    <Box component="main">
      <title>Home | Compare Best Brokers</title>
      <meta name="description" content="Find top brokers and the latest market posts." />
      <meta name="keywords" content="brokers, trading, news, stocks, forex" />
      <Hero acf={acf} />
      <RecentBlogs posts={posts} acf={acf} />
      <BestBrokers brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} acf={acf} />
    </Box>
  );
};

export default Home;
