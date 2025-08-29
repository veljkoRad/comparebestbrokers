import React, { useState } from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        accepted: false,
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

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
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.accepted) newErrors.accepted = "You must accept the terms";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbweMds3h1bmuCxw1vjDeAo8IYGsBt_fu8HUEtWob0QHZtv1ZQriJi5BHr0LcLtltrR7HQ/exec",

                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
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
        } catch (err) {
            console.error("Error sending data to Google Sheets", err);
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
                width: "100%",
                maxWidth: { xs: "730px", md: "357px" },
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

            <Button
                type="submit"
                variant="contained"
                sx={{
                    background:
                        "linear-gradient(90deg, rgb(14, 165, 234), rgb(11, 209, 209) 51%, rgb(14, 165, 234)) var(--x, 0)/200%",
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: "18px",
                    height: "56px",
                }}
            >
                Continue
            </Button>

            {success && <Typography color="green">Form submitted successfully!</Typography>}
        </Box>
    );
};

export default ContactForm;
