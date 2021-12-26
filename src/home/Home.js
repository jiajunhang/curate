import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home = () => {

    return (
        <Box 
        sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
              <Typography>HOME PAGE</Typography>
          </Box>
    );
}

export default Home;