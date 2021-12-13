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
import Loader from './Loader';

const Survey = ( {data, endSurvey} ) => {

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

    const { name, group } = data;
    const [loading, setLoading] = useState(false);

    const [beginSurvey, setBeginSurvey] = useState(false);
    const [surveyData, setSurveyData] = useState(survey_init);

    const api = `http://localhost:5000/get_survey_questions`;

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

    const handleOptionSelect = (e) => {
        console.log(JSON.stringify(surveyData));
        console.log("surveyval: " + e.target.value)
    }

    const handleComplete = () => {
        endSurvey(surveyData);
    }

    return (
        <>
            {loading && <Loader></Loader>}
            {!beginSurvey && !loading &&
            <>
                <Box>
                    <Typography variant="h4" gutterBottom component="div">
                        Hello {name}, you have completed the test successfully. We will now move onto the survey for data collection regarding the adaptivity of the test.
                    </Typography>
                </Box>
                <Button onClick={handleBegin} variant="contained">
                    Begin Survey
                </Button>
            </>
            }
            {beginSurvey && !loading &&
            <>
                <Grid container>
                    {surveyData.questions.map( (qn, qnIdx) => 
                        <>
                        <Grid item md = {8}>
                            {`Question No. ${qnIdx+1} of 6`}
                        </Grid>
                        <Grid item md = {4}></Grid>
                        <Grid item md = {12}>
                            <Typography>{qn.question}</Typography>
                        </Grid>
                        <Grid item md = {12}>
                            <Typography>Select one of the following choices:</Typography>
                        </Grid>
                        <Grid item md = {12}>
                            <RadioGroup value={surveyData.answers[qnIdx-1]} onChange={handleOptionSelect}>
                                {options.map( (option, optionIdx) => 
                                    <FormControlLabel key={optionIdx} checked={surveyData.answers[qnIdx-1] === optionIdx+1} value={optionIdx+1} control={<Radio/>} label={optionIdx+1 + ": " + option.text}/>
                                )}
                            </RadioGroup>
                        </Grid>
                        </>
                    )}
                </Grid>
                <Button onClick={handleComplete}>Complete</Button>
            </>}
        </>
    );
}

export default Survey;