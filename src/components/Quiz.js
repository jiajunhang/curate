import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Quiz = ({ data, endQuiz }) => {

    const [begin, setBegin] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const { name, group } = data;
    const scaled = group == 1 ? false : true;

    const handleBegin = () => {
        setBegin(true);
    }

    const handleNext = () => {

    }

    const handlePrev = () => {

    }
    
    const handleComplete = () => {

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
                <Box>

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