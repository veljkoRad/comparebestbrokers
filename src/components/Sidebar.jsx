import { Box, Dialog, Link, Rating } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import TextGradient from './TextGradient'
import BrokerPopup from './BrokerPopup';
import { SidebarBrokerItem, SidebarCategoryItem, SidebarContainer, SidebarUnderline } from '../styles/componentStyled';






const Sidebar = ({ brokers, handleClose, handleOpen, openBroker, categories, acf }) => {
console.log("Sidebar image:", acf?.sidebar?.sidebarBannerImage);
    return (
        <Box sx={{ width: '100%', maxWidth: { xs: '730px', md: '357px' } }}>
            {acf.sidebar.sidebarBannerImage && acf.sidebar.sidebarBannerLink && (
                <Link component={RouterLink} to={acf.sidebar.sidebarBannerLink} target="_blank">
                    <img
                        src={acf.sidebar.sidebarBannerImage}
                        alt="banner"
                        style={{ display: "block", margin: "0 auto 25px" }}
                    />
                </Link>
            )}
            <SidebarContainer >
                <TextGradient variant="h4" >{acf.sidebar.brokersSidebarTitle}</TextGradient>
                <SidebarUnderline />
                {brokers.slice(0, 6).map((item, index) => (
                    <SidebarBrokerItem onClick={() => handleOpen(item)} key={index} >
                        <img
                            style={{
                                width: 80,
                                objectFit: "contain",
                                display: "block",
                                borderRadius: '8px'
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
                                fontSize: "14px",
                                "& .MuiRating-iconFilled": {
                                    color: (theme) => theme.palette.text.secondary,
                                },
                                "& .MuiRating-iconEmpty": {
                                    color: (theme) => theme.palette.text.secondary,
                                },
                            }}
                        />
                    </SidebarBrokerItem>
                ))
                }
            </SidebarContainer>
            {/* <SidebarContainer>
                <TextGradient variant="h4" sx={{ marginTop: '30px' }} >Categories</TextGradient>
                <SidebarUnderline />
                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {
                        categories.map((item, index) => (
                            <SidebarCategoryItem key={index} sx={{

                            }}>
                                <Typography className='hoverCategory' variant='button' color='text.white'>
                                    {item}
                                </Typography>

                            </SidebarCategoryItem>
                        ))
                    }
                </Box>
            </SidebarContainer> */}


            <Dialog open={!!openBroker} onClose={handleClose} maxWidth="sm" fullWidth sx={{ backgroundColor: 'transparent' }}>
                <BrokerPopup openBroker={openBroker} handleClose={handleClose} />
            </Dialog>
        </Box >
    )
}

export default Sidebar