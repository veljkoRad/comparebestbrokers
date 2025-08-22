import Banner from "./Banner";

import { Box } from "@mui/material";
import RecentBlogs from "./RecentBlogs";
import BestBrokers from "./BestBrokers";

const Home = ({ posts, brokers, handleOpen, handleClose, openBroker }) => {
  return (
    <Box component="main">
      <Banner />
      <RecentBlogs posts={posts} />
      <BestBrokers brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} />
    </Box>
  );
};

export default Home;
