import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Box, Container, Link, Pagination, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import TextGradient from "../components/TextGradient";
import { BlogLink } from "../styles/blogsStyled";

const Blogs = ({ posts, acf }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // read query params
  const authorParam = searchParams.get("author");
  const tagParam = searchParams.get("tag");
  const initialPage = Number(searchParams.get("page")) || 1;

  let filteredPosts = posts;

  if (authorParam) {
    filteredPosts = posts.filter(
      (p) =>
        p.author?.replace(/\s+/g, "-").toLowerCase() ===
        authorParam.toLowerCase()
    );
  } else if (tagParam) {
    filteredPosts = posts.filter(
      (p) =>
        p.tags?.some(
          (tag) => tag.replace(/\s+/g, "-").toLowerCase() === tagParam.toLowerCase()
        )
    );
  }

  const [currentPage, setCurrentPage] = useState(initialPage);
  const postsPerPage = 8;
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  // ensure currentPage never exceeds pageCount
  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
      setSearchParams({ page: String(pageCount), author: authorParam || "" });
    }
  }, [pageCount]);

  // sync with URL when "page" changes
  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    if (p !== currentPage) setCurrentPage(p);
  }, [searchParams]);

  // slice the filtered posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    setSearchParams({
      page: String(value),
      ...(authorParam ? { author: authorParam } : {}),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // insert banner in the middle of currentPosts
  const blogsWithBanner = [
    ...currentPosts.slice(0, 4),
    { type: "banner" },
    ...currentPosts.slice(4),
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <title>News | Compare Best Brokers</title>
      <meta name="description" content="Find  latest market posts." />
      <meta name="keywords" content="brokers, trading, news, stocks, forex" />
      <Container sx={{ paddingY: "50px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <TextGradient>{acf.blogs.title}</TextGradient>
          <Typography
            sx={{ marginTop: "20px", maxWidth: "637px" }}
            dangerouslySetInnerHTML={{ __html: acf.blogs.subtitle }}
          />
          <Box
            style={{
              borderBottom: "1px solid #222F43",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          />
          {authorParam && <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }} >News by: "{authorParam}"</Typography>}
          {tagParam && <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }} >Tag: #{tagParam}</Typography>}

          {/* Blog grid */}
          <Box
            component={motion.div}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
              alignItems: "stretch",
            }}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {blogsWithBanner.map((item, index) => {
              if (item.type === "banner") {
                return (
                  acf.home.bannerImage &&
                  acf.home.bannerLink && (
                    <Link
                      key={`banner-${index}`}
                      component={RouterLink}
                      to={acf.home.bannerLink}
                      target="_blank"
                    >
                      <img
                        src={acf.home.bannerImage}
                        alt="banner"
                        style={{
                          display: "block",
                          margin: "auto",
                          width: "100%",
                        }}
                      />
                    </Link>
                  )
                );
              }

              // strip HTML for preview
              const stripHtml = (html) => {
                const div = document.createElement("div");
                div.innerHTML = html;
                return div.textContent || div.innerText || "";
              };

              const shortContent = (() => {
                const text = stripHtml(item.content);
                return text.length > 150
                  ? text.slice(0, 150) + "..."
                  : text;
              })();
              const shortTitle =
                item.title.length > 70
                  ? item.title.slice(0, 70) + "..."
                  : item.title;

              return (
                <motion.div key={item.slug} variants={itemVariants}>
                  <BlogLink
                    component={RouterLink}
                    to={`/news/${item.slug}`}
                  >
                    <Box
                      component="img"
                      src={item.imageLarge}
                      alt={item.title}
                      sx={{
                        width: {
                          xs: "275px",
                          sm: "300px",
                          md: "400px",
                          xl: "500px",
                        },
                        height: {
                          xs: "155px",
                          sm: "169px",
                          md: "226px",
                          xl: "282px",
                        },
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: "16px",
                        filter: "brightness(80%)",
                      }}
                    />
                    <Stack direction="row" gap="7px" flexWrap="wrap">
                      {item.tags.map((tag, i) => (
                        <Typography
                          key={i}
                          color="text.gray"
                          variant="button"
                        >
                          #{tag}
                        </Typography>
                      ))}
                    </Stack>

                    <Typography variant="h3" className="hoverTitle">
                      {shortTitle}
                    </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: shortContent }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography color="text.gray" variant="button">
                        {item.date}
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: "auto",
                          "&:hover": {
                            color: (theme) =>
                              theme.palette.text.secondary,
                            transition: "all 0.3s ease 0s",
                          },
                        }}
                      >
                        Read More
                      </Typography>
                    </Box>
                  </BlogLink>
                </motion.div>
              );
            })}
          </Box>

          {/* Pagination */}
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            size="large"
            sx={{ marginTop: "30px" }}
          />
        </motion.div>
      </Container>
    </>
  );
};

export default Blogs;
