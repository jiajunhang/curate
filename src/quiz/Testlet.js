import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Setup from './Setup';
import Quiz from './Quiz';

const Testlet = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [data, setData] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const api = `http://localhost:5000/quizzes`;

  const getQuizById = async () => {
    console.log("get quiz by id")
    try {
      let res = await axios.get(`${api}/${id}`)
      setSelectedQuiz(res.data);
      console.log("post fetch")
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  const startQuiz = (data) => {
    setLoading(true);

    setData(data);
    setTestStarted(true);

    setLoading(false);
  };

  const endQuiz = (data, quizData) => {
    setLoading(true);

    setData(data);
    setQuizData(quizData);
    setTestCompleted(true);

    setLoading(false);
  }

  useEffect(() => {
    console.log("call effect")
    setLoading(true);
    getQuizById();
    setLoading(false);
    console.log("post effect")
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
      {/* {!loading && quizCompleted &&
        <Result data={data} quizData={quizData}/>
      } */}
    </>
  );
}

export default Testlet;