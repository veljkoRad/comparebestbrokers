import { motion } from "framer-motion";
import {
  Container,
  Dialog,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import TextGradient from "../../components/TextGradient";
import { Link as RouterLink } from "react-router-dom";
import { BestBrokersBox, BestBrokersCard } from "../../styles/homeStyled";
import BrokerPopup from "../../components/BrokerPopup";


const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

const BestBrokers = ({ brokers, handleOpen, handleClose, openBroker, acf }) => {



  if (!Array.isArray(brokers) || brokers.length === 0) {
    return (
      <Container sx={{ my: 16, py: 16 }}>
        <Typography> No brokers to show. </Typography>
      </Container>
    );
  }


  return (
    <Container sx={{ marginTop: 16, marginBottom: 16, paddingY: 16 }}>
      {acf.home.banner2Image && acf.home.banner2Link && (
        <Link component={RouterLink} to={acf.home.banner2Link} target="_blank">
          <img
            src={acf.home.banner2Image}
            alt="banner"
            style={{ display: "block", margin: "0 auto 70px", width: '100%', maxWidth: '1111px' }}
          />
        </Link>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div variants={itemVariants}>
          <TextGradient variant="h2">{acf.home.homeBrokersTitle}</TextGradient>
          <Typography variant="h3" color="text" sx={{ marginTop: "10px" }}>
            {acf.home.homeBrokersSubtitle}
          </Typography>
        </motion.div>
        <BestBrokersBox>
          {brokers.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BestBrokersCard onClick={() => handleOpen(item)} >
                <img
                  style={{
                    height: 75,
                    width: 204,
                    objectFit: "contain",
                    display: "block",
                  }}
                  src={item.logo}
                  alt={item.title}
                />
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
              </BestBrokersCard>

            </motion.div>
          ))}
        </BestBrokersBox>
      </motion.div>
      {acf.home.banner3Image && acf.home.banner3Link && (
        <Link component={RouterLink} to={acf.home.banner3Link} target="_blank">
          <img
            src={acf.home.banner3Image}
            alt="banner"
            style={{ display: "block", margin: "70px auto 0", width: '100%', maxWidth: '1111px' }}
          />
        </Link>
      )}
      <Dialog open={!!openBroker} onClose={handleClose} maxWidth="sm" fullWidth sx={{ backgroundColor: 'transparent' }}>
        <BrokerPopup openBroker={openBroker} handleClose={handleClose} />
      </Dialog>
    </Container>
  );
};

export default BestBrokers;
