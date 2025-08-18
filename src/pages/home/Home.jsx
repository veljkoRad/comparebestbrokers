import Banner from "./Banner";

import { Box } from "@mui/material";
import RecentBlogs from "./RecentBlogs";
import BestBrokers from "./BestBrokers";

const Home = ({ posts, brokers }) => {
  return (
    <Box component="main">
      <Banner />
      <RecentBlogs posts={posts} />
      <BestBrokers brokers={brokers} />
    </Box>
  );
};

export default Home;
