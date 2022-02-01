import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LineChart, BarChart, Bar, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultDashboard = ({ result }) => {

  const questions = result.detail.questions;
  const difficulties = questions.map((q) => q.difficulty);
  console.log(difficulties);

  const metrics = result.metrics;

  const indiv = metrics.indiv_qns;
  const total_n2 = metrics.total_n2;
  const total_nc2 = metrics.total_nc2;
  const total_weighted_nc2 = metrics.total_weighted_nc2;

  return (
    <>
      {result &&
        <Grid container alignItems="stretch" direction="row" spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, height: 120 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                N2:
              </Typography>
              <Typography component="p" variant="h4">
                {total_n2}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, height: 120 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                NC2:
              </Typography>
              <Typography component="p" variant="h4">
                {total_nc2}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, height: 120 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Weighted NC2:
              </Typography>
              <Typography component="p" variant="h4">
                {total_weighted_nc2.toFixed(4)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Weighted-NC2 by Question:
              </Typography>
              {<BarChart
                width={700}
                height={300}
                data={indiv}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="weighted_nc2" fill="#8884d8" />
                <Bar dataKey="n2_score" fill="#82ca9d" />
              </BarChart>}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Difficulty by Question:
              </Typography>
              {<LineChart width={730} height={250} data={indiv}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis tickCount={30}  type="number" domain={[-3, 3]}  />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="difficulty" stroke="#8884d8" />
                <Line type="monotone" dataKey="n2_score" stroke="#82ca9d" />
                <Line type="monotone" dataKey="nc2_score" stroke="#86ca9d" />
              </LineChart>}
            </Paper>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default ResultDashboard;