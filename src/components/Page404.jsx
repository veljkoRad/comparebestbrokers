import { Button, Container, Link, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import TextGradient from "./TextGradient"
import { BrokersButtonAccount } from "../styles/brokersStyled"

const Page404 = () => {
    return (
        <Container sx={{ marginTop: '100px', marginBottom: '100px' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} gap='40px' justifyContent='center' alignItems='center'>
                <img src="/images/404.svg" alt="404" style={{ width: '300px' }} />
                <Stack maxWidth='426px' justifyContent='center' gap='20px'>
                    <TextGradient variant="h2">
                        Don't be spooked
                    </TextGradient>
                    <Typography >The page you’re looking for has slipped in to an unknown realm. Click the button below to go back to the homepage.</Typography>
                    <Link component={RouterLink} to='/' sx={{ width: '100%' }}>
                        <BrokersButtonAccount variant="contained" sx={{ width: '156px' }}>
                            <Typography
                                variant="buttonMain"
                                sx={{ color: (theme) => theme.palette.text.white }}
                            >
                                Homepage
                            </Typography>
                        </BrokersButtonAccount>
                    </Link>

                </Stack>
            </Stack>


        </Container >
    )
}

export default Page404