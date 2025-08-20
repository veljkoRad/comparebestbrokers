import { Card, CardMedia, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import TextGradient from './TextGradient';

const SingleBroker = ({ brokers }) => {
    const { slug } = useParams();
    const [single, setSingle] = useState(null);

    useEffect(() => {
        if (slug && brokers) {
            const foundSingle = brokers.find((item) => item.slug === slug);
            setSingle(foundSingle);
        }
    }, [slug, brokers]);

    if (!single) return <p>Loading error...</p>;

    return (
        <Container maxWidth='sm' sx={{ padding: '30px' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', border: '1px solid #222F43', borderRadius: '16px', padding: '30px' }}>
                <TextGradient>{single.name}</TextGradient>
                <CardMedia
                    sx={{ maxWidth: '204px', width: '100%', borderRadius: '16px', height: '75px' }}
                    component="img"
                    src={single.logo}
                    title={single.name}
                />
                <Typography>Minimum Deposit{single.minDeposit}</Typography>
                <Typography>Fees{single.fees}</Typography>
                <Typography>maximum_leverage{single.maximum_leverage}</Typography>
                <Typography>button{single.fees}</Typography>

            </Card>




            {/* 
            maximum_leverage: broker.acf?.maximum_leverage || null,
            button: broker.acf?.cta_button_url || null,
            slug: broker.slug */}
        </Container>
    )
}

export default SingleBroker