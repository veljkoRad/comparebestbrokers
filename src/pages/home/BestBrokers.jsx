
import { Button, Card, CardContent, CardActions, CardMedia, Container, Link, Rating, Typography, Box } from "@mui/material"
import Underline from "../../components/Underline";

const BestBrokers = ({ brokers }) => {

    console.log(brokers);
    return (
        <Container sx={{ marginTop: 16, marginBottom: 16, paddingY: 16, paddingX: '30px !important', background: (theme) => theme.palette.secondary.main, borderRadius: '48px' }} >
            <Typography variant="h2" color="black">
                Best Brokers
            </Typography>
            <Underline />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginTop: 12 }}>
                {
                    brokers.map((item) => (
                        <Card sx={{ maxWidth: '344px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', padding: 6 }}>
                            <CardMedia
                                sx={{ height: 75, width: 204 }}
                                image={item.logo}
                                title={item.title}
                                alt="Post Image" />
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
                            }}>
                                <Rating
                                    precision={0.1}
                                    name="best-brokers-raitings"
                                    readOnly
                                    value={item.rating}
                                />
                                <Typography>Minimum Deposit: <strong>{item.minDeposit}</strong> </Typography>

                            </CardContent>
                            <CardActions sx={{ padding: 0 }}>
                                <Link
                                    target="_blank"
                                    href={item.button}
                                >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ color: (theme) => theme.palette.black.main }}
                                    >
                                        Read More
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))
                }
            </Box>
        </Container>
    )
}

export default BestBrokers