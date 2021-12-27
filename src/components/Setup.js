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

const Setup = ({ startQuiz }) => {

  const [name, setName] = useState('');
  const [matric, setMatric] = useState('');
  const [group, setGroup] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMatricChange = (e) => {
    setMatric(e.target.value);
  }

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  }

  const handleSubmit = () => {
    const data = {
      name: name,
      matric: matric,
      group: group
    };
    console.log(data);
    startQuiz(data);
  }

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h2">CurATe</Typography>
      <Grid container alignItems="stretch" direction="row" justifyContent="center">
        <Grid item xs={4}>
          <Stack spacing={2}>
            <TextField value={name}
              onChange={handleNameChange} id="name" label="Name" variant="standard" />
            <TextField value={matric}
              onChange={handleMatricChange} id="matric" label="Matric Number" variant="standard" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={group}
                label="Group"
                onChange={handleGroupChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" sx={{
              bgcolor: 'button.primary',
              '&:hover': {
                bgcolor: 'button.secondary'
              }
            }}>Begin</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

Setup.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Setup;