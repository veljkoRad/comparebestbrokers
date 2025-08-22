import { styled } from "@mui/material/styles";
import { Button, Card, Container } from "@mui/material"


// Single Post

export const SinglePostCard = styled(Card)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    maxWidth: "1024px",
    height: "400px",
    [theme.breakpoints.down("md")]: {
        maxWidth: "1000px",
    },
}));

export const HtmlWrapper = styled("Typography")(({ theme }) => ({
    "& h1": {
        color: theme.palette.secondary.main,
    },
    "& h2": {
        color: theme.palette.secondary.main,
    },
    "& h3": {
        color: theme.palette.secondary.main,
    },
    "& img": {
        maxWidth: '100% ',
        height: 'auto'
    }
}));

// Broker Popup

export const BrokerPopupContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "15px"
}));
export const SingleBrokerCard = styled(Card)(({ theme }) => ({
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
}))

export const SingleBrokerButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
    width: "120px",
    height: "40px",
    marginTop: "16px",
}))


