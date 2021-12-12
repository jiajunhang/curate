import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Loader from './Loader';

const Quiz = ({ data, endQuiz }) => {

    const { name, matric, group } = data;
    const scaled = group == 1 ? false : true;
    const [begin, setBegin] = useState(false);
    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    useEffect(() => {
        console.log("next: " + questions)
    }, questionIndex)

    const handleBegin = async () => {
        console.log("handleBegin()");
        setBegin(true);
        await handleNext();
    }

    const api = `http://localhost:5000/get_questions`;

    const fetchQuestion = async () => {
        console.log("fetchQuestion()");

        const body = {
            group: group,
            questions: questions,
            responses: answers
        };
        try {
            const response = await axios.post(api, body);
            console.log(JSON.stringify(response.data))
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleNext = async () => {
        console.log("handleNext()");
        if (questionIndex == questions.length) {
            setLoading(true);

            const questionList = await fetchQuestion();
            setQuestions(questionList);
            console.log(questions);
            setQuestionIndex(questionIndex + 1);
            setCurrentAnswer(0);
            setLoading(false);
        } else {
            setQuestionIndex(questionIndex + 1);
            setCurrentAnswer( answers[questionIndex-1] );
        }
    }

    const handlePrev = () => {
        setQuestionIndex(questionIndex - 1);
        setCurrentAnswer( answers[questionIndex-1] );
    }

    const handleComplete = () => {
        const quizData = {
            questions: questions,
            responses: answers
        }

        endQuiz(quizData);
    }

    const handleOptionClick = (e) => {
        setCurrentAnswer(e.target.value);
    }

    return (
        <>
            {loading && <Loader></Loader>}
            {!begin && !loading &&
            <>
                <Box>
                    <Typography variant="h4" gutterBottom component="div">
                        Hello {name}, there are a total of 15 questions. The test is untimed, but you should be able to complete it in approximately 20 minutes.
                    </Typography>
                    {scaled && <Typography>The final scoring is scaled according to difficulty of questions.</Typography>}
                    {!scaled && <Typography>The final scoring is based on number of questions answered corrected.</Typography>}
                    <Typography>
                        Try to achieve the highest score possible.
                    </Typography>
                </Box>
                <Button onClick={handleBegin} variant="contained">
                    Begin Quiz
                </Button>
            </>
            }
            {begin && !loading &&
            <>
                <Grid container>
                    <Grid item md = {8}>
                        {`Question No. ${questionIndex} of 15`}
                    </Grid>
                    <Grid item md = {4}></Grid>
                    <Grid item md = {12}>
                        <Typography>{questions[questionIndex-1].question}</Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <Typography>Select one of the following choices:</Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <RadioGroup value={currentAnswer} onChange={handleOptionClick}>
                            {questions[questionIndex-1].options.map( (e, idx) => 
                                <FormControlLabel value={idx} control={<Radio/>} label={e} />
                            )}
                        </RadioGroup>
                    </Grid>
                </Grid>
                {questionIndex > 1 && <Button onClick={handlePrev}>Previous</Button>}
                {questionIndex < 15 && <Button onClick={handleNext}>Next</Button>}
                {questionIndex == 15 && <Button onClick={handleComplete}>Complete</Button>}
            </>}
        </>
    );
}

Quiz.propTypes = {
    data: PropTypes.object.isRequired,
    endQuiz: PropTypes.func.isRequired
};

export default Quiz;