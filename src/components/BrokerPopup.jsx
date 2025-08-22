import { Link, Rating, Typography, IconButton, } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import { BrokerPopupContainer, SingleBrokerButton, SingleBrokerCard } from "../styles/componentStyled"
import TextGradient from "./TextGradient"
import CloseIcon from "@mui/icons-material/Close";


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
                    <SingleBrokerCard>

                        <IconButton
                            aria-hidden="close menu"
                            color="secondary"
                            onClick={handleClose}
                            sx={{
                                padding: "0",
                                borderRadius: "0",
                                marginLeft: "auto",
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
                        <BrokerPopupContainer sx={{}} maxWidth='xxs'>
                            <Typography variant="h4" textAlign='center'>
                                Minimum Deposit: {openBroker?.minDeposit}{" "}
                            </Typography>
                            <Typography variant="h4" textAlign='center'>Fees: {openBroker?.fees}</Typography>
                            <Typography variant="h4" textAlign='center'>
                                Maximum Leverage: {openBroker?.maximum_leverage}
                            </Typography>
                            <Typography variant="h4" textAlign='center'>
                                Deposit Currencies: {openBroker?.depositCurrencies}
                            </Typography>
                            <Link component={RouterLink} to={openBroker?.button} target="_blank">
                                <SingleBrokerButton
                                    variant="contained"
                                >
                                    <Typography
                                        variant="buttonMain"
                                        sx={{ color: (theme) => theme.palette.text.white }}
                                    >
                                        Learn more
                                    </Typography>
                                </SingleBrokerButton>
                            </Link>
                        </BrokerPopupContainer>
                    </SingleBrokerCard>
                </motion.div>
            )
            }


        </AnimatePresence >
    )
}

export default BrokerPopup