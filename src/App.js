import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loader from './components/Loader';
import Layout from './components/Layout';
import Setup from './components/Setup';
import Quiz from './components/Quiz';
import Survey from './components/Survey';
import Result from './components/Result';

const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
        dark: '#282c34'
      },
      button: {
        primary: '#282c34',
        secondary: '#616469',
      },
    },
  });

const App = () => {

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(null);
    const [quizData, setQuizData] = useState(null);
    const [surveyData, setSurveyData] = useState(null);

    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [surveyCompleted, setSurveyCompleted] = useState(false);

    const startQuiz = (data) => {
        setLoading(true);

        setData(data);
        setTestStarted(data);

        setLoading(false);
    };

    const endQuiz = (quizData) => {
        setLoading(true);

        setQuizData(quizData);
        setTestStarted(false);
        setTestCompleted(true);

        setLoading(false);
    };

    const endSurvey = (surveyData) => {
        setLoading(true);

        setTestCompleted(false);
        setSurveyCompleted(true);
        setSurveyData(surveyData);

        setLoading(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                {loading && <Loader />}
                {!loading && !testStarted && !testCompleted && !surveyCompleted && (
                    <Setup startQuiz={startQuiz} />
                )}
                {!loading && testStarted && (
                    <Quiz data={data} endQuiz={endQuiz} />
                )}
                {!loading && testCompleted && (
                    <Survey data={data} endSurvey={endSurvey} />
                )}
                {!loading && surveyCompleted && (
                    <Result data={data} quizData={quizData} surveyData={surveyData} />
                )}
            </Layout>
        </ThemeProvider>
    );
};

export default App;
