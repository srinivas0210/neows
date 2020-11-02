import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
// material-ui
import 'date-fns';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
// js files
import SearchById from './SearchById';
import SearchByDate from './SearchByDate';
import KEY, { useStyles } from './constants';
import List from './List';
import data from './Utils';
//css
import './Home.css';

function Home() {
  const [userName, setUserName] = useState('srinivas');
  const [userId , setUserId] = useState('');
  const [asteroidId, setAsteroidId] = useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [apiData, setApiData] = useState(data);
  const [listItems, setListItems] = useState([]);
  
  let history = useHistory();
  const [location, setLocation] = useState(useLocation());

  // methods
  history.listen((location, action) => {
    console.log(location);
    setLocation(location);
  })

  useEffect(() => {
    console.log(location, ' in useEffect');
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('id')) {
      setAsteroidId(searchParams.get('id'));
      searchAsteroidById();
    }
    if (searchParams.get('startDate')) {
      setStartDate(searchParams.get('startDate'));
      setEndDate(searchParams.get('endDate'));

      searchAsteroidByDate();
    }
  }, [location]);

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
    let a = apiData.near_earth_objects.map((object) => object.name);
    setListItems(a);
  }, [apiData]);

  const searchAsteroidById = () => {
    fetch(`http://www.neowsapp.com/rest/v1/neo/${asteroidId}?api_key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setListItems([data.name]);
        console.log(listItems);
      })
  }
  const searchAsteroidByDate = () => {
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${KEY}`)
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
  const okay = () => {
    console.log('okay');
    history.push("/login");
  }

  return (
    <div className="home flex">
      <div className="home__header flex">
        <div className="home__searchId">
          <SearchById />
        </div>
        <div className="home__myFav" onClick={okay}>
          <StarsSharpIcon />
        </div>
        <SearchByDate />
      </div>
      <div className="home__listHeading">
        <h1>Hey {userName} , here are the {listItems.length} asteroids</h1>
      </div>
      <div className='home__list'>
        {listItems ? listItems.map((item) => {
          return <List item={item} />
        }) : ''}
      </div>
    </div>
  );
}

export default Home;
