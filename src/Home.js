import React, { useState, useEffect } from 'react';
import './Home.css';

import List from './List';
import data from './Utils';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

function Home() {
  const KEY = 'R4mkEoNDu4aQs7xDmsnJlOVScdUXCZzugtuB0EQy';
  const [userName, setUserName] = useState('srinivas');
  const [apiData, setApiData] = useState(data);
  const [listItems, setListItems] = useState([]);
  const [id, setId] = useState(0);
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [endDate, setEndDate] = React.useState(new Date('2014-08-20T21:11:54'));
  let history = useHistory();

  useEffect(() => {
    console.log('data is', apiData);
    // const randomAsteroids = async () => {
    //   await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${KEY}`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       let asteroids = data.near_earth_objects.map((object) => {
    //         return object.name;
    //       })
    //       setListItems(asteroids);
    //     })
    // }
    // randomAsteroids();
    let a = apiData.near_earth_objects.map((object) => {
      return object.name;
    })
    setListItems(a);
  }, [apiData]);

  const searchAsteroidById = (e) => {
    e.preventDefault();
    fetch(`http://www.neowsapp.com/rest/v1/neo/${id}?api_key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setListItems([data.name]);
        console.log(listItems)
      })
  }
  const searchAsteroidByDate = () => {
    const start = [startDate.getFullYear(), ('0' + (startDate.getMonth() + 1)).slice(-2), ('0' + startDate.getDate()).slice(-2)].join('-');
    const end = [endDate.getFullYear(), ('0' + (endDate.getMonth() + 1)).slice(-2), ('0' + endDate.getDate()).slice(-2)].join('-');
    console.log(start);
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&detailed=true&api_key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const asteroidsByDates = [];
        Object.values(data.near_earth_objects).map((a) => {
          Object.values(a).map((b) => {
            asteroidsByDates.push(b.name);
          });
        })

        setListItems(asteroidsByDates);
      })
  }

  const okay = () =>{
    console.log('okay');
    history.push("/login"); 
  }
  
  return (
    <Router>
<div className="home flex">
      <div className="home__header flex">
        <div className="home__searchId">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => searchAsteroidById(e)}>
            <TextField
              id="standard-basic"
              label="Search by Id"
              helperText="ex: 3729835"
              onChange={(e) => setId(e.target.value)} />
          </form>
        </div>
        <Switch>   
        <div className="home__myFav" onClick={okay}>
          <StarsSharpIcon  />
        </div>
        </Switch> 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around" className="home__searchDates flex">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={endDate}
              onChange={(e) => {
                searchAsteroidByDate();
                setEndDate(e);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="home__listHeading">
            <h1>Hey {userName} , here are the sample asteroids</h1>
        </div>
      <div className='home__list'>
        {listItems ? listItems.map((item) => {
          return <List item={item} />
        }) : ''}
      </div>
    </div>
  
    </Router>
    );
}

export default Home;
