import { Box, Button, Card, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// Banner

export const BannerMainBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "545px",
    [theme.breakpoints.down("sm")]: {
        height: "453px",
    },
    background: theme.palette.primary.light
}))

export const BannerShadowBox = styled(Box)(({ theme }) => ({
    display: "block",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
    width: 500,
    height: 800,
    position: 'absolute',
    bottom: 0,
    left: 0,
    pointerEvents: 'none'
}))

export const BannerTextBox = styled(Box)(() => ({
    maxWidth: "520px",
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
    zIndex: '1'
}))

export const BannerButton = styled(Button)(() => ({
    background: 'linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%',
    width: "120px",
    height: '40px',
    marginTop: '16px'
}))


// BestBrokers

export const BestBrokersBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "24px",
    marginTop: '40px',
}))

export const BestBrokersCard = styled(Card)(() => ({
    cursor: 'pointer',
    maxWidth: "259px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "center",
    borderRadius: "16px",
    padding: '24px',
    border: "1px solid #222F43",
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


// RecentBlogs

export const RecentBlogsBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    paddingTop: "40px",
    justifyContent: 'flex-start',
    [theme.breakpoints.down("lg")]: {
        justifyContent: "center"
    },
    transition: "all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1)",
}))

export const RecentBlogsLink = styled(Link)(({ theme }) => ({
    overflow: "hidden",
    marginTop: "30px",
    "&:hover .hoverText": {
        color: "#1CC2E7",
        transform: "translateY(-4px)",
        transition: "all 0.3s ease 0s",
    },
    "&:hover .hoverImage": {
        transform: "scale(1.1)",
        transition: "all 0.3s ease 0s",
    },
    "&:hover .hoverDate": {
        color: "#94A9C9",
        transform: "translateY(-4px)",
        transition: "all 0.3s ease 0s",
    },
}))

export const RecentBlogsCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "354px",
    height: "415px",
    [theme.breakpoints.down("md")]: {
        width: "300px",
        height: "352px",
    },
    boxShadow: "none",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "30px 15px",
    overflow: "hidden",
}))



