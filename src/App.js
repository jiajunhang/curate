import React, { useState } from 'react';
import Loader from './components/Loader';
import Layout from './components/Layout';
import Setup from './components/Setup';
import Quiz from './components/Quiz';
import Survey from './components/Survey';

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

        setSurveyCompleted(true);
        setSurveyData(surveyData);

        setLoading(false);
    }

    return (
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
            {/* {!loading && surveyCompleted && (
                <Result {...resultData} />
            )} */}
        </Layout>
    );
};

export default App;
