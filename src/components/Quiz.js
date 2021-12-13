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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Quiz = ({ data, endQuiz }) => {

    const questions = [];
    const questionIndex = 0;
    const answers = new Array(15).fill(0);

    const qna_init = {
        questions: questions,
        questionIndex: questionIndex,
        answers: answers
    }

    const { name, group } = data;
    const scaled = group == 1 ? false : true;
    const [begin, setBegin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [qna, setQna] = useState(qna_init);

    useEffect(() => {
        console.log(JSON.stringify(qna));
    }, [qna] )
    
    const handleBegin = async () => {
        setBegin(true);
        await handleNext();
    }

    const api = `http://localhost:5000/get_questions`;

    const fetchQuestion = async () => {
        const body = {
            group: group,
            questions: qna.questions,
            responses: qna.answers
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
     *   i. Fetch new question
     *   ii. Increment question index
     * 
     * 2. Not Latest Qn
     *   i. Increment question index
     */
    const handleNext = async () => {

        if (qna.answers[qna.questionIndex-1] == 0) {
            setError(true);
            return;
        }

        console.log("handleNext()");

        setLoading(true);

        if (questionIndex == questions.length) {

            let clonedQna = { ...qna };
            const questionList = await fetchQuestion();
            clonedQna.questions = questionList;
            clonedQna.questionIndex++;

            setQna(clonedQna);

        } else {

            let clonedQna = { ...qna }
            clonedQna.questionIndex++;

            setQna(clonedQna);
        }
        setLoading(false);
    }

    /**
     * 2 Cases:
     * 1. Prev from latest qn
     *   i. Decrement questionIndex
     * 
     * 2. Prev from anywhere
     *   i. Decrement questionIndex
     */
    const handlePrev = () => {

        setLoading(true)

        let clonedQna = { ...qna };
        clonedQna.questionIndex--;
        setQna(clonedQna);

        setLoading(false);
    }

    const handleComplete = () => {
        
        if (qna.answers[qna.questionIndex-1] == 0) {
            setError(true);
            return;
        }

        setLoading(true);

        const quizData = {
            questions: qna.questions,
            responses: qna.answers
        }

        endQuiz(quizData);
        setLoading(false);
    }

    const handleOptionClick = (e) => {
        console.log("currentAns: " + e.target.value);

        let clonedQna = { ...qna };
        let idx = clonedQna.questionIndex;
        clonedQna.answers[idx-1] = parseInt(e.target.value);

        setQna(clonedQna);
    }

    return (
        <>
            {loading && <Loader></Loader>}
            {error && <Alert
                        severity="warning"
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
                        >
                        Please select an answer for Question {qna.questionIndex}.
                    </Alert>}
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
                        {`Question No. ${qna.questionIndex} of 15`}
                    </Grid>
                    <Grid item md = {4}></Grid>
                    <Grid item md = {12}>
                        <Typography>{qna.questions[qna.questionIndex-1].question}</Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <Typography>Select one of the following choices:</Typography>
                    </Grid>
                    <Grid item md = {12}>
                        <RadioGroup value={qna.answers[qna.questionIndex-1]} onChange={handleOptionClick}>
                            {qna.questions[qna.questionIndex-1].options.map( (e, idx) => 
                                <FormControlLabel key={idx+1} checked={qna.answers[qna.questionIndex-1] === idx+1} value={idx+1} control={<Radio/>} label={idx+1 + ". " +  e} />
                            )}
                        </RadioGroup>
                    </Grid>
                </Grid>
                {qna.questionIndex > 1 && <Button onClick={handlePrev}>Previous</Button>}
                {qna.questionIndex < 15 && <Button onClick={handleNext}>Next</Button>}
                {qna.questionIndex === 15 && <Button onClick={handleComplete}>Complete</Button>}
            </>}
        </>
    );
}

Quiz.propTypes = {
    data: PropTypes.object.isRequired,
    endQuiz: PropTypes.func.isRequired
};

export default Quiz;