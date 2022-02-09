import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Loader from '../components/Loader';
import Divider from '@mui/material/Divider';

const Survey = ( {endSurvey} ) => {

    const questions = [];
    const answers = new Array(6).fill(0);
    const survey_init = {
        questions: questions,
        answers: answers
    };

    const options = [
        {
            val: 1,
            text: "Never"
        },
        {
            val: 2,
            text: "Rarely"
        },
        {
            val: 3,
            text: "Sometimes"
        },
        {
            val: 4,
            text: "Often"
        },
        {
            val: 5,
            text: "Always"
        }
    ]

    const [loading, setLoading] = useState(false);

    const [beginSurvey, setBeginSurvey] = useState(false);
    const [surveyData, setSurveyData] = useState(survey_init);

    const host = process.env.REACT_APP_HOST_NAME;
    const port = process.env.REACT_APP_PORT;

    const api = `http://${host}:${port}/get_survey_questions`;

    useEffect(() => {
        console.log(JSON.stringify(surveyData))
    }, [surveyData]);

    const fetchSurvey = async () => {
        const response = await axios.get(api);
        return response.data
    }

    const handleBegin = async () => {
        const surveyQn = await fetchSurvey();
        let surveyCloned = { ...surveyData };
        surveyCloned.questions = surveyQn;

        setSurveyData(surveyCloned);
        setBeginSurvey(true);

    }

    const handleOptionSelect = (e, qnIdx) => {
        console.log(JSON.stringify(surveyData));
        const {name , value} = e.target
        console.log("name: " + name)
        console.log("surveyval: " + value)
        console.log("qIdx: " + qnIdx)
        let surveyCloned = {...surveyData};
        let ans = surveyCloned.answers;
        ans[qnIdx] = parseInt(value);
        surveyCloned.answers = ans;

        setSurveyData(surveyCloned);
    }

    const handleComplete = () => {
        endSurvey(surveyData);
    }

    return (
        <>
            {loading && <Loader></Loader>}
            {!beginSurvey && !loading &&
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
                        <p>You have completed the test successfully. </p>
                        <p>We will now move onto the survey for data collection regarding the adaptivity of the test. </p>
                    </Typography>
                    <Button onClick={handleBegin} variant="contained" sx={{
                        bgcolor: 'button.primary',
                        '&:hover': { 
                            bgcolor:'button.secondary'
                        }
                    }}>
                        Begin Survey
                    </Button>
                </Box>
            </>
            }
            {beginSurvey && !loading &&
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
                    {surveyData.questions.map( (qn, qnIdx) => 
                        <>
                        <Grid item md = {8}>
                            <Typography variant='h5'>
                                {`Question No. ${qnIdx+1} of 6`}
                            </Typography>
                        </Grid>
                        <Grid item md = {4}></Grid>
                        <Grid item md = {12}>
                            <Typography variant='h6'>{qn.question}</Typography>
                        </Grid>
                        <Grid item md = {12}>
                            <Typography>Select one of the following choices:</Typography>
                        </Grid>
                        <Grid item md = {12}>
                            <RadioGroup value={surveyData.answers[qnIdx-1]} onChange={(e) => {handleOptionSelect(e, qnIdx)} }>
                                {options.map( (option, optionIdx) => 
                                    <FormControlLabel key={optionIdx} checked={surveyData.answers[qnIdx] === optionIdx+1} value={optionIdx+1} control={<Radio/>} label={optionIdx+1 + ": " + option.text}/>
                                )}
                            </RadioGroup>
                            <Divider/>
                            <p></p>
                        </Grid>
                        </>
                    )}
                </Grid>
                <Button onClick={handleComplete} variant='contained' sx={{
                            bgcolor: 'button.primary',
                            '&:hover': { 
                                bgcolor:'button.secondary'
                            }
                        }}>Complete</Button>
                </Box>
            </>}
        </>
    );
}

export default Survey;