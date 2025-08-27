import { Link, Rating, Typography, IconButton, Box, } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import TextGradient from "./TextGradient"
import CloseIcon from "@mui/icons-material/Close";
import { PopupButtonAccount, PopupButtonLearn, PopupButtonText, PopupCard, PopupContainer } from "../styles/componentStyled"


const popupVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const BrokerPopup = ({ openBroker, handleClose }) => {
    return (
        <AnimatePresence>
            {openBroker && (
                <motion.div
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <PopupCard>
                        <IconButton
                            aria-hidden="close menu"
                            color="secondary"
                            onClick={handleClose}
                            sx={{
                                padding: "0",
                                borderRadius: "0",
                                position: 'absolute',
                                right: '15px',
                                top: '15px'

                            }}
                        >
                            <CloseIcon sx={{ color: (theme) => theme.palette.text.secondary }} fontSize="large" />
                        </IconButton>

                        <TextGradient variant="h2">{openBroker?.name}</TextGradient>
                        <img
                            style={{
                                maxWidth: "204px",
                                width: "100%",
                                borderRadius: "16px",
                                height: "75px",
                                marginTop: "30px",
                            }}
                            src={openBroker?.logo}
                            alt={openBroker?.name}
                        />
                        <Rating
                            precision={0.1}
                            name="best-brokers-raitings"
                            readOnly
                            value={openBroker?.rating}
                            sx={{
                                "& .MuiRating-iconFilled": {
                                    color: (theme) => theme.palette.text.secondary,
                                },
                                "& .MuiRating-iconEmpty": {
                                    color: (theme) => theme.palette.text.secondary,
                                },
                            }}
                        />
                        <PopupContainer sx={{}} maxWidth='xxs'>
                            <Typography textAlign='center'>
                                <strong>Minimum Deposit: </strong>{openBroker?.minDeposit}{" "}
                            </Typography>
                            <Typography textAlign='center'><strong>Fees: </strong>{openBroker?.fees}</Typography>
                            <Typography textAlign='center'>
                                <strong>Maximum Leverage: </strong>{openBroker?.maximum_leverage}
                            </Typography>
                            <Typography textAlign='center'>
                                <strong>Deposit Currencies: </strong>{openBroker?.depositCurrencies}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: "15px" }}>
                                <Link component={RouterLink} to={openBroker?.button} target="_blank">
                                    <PopupButtonAccount
                                        variant="contained"
                                    >
                                        <PopupButtonText>
                                            Open Account
                                        </PopupButtonText>
                                    </PopupButtonAccount>
                                </Link>
                                <Link component={RouterLink} to={`/brokers/${openBroker?.slug}`} sx={{ width: '100%' }}>
                                    <PopupButtonLearn variant="contained">
                                        <PopupButtonText>
                                            Learn More
                                        </PopupButtonText>
                                    </PopupButtonLearn>
                                </Link>
                            </Box>

                        </PopupContainer>
                    </PopupCard>
                </motion.div>
            )
            }


        </AnimatePresence >
    )
}

export default BrokerPopup