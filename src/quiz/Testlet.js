import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../components/Loader';

const Testlet = () => {
  
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [surveyEnabled, setSurveyEnabled] = useState(null);

  const [data, setData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [surveyData, setSurveyData] = useState(null);

  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const api = `http://localhost:5000/quizzes`;

  const getQuizById = async () => {
    try {
      let res = await axios.get(`${api}/${id}`)
      setSelectedQuiz(res);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  useEffect(() => {
    setLoading(true);
    getQuizById();
    setLoading(false);
  }, [])
  
  return (
    <>
      {loading && <Loader/>}
      {error && <p>Unable to find ID</p>}
      {!error && <p>Hello</p>}
    </>
  );
}

export default Testlet;