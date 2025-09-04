import { Box, Card, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../../components/TextGradient";
import { motion } from "framer-motion";
import { RecentBlogsBox, RecentBlogsCard, RecentBlogsLink } from "../../styles/homeStyled";

const RecentBlogs = ({ posts, acf }) => {
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
    <Box sx={{ position: "relative" }}>
      <Container sx={{ paddingTop: "70px", paddingBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {acf.home.bannerImage && acf.home.bannerLink && (
            <Link component={RouterLink} to={acf.home.bannerLink} target="_blank">
              <img
                src={acf.home.bannerImage}
                alt="banner"
                style={{ display: "block", margin: "0 auto 70px", width: '100%', maxWidth: '1111px' }}
              />
            </Link>
          )}
          <TextGradient variant="h2">{acf.home.homeBlogsTitle}</TextGradient>

          <Typography variant="h3" color="text" sx={{ marginTop: "10px" }}>
            {acf.home.homeBlogsSubtitle}
          </Typography>


          <RecentBlogsBox
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >

            {posts.slice(0, 6).map((item, index) => {
              return (
                <motion.div key={index} variants={itemVariants}>
                  <article>
                    <RecentBlogsLink
                      component={RouterLink}
                      to={`/news/${item.slug}`}

                    >
                      <RecentBlogsCard>
                        <Box
                          component='img'
                          src={item.imageLarge}
                          alt={item.title}
                          className="hoverImage"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: { xs: '300px', md: '354px' },
                            height: { xs: '352px', md: '415px' },
                            objectFit: "cover",
                            objectPosition: "center",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <img
                          src="/images/bg-trans.png"
                          alt="transparent darker"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                            zIndex: 2,
                          }}
                        ></img>
                        <Typography
                          className="hoverText"
                          variant="h3"
                          sx={{
                            transition: "all 0.3s ease 0s",
                            position: "relative",
                            zIndex: 3,
                            color: (theme) => theme.palette.secondary.main,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          className="hoverDate"
                          variant="button"
                          sx={{
                            transition: "all 0.3s ease 0s",
                            position: "relative",
                            zIndex: 3,
                            color: "#66768F",
                            marginLeft: "auto",
                          }}
                        >
                          {item.date}
                        </Typography>
                      </RecentBlogsCard>
                    </RecentBlogsLink>
                  </article>
                </motion.div>
              );
            })}
          </RecentBlogsBox>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RecentBlogs;
