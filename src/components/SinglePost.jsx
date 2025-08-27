import { useState, useEffect } from "react";
import { Box, Container, IconButton, } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TextGradient from "./TextGradient";
import { HtmlWrapper, SingleBoxContainer, SinglePostCard } from "../styles/componentStyled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from "./Sidebar";



const SinglePost = ({ posts, brokers, handleOpen, handleClose, openBroker, categories, acf }) => {
  const { slug } = useParams();
  const [single, setSingle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug && posts) {
      const foundSingle = posts.find((item) => item.slug === slug);
      setSingle(foundSingle);
    }
  }, [slug, posts]);

  if (!single) return <p>Loading...</p>;



  return (
    <>
      <Box>
        <Container
          maxWidth="lg"
          component="section"
          sx={{ paddingTop: "10px", paddingBottom: "50px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <IconButton onClick={() => navigate(-1)} aria-label="go back">
              <ArrowBackIcon fontSize="large" sx={{ color: (theme) => theme.palette.text.primary, '&:hover': { color: (theme) => theme.palette.text.secondary } }} />
            </IconButton>
            <Box
              style={{ borderBottom: "1px solid #222F43", marginBottom: "50px", marginTop: '10px' }}
            />
            <SingleBoxContainer>
              <div style={{ maxWidth: '730px' }}>
                <TextGradient variant="h2" sx>
                  {single.title}
                </TextGradient>
                <SinglePostCard>
                  <Box
                    component='img'
                    sx={{
                      maxWidth: "731px",
                      width: "100%",
                      borderRadius: "16px",
                      height: { xs: '180px', sm: '330px' },
                      objectFit: "cover",
                    }}
                    src={single.imageLarge}
                    alt={single.title}
                  />
                </SinglePostCard>
                <HtmlWrapper dangerouslySetInnerHTML={{ __html: single.content }} />
              </div>
              <Sidebar brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} categories={categories} acf={acf} />
            </SingleBoxContainer>
          </motion.div>
        </Container>
      </Box >
    </>
  );
};

export default SinglePost;
