import Banner from "./Banner";

import { Box } from "@mui/material";
import RecentBlogs from "./RecentBlogs";

const Home = ({ posts }) => {
  return (
    <Box component="main">
      <Banner />
      <RecentBlogs posts={posts} />
    </Box>
  );
};

export default Home;
