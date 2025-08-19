import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{ background: (theme) => theme.palette.primary.light }}>
            <Container sx={{ paddingY: '40px' }} >
                <Typography variant='body1' color='text'>
                    Please be advised that investing and trading in futures, commodities, and all other leveraged products involves a certain level of risk. Financial markets are susceptible to many outside influences, and there is no way to know with absolute certainty how any asset will react to those influences. Any time you trade on financial instruments there is the risk that you may lose some or all of your capital. Traders are strongly advised to take the time to learn enough so that they understand the risks and market trends before investing money. Broker Reviews shares the opinions of our writers concerning brokers, but we are not responsible for any activity on those brokers’ websites or trading platforms. However, traders trade at their own risk, and Broker Reviews bears no responsibility whatsoever for any funds lost trading commodities, futures, or any other tradable assets with the reviewed brokers.
                </Typography>

            </Container>
        </Box >
    )
}

export default Footer