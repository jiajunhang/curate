import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const Quiz = ({ data, endQuiz }) => {

    const { name, matric, group } = data;
    const scaled = group == 1 ? false : true;
    const [begin, setBegin] = useState(false);
    
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    const handleBegin = () => {
        console.log("handleBegin()");
        setBegin(true);
        handleNext();
    }

    const api = `http://localhost:5000/get_questions`;

    const fetchQuestion = async () => {
        console.log("fetchQuestion()");

        const body = {
            questions: questions,
            responses: answers
        };

        try {
            const response = await axios.post(api, body);
            const data = JSON.stringify(response.data);
            console.log(data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const handleNext = () => {
        console.log("handleNext()");
        if (questionIndex == questionIndex) {
            const questionList = fetchQuestion();
            setQuestions(questionList);
            setQuestionIndex(questionIndex + 1);
            setCurrentAnswer(0);
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
            {!begin &&
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
            {begin &&
            <>
                <Grid container>
                    {/* <Grid item md = {8}>
                        {`Question No. ${questionIndex + 1} of 15`}
                    </Grid>
                    <Grid item md = {4}></Grid>
                    <Grid item md = {12}>
                        <Typography></Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <Typography>Select one of the following choices:</Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <ButtonGroup orientation="vertical"></ButtonGroup>
                        {questions[questionIndex].options.map(option, i) => {
                            return (
                                
                            );
                        }}
                    </Grid> */}
                </Grid>
                {questionIndex > 1 && <Button>Previous</Button>}
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