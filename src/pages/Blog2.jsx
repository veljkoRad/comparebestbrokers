import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { motion } from 'framer-motion'
import { Box, Container } from '@mui/material'
import TextGradient from '../components/TextGradient'
import { HtmlWrapper, SingleBoxContainer } from '../styles/componentStyled'
import Form from '../components/Form'

const Blog2 = ({ acf }) => {
    return (
        <>
            {/* <title>Contact | Compare Best Brokers</title>
            <meta name="description" content="Find top brokers and the latest market posts." />
            <meta name="keywords" content="brokers, trading, news, stocks, forex" /> */}
            <Container maxWidth="lg" sx={{ marginTop: '50px', marginBottom: '50px', }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <SingleBoxContainer sx={{ flexDirection: { xs: 'column-reverse', md: 'row' }, position: 'relative' }}>

                        <div style={{ maxWidth: '730px' }}>
                            <TextGradient variant='h2'>
                                {acf.blog_2.title}
                            </TextGradient>
                            <Box
                                component='img'
                                sx={{
                                    maxWidth: "731px",
                                    width: "100%",
                                    borderRadius: "16px",
                                    height: { xs: '180px', sm: '330px' },
                                    objectFit: "cover",
                                    marginTop: '50px',
                                    marginBottom: '50px'
                                }}
                                src={acf.blog_2.image}
                                alt={acf.blog_2.title}
                            />
                            <HtmlWrapper dangerouslySetInnerHTML={{ __html: acf.blog_2.content }} />
                        </div>
                        <GoogleReCaptchaProvider reCaptchaKey="6LfNbLsrAAAAAD29JTuzYbG_AvYC4IlwzeDTLmWH">
                            <Form />
                        </GoogleReCaptchaProvider>

                    </SingleBoxContainer>
                </motion.div>
            </Container >
        </>
    )
}

export default Blog2