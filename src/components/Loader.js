import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        alignItems: 'center'
    }}>
      <CircularProgress />
    </Box>
  );
}
