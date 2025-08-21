import { useState, useEffect } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import TextGradient from "./TextGradient";

const HtmlWrapper = styled("Typography")(({ theme }) => ({
  "& h1": {
    color: theme.palette.secondary.main,
  },
  "& h2": {
    color: theme.palette.secondary.main,
  },
  "& h3": {
    color: theme.palette.secondary.main,
  },
}));

const SinglePost = ({ posts }) => {
  const { slug } = useParams();
  const [single, setSingle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug && posts) {
      const foundSingle = posts.find((item) => item.slug === slug);
      setSingle(foundSingle);
    }
  }, [slug, posts]);

  if (!single) return <p>Loading...</p>;

  const SingleCard = styled(Card)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    maxWidth: "1024px",
    height: "400px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "1000px",
    },
  }));

  return (
    <>
      <Box>
        <Container
          maxWidth="sm"
          component="section"
          sx={{ paddingY: "50px !important" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Box
              sx={{ borderBottom: "1px solid #222F43 ", marginBottom: "50px" }}
            ></Box>
            <TextGradient variant="h2" sx>
              {single.title}
            </TextGradient>
            <SingleCard>
              <img
                style={{
                  maxWidth: "731px",
                  width: "100%",
                  borderRadius: "16px",
                  height: "330px",
                  objectFit: "cover",
                  marginTop: "50px",
                }}
                src={single.imageLarge}
                alt={single.title}
              />
            </SingleCard>
            <HtmlWrapper dangerouslySetInnerHTML={{ __html: single.content }} />
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default SinglePost;
