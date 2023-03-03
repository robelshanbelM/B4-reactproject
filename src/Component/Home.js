import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';

import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  const longrft=useRef(null);
  
  const latgrft=useRef(null);
  
  const mapLrft=useRef(null);
  
  const [longitude ,setLongitude]=useState("");
  
  const [latitude , setLatitude]= useState("");

  const [mapLocation ,setMaplocation]=useState("");

  const [locationDataHolder,setlocationDataHolder]=useState([]);

 const savelocation= () => {

   
    const locationData={longitude,latitude,mapLocation}
    
    fetch("http://localhost:8989/location" ,{
   
    method: "POST",
    headers:{"Content-Type" : "application/json"},
    body: JSON.stringify(locationData)

    }).then(()=>{


        formclear();
   console.log("data is added")

    })


 }


 const formclear=() => {


setLongitude(longrft.current.value= "")

setLatitude( latgrft.current.value="")
  
setMaplocation(mapLrft.current.value="")
  


 }


 useEffect(()=>{


    fetch("http://localhost:8989/location")
    .then((response)=> response.json())
    .then((data)=>{

    setlocationDataHolder(data);
    

    })

 })


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>

<h1> Location Form</h1>
<form className={classes.root} noValidate autoComplete="off">

      <TextField id="standard-basic"  value={longitude}  ref={longrft}  onChange={ (evnet)=>{setLongitude(evnet.target.value) } }   label="longitude" fullWidth />
      <br/><br/>
      <TextField id="standard-basic" value={latitude}  ref={latgrft} onChange={ (evnet)=>{setLatitude(evnet.target.value) } } label="latitude" fullWidth />
      <br/><br/>
      <TextField id="standard-basic" value={mapLocation} ref={mapLrft} onChange={ (evnet)=>{setMaplocation(evnet.target.value) } } label="mapLocation" fullWidth />
   
      <br/><br/>
      <Button variant="contained" color="secondary" onClick={savelocation}>
       Save Location
      </Button>
      &nbsp;
      <Button variant="contained" color="primary"onClick={formclear}  >
        Clear form
      </Button>
      
    </form>


          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>

            <h1> Location Data</h1>

            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> LocationId </TableCell>
            <TableCell align="">longitude</TableCell>
            <TableCell align="">latitude</TableCell>
            <TableCell align="">mapLocation</TableCell>
            <TableCell align="">Action</TableCell>
          </TableRow>
        </TableHead>
        
<TableBody>
          { locationDataHolder.map((index) => (
            <TableRow key={index.mapId}>
              
              <TableCell align="">{index.mapId}</TableCell>
              <TableCell align="">{index.longitude}</TableCell>
              <TableCell align="">{index.latitude}</TableCell>
              <TableCell align="">{index.mapLocation}</TableCell>
              <TableCell align="">
              <Fab color="secondary" aria-label="edit" size="small">
        <EditIcon />
      </Fab>
              </TableCell>
  

             
            </TableRow>
          ))}
        </TableBody>


      </Table>
    </TableContainer>

          </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}
