import { Box, Card, Dialog, Rating } from '@mui/material'
import TextGradient from './TextGradient'
import { styled } from "@mui/material/styles";
import BrokerPopup from './BrokerPopup';

const SidebarUnderline = styled(Box)(({ theme }) => ({
    width: '96px',
    height: '3px',
    backgroundColor: theme.palette.text.secondary,
    marginTop: '10px'
}))

const SidebarBox = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #222F43',
    padding: '15px',
    borderRadius: '16px',
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



const Sidebar = ({ brokers, handleClose, handleOpen, openBroker }) => {

    return (
        <div style={{ width: '100%' }}>
            <TextGradient variant="h4">Best Brokers</TextGradient>
            <SidebarUnderline />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                {brokers.slice(0, 6).map((item, index) => (
                    <SidebarBox onClick={() => handleOpen(item)} >
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
                    </SidebarBox>
                ))
                }

                <Dialog open={!!openBroker} onClose={handleClose} maxWidth="sm" fullWidth sx={{ backgroundColor: 'transparent' }}>
                    <BrokerPopup openBroker={openBroker} handleClose={handleClose} />
                </Dialog>
            </div>

        </div >
    )
}

export default Sidebar