import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Loader from '../components/Loader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import { useParams, useNavigate } from 'react-router-dom';

const Calibration = () => {

  const questions = [];
  // EDIT: change value to actual number of questions
  const answers = new Array(19).fill(0);
  const calib_init = {
    questions: questions,
    answers: answers
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [beginCalib, setBeginCalib] = useState(false);
  const [calibData, setCalibData] = useState(calib_init);
  const [error, setError] = useState(false);

  const host = process.env.REACT_APP_HOST_NAME;
  const port = process.env.REACT_APP_PORT;
  const get_calib_api = `http://${host}:${port}/get_calibration_questions`;
  const submit_calib_api = `http://${host}:${port}/submit_calibration`;

  useEffect(() => {
    //console.log(JSON.stringify(calibData))
  }, [calibData]);

  const fetchCalib = async () => {
    const response = await axios.get(get_calib_api);
    return response.data
  }

  const handleBegin = async () => {
    const calibQn = await fetchCalib();
    let calibCloned = { ...calibData };
    calibCloned.questions = calibQn;

    setCalibData(calibCloned);
    setBeginCalib(true);
  }

  const handleOptionClick = (e, qnIdx) => {
    //console.log(JSON.stringify(calibData));
    const { name, value } = e.target
    console.log("name: " + name)
    console.log("calibval: " + value)
    console.log("qIdx: " + qnIdx)
    let calibCloned = { ...calibData };
    let ans = calibCloned.answers;
    ans[qnIdx] = parseInt(value);
    calibCloned.answers = ans;

    setCalibData(calibCloned);
  }

  const handleComplete = async () => {
    if (hasUnanswered()) {
      setError(true);
      return;
    }

    setLoading(true);
    const result_id = await submit(calibData);
    navigate(`/calibration_res/${result_id}`);
    setLoading(false);
  }

  const submit = async (data) => {
    const response = await axios.post(submit_calib_api, data);
    return response.data;
  }

  const hasUnanswered = () => {
    for (let ans of calibData.answers) {
      if (ans == 0) return true;
    }
    return false;
  }

  return (
    <>
      {loading && <Loader></Loader>}
      {error && 
        <Snackbar
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={4000}
        message={`There are some unanswered question(s). Please complete before submission.`}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setError(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      ></Snackbar>}
      {!beginCalib && !loading &&
        <>
          <Box sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 1px grey',
            padding: '20px',
          }}>
            <Typography variant="h5" gutterBottom component="div">
              Hello,
              <p>There are a total of 120 questions.</p>
              <p>The test is untimed, but you should be able to complete it in approximately 40 minutes.</p>
            </Typography>
            <Button onClick={handleBegin} variant="contained" sx={{
              bgcolor: 'button.primary',
              '&:hover': {
                bgcolor: 'button.secondary'
              }
            }}>
              Begin
            </Button>
          </Box>
        </>
      }
      {beginCalib && !loading &&
        <>
          <Box sx={{
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 1px grey',
            padding: '20px',
          }}>
            <Grid container spacing={1}>
              {calibData.questions.map((qn, qnIdx) =>
                <>
                  <Grid item md={8}>
                    <Typography variant='h5'>
                      {`Question No. ${qnIdx + 1} of 120`}
                    </Typography>
                  </Grid>
                  <Grid item md={4}></Grid>
                  <Grid item md={12}>
                    <Typography variant='h6'>{qn.question}</Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography>Select one of the following choices:</Typography>
                  </Grid>
                  <Grid item md={12}>
                    <ToggleButtonGroup orientation="vertical" value={calibData.answers[qnIdx - 1]} exclusive onChange={(e) => {handleOptionClick(e, qnIdx)}} fullWidth={true}>
                      {qn.options.map((e, idx) =>
                        <ToggleButton key={idx} selected={calibData.answers[qnIdx] === idx + 1} value={idx + 1} label={idx + 1 + ". " + e} sx={{
                          justifyContent: "flex-start"
                        }}>
                          {idx + 1 + ". " + e}
                        </ToggleButton>
                      )}
                    </ToggleButtonGroup>
                    <p></p>
                  </Grid>
                </>
              )}
            </Grid>
            <Button onClick={handleComplete} variant='contained' sx={{
              bgcolor: 'button.primary',
              '&:hover': {
                bgcolor: 'button.secondary'
              }
            }}>Complete</Button>
          </Box>
        </>}
    </>
  );
}

export default Calibration;
