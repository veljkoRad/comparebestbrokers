import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Underline from "../../components/Underline";

const RecentBlogs = ({ posts }) => {
  return (
    <Container sx={{ paddingTop: 16, paddingBottom: 16 }}>
      <Typography variant="h2" color="black">
        Recent news
      </Typography>
      <Underline />
      <Typography variant="h3" color="black" sx={{ marginTop: 6 }}>
        Explore these featured brokers to get started.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          justifyContent: {
            xs: "center",
            lg: "flex-start",
          },
        }}
      >
        {posts.slice(-6).map((item) => (
          <Card sx={{ maxWidth: 360, marginTop: 6, width: "100%" }}>
            <CardMedia
              sx={{ height: 220 }}
              image={item.imageUrl}
              title={item.title}
              alt="Post Image"
            />
            <CardContent sx={{ padding: "16px 0 0" }}>
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                color="black"
              >
                {item.title}
              </Typography>
              <Typography
                variant="description"
                color="black"
                dangerouslySetInnerHTML={{
                  __html:
                    item.content.length > 350
                      ? item.content.slice(0, 350) + "..."
                      : item.content,
                }}
              />
            </CardContent>
            <CardActions sx={{ padding: 0 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ color: (theme) => theme.palette.black.main }}
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default RecentBlogs;
