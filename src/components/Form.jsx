import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        accepted: false,
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // NEW: loading state

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";

        if (!formData.phone) {
            newErrors.phone = "Phone is required";
        } else if (!/^[0-9]+$/.test(formData.phone)) {
            newErrors.phone = "Phone must contain numbers only";
        }

        if (!formData.accepted) newErrors.accepted = "You must accept the terms";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (!executeRecaptcha) {
            console.log("Recaptcha not yet available");
            return;
        }

        setLoading(true); // show spinner
        setSuccess(false);

        try {

            const recaptchaToken = await executeRecaptcha('submit_form');

            const dataToSend = {
                ...formData,
                recaptchaToken,
            };

            await fetch(
                "https://script.google.com/macros/s/AKfycbxaBs_X-vJ7FVCACEpsDx2JT0F84NEsOKXov25BG9mZCUFHMCYtV7YyjNQeWTgSvftYag/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                }
            );

            setSuccess(true);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                accepted: false,
            });

            await fetch("https://comparebestbrokers.com/cbb_wp/wp-json/cbb/v1/thankyou", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });
        } catch (err) {
            console.error("Error sending data to Google Sheets", err);
        } finally {
            setLoading(false); // hide spinner
        }
    };

    return (


        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                minWidth: { xs: "100%", sm: "357px" },
                maxWidth: "357px",
                position: 'sticky',
                top: 15,
                background: (theme) => theme.palette.primary.main,
                paddingY: '15px'
            }}
        >
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                autoComplete="off"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                autoComplete="off"
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="off"
            />
            <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                autoComplete="off"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.accepted}
                        onChange={handleChange}
                        name="accepted"
                        sx={{
                            "&.Mui-checked": {
                                color: "#fff",
                            },
                        }}
                    />
                }
                label="I understand and wish to proceed"
            />
            {errors.accepted && <Typography color="error">{errors.accepted}</Typography>}

            {/* Button with loading spinner overlay */}
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading} // disable while loading
                    sx={{
                        background:
                            "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
                        color: "#fff",
                        fontWeight: "800",
                        fontSize: "18px",
                        height: "56px",
                        width: "100%",
                    }}
                >
                    {loading ? "Submitting..." : "Continue"}
                </Button>
                {loading && (
                    <CircularProgress
                        color="secondary"
                        size={60}
                        thickness={5}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-30px",
                            marginLeft: "-30px",
                        }}
                    />
                )}
            </Box>

            {success && (
                <Typography color="green">Form submitted successfully!</Typography>
            )}
        </Box>
    );
};

export default ContactForm;
