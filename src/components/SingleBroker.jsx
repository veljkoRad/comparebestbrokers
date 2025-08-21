import {
  Button,
  Card,
  Container,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextGradient from "./TextGradient";

const SingleBroker = ({ brokers }) => {
  const { slug } = useParams();
  const [single, setSingle] = useState(null);

  useEffect(() => {
    if (slug && brokers) {
      const foundSingle = brokers.find((item) => item.slug === slug);
      setSingle(foundSingle);
    }
  }, [slug, brokers]);

  if (!single) return <p>Loading error...</p>;

  return (
    <Container maxWidth="sm" sx={{ padding: "30px", marginY: "43px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
          borderRadius: "16px",
          padding: "30px",
          background:
            "linear-gradient(#131C31, #131C31) padding-box, linear-gradient(to right, rgb(14, 165, 234), rgb(11, 209, 209)) border-box",
          borderRadius: "16px",
          border: "1px solid transparent",
          boxShadow: "rgba(11, 209, 209, 0.2) 0px 3px 20px",
        }}
      >
        <TextGradient>{single.name}</TextGradient>
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
        <Typography variant="h3">
          Minimum Deposit: {single.minDeposit}{" "}
        </Typography>
        <Typography variant="h3">Fees: {single.fees}</Typography>
        <Typography variant="h3">
          Maximum Leverage: {single.maximum_leverage}
        </Typography>
        <Typography variant="h3">
          Deposit Currencies: {single.depositCurrencies}
        </Typography>
        <Link component={RouterLink} to={single.button} target="_blank">
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
              width: "120px",
              height: "40px",
              marginTop: "16px",
            }}
          >
            <Typography
              variant="buttonMain"
              sx={{ color: (theme) => theme.palette.text.white }}
            >
              Learn more
            </Typography>
          </Button>
        </Link>
      </Card>

      {/* 
            maximum_leverage: broker.acf?.maximum_leverage || null,
            button: broker.acf?.cta_button_url || null,
            slug: broker.slug */}
    </Container>
  );
};

export default SingleBroker;
