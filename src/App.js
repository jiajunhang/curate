import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from './components/Layout';
import Home from './home/Home';
import Template from './admin/Template';
import Data from './admin/Data';
import QuizList from './experiment/QuizList';
import QuizSelect from './quiz/QuizSelect';
import Testlet from './quiz/Testlet';

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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/data" element={<Data />}></Route>
            <Route path="/template" element={<Template />}></Route>
            <Route path="/quiz" element={<QuizSelect />}></Route>
              <Route path="/quiz/:id" element={<Testlet />}></Route>
            <Route path="/expquiz" element={<QuizList />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
