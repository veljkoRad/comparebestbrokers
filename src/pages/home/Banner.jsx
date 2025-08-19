import { Box, Container, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "453px", sm: "545px" },
        background: (theme) => theme.palette.primary.light
      }}
    >
      <Box
        component="img"
        src="/images/shadow-1.svg"
        alt="Logo"
        sx={{ width: 500, height: 800, position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}
      />
      <Container
        maxWidth="lg"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "520px", display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography
            variant="h1"
            color="text.white"
            sx={{ textTransform: "uppercase" }}
          >
            Your <Typography
              component='span'
              variant="h1"
              sx={{
                background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Global Trading Guide
            </Typography>
          </Typography>

          <Typography variant="body1" color="text">
            Stay ahead in the world of trading with clear insights and unbiased broker reviews. Whether you’re exploring commodities, futures, or forex, our community provides transparent evaluations and practical knowledge to help you navigate global markets with confidence.
          </Typography>
        </Box>
      </Container >
    </Box >
  );
};

export default Banner;
