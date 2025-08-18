import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SinglePost = ({ posts }) => {
    const { slug } = useParams();
    const [single, setSingle] = useState(null);

    useEffect(() => {
        if (slug && posts) {
            const foundSingle = posts.find((item) => item.slug === slug);
            setSingle(foundSingle);
        }
    }, [slug, posts]);

    if (!single) return <p>Loading...</p>;

    const SingleCard = styled(Card)(({ theme }) => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1024px',
        height: '400px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '1000px'
        }
    }));



    return (
        <>
            <Box>
                <Container maxWidth="sm" component='section' sx={{ paddingY: '80px !important' }}>
                    <SingleCard>
                        <CardMedia
                            sx={{ maxWidth: '743px', width: '100%' }}
                            component="img"
                            src={single.imageUrl}
                            title={single.title}
                        />
                    </SingleCard>
                    <Typography color='black' variant='h1' sx={{ fontWeight: 600, textAlign: 'center', marginTop: 4 }}>
                        {single.title}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: single.content }} />

                </Container>
            </Box>
        </>
    );
};

export default SinglePost;
