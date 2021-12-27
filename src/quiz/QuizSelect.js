import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';

const QuizSelect = () => {

  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState(null);

  const quizzes_api = `http://localhost:5000/quizzes`;

  const fetchQuizzes = () => {
    axios.get(quizzes_api).then(res => setQuizzes(res.data));
  }

  useEffect(() => {
    setLoading(true);
    fetchQuizzes();
    console.log(JSON.stringify(quizzes))
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
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
                <Typography variant="h4">Available Quizzes</Typography>
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
                    <TableCell align="center">Completions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes && quizzes.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" scope="row">
                        <MenuItem component={Link} to={{
                          pathname: `/quiz/${row._id.$oid}`,
                          state: { selectedQuiz: row }
                        }}
                        >
                          {row.name}
                        </MenuItem>
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
          </Box>
        </>
      }
    </>
  );
}

export default QuizSelect;