import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Loader from '../components/Loader';
import { BarChart, Bar, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3-array'

const TemplateDashboard = ({ selectedQuiz, results }) => {

  const [loading, setLoading] = useState(false);

  const dummy_abilities = [0.17835878, 1.29954448, -0.63545942, -0.9160703, 0.90438934,
    -3.16348948, -2.47263213, -1.86994698, -1.66535305, -3.13925651,
    -0.97466178, 1.38094647, -2.95653961, 0.15845249, -2.97652217,
    -0.41299429, 1.81586417, 1.78295328, 3.02886764, 1.3288499,
    -2.94167787, 4.6869, -2.11098161, 4.65928167, 2.09582455,
    0.99730397, -2.45808395, 2.1185396, 1.63457514, -1.1999448,
    0.07402053, 1.16614609, 1.70556232, 1.86492762, -0.00504731,
    -2.81256041, 2.42888771, 0.21380614, 0.42154046, 1.64838858,
    3.18738985, 2.24245583, 1.65398353, -1.94689599, 0.72219235,
    0.94700504, -0.39901386, -2.33879944, -0.11899855, 1.54529346,
    -1.77138672, 0.47936822, 0.87310859, 2.04607335, 0.79681983,
    1.84356166, 1.82645464, 3.28368986, 0.08034519, -4.59858624,
    -0.8498804, -1.8425047, 0.69685769, -0.30446061, -0.77419049,
    -1.44242876, 1.36493934, 2.04333787, 4.45326047, -1.22429819,
    3.36815226, -0.50190815, 0.94138525, 3.44628744, 0.14099769,
    0.16901766, -0.04439601, -0.69521687, 3.05899606, -1.13135266,
    1.24418003, 1.07271472, -0.43160717, -2.73976249, 3.31487184,
    2.04580116, -2.36780434, -1.79453334, 2.35203004, -0.20972411,
    3.69726451, -0.73431163, 3.12883086, -1.45319156, 1.84906662,
    0.4304561, 1.41903046, 0.35004149, -2.82868669, 0.36848664];

  const histogramData = () => {
    const histogramGen = d3.bin().domain([-3, 3]).thresholds(20);

    const abilities = results.map(r => r.summary.ability);
    
    const bins = histogramGen(dummy_abilities); // replace dummy with abilities for live data
    const mapped = [];

    for (let i = 0; i < bins.length; i++) {
      let curr = bins[i];
      let len = parseInt(curr.length);
      let lower = String(bins[i]['x0']);
      let upper = String(bins[i]['x1']);

      const entry = {
        count: len,
        lower: lower,
        upper: upper
      };
      mapped.push(entry)
    }
    console.log("mapped: " + JSON.stringify(mapped));

    return mapped;
  }

  const scatterPlotData = () => {
    const dummy2 = dummy_abilities2.map(r => ({ability: r.ability.toFixed(3)}));
    console.log("dummy2: " + dummy2);
    return dummy2;
    /* const data = results.map(r => (
      {
        ability: r.summary.ability,
        studentName: `${r.summary.name} ${r.summary.matric}`,
      }));


    console.log("data: " + JSON.stringify(data))
    return data; */
  }

  const getAbility = (res) => {
    return parseFloat(res.summary.ability);
  }

  const addAbility = (total, next) => {
    return total + next;
  }

  const getAverage = () => {
    const total = results
      .map(getAbility)
      .reduce(addAbility, 0);
    return total / results.length;
  }

  const dummy_abilities2 = [{ "ability": 0.17835877886715296 }, { "ability": 1.2995444845275261 }, { "ability": -0.6354594160874628 }, { "ability": -0.9160703020835769 }, { "ability": 0.9043893416614108 }, { "ability": -3.163489483816423 }, { "ability": -2.4726321306409598 }, { "ability": -1.8699469773562165 }, { "ability": -1.6653530483511365 }, { "ability": -3.1392565058247768 }, { "ability": -0.9746617831422543 }, { "ability": 1.380946469463484 }, { "ability": -2.956539606344596 }, { "ability": 0.15845248944058818 }, { "ability": -2.9765221676926923 }, { "ability": -0.4129942850906009 }, { "ability": 1.815864171688877 }, { "ability": 1.7829532759679412 }, { "ability": 3.0288676397489755 }, { "ability": 1.328849901172898 }, { "ability": -2.9416778685423997 }, { "ability": 4.686900000611973 }, { "ability": -2.1109816132240913 }, { "ability": 4.659281667162448 }, { "ability": 2.0958245465743306 }, { "ability": 0.9973039651954978 }, { "ability": -2.4580839546202813 }, { "ability": 2.118539597124489 }, { "ability": 1.6345751361167746 }, { "ability": -1.1999447968698322 }, { "ability": 0.07402053224826798 }, { "ability": 1.1661460890449642 }, { "ability": 1.7055623222933238 }, { "ability": 1.8649276237136065 }, { "ability": -0.005047308990805164 }, { "ability": -2.812560413128363 }, { "ability": 2.428887709634395 }, { "ability": 0.2138061382365875 }, { "ability": 0.42154046112111043 }, { "ability": 1.6483885758265946 }, { "ability": 3.1873898508837506 }, { "ability": 2.242455834804484 }, { "ability": 1.6539835287120428 }, { "ability": -1.9468959853395906 }, { "ability": 0.7221923506433706 }, { "ability": 0.9470050445578917 }, { "ability": -0.399013855811125 }, { "ability": -2.338799444996662 }, { "ability": -0.11899854518821598 }, { "ability": 1.5452934609417712 }, { "ability": -1.771386717987132 }, { "ability": 0.4793682196158201 }, { "ability": 0.8731085921273052 }, { "ability": 2.0460733471212107 }, { "ability": 0.7968198331119835 }, { "ability": 1.843561661443031 }, { "ability": 1.8264546399446981 }, { "ability": 3.2836898619842296 }, { "ability": 0.08034518876751545 }, { "ability": -4.598586237115007 }, { "ability": -0.8498804044869488 }, { "ability": -1.8425046964681318 }, { "ability": 0.6968576885506568 }, { "ability": -0.3044606123160408 }, { "ability": -0.7741904900946002 }, { "ability": -1.4424287566853355 }, { "ability": 1.3649393409934403 }, { "ability": 2.0433378742937593 }, { "ability": 4.453260466044316 }, { "ability": -1.224298187507084 }, { "ability": 3.3681522626081186 }, { "ability": -0.5019081506386256 }, { "ability": 0.9413852462340601 }, { "ability": 3.446287443172967 }, { "ability": 0.14099769079905833 }, { "ability": 0.1690176610444298 }, { "ability": -0.04439600636535651 }, { "ability": -0.6952168743359749 }, { "ability": 3.058996064024464 }, { "ability": -1.131352656297636 }, { "ability": 1.2441800336095783 }, { "ability": 1.0727147215507493 }, { "ability": -0.431607171477167 }, { "ability": -2.7397624897269983 }, { "ability": 3.314871843573631 }, { "ability": 2.045801162143889 }, { "ability": -2.367804341699063 }, { "ability": -1.7945333423156846 }, { "ability": 2.3520300441378663 }, { "ability": -0.209724113283664 }, { "ability": 3.6972645080634297 }, { "ability": -0.7343116316172864 }, { "ability": 3.1288308619086544 }, { "ability": -1.4531915605046215 }, { "ability": 1.84906662179582 }, { "ability": 0.43045609685999014 }, { "ability": 1.4190304609677826 }, { "ability": 0.35004148812743197 }, { "ability": -2.828686687317348 }, { "ability": 0.368486635839451 }]

  return (
    <>
      <Grid container alignItems="stretch" direction="row" spacing={2}>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h5'>Quiz Configuration</Typography>
            <br />
            Quiz Name: {selectedQuiz.name}
            <br />
            Collection: {selectedQuiz.collectionId}
            <br />
            Quiz Length: {selectedQuiz.length}
            <br />
            Estimator: {selectedQuiz.estimator}
            <br />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, height: 120 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Total Attempts:
            </Typography>
            <Typography component="p" variant="h4">
              {selectedQuiz.attempts}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, height: 120 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Average Estimate:
            </Typography>
            <Typography component="p" variant="h4">
              {getAverage().toFixed(5)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Density Plot
            </Typography>
            <ScatterChart
              width={300}
              height={300}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis allowDecimals="false" label="ability" type="number" domain={[-3, 3]} dataKey="ability" />
              <YAxis allowDecimals="false" label="ability" type="number" domain={[-3, 3]} dataKey="ability" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Estimates" data={scatterPlotData()} fill="#8884d8" />
            </ScatterChart>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Ability Histogram
            </Typography>
            <BarChart
              width={300}
              height={300}
              data={histogramData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lower" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default TemplateDashboard;