import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Box, Container, IconButton, Link, Rating, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "./TextGradient";
import { SingleBoxContainer, SingleBrokerHtmlContent } from "../styles/componentStyled";
import { BrokersButtonAccount } from "../styles/brokersStyled";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from "./Sidebar";

const SingleBroker = ({ brokers, handleOpen, handleClose, openBroker, categories, acf }) => {
    const { slug } = useParams();
    const [single, setSingle] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug && brokers) {
            const foundSingle = brokers.find((item) => item.slug === slug);
            setSingle(foundSingle);
        }
    }, [slug, brokers]);

    if (!single) return <p>Loading...</p>;



    const stripHtml = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };
    const description = stripHtml(single.shortDescription || "Find top brokers and the latest market posts.").slice(0, 160);
    const singleTitle = `${single.name} | Compare Best Brokers`;

    return (
        <>
            {/* <title>{singleTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="brokers, trading, news, stocks, forex" /> */}


            <Container maxWidth='lg' sx={{ paddingBottom: '50px' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <IconButton onClick={() => navigate(-1)} aria-label="go back">
                        <ArrowBackIcon fontSize="large" sx={{ color: (theme) => theme.palette.text.primary, '&:hover': { color: (theme) => theme.palette.text.secondary } }} />
                    </IconButton>
                    <Box
                        style={{ borderBottom: "1px solid #222F43", marginBottom: "50px", marginTop: '10px' }}
                    />
                    <SingleBoxContainer>
                        <div style={{ minHeight: 570, width: '100%', maxWidth: '730px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <TextGradient variant="h1">{single.name}</TextGradient>
                                <img
                                    style={{
                                        maxWidth: "204px",
                                        width: "100%",
                                        borderRadius: "16px",
                                        height: "75px",
                                        marginTop: "30px",
                                    }}
                                    src={single.logo}
                                    alt={single.name}
                                />
                                <Rating
                                    precision={0.1}
                                    name="best-brokers-raitings"
                                    readOnly
                                    value={single.rating}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: (theme) => theme.palette.text.secondary,
                                        },
                                        "& .MuiRating-iconEmpty": {
                                            color: (theme) => theme.palette.text.secondary,
                                        },
                                    }}
                                />
                                <Typography variant="button">{single.rating} Overall</Typography>
                                {single.ctaTop && (
                                    <Link component={RouterLink} to={single.button} target="_blank" sx={{}}>
                                        <BrokersButtonAccount variant="contained" sx={{ width: '156px', marginTop: '30px' }}>
                                            <Typography
                                                variant="buttonMain"
                                                sx={{ color: (theme) => theme.palette.text.white }}
                                            >
                                                Open Account
                                            </Typography>
                                        </BrokersButtonAccount>
                                    </Link>
                                )}
                            </div>
                            <SingleBrokerHtmlContent dangerouslySetInnerHTML={{ __html: single.shortDescription }} />
                            <SingleBrokerHtmlContent dangerouslySetInnerHTML={{ __html: single.keyBenefits }} />
                            {single.ctaMid && (
                                <Link component={RouterLink} to={single.button} target="_blank" sx={{}}>
                                    <BrokersButtonAccount variant="contained" sx={{ width: '156px', marginTop: '30px', marginBottom: '30px' }}>
                                        <Typography
                                            variant="buttonMain"
                                            sx={{ color: (theme) => theme.palette.text.white }}
                                        >
                                            Open Account
                                        </Typography>
                                    </BrokersButtonAccount>
                                </Link>
                            )}
                            <div style={{ marginRight: 'auto' }}>
                                <Typography ><strong>Minimum Deposit:</strong> {single.minDeposit}</Typography>
                                <Typography ><strong>Fees:</strong> {single.fees}</Typography>
                                <Typography ><strong>Maximum Leverage:</strong> {single.maximum_leverage}</Typography>
                                <Typography ><strong>Maximum Leverage:</strong> {single.depositCurrencies}</Typography>
                            </div>
                            {single.ctaBottom && (
                                <Link component={RouterLink} to={single.button} target="_blank" sx={{}}>
                                    <BrokersButtonAccount variant="contained" sx={{ width: '156px', marginTop: '30px' }}>
                                        <Typography
                                            variant="buttonMain"
                                            sx={{ color: (theme) => theme.palette.text.white }}
                                        >
                                            Open Account
                                        </Typography>
                                    </BrokersButtonAccount>
                                </Link>
                            )}
                        </div>
                        <Sidebar brokers={brokers} handleOpen={handleOpen} handleClose={handleClose} openBroker={openBroker} categories={categories} acf={acf} />
                    </SingleBoxContainer>
                </motion.div >
            </Container>
        </>

    )
}

export default SingleBroker