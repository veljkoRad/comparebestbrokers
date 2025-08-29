import React from "react"
import { InputBase, Link } from "@mui/material"
import { styled, alpha } from "@mui/material/styles";

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.text.primary, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '180px'
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const NavbarItemMobile = styled(Link)(({ theme }) => ({
    color: theme.palette.text.white,
    textDecoration: "none",
    fontWeight: 500,
    width: "100%",
    "&:focus": {
        color: (theme) => theme.palette.text.primary,
        transform: "translateX(5px)",
        transition: "transform 0.4s ease",
    }
}))

export const NavbarSubItemMobile = styled(Link)(({ theme }) => ({
    color: (theme) => theme.palette.text.mobile,
    textDecoration: "none",
    width: "100%",
    fontSize: "14px",
}))