import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Link, Pagination, Rating, Typography } from "@mui/material";

const SearchResult = ({ posts, brokers }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query')?.toLowerCase() || '';

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Combine posts and brokers with type
    const combined = [
        ...brokers.map(broker => ({ ...broker, type: 'broker' })),
        ...posts.map(post => ({ ...post, type: 'blog' }))
    ];



    const results = combined.filter(item => {
        if (item.type === 'blog') {
            return (
                item.title?.toLowerCase().includes(query) ||
                item.content?.toLowerCase().includes(query)
            );
        } else if (item.type === 'broker') {
            return item.name?.toLowerCase().includes(query);
        }
        return false;
    });

    const totalPages = Math.max(1, Math.ceil(results.length / postsPerPage));

    // ✅ NEW: reset to page 1 when query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

    if (!results.length) return <p>No results found for "{query}"</p>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
        >
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: '50px' }}>

                <Typography color='secondary' variant='h1' >Search results</Typography>
                <Typography>"{query}"</Typography>
                <Box
                    style={{ borderBottom: "1px solid #222F43", marginTop: '30px', marginBottom: '30px', width: '100%' }}
                />
                {currentPosts.map((item, index) => {
                    return (
                        item.type === 'blog' ? (
                            // Blog
                            <Box key={index} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '20px', paddingBottom: '30px', borderBottom: "1px solid #222F43", marginTop: '30px', maxWidth: '731px', width: '100%' }}>
                                <Box component="img"
                                    src={item.type === 'blog' ? item.imageLarge : item.logo}
                                    alt={item.type === 'blog' ? item.title : item.name}
                                    sx={{ width: { xs: '100%', sm: '170px' }, maxHeight: { xs: 'auto', sm: '120px' }, display: 'block', marginTop: '5px' }}
                                />
                                <Link component={RouterLink} sx={{ display: 'flex', flexDirection: 'column' }}
                                    to={
                                        item.type === 'blog'
                                            ? `/news/${item.slug}`
                                            : `/brokers/${item.slug}`
                                    }
                                >
                                    <Typography className='hoverTitle' variant='h3' color='secondary' sx={{ '&:hover': { color: (theme) => theme.palette.text.secondary, transition: "all 0.3s ease 0s", } }} >{item.type === 'blog' ? item.title : item.name}</Typography>
                                    <Typography

                                        dangerouslySetInnerHTML={{
                                            __html:
                                                item.type === "blog"
                                                    ? (item.content.length > 200
                                                        ? item.content.slice(0, 200) + "..."
                                                        : item.content)
                                                    : "",
                                        }}
                                    />
                                    <Typography sx={{ marginLeft: 'auto' }}>#{item.type}</Typography>
                                </Link>

                            </Box>
                        ) : (
                            // Broker
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '30px', border: "1px solid #222F43", borderRadius: '16px', maxWidth: '731px', marginTop: '30px' }}>
                                <img
                                    src={item.type === 'blog' ? item.imageLarge : item.logo}
                                    alt={item.type === 'blog' ? item.title : item.name}
                                    style={{ maxWidth: '204px', display: 'block', }}
                                />
                                <Link component={RouterLink} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
                                    to={
                                        item.type === 'blog'
                                            ? `/news/${item.slug}`
                                            : `/brokers/${item.slug}`
                                    }
                                >
                                    <Typography className='hoverTitle' variant='h3' color='secondary' sx={{ '&:hover': { color: (theme) => theme.palette.text.secondary, transition: "all 0.3s ease 0s", } }} >{item.type === 'blog' ? item.title : item.name}</Typography>
                                    <Rating
                                        precision={0.1}
                                        name="best-brokers-raitings"
                                        readOnly
                                        value={item.rating}
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: (theme) => theme.palette.text.secondary,
                                            },
                                            "& .MuiRating-iconEmpty": {
                                                color: (theme) => theme.palette.text.secondary,
                                            },
                                        }}
                                    />
                                    <Typography >#{item.type}</Typography>
                                </Link>

                            </Box>
                        )

                    )
                })}
                {
                    totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChangePage}
                            variant="outlined"
                            size="large"
                            sx={{
                                marginTop: '30px',
                            }}
                        />
                    )
                }


            </Container>
        </motion.div>
    );
};

export default SearchResult;
