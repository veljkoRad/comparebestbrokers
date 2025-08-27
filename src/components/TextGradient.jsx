import { Typography } from '@mui/material'
import { styled } from "@mui/material/styles";


const TextGradientTypography = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
}));
const TextGradient = ({ children, variant = "h1" }) => {
    return (
        <TextGradientTypography
            component='span'
            variant={variant}
        >
            {children}
        </TextGradientTypography>
    )
}

export default TextGradient