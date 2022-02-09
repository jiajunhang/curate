import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from '../components/Loader';
import axios from 'axios';

const Result = ({data, quizData, surveyData}) => {

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const host = process.env.REACT_APP_HOST_NAME;
    const port = process.env.REACT_APP_PORT;

    const api = `http://${host}:${port}/submit_quiz`;

    const fetchResult = async () => {
        const body = {
            data: data,
            quizData: quizData,
            surveyData: surveyData
        };

        console.log(JSON.stringify(body));

        const response = await axios.post(api, body);
        return response;

        /* const stub = {
            summary: {
                name: "jun",
                matric: "a1234567",
                estimator: "eap",
                ability: "1.75643",
                total_questions: "15",
                total_correct: "10"
            }
        }

        console.log("stub: " + JSON.stringify(stub))
        return stub; */
    }

    useEffect(() => {
        setLoading(true)
        fetchResult().then(res => setResult(res.data))
        console.log(result)
        setLoading(false)
    }, [])

    return (
        <>
            {(!result || !result.summary) && <Loader></Loader>}
            {result && result.summary &&
                <Box sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'solid 1px grey',
                    padding: '20px',
                }}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Typography variant="h4">Summary of Quiz</Typography>
                        </Grid>
                        {Object.entries(result.summary).map( ([k,v], i) => 
                        <Grid container item key={k}>
                            <Grid item md={4}>
                                <Typography>{k}</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Typography>{v}</Typography>
                            </Grid>
                        </Grid>
                        )}
                    </Grid>
                </Box>
            }
        </>
    );
}

export default Result;