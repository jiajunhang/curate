import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
        <Container>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch', border: '1px grey' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container>
                    <Grid item md={2}></Grid>
                    <Grid item>
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
                        <Button onClick={handleSubmit} variant="contained">Begin</Button>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </Box>
        </Container>
    );
}

Setup.propTypes = {
    startQuiz: PropTypes.func.isRequired,
};

export default Setup;