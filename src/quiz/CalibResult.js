import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from '../components/Loader';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const CalibResult = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <h3>ID: ${id}</h3>
      <h3>Completed submission. Pls update the ID to Prof.</h3>
    </>
  );
}

export default CalibResult;