import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../../components/TextGradient";
import { useState } from "react";

const RecentBlogs = ({ posts }) => {
  const [postHover, setPostHover] = useState(false)


  return (
    <Container sx={{ paddingTop: '70px', paddingBottom: 0 }}>
      <TextGradient variant="h2">
        Recent news
      </TextGradient>
      <Typography variant="h4" color="text" sx={{ marginTop: '10px' }}>
        Explore these featured brokers to get started.
      </Typography>
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
      >
        {posts.slice(0, 6).map((item) => (
          <Link component={RouterLink} to={`/blogs/${item.slug}`} >
            <Card sx={{
              marginTop: '30px', position: 'relative', width: "354px", height: '415px', boxShadow: 'none', backgroundImage: `url(${item.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '30px 15px'
            }} onMouseEnter={() => setPostHover(!postHover)} onMouseLeave={() => setPostHover(false)}>
              <Box component='img' src='/images/bg-trans.png' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}></Box>
              <Typography variant="h3" sx={{ position: 'relative', zIndex: 2, color: (theme) => postHover ? theme.palette.secondary.main : theme.palette.text.secondary }}>{item.title}</Typography>

            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default RecentBlogs;
