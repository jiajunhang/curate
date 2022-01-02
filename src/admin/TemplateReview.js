import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateDashboard from './TemplateDashboard';
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

const TemplateReview = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const quiz_api = `http://localhost:5000/quizzes`;
  const result_api = `http://localhost:5000/results`;

  const getQuizById = async () => {
    try {
      let res = await axios.get(`${quiz_api}/${id}`)
      setSelectedQuiz(res.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  const getResultsByQuizId = async () => {
    let res = await axios.get(`${result_api}/${id}`)
    setQuizResults(res.data);
  }

  useEffect(() => {
    setLoading(true);

    getQuizById();
    getResultsByQuizId();

    setLoading(false);
  }, [])

  return (
    <>
      {loading && <Loader />}
      {error && <p>Unable to find Quiz with ID</p>}
      {!error && !loading && quizResults && quizResults.length > 0 &&
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
              <Grid item md={12}>
                <TemplateDashboard results={quizResults} />
              </Grid>
              <Grid item md={12}>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell align="center">Student Matric</TableCell>
                    <TableCell align="center">Attempt Date</TableCell>
                    <TableCell align="center">Ability</TableCell>
                    <TableCell align="center">Total Correct</TableCell>
                    <TableCell align="center">Total Questions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizResults && quizResults.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.summary.name}</TableCell>
                      <TableCell align="center">{row.summary.matric}</TableCell>
                      <TableCell align="center">{row.datetime}</TableCell>
                      <TableCell align="center">{row.summary.ability}</TableCell>
                      <TableCell align="center">{row.summary.total_correct}</TableCell>
                      <TableCell align="center">{row.summary.total_questions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </>
      }
      {!error && !loading && quizResults && quizResults.length === 0 &&
        <p>No attempts yet</p>
      }
    </>
  );
}

export default TemplateReview;