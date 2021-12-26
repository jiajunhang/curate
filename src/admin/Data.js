import React, { useState } from 'react';
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

function createData(name, poolName, size) {
  return { name, poolName, size };
}

const rows = [
  createData('SAMPLE - Sanfoundry (Basic Computing MCQ)', "collection_1", 756),
];

const Input = styled('input')({
  display: 'none',
});

const Data = () => {

  const [open, setOpen] = useState(false);
  const [newDataName, setNewDataName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [data, setData] = useState([]);

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
      data: data
    }

    console.log("Call api to create question pool");
  }

  return (
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
              <TableCell align="center">Collection Name</TableCell>
              <TableCell align="center">Pool Size</TableCell>
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
                <TableCell align="center">{row.poolName}</TableCell>
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
              Upload
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{
            bgcolor: 'button.primary',
            '&:hover': {
              bgcolor: 'button.secondary'
            }
          }}>Subscribe</Button>
        </DialogActions>
      </Dialog>

    </Box>

  );
}

export default Data;