import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';

const Header = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'background.dark' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CurATe
          </Typography>
          <MenuItem component={Link} to={'/'} key="home" >
            <Typography textAlign="center">
              Home
            </Typography>
          </MenuItem>
          {/* <MenuItem component={Link} to={'/data'} key="data" >
            <Typography textAlign="center">
              Data
            </Typography>
          </MenuItem> */}
          <MenuItem component={Link} to={'/template'} key="template" >
            <Typography textAlign="center">
              Template
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/quiz'} key="quiz" >
            <Typography textAlign="center">
              Quiz
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/calibration'} key="calibration" >
            <Typography textAlign="center">
              Calibration
            </Typography>
          </MenuItem>
          {/* <MenuItem component={Link} to={'/expquiz'} key="expquiz" >
            <Typography textAlign="center">
              ExpQuiz
            </Typography>
          </MenuItem> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;