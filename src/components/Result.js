import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Result = ({data, quizData, surveyData}) => {

    const [result, setResult] = useState({});

    const api = ``;

    const fetchResult = async () => {
        const body = {
            data: data,
            quizData: quizData,
            surveyData: surveyData
        };

        console.log(JSON.stringify(body));

        //const response = await axios.post(api, body);

        const stub = {
            name: "jj",
            ability: "1.7567"
        }

        return stub;
    }

    useEffect(() => {
        setResult( fetchResult() );
    }, []);


    return (
        <Grid container>
            <Grid item>
                <Typography>Page works as expected</Typography>
            </Grid>
        </Grid>
    );
}

export default Result;