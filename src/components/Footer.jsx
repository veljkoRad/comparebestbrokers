import { Box, Container, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FooterIcon, FooterMenus } from '../styles/componentStyled';

const Footer = ({ menus, acf }) => {
    return (
        <Box sx={{ background: (theme) => theme.palette.primary.light }}>
            <Container maxWidth='sm' sx={{ paddingY: '40px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }} >
                    <Link component={RouterLink} to="/">
                        <img
                            alt="logo-image"
                            src={acf.header.logo}
                            height="65px" />
                    </Link>
                    <Box sx={{ display: 'flex', gap: '15px' }}>
                        {menus.map((item, index) => (
                            <Box key={index}>
                                <Link component={RouterLink} to={item.url}><FooterMenus variant='body1' sx={{}}>{item.title} </FooterMenus> </Link>
                            </Box>
                        ))}
                    </Box>
                    <Typography variant='button' color='text' textAlign='center' dangerouslySetInnerHTML={{ __html: acf.footer.risk }} />
                    <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Link component={RouterLink} target='_blank' to={acf.footer.facebook}>
                            <FooterIcon><FacebookIcon />Facebook</FooterIcon>
                        </Link>
                        <Link component={RouterLink} target='_blank' to={acf.footer.linkedin}>
                            <FooterIcon><LinkedInIcon />LinkedIn</FooterIcon>
                        </Link>
                        <Link component={RouterLink} target='_blank' to={acf.footer.instagram}>
                            <FooterIcon><InstagramIcon />Instagram</FooterIcon>
                        </Link>

                    </Box>
                    <Typography variant='button'>{acf.footer.copyright}</Typography>
                </Box>


            </Container>
        </Box >
    )
}

export default Footer