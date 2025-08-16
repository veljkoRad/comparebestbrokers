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
      <Box />
      <Container
        maxWidth="lg"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Typography
            variant="h1"
            color="white"
            sx={{ textTransform: "uppercase" }}
          >
            This is some main Banner text
          </Typography>
          <Typography variant="description" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
