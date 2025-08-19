import { Typography } from '@mui/material'

const TextGradient = ({ children, variant = "h1" }) => {
    return (
        <Typography
            component='span'
            variant={variant}
            sx={{
                background: "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
            }}
        >
            {children}
        </Typography>
    )
}

export default TextGradient