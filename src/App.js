import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from './components/Layout';
import Home from './home/Home';
import Admin from './admin/Admin';
import QuizList from './quiz/QuizList';

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
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/quiz" element={<QuizList />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
