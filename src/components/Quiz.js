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

const Quiz = ({ data, endQuiz }) => {

    const arr = new Array(15).fill(0)

    const { name, group } = data;
    const scaled = group == 1 ? false : true;
    const [begin, setBegin] = useState(false);
    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(arr);
    
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    useEffect(() => {
        console.log("qnIndex: " + questionIndex)
        console.log("currAns: " + currentAnswer)
        console.log("answers: " + answers)
    }, [questionIndex, currentAnswer, answers])
    
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

    /**
     * 2 Cases: 
     * 1. Latest Qn
     *   i. Push currentAnswer to answers
     *   ii. Fetch new question
     *   iii. Increment question index
     *   iv. Update currentAnswer to 0
     * 
     * 2. Not Latest Qn
     *   i. Update currentAnswer onto answers
     *   ii. Increment question index
     *   iii. Update currentAnswer to answers[qnIdx]
     */
    const handleNext = async () => {
        console.log("handleNext()");

        setLoading(true);

        if (questionIndex == questions.length) {

            if (questionIndex > 0) {
                let newAns = answers.slice();
                newAns[questionIndex -1 ] = currentAnswer;
                setAnswers( newAns );
            }

            const questionList = await fetchQuestion();
            setQuestions(questionList);
            //console.log(questions);
            setQuestionIndex(questionIndex + 1);
            setCurrentAnswer(0);

            
        } else {

            let newAns = answers.slice();
            newAns[questionIndex + 1] = currentAnswer;
            setAnswers( newAns );

            setQuestionIndex(questionIndex + 1);
            setCurrentAnswer( answers[questionIndex-1] )
        }
        setLoading(false);
    }

    /**
     * 2 Cases:
     * 1. Prev from latest qn
     *   i. Push currentAnswer into answers
     *   ii. Decrement questionIndex
     *   iii. Update currentAnswer from answers
     * 
     * 2. Prev from anywhere
     *   i. Save currentAnswer into answers
     *   ii. Decrement questionIndex
     *   iii. Update currentAnswer from answers
     */
    const handlePrev = () => {

        setLoading(true)

        if (questionIndex == questions.length) {
            let newAns = answers.slice();
            newAns[questionIndex-1] = currentAnswer;
            setAnswers( newAns );

            setQuestionIndex(questionIndex - 1);
            console.log("qnIdx: " + questionIndex);
            setCurrentAnswer( answers[questionIndex-1] )
            console.log("currAns1: " + answers[questionIndex-1]);
            console.log("currAns2: " + currentAnswer);
        } else {

            let newAns = answers.slice();
            newAns[questionIndex-1] = currentAnswer;
            setAnswers( newAns );
    
            setQuestionIndex(questionIndex - 1);
            console.log("qnIdx: " + questionIndex);
            setCurrentAnswer( answers[questionIndex-1] )
            console.log("currAns: " + answers[questionIndex-1]);
            console.log("currAns: " + currentAnswer);
        }
        setLoading(false);
    }

    const handleComplete = () => {
        setLoading(true);

        let newAns = answers.slice();
        newAns[questionIndex-1] = currentAnswer;
        setAnswers( newAns );

        const quizData = {
            questions: questions,
            responses: answers
        }

        endQuiz(quizData);
        setLoading(false);
    }

    const handleOptionClick = (e) => {
        console.log("currentAns: " + e.target.value);
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
                                <FormControlLabel key={idx+1} checked={currentAnswer == idx+1} value={idx+1} control={<Radio/>} label={idx+1 + ". " +  e} />
                            )}
                        </RadioGroup>
                    </Grid>
                </Grid>
                {questionIndex > 1 && <Button onClick={handlePrev}>Previous</Button>}
                {questionIndex < 15 && <Button onClick={handleNext}>Next</Button>}
                {questionIndex === 15 && <Button onClick={handleComplete}>Complete</Button>}
            </>}
        </>
    );
}

Quiz.propTypes = {
    data: PropTypes.object.isRequired,
    endQuiz: PropTypes.func.isRequired
};

export default Quiz;