import { motion } from "framer-motion";
import { Box, Button, Container, Typography } from "@mui/material";
import TextGradient from "../../components/TextGradient";
import { BannerButton, BannerMainBox, BannerShadowBox, BannerTextBox } from "../../styles/homeStyled";

const Banner = () => {
  return (
    <BannerMainBox
    >
      <BannerShadowBox
        component="img"
        src="/images/shadow-1.svg"
        alt="Logo"
      />
      <Container
        maxWidth="lg"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <BannerTextBox >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Typography
              variant="h1"
              color="text.white"
              sx={{ textTransform: "uppercase" }}
            >
              Your <TextGradient
                component='span'
                variant="h1"
              >
                Global Trading Guide
              </TextGradient>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Typography variant="body1" color="text">
              Stay ahead in the world of trading with clear insights and unbiased broker reviews. Whether you’re exploring commodities, futures, or forex, our community provides transparent evaluations and practical knowledge to help you navigate global markets with confidence.
            </Typography>
            <BannerButton variant="contained" sx={{}}><Typography variant="buttonMain" sx={{ color: (theme) => theme.palette.text.white }}>Learn more</Typography></BannerButton>
          </motion.div>
        </BannerTextBox>

      </Container >
    </BannerMainBox >
  );
};

export default Banner;
