import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

function createData(name, collection_name, size) {
  return { name, collection_name, size };
}

const rows = [
  createData('SAMPLE - Sanfoundry (Basic Computing MCQ)', "collection_1", 756),
];

const Input = styled('input')({
  display: 'none',
});

const Data = () => {

  const [pools, setPools] = useState(null);

  const [open, setOpen] = useState(false);
  const [newDataName, setNewDataName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newData, setNewData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (e) => {
    setNewDataName(e.target.value);
  }

  const handleCollectionNameChange = (e) => {
    setNewCollectionName(e.target.value);
  }

  const handleCapture = ({ target }) => {
    console.log(target.files[0])
  }

  const handleSubmit = () => {
    const body = {
      name: newDataName,
      collectionName: newCollectionName,
      data: newData
    }

    console.log("Call api to create question pool");
  }

  const host = process.env.REACT_APP_HOST_NAME;
  const port = process.env.REACT_APP_PORT;

  const api = `http://${host}:${port}/pools`;

  useEffect(() => {
    console.log("useeffect")
    const res = axios.get(api)
      .then(res => setPools(res.data))
  }, [])

  return (
    <>
      {!pools && <Loader/>}
      {pools &&
        <>
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Grid container alignItems="stretch" direction="row" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4">Overview of Collection</Typography>
              </Grid>
              <Grid item xs={12} justifyContent="flex-end">
                <Button onClick={handleOpen} variant="contained" sx={{
                  bgcolor: 'button.primary',
                  '&:hover': {
                    bgcolor: 'button.secondary'
                  }
                }}>New Collection</Button>
              </Grid>
            </Grid>
            <br></br>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pool Name</TableCell>
                    <TableCell align="center">Collection ID</TableCell>
                    <TableCell align="center">Pool Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pools.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.collectionId}</TableCell>
                      <TableCell align="center">{row.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create New Pool</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="Question Pool Name"
                  label="Question Pool Name"
                  fullWidth
                  variant="standard"
                  onChange={handleNameChange}
                />
                <TextField
                  margin="dense"
                  id="Collection Name"
                  label="Collection Name"
                  fullWidth
                  variant="standard"
                  onChange={handleCollectionNameChange}
                />
                <label htmlFor="contained-button-file">
                  <Input accept="application/JSON" id="contained-button-file" onChange={handleCapture} multiple type="file" />
                  <Button variant="contained" component="span" sx={{
                    bgcolor: 'button.primary',
                    '&:hover': {
                      bgcolor: 'button.secondary'
                    }
                  }}>
                    Select JSON
                  </Button>
                </label>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose} sx={{
                  bgcolor: 'button.primary',
                  '&:hover': {
                    bgcolor: 'button.secondary'
                  }
                }}>Upload</Button>
              </DialogActions>
            </Dialog>

          </Box>
        </>
      }
    </>
  );
}

export default Data;