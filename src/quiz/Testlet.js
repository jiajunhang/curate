import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../components/Loader';

const Testlet = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { id } = useParams();

  const api = `http://localhost:5000/quizzes`;

  const getQuizById = (id) => {
      axios.get(`${api}/${id}`)
      .then(res => setSelectedQuiz(res))
      .catch( () => setError(true));
  }

  useEffect(() => {
    setLoading(true);
    getQuizById(id);
    console.log(JSON.stringify(selectedQuiz))
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