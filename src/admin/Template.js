import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const Template = () => {

  const [quizzes, setQuizzes] = useState(null);
  const [pools, setPools] = useState(null);

  const [open, setOpen] = useState(false);
  const [newQuizName, setNewQuizName] = useState("");
  const [newQuizLength, setNewQuizLength] = useState();
  const [newQuizEstimator, setNewQuizEstimator] = useState("");
  const [newQuizSurvey, setNewQuizSurvey] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (e) => {
    setNewQuizName(e.target.value);
  }

  const handleLengthChange = (e) => {
    setNewQuizLength(e.target.value);
  }

  const handleEstimatorChange = (e) => {
    setNewQuizEstimator(e.target.value);
  }

  const handleSurveyChange = (e) => {
    setNewQuizSurvey(e.target.value);
  }

  const handleSubmit = () => {
    const body = {
    }

    console.log("Call api to create new quiz");
  }

  const quizzes_api = `http://localhost:5000/quizzes`;
  const pools_api = `http://localhost:5000/pools`;

  useEffect(() => {
    console.log("useeffect")

    axios.get(quizzes_api)
      .then(res => setQuizzes(res.data))

    axios.get(pools_api)
      .then(res => setPools(res.data))
  }, [])

  return (
    <>
      {pools &&
        <>
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Grid container alignItems="stretch" direction="row" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4">Overview of Quizzes</Typography>
              </Grid>
              <Grid item xs={12} justifyContent="flex-end">
                <Button onClick={handleOpen} variant="contained" sx={{
                  bgcolor: 'button.primary',
                  '&:hover': {
                    bgcolor: 'button.secondary'
                  }
                }}>New Quiz</Button>
              </Grid>
            </Grid>
            <br></br>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Quiz Name</TableCell>
                    <TableCell align="center">Collection</TableCell>
                    <TableCell align="center">Quiz Length</TableCell>
                    <TableCell align="center">Estimator</TableCell>
                    <TableCell align="center">Survey</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.collection}</TableCell>
                      <TableCell align="center">{row.length}</TableCell>
                      <TableCell align="center">{row.estimator}</TableCell>
                      <TableCell align="center">{String(row.survey)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create New Pool</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="Quiz Name"
                  label="Quiz Name"
                  fullWidth
                  variant="standard"
                  onChange={handleNameChange}
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose} sx={{
                  bgcolor: 'button.primary',
                  '&:hover': {
                    bgcolor: 'button.secondary'
                  }
                }}>Upload</Button>
              </DialogActions>
            </Dialog>

          </Box>
        </>
      }
    </>
  );
}

export default Template;