
import { motion } from "framer-motion";
import { Card, CardMedia, Container, Link, Rating, Typography, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../../components/TextGradient";

const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
};


const BestBrokers = ({ brokers }) => {
    if (!Array.isArray(brokers) || brokers.length === 0) {
        return (
            <Container sx={{ my: 16, py: 16 }}>
                <Typography> No brokers to show. </Typography>
            </Container>
        );
    }
    return (
        <Container sx={{ marginTop: 16, marginBottom: 16, paddingY: 16 }} >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}>
                <motion.div variants={itemVariants}>
                    <TextGradient variant="h2">Best Brokers</TextGradient>
                </motion.div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '24px',
                        marginTop: 12
                    }}
                >
                    {

                        brokers.map((item, index) => (
                            <motion.div key={index} variants={itemVariants} >
                                <Link component={RouterLink} to={`/brokers/${item.slug}`}>
                                    <Card sx={{
                                        maxWidth: '259px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', borderRadius: '16px', padding: 6, border: "1px solid #222F43",
                                        '&:hover': {
                                            background: 'linear-gradient(#131C31, #131C31) padding-box, linear-gradient(to right, rgb(14, 165, 234), rgb(11, 209, 209)) border-box',
                                            borderRadius: '16px',
                                            border: '1px solid transparent', boxShadow: 'rgba(11, 209, 209, 0.2) 0px 3px 20px',
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1)'
                                        }
                                    }}>
                                        <CardMedia
                                            component='img'
                                            sx={{ height: 75, width: 204, objectFit: "contain", display: "block" }}
                                            image={item.logo}
                                            title={item.title}
                                            alt="Post Image" />
                                        <Rating
                                            precision={0.1}
                                            name="best-brokers-raitings"
                                            readOnly
                                            value={item.rating}
                                            sx={{
                                                '& .MuiRating-iconFilled': {
                                                    color: (theme) => theme.palette.text.secondary,

                                                },
                                                '& .MuiRating-iconEmpty': {
                                                    color: (theme) => theme.palette.text.secondary,

                                                }
                                            }}
                                        />

                                        {/* <CardActions sx={{ padding: 0 }}>
                                <Link
                                    target="_blank"
                                    href={item.button}
                                >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ color: (theme) => theme.palette.text.primary }}
                                    >
                                        Read More
                                    </Button>
                                </Link>
                            </CardActions> */}
                                    </Card>
                                </Link>
                            </motion.div>
                        ))
                    }
                </Box>
            </motion.div>
        </Container >
    )
}

export default BestBrokers