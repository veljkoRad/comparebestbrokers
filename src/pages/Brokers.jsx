import { motion } from "framer-motion";
import { Box, Container, Link, Rating, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextGradient from "../components/TextGradient";
import { BrokersButtonAccount, BrokersButtonLearn, BrokersCardBox, BrokersContainerBox, BrokersContainerButton } from "../styles/brokersStyled";

const Brokers = ({ brokers, acf }) => {

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      {/* <title>Brokers | Compare Best Brokers</title>
      <meta name="description" content="Find top brokers." />
      <meta name="keywords" content="brokers, trading, news, stocks, forex" /> */}
      <Container sx={{ paddingTop: '60px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <TextGradient>{acf.brokers.title}</TextGradient>
          <Typography sx={{ marginTop: '20px', maxWidth: '637px' }} dangerouslySetInnerHTML={{ __html: acf.brokers.subtitle }} />
          <BrokersContainerBox component={motion.div} initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}>
            {
              brokers.map((item, index) => (
                <BrokersCardBox component={motion.div} key={index} variants={itemVariants} >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img
                      style={{
                        width: "160px",
                        height: "59px",
                      }}
                      src={item.logo}
                      alt={item.name}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Rating
                        precision={0.1}
                        name="best-brokers-raitings"
                        readOnly
                        value={item.rating}
                        sx={{
                          fontSize: '22px',
                          "& .MuiRating-iconFilled": {
                            color: (theme) => theme.palette.text.secondary,
                          },
                          "& .MuiRating-iconEmpty": {
                            color: (theme) => theme.palette.text.secondary,
                          },
                        }}
                      />
                      <Typography variant="button">{item.rating} Overall</Typography>
                    </div>

                  </Box>
                  <div style={{ padding: '15px 15px 15px 0', width: 'min-content', borderBottom: '4px solid #1CC2E7' }}>
                    <TextGradient variant="buttonMain" >Summary</TextGradient>
                  </div>
                  <Typography ><strong>Minimum Deposit: </strong>{item.minDeposit}</Typography>
                  <Typography ><strong>Fees: </strong>{item.fees}</Typography>
                  <Typography ><strong>Maximum Leverage: </strong>{item.maximum_leverage}</Typography>
                  <Typography ><strong>Deposit Currencies: </strong>{item.depositCurrencies}</Typography>
                  <BrokersContainerButton>
                    <Link component={RouterLink} to={item.button} target="_blank" sx={{ width: '100%' }}>
                      <BrokersButtonAccount variant="contained">
                        <Typography
                          variant="buttonMain"
                          sx={{ color: (theme) => theme.palette.text.white }}
                        >
                          Open Account
                        </Typography>
                      </BrokersButtonAccount>
                    </Link>
                    <Link component={RouterLink} to={`/brokers/${item.slug}`} sx={{ width: '100%' }}>
                      <BrokersButtonLearn variant="contained">
                        <Typography
                          variant="buttonMain"
                          sx={{ color: (theme) => theme.palette.text.white }}
                        >
                          Learn More
                        </Typography>
                      </BrokersButtonLearn>
                    </Link>
                  </BrokersContainerButton>

                </BrokersCardBox>
              ))
            }
          </BrokersContainerBox >
        </motion.div>
      </Container >
    </>
  );
};

export default Brokers;
