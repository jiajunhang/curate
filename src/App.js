import React, { useState } from 'react';
import Loader from './components/Loader';
import Layout from './components/Layout';
import Setup from './components/Setup';

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

    const startSurvey = (surveyData) => {
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
            {/* {!loading && testStarted && (
                <Quiz data={data} endQuiz={endQuiz} />
            )}
            {!loading && testCompleted && (
                <Survey data={data} endQuiz={endQuiz} />
            )}
            {!loading && surveyCompleted && (
                <Result {...resultData} />
            )} */}
        </Layout>
    );
};

export default App;
