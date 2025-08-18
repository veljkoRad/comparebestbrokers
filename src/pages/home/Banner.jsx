import { Box, Container, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "382px", sm: "670px" },
        background:
          "linear-gradient(315deg, #6aaad9, #4a8ab3, #2e6b8c, #1b4a6f, #133d54)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "500px", display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography
            variant="h1"
            color="white"
            sx={{ textTransform: "uppercase" }}
          >
            Your Global Trading Guide
          </Typography>
          <Typography variant="body1" color="white">
            Stay ahead in the world of trading with clear insights and unbiased broker reviews. Whether you’re exploring commodities, futures, or forex, our community provides transparent evaluations and practical knowledge to help you navigate global markets with confidence.
          </Typography>
        </Box>
      </Container >
    </Box >
  );
};

export default Banner;
