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
import Divider from '@mui/material/Divider';

const Quiz = ({ data, endQuiz }) => {
    
    const testLen = 5;
    const questions = [];
    const questionIndex = 0;
    const answers = new Array(testLen).fill(0);

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
        console.log("Fetching Question")
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
                            Please select an answer for Question {qna.questionIndex} before proceeding.
            </Alert>}
            {!begin && !loading &&
            <>
                <Box sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'solid 1px grey',
                    padding: '20px',
                }}>
                    <Typography variant="h5" gutterBottom component="div">
                         Hello {name} ,
                        <p>There are a total of {testLen} questions.</p> 
                        <p>The test is untimed, but you should be able to complete it in approximately 20 minutes.</p>
                    </Typography>
                    {scaled && <Typography variant="h6" gutterBottom component="div">The final scoring is scaled according to difficulty of questions.</Typography>}
                    {!scaled && <Typography variant="h6" gutterBottom component="div">The final scoring is based on number of questions answered corrected.</Typography>}
                    <Typography variant="h6" gutterBottom component="div">
                        Try to achieve the highest score possible.<p></p>
                    </Typography>
                    <Button onClick={handleBegin} variant="contained" sx={{
                        bgcolor: 'button.primary',
                        '&:hover': { 
                            bgcolor:'button.secondary'
                        }
                    }}>
                        Begin Quiz
                    </Button>
                </Box>
            </>
            }
            {begin && !loading &&
            <>
            <Box sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 'solid 1px grey',
                    padding: '20px',
                }}>
                <Grid container spacing={2}>
                    <Grid item md = {6}>
                        <Typography variant='h4'>
                            {`Question No. ${qna.questionIndex} of ${testLen}`}
                        </Typography>
                        
                    </Grid>
                    <Grid item md = {6}></Grid>
                    <Grid item md = {12}>
                        <Typography variant='h5'>{qna.questions[qna.questionIndex-1].question} </Typography>
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
                        <p></p>
                        <Divider/>
                    </Grid>
                    
                    <Grid item md={8}></Grid>
                    <Grid item md={4}>
                        {qna.questionIndex > 1 && <Button onClick={handlePrev} variant='contained' sx={{
                            bgcolor: 'button.primary',
                            '&:hover': { 
                                bgcolor:'button.secondary'
                            },
                            marginRight:1
                        }}>Previous</Button>}
                        {qna.questionIndex < testLen && <Button onClick={handleNext} variant='contained' sx={{
                            bgcolor: 'button.primary',
                            '&:hover': { 
                                bgcolor:'button.secondary'
                            }
                        }}>Next</Button>}
                        {qna.questionIndex === testLen && <Button onClick={handleComplete} variant='contained' sx={{
                            bgcolor: 'button.primary',
                            '&:hover': { 
                                bgcolor:'button.secondary'
                            }
                        }}>Complete</Button>}
                    </Grid>
                </Grid>
            </Box>
            </>}
        </>
    );
}

Quiz.propTypes = {
    data: PropTypes.object.isRequired,
    endQuiz: PropTypes.func.isRequired
};

export default Quiz;