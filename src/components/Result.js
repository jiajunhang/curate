import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from './Loader'

const Result = ({data, quizData, surveyData}) => {

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const api = `http://localhost:5000/submit_quiz`;

    const fetchResult = async () => {
        const body = {
            data: data,
            quizData: quizData,
            surveyData: surveyData
        };

        console.log(JSON.stringify(body));

        //const response = await axios.post(api, body);

        const stub = {
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
        return stub;
    }

    const initPage = () => {
        setLoading(true);
        const res = fetchResult();
        setResult(res);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        const res = fetchResult().then(res => setResult(res))
        console.log(result)
        setLoading(false)
    }, [])

    return (
        <>
            {loading && <Loader></Loader>}
            {!loading && result && result.summary &&
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
                        <>
                            <Grid item md={4}>
                                <Typography>{k}</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Typography>{v}</Typography>
                            </Grid>
                        </>
                        )}
                    </Grid>
                </Box>
            }
        </>
    );
}

export default Result;