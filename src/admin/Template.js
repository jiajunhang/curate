import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

const estimators = ["STD", "MLE", "EAP"];
const lengths = [1, 5, 10, 15];

const Template = () => {

  const [loading, setLoading] = useState(false);

  const [quizzes, setQuizzes] = useState(null);
  const [pools, setPools] = useState(null);
  const [open, setOpen] = useState(false);

  const [newQuizName, setNewQuizName] = useState('');
  const [newQuizCollection, setNewQuizCollection] = useState('');
  const [newQuizLength, setNewQuizLength] = useState('');
  const [newQuizEstimator, setNewQuizEstimator] = useState('');
  const [newQuizSurvey, setNewQuizSurvey] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (e) => {
    setNewQuizName(e.target.value);
  }

  const handleCollectionChange = (e) => {
    setNewQuizCollection(e.target.value);
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

  const resetDialog = () => {
    setNewQuizName('');
    setNewQuizCollection('');
    setNewQuizLength('');
    setNewQuizEstimator('');
    setNewQuizSurvey('');
    setOpen(false);
  }

  const handleSubmit = async () => {
    setLoading(true);

    const body = {
      name: newQuizName,
      collectionId: newQuizCollection,
      length: newQuizLength,
      estimator: newQuizEstimator,
      survey: newQuizSurvey,
      attempts: 0
    }

    await axios.post(quizzes_api, body).then(res => console.log(res));
    fetchQuizzes();
    resetDialog();

    setLoading(false);
  }

  const quizzes_api = `http://localhost:5000/quizzes`;
  const pools_api = `http://localhost:5000/pools`;

  const fetchQuizzes = () => {
    axios.get(quizzes_api).then(res => setQuizzes(res.data));
  }

  const fetchPools = () => {
    axios.get(pools_api).then(res => setPools(res.data))
  }

  useEffect(() => {
    fetchQuizzes();
    fetchPools();
  }, [])

  return (
    <>
      { (!quizzes || loading) && <Loader/>}
      {quizzes &&
        <>
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              marginBottom: 10
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
                    <TableCell align="center">Collection ID</TableCell>
                    <TableCell align="center">Quiz Length</TableCell>
                    <TableCell align="center">Estimator</TableCell>
                    <TableCell align="center">Survey</TableCell>
                    <TableCell align="center">Attempts</TableCell>
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
                      <TableCell align="center">{row.collectionId}</TableCell>
                      <TableCell align="center">{row.length}</TableCell>
                      <TableCell align="center">{row.estimator}</TableCell>
                      <TableCell align="center">{String(row.survey)}</TableCell>
                      <TableCell align="center">{row.attempts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Fill in the configuration for the new quiz.
                </DialogContentText>
                <Stack spacing={1}>
                <TextField
                  margin="dense"
                  id="Quiz Name"
                  label="Quiz Name"
                  fullWidth
                  value={newQuizName}
                  variant="standard"
                  onChange={handleNameChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newQuizCollection}
                    label="Collection"
                    onChange={handleCollectionChange}
                  >
                    {pools && pools.map((pool, idx) =>
                      <MenuItem key={idx} value={pool.collectionId}>{pool.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Estimator</InputLabel>
                  <Select
                    value={newQuizEstimator}
                    label="Estimator"
                    onChange={handleEstimatorChange}
                  >
                    {estimators.map((e, idx) =>
                      <MenuItem key={idx} value={e}>{e}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Quiz Length</InputLabel>
                  <Select
                    value={newQuizLength}
                    label="Quiz Length"
                    onChange={handleLengthChange}
                  >
                    {lengths.map((e, idx) =>
                      <MenuItem key={idx} value={e}>{e}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Survey Enabled</InputLabel>
                  <Select
                    value={newQuizSurvey}
                    label="Survey Enabled"
                    onChange={handleSurveyChange}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleSubmit} sx={{
                  bgcolor: 'button.primary',
                  '&:hover': {
                    bgcolor: 'button.secondary'
                  }
                }}>Create New Quiz</Button>
              </DialogActions>
            </Dialog>

          </Box>
        </>
      }
    </>
  );
}

export default Template;