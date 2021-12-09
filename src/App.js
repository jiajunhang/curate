import React, { useState } from 'react';
import Loader from './components/Loader';
import Layout from './components/Layout';

const App = () => {

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(null);

    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [resultData, setResultData] = useState(null);

    const startQuiz = (data) => {
        setLoading(true);
        setData(data);
        setTestStarted(data);
    };

    const endQuiz = () => {
        setLoading(true);
        setTestStarted(false);
        setTestCompleted(true);
    };

    const startSurvey = (resultData) => {
        setLoading(true);
        setSurveyCompleted(true);
        setResultData(resultData);
    }

    return (
        <Layout>
            {loading && <Loader />}
            {/* {!loading && !testStarted && !testCompleted && !surveyCompleted && (
                <Setup startQuiz={startQuiz} />
            )}
            {!loading && isQuizStarted && (
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
