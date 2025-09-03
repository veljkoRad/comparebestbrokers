import { motion } from "framer-motion";
import { Box, Container, Link, Skeleton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../../components/TextGradient";
import { BannerButton, BannerMainBox, BannerShadowBox, BannerTextBox } from "../../styles/homeStyled";

const Hero = ({ acf }) => {
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
        sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: 'space-between', position: 'relative' }}
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
              {acf.home.heroTitleWhite}
              <TextGradient
                component='span'
                variant="h1"

              >
                &nbsp;{acf.home.heroTitleBlue}
              </TextGradient>
            </Typography>


          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Typography variant="body1" color="text" dangerouslySetInnerHTML={{ __html: acf.home.heroSubtitle }}>
            </Typography>
            {acf.home.heroButtonLink && acf.home.heroButtonText && (
              <Link component={RouterLink} to={acf.home.heroButtonLink}>
                <BannerButton variant="contained" ><Typography variant="buttonMain" sx={{ color: (theme) => theme.palette.text.white }}>{acf.home.heroButtonText}</Typography></BannerButton>
              </Link>
            )}
          </motion.div>
        </BannerTextBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Box component="img" src={acf.home.heroImage} alt="" sx={{ display: { xs: 'none', sm: 'block' }, width: { xs: '350px', sm: '500px' }, position: "absolute", zIndex: '0', right: '0', top: '50%', transform: 'translateY(-50%)', filter: { xs: 'brightness(40%)', md: 'brightness(100%)' } }} />
        </motion.div>
      </Container >
    </BannerMainBox >
  );
};

export default Hero;
