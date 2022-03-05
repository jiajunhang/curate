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
import QuizSelect from './quiz/QuizSelect';
import Testlet from './quiz/Testlet';
import TemplateReview from './admin/TemplateReview';
import Result from './quiz/Result';
import Calibration from './quiz/Calibration';
import CalibResult from './quiz/CalibResult';

require('dotenv').config();

/* console.log(process.env)
console.log(process.env.REACT_APP_HOST_NAME)
console.log(process.env.REACT_APP_PORT) */

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
              <Route path="/template/:id" element={<TemplateReview />}></Route>
            <Route path="/quiz" element={<QuizSelect />}></Route>
              <Route path="/quiz/:id" element={<Testlet />}></Route>
            <Route path="/calibration" element={<Calibration />}></Route>
            <Route path="/calibration_res/:id" element={<CalibResult />}></Route>
            {/* <Route path="/expquiz" element={<QuizList />}></Route> */}
            <Route path="/result/:id" element={<Result />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
