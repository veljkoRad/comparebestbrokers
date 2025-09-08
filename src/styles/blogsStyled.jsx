import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";


export const BlogLink = styled(Link)(({ theme }) => ({
    background: theme.palette.primary.light,
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #222F43',
    maxWidth: 'min-content',
    minHeight: '611px',
    [theme.breakpoints.down('sm')]: {
        minHeight: '537px'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    transition: 'all 0.3s ease 0s',
    '&:hover': {
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease 0s'
    },
    '&:hover .hoverTitle': {
        color: '#1CC2E7',
        transition: 'all 0.3s ease 0s'
    }
}));