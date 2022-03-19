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
  const answers = new Array(120).fill(0);
  const calib_init = {
    questions: questions,
    answers: answers
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState("");
  const [beginCalib, setBeginCalib] = useState(false);
  const [calibData, setCalibData] = useState(calib_init);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const host = process.env.REACT_APP_HOST_NAME;
  const port = process.env.REACT_APP_PORT;
  const get_calib_session = `http://${host}:${port}/calibration_session`;
  const get_calib_api = `http://${host}:${port}/get_calibration_questions`;
  const submit_calib_api = `http://${host}:${port}/submit_calibration`;

  useEffect(() => {
    //console.log(JSON.stringify(calibData))
  }, [calibData]);

  const fetchCalib = async () => {
    const response = await axios.get(get_calib_api);
    return response.data
  }

  const generateSession = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  const handleBegin = async () => {
    const resp = await axios.get(get_calib_session);
    const len = resp.data.length;
    if (len >= 26) {
      setError(true);
      setErrorMsg("Submissions have been maxed out. Sorry!");
      return;
    }

    if (sessionId == "") {
      let sessionGen = generateSession(7);
      
      const calibQn = await fetchCalib();
      let calibCloned = { ...calibData };
      calibCloned.questions = calibQn;
      calibCloned.answers = answers;

      const body = {
        "sessionId": sessionGen,
        "questions": calibQn,
        "answers": answers
      }
      const resp = await axios.post(get_calib_session, body);
      
      setSessionId(sessionGen);
      setCalibData(calibCloned);

    } else {
      const resp = await axios.get(`${get_calib_session}/${sessionId}`);

      if (resp.data == null) {
        setError(true);
        setErrorMsg("Invalid session ID.")
        return;
      } else if (resp.data != null && resp.data.submitted) {
        setError(true);
        setErrorMsg("Submission for this session has already been made.")
        return;

      }

      let calibCloned = { ...calibData };
      calibCloned.questions = resp.data.questions;
      calibCloned.answers = resp.data.responses;
      
      setCalibData(calibCloned);

    }
    setBeginCalib(true);

  }

  const handleOptionClick = async (e, qnIdx) => {
    const { name, value } = e.target
    let calibCloned = { ...calibData };
    let ans = calibCloned.answers;
    ans[qnIdx] = parseInt(value);
    calibCloned.answers = ans;

    setCalibData(calibCloned);

    let body = {
      "sessionId": sessionId,
      ...calibCloned
    };

    const res = await axios.put(get_calib_session, body);
  }

  const handleSessionIdChange = (e) => {
    setSessionId(e.target.value);
  }

  const handleComplete = async () => {

    let unanswered = hasUnanswered();
    if (unanswered.length > 0) {
      setError(true);
      setErrorMsg(`There are some unanswered questions: ${unanswered}. Please answer all questions before submission.`);
      return;
    }

    setLoading(true);

    const body = {
      "sessionId": sessionId,
      ...calibData
    };

    const result_id = await submit(body);
    navigate(`/calibration_res/${result_id}`);
    setLoading(false);
  }

  const submit = async (data) => {
    const response = await axios.post(submit_calib_api, data);
    return response.data;
  }

  const hasUnanswered = () => {
    let unanswered = [];
    for (var i = 0; i < calibData.answers.length; i++) {
      if (calibData.answers[i] == 0) {
        unanswered.push(i+1);
      }
    }
    return unanswered;
  }

  const resetError = () => {
    setError(false);
    setErrorMsg("");
  }

  return (
    <>
      {loading && <Loader></Loader>}
      {error && 
        <Snackbar
        open={error}
        onClose={() => resetError()}
        autoHideDuration={4000}
        message={errorMsg}
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
              <p></p>
              <p>If you are restoring the previous session, key in the generated ID from before. Otherwise, leave the field blank to start from beginning.</p>
              <p>IMPORTANT: Once started, you will see a session ID at the top of the page. Save the session ID somewhere. You will be able to restore the attempt if you accidentally closed the tab/browser.</p>
              <p></p>
              <p>After submission, you will receive a unique Result ID. Send this ID to Prof. Tan to complete the entire calibration study.</p>
            </Typography>
            <Grid spacing={2} container alignItems="stretch" direction="row" justifyContent="center">
              <Grid item xs={4}>
                <TextField value={sessionId}
                  onChange={handleSessionIdChange} id="sessionId" label="Session Id" variant="standard" />
              </Grid>
            </Grid>
            <br/> 
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
              <Grid item md={12}>
              <Typography variant='h4'>{`Session ID: ${sessionId} `}</Typography>
              </Grid>
              {calibData.questions.map((qn, qnIdx) =>
                <>
                  <Grid key={qnIdx} item md={8}>
                    <Typography variant='h5'>
                      {`Question No. ${qnIdx + 1} of 120`}
                    </Typography>
                    <br/>
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
