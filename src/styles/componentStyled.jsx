import { styled } from "@mui/material/styles";
import { Button, Box, Card, Container, Typography } from "@mui/material"
import { transform } from "framer-motion";


// Single Post


export const SingleBoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: 'center'
    },
    gap: '24px'
}));

export const SinglePostCard = styled(Card)(({ theme }) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    maxWidth: "1024px",
    marginTop: '50px',
    height: "400px",
    [theme.breakpoints.down("sm")]: {
        maxWidth: "1000px",
        height: '180px'
    },
}));

export const HtmlWrapper = styled(Typography)(({ theme }) => ({
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

export const PopupContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "15px"
}));
export const PopupCard = styled(Card)(({ theme }) => ({
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

export const PopupButtonAccount = styled(Button)(({ theme }) => ({
    background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
    width: "140px",
    height: "40px",
    marginTop: "16px",
    [theme.breakpoints.down(400)]: {
        width: '120px'
    },
    transition: "all 0.3s ease 0s",
    '&:hover': {
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",
    }

}))

export const PopupButtonLearn = styled(Button)(({ theme }) => ({
    width: "140px",
    height: "40px",
    marginTop: "16px",
    background: theme.palette.primary.main,
    border: '1px solid #1CC2E7',
    [theme.breakpoints.down(400)]: {
        width: '120px'
    },
    transition: "all 0.3s ease 0s",
    '&:hover': {
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",
    }
}))

export const PopupButtonText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.text.white,
    fontWeight: 700,
    [theme.breakpoints.down(400)]: {
        fontSize: '11px'
    }
}))


// Sidebar


export const SidebarUnderline = styled(Box)(({ theme }) => ({
    width: '96px',
    height: '3px',
    backgroundColor: theme.palette.text.secondary,
    marginTop: '10px',
    marginBottom: '40px'
}))

export const SidebarBrokerItem = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #222F43',
    padding: '15px',
    borderRadius: '16px',
    marginBottom: '24px',
    "&:hover": {
        background:
            "linear-gradient(#131C31, #131C31) padding-box, linear-gradient(to right, rgb(14, 165, 234), rgb(11, 209, 209)) border-box",
        borderRadius: "16px",
        border: "1px solid transparent",
        boxShadow: "rgba(11, 209, 209, 0.2) 0px 3px 20px",
        transform: "translateY(-2px)",
        transition: "all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1)",
    }
}))


export const SidebarContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #222F43',
    padding: '25px',
    borderRadius: '16px',
    background: theme.palette.primary.light,
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px'
}))

export const SidebarCategoryItem = styled(Box)(({ theme }) => ({
    border: '1px solid #222F43',
    padding: '12px 20px',
    borderRadius: '16px',
    cursor: 'pointer',
    "&:hover .hoverCategory": {
        color: "#1CC2E7",
        transition: "all 0.3s ease 0s",
    },
}))

export const FooterMenus = styled(Typography)(({ theme }) => ({
    transition: "all 0.3s ease 0s",
    '&:hover': {
        color: theme.palette.text.secondary,
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",
    }
}))

export const FooterIcon = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: "5px",
    alignItems: 'center',
    transition: "all 0.3s ease 0s",
    cursor: 'pointer',
    "&:hover ": {
        color: "#1CC2E7",
        transform: 'translateY(-2px)',
        transition: "all 0.3s ease 0s",

    },
}))


//  Single Broker

export const SingleBrokerHtmlContent = styled(Typography)(({ theme }) => ({
    "& strong": {
        color: theme.palette.secondary.main,
    },
}));
