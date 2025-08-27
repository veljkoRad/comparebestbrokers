import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BrokersContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: "15px",
    padding: '60px 0',
    justifyContent: 'flex-start',
    [theme.breakpoints.down("xl")]: {
        justifyContent: "center",
    },
}));

export const BrokersCardBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    maxWidth: '360px',
    height: '482px',
    width: '100%',
    padding: '15px 15px 20px 15px',
    borderRadius: '16px',
    border: '1px solid #222F43',
    background: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}));

export const BrokersContainerButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: "15px",
    alignItems: 'center',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '328px',
    [theme.breakpoints.down(380)]: {
        width: "280px"
    }

}));

export const BrokersButtonAccount = styled(Button)(({ theme }) => ({
    background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
    width: '100%',
    transition: "all 0.3s ease 0s",
    '&:hover': {
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",
    }

}));

export const BrokersButtonLearn = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    width: '100%',
    border: '1px solid #1CC2E7',
    transition: "all 0.3s ease 0s",
    '&:hover': {
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",
    }

}));