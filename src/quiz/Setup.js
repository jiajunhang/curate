import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Setup = ({ selectedQuiz, startQuiz }) => {

  const [name, setName] = useState('');
  const [matric, setMatric] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMatricChange = (e) => {
    setMatric(e.target.value);
  }

  const handleBegin = () => {
    const data = {
      name: name,
      matric: matric,
      quiz: selectedQuiz
    };
    console.log(JSON.stringify(data));
    //startQuiz(data);
  }

  return (
    <>
    {console.log(selectedQuiz)}
    {selectedQuiz && 
    <Box sx={{
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      border: 'solid 1px grey',
      padding: '20px',
      marginBottom: 10
    }}>
      <Typography variant="h5" gutterBottom component="div">
        Hello,
        <p>There are a total of {selectedQuiz.length} questions.</p>
        <p>The test is untimed, but you should be able to complete it in approximately 20 minutes.</p>
      </Typography>
      {selectedQuiz.estimator !== "STD" && <Typography variant="h6" gutterBottom component="div">The final scoring is scaled according to difficulty of questions.</Typography>}
      {selectedQuiz.estimator === "STD" && <Typography variant="h6" gutterBottom component="div">The final scoring is based on number of questions answered corrected.</Typography>}
      <Typography variant="h6" gutterBottom component="div">
        Try to achieve the highest score possible.<p></p>
      </Typography>
      <Grid spacing={2} container alignItems="stretch" direction="row" justifyContent="center">
        <Grid item xs={4}>
            <TextField value={name}
              onChange={handleNameChange} id="name" label="Name" variant="standard" />
            <TextField value={matric}
              onChange={handleMatricChange} id="matric" label="Matric Number" variant="standard" />
        </Grid>
      </Grid>
      <br/><br/>
      <Button onClick={handleBegin} variant="contained" sx={{
        bgcolor: 'button.primary',
        '&:hover': {
          bgcolor: 'button.secondary'
        }
      }}>
        Begin Quiz
      </Button>
    </Box>
    }
    </>
  );
}

Setup.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Setup;