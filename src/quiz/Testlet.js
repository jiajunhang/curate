import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Quiz from './Quiz';
import Result from './Result';

/**
 * This is a wrapper component for Adaptive Quiz
 * Primarily, it handles collection of:
 * i. Student Info
 * ii. Quiz status (start/end)
 * 
 * This also submits all relevant data (quiz/response/survey) into flask endpoint
 */
const Testlet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [data, setData] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const host = process.env.REACT_APP_HOST_NAME;
  const port = process.env.REACT_APP_PORT;
  const api = `http://${host}:${port}/quizzes`;

  const getQuizById = async () => {
    try {
      let res = await axios.get(`${api}/${id}`)
      setSelectedQuiz(res.data);
    } catch (error) {
      setError(true);
    }
  }

  const startQuiz = (data) => {
    setLoading(true);

    setData(data);
    setTestStarted(true);

    setLoading(false);
  };

  const endQuiz = async (data, quizData) => {
    setLoading(true);

    setData(data);
    setQuizData(quizData);
    setTestCompleted(true);

    const result_id = await submit(data, quizData);
    navigate(`/result/${result_id}`);

    setLoading(false);
  }
  
  const submit_api = `http://${host}:${port}/submit_adaptive_quiz`;

  const submit = async (data, quizData) => {
    const body = {
      data: data,
      quizData: quizData,
    };

    const response = await axios.post(submit_api, body);
    return response.data;
  }

  useEffect(() => {
    setLoading(true);
    getQuizById();
    setLoading(false);
  }, [])

  return (
    <>
      {loading && <Loader />}
      {error && <p>Unable to find Quiz with ID</p>}
      {/* {!loading && !testStarted && !testCompleted &&
        <Setup selectedQuiz={selectedQuiz} startQuiz={startQuiz} />
      } */}
      {!loading && !testCompleted && selectedQuiz &&
        <Quiz selectedQuiz={selectedQuiz} endQuiz={endQuiz} />
      }
    </>
  );
}

export default Testlet;