import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, collection, length, estimator, surveyEnabled) {
  return { name, collection, length, estimator, surveyEnabled };
}

const rows = [
  createData('IS2103 - Group 1', "collection_1", 15, "STD", "Yes"),
  createData('IS2103 - Group 2', "collection_1", 15, "MLE", "Yes"),
  createData('IS2103 - Group 3', "collection_1", 15, "EAP", "Yes"),
];

const Template = () => {

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography>TEMPLATE PAGE</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quiz Name</TableCell>
            <TableCell align="right">Collection Name</TableCell>
            <TableCell align="right">Total Length</TableCell>
            <TableCell align="right">Estimator</TableCell>
            <TableCell align="right">Survey Enabled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.collection}</TableCell>
              <TableCell align="right">{row.length}</TableCell>
              <TableCell align="right">{row.estimator}</TableCell>
              <TableCell align="right">{row.surveyEnabled}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default Template;