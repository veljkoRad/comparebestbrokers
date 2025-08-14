import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Navbar = () => {
    return (
        <Box sx={{padding:'15px', width:'100%', display:'flex',justifyContent:'space-between',alignItems:'center',background:(theme)=>theme.palette.primary.main}} >
            <IconButton href='/' sx={{padding:0}}  >
                <CompareArrowsIcon color='info' sx={{ fontSize: '80px' }} />                
            </IconButton>
            <Box >            
            <Link to={`/`} style={{textDecoration:'none'} }> <Button color='info' variant='button'> Home</Button> </Link>
            </Box>
        </Box>

    )
}

export default Navbar