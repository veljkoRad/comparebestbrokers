import { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Dialog,
  Rating,
  Typography,
} from "@mui/material";
import TextGradient from "../../components/TextGradient";
import { BestBrokersBox, BestBrokersCard } from "../../styles/homeStyled";
import BrokerPopup from "../../components/BrokerPopup";


const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

const BestBrokers = ({ brokers, handleOpen, handleClose, openBroker }) => {



  if (!Array.isArray(brokers) || brokers.length === 0) {
    return (
      <Container sx={{ my: 16, py: 16 }}>
        <Typography> No brokers to show. </Typography>
      </Container>
    );
  }


  return (
    <Container sx={{ marginTop: 16, marginBottom: 16, paddingY: 16 }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div variants={itemVariants}>
          <TextGradient variant="h2">Best Brokers</TextGradient>
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
      <Dialog open={!!openBroker} onClose={handleClose} maxWidth="sm" fullWidth sx={{ backgroundColor: 'transparent' }}>
        <BrokerPopup openBroker={openBroker} handleClose={handleClose} />
      </Dialog>
    </Container>
  );
};

export default BestBrokers;
