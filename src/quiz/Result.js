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
import ResultDashboard from './ResultDashboard';

const Result = () => {

  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const fetch_api = `http://localhost:5000/result/${id}`;

  const fetchResult = async () => {
    try {
      const res = await axios.get(fetch_api);
      return res;
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchResult().then(res => setResult(res.data))
    console.log(result)
  }, [])

  return (
    <>
      {error && <p>Unable to find Result with ID</p>}
      {(!result || !result.summary) && <Loader></Loader>}
      {result && result.summary &&
        <Box sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          border: 'solid 1px grey',
          padding: '20px',
          marginBottom: 10
        }}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h4">Cheating Indicators</Typography>
            </Grid>
            <Grid item md={12}>
              <ResultDashboard result={result}></ResultDashboard>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h4">Performance Summary</Typography>
            </Grid>
            {Object.entries(result.summary).map(([k, v], i) =>
              <Grid container item key={k}>
                <Grid item md={4}>
                  <Typography>{k}</Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography>{v}</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Typography variant="h4">Performance Review</Typography>
            </Grid>
            {result && result.detail &&
              Object.entries(result.detail.questions).map((qn, i) =>
                <>
                  <Grid item md={12}>
                    <Typography variant='h5'>Question {i + 1}: </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant='h5'>{qn[1].question} </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <ToggleButtonGroup disabled orientation="vertical" fullWidth={true}>
                      {console.log(qn[1].options)}
                      {qn[1].options && qn[1].options.map((e, idx) =>
                        <ToggleButton key={idx + 1} value={idx + 1} selected={result.detail.responses[i] === idx + 1} label={idx + 1 + ". " + e} sx={{
                          justifyContent: "flex-start"
                        }}>
                          {console.log('idx:' + idx)}
                          {console.log(result.detail.responses[idx])}
                          {idx + 1 + ". " + e}
                        </ToggleButton>
                      )}
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item md={12}>
                    <Typography>Correct Answer: {qn[1].correct}</Typography>
                    {qn[1].explanation && <Typography >{qn[1].explanation}</Typography>}
                    <Typography >{(100 * qn[1]['total_correct'] / qn[1]['total_attempts']).toFixed(2)}% of students have answered correctly.</Typography>
                    <p></p>
                    <Divider />
                  </Grid>
                </>
              )}
          </Grid>
        </Box>
      }
    </>
  );
}

export default Result;