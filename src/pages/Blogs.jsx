import { motion } from "framer-motion";
import { useState } from "react";
import { Box, Container, Link, Pagination, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../components/TextGradient";
import { BlogLink } from "../styles/blogsStyled";

const Blogs = ({ posts, acf }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };


  const blogsWithBanner = [
    ...currentPosts.slice(0, 4),
    { type: 'banner' },
    ...currentPosts.slice(4)
  ];

  return (
    <>
      <title>News | Compare Best Brokers</title>
      <meta name="description" content="Find  latest market posts." />
      <meta name="keywords" content="brokers, trading, news, stocks, forex" />
      <Container sx={{ paddingY: '50px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <TextGradient>{acf.blogs.title}</TextGradient>
          <Typography sx={{ marginTop: '20px', maxWidth: '637px' }} dangerouslySetInnerHTML={{ __html: acf.blogs.subtitle }} />
          <Box
            style={{ borderBottom: "1px solid #222F43", marginTop: '20px', marginBottom: "50px", }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {
              blogsWithBanner.map((item, index) => {

                if (item.type === 'banner') {
                  return (

                    acf.home.bannerImage && acf.home.bannerLink && (
                      <Link component={RouterLink} to={acf.home.bannerLink} target="_blank">
                        <img
                          src={acf.home.bannerImage}
                          alt="banner"
                          style={{ display: "block", margin: "auto", width: '100%' }}
                        />
                      </Link>
                    )

                  )
                }
                const shortContent = item.content.length > 150 ? item.content.slice(0, 150) + '...' : item.content;
                const shortTitle = item.title.length > 70 ? item.title.slice(0, 70) + '...' : item.title;


                return (
                  <BlogLink component={RouterLink} to={`/news/${item.slug}`} key={index} >
                    <Box
                      component="img"
                      src={item.imageLarge}
                      alt={item.title}
                      sx={{
                        width: { xs: '275px', sm: '300px', md: '400px', xl: '500px' },
                        height: { xs: '155px', sm: '169px', md: '226px', xl: '282px' },
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: '16px',
                        filter: 'brightness(80%)'
                      }}
                    />
                    <Typography color="text.gray">#{item.categoryName}</Typography>
                    <Typography variant="h3" className="hoverTitle">{shortTitle}</Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: shortContent }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.gray" variant="button">{item.date}</Typography>
                      <Typography sx={{ marginLeft: 'auto', '&:hover': { color: (theme) => theme.palette.text.secondary, transition: "all 0.3s ease 0s", } }}>Read More</Typography>
                    </Box>

                  </BlogLink>
                )

              })
            }
          </Box>
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            size="large"
            sx={{
              marginTop: '30px'
            }}
          />
        </motion.div>
      </Container >
    </>
  );
};

export default Blogs;
