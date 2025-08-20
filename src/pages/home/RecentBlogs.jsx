import {
  Box,
  Card,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../../components/TextGradient";
import { motion } from "framer-motion";

const RecentBlogs = ({ posts }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // each child fades in after previous
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute' }}
      >
        <Box component='img' src='/images/shadow-3.svg' sx={{ width: 500, height: 800, position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none' }}></Box>
      </motion.div>
      <Container sx={{ paddingTop: '70px', paddingBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TextGradient variant="h2">
            Recent news
          </TextGradient>

          <Typography variant="h4" color="text" sx={{ marginTop: '10px' }}>
            Explore these featured brokers to get started.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            paddingTop: '40px',
            justifyContent: {
              xs: "center",
              lg: "flex-start",
            },
          }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.slice(0, 6).map((item, index) => (
            <motion.div key={index} variants={itemVariants}
              transition={{ duration: 0.5 }}>
              <Link component={RouterLink} to={`/blogs/${item.slug}`} sx={{
                overflow: 'hidden',
                marginTop: '30px',
                "&:hover .hoverText": {
                  color: '#1CC2E7',
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease 0s'
                }, "&:hover .hoverImage": {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease 0s'
                },
                "&:hover .hoverDate": {
                  color: '#94A9C9',
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease 0s'
                },

              }} >
                <Card sx={{
                  position: 'relative',
                  width: "354px",
                  height: '415px',
                  boxShadow: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px 15px',
                }} >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: '-50%',
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.title}
                      className="hoverImage"
                      sx={{
                        minWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                  <Box component='img' src='/images/bg-trans.png'
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}></Box>
                  <Typography className="hoverText" variant="h3" sx={{
                    transition: 'all 0.3s ease 0s',
                    position: 'relative',
                    zIndex: 3,
                    color: (theme) => theme.palette.secondary.main
                  }}>
                    {item.title}
                  </Typography>
                  <Typography className="hoverDate" variant="button" sx={{
                    transition: 'all 0.3s ease 0s',
                    position: 'relative',
                    zIndex: 3,
                    color: '#66768F',
                    marginLeft: 'auto'
                  }}>
                    {item.date}
                  </Typography>
                </Card>
              </Link>
            </motion.div>
          ))}
        </Box>

      </Container >
    </Box >
  );
};

export default RecentBlogs;
