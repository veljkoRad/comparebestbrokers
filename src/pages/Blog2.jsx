import { Box, Container, Typography } from '@mui/material'
import TextGradient from '../components/TextGradient'
import { HtmlWrapper, SingleBoxContainer } from '../styles/componentStyled'
import Form from '../components/Form'

const Blog2 = ({ acf }) => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '50px', marginBottom: '50px' }}>
            <SingleBoxContainer>
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
                <Form />
            </SingleBoxContainer>

        </Container>
    )
}

export default Blog2