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
import db from './Firebase';
//css
import './Home.css';

function Home() {
  const [userName, setUserName] = useState('srinivas');
  const [userId, setUserId] = useState('');
  const [myFav, setMyFav] = useState([]);
  const [asteroidId, setAsteroidId] = useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [apiData, setApiData] = useState(data);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false)

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

    if (searchParams.get('userId')) {
      setUserId(searchParams.get('userId'));
      setUserName(searchParams.get('userName'))
      console.log(searchParams.get('userId'));
    }
    if (searchParams.get('id')) {
      setAsteroidId(searchParams.get('id'));
      searchAsteroidById(searchParams.get('id'));
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
    setLoading(true)
    let a = apiData.near_earth_objects.map((object) => (
      {
        name: object.name,
        id: object.id,
        height: object.absolute_magnitude_h,
        description: object.orbital_data.orbit_class.orbit_class_description,
        nasaUrl: object.nasa_jpl_url,
        isHazardous: object.is_potentially_hazardous_asteroid,
      }
    ));
    console.log(a);
    setListItems(a);
    setLoading(false)
  }, [apiData]);

  const addFavToFirebase = (favArray) => {
    db.collection('users').doc(userId).collection('favorites').doc('favorites').set({
      favorites: favArray,
    });
  }
  const addToMyFav = (favItemId) => {
    let a = myFav;
    a.push(favItemId)
    setMyFav(a);
    console.log(a);
    addFavToFirebase(a);
  }
  const removeFromFav = (favItemId) => {
    let b = myFav;
    let c = [];
    c = b.filter((item) => {
      console.log(item, favItemId)
      return item != favItemId
    });
    setMyFav(c);
    console.log(c);
    addFavToFirebase(c);
  }

  const searchAsteroidById = async (asteroidId) => {
    setLoading(true)
    const response = await fetch(`http://www.neowsapp.com/rest/v1/neo/${asteroidId}?api_key=${KEY}`)
    const object = await response.json()
    setListItems([
      {
        name: object.name,
        id: object.id,
        height: object.absolute_magnitude_h,
        description: object.orbital_data.orbit_class.orbit_class_description,
        nasaUrl: object.nasa_jpl_url,
        isHazardous: object.is_potentially_hazardous_asteroid,
      }
    ]);
    setLoading(false)
  }
  const searchAsteroidByDate = () => {
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const asteroidsByDates = [];
        Object.values(data.near_earth_objects).map((a) => {
          Object.values(a).map((object) => {
            console.log(object);
            asteroidsByDates.push(
              {
                name: object.name,
                id: object.id,
                height: object.absolute_magnitude_h,
                description: object.orbital_data && object.orbital_data.orbit_class ? object.orbital_data.orbit_class.orbit_class_description : null,
                nasaUrl: object.nasa_jpl_url,
                isHazardous: object.is_potentially_hazardous_asteroid,
              }
            );
          });
        })
        setListItems(asteroidsByDates);
      })
  }
  const showMyFav = async () => {
    if (!userId) {
      history.push('/login')
    }
    console.log(myFav, 'myFav');

    const favAsteroids = []
    setLoading(true)
    for (const favId of myFav) {
      const response = await fetch(`http://www.neowsapp.com/rest/v1/neo/${favId}?api_key=${KEY}`)
      const object = await response.json()
      const asteroid = {
        name: object.name,
        id: object.id,
        height: object.absolute_magnitude_h,
        description: object.orbital_data && object.orbital_data.orbit_class ? object.orbital_data.orbit_class.orbit_class_description : null,
        nasaUrl: object.nasa_jpl_url,
        isHazardous: object.is_potentially_hazardous_asteroid,
      }
      favAsteroids.push(asteroid)
    }

    setLoading(false)
    setListItems(favAsteroids);
  }


  return (
    <div className="home flex">

      <div className="home__header flex">
        <div className="home__searchId">
          <SearchById />
        </div>
        <div className="home__myFav" onClick={showMyFav}>
          <StarsSharpIcon />
        </div>
        <SearchByDate />
      </div>
      
        <div className="home__listHeading">
          <h1>Hey {userName}! , here are the {listItems.length} asteroids</h1>
        </div>
        <div className='home__list flex'>
        {loading ? <p>loading...</p> : <>
          
          {listItems ? listItems.map((item, index) => {
            return <List
              key={index}
              item={item}
              userId={userId}
              addToMyFav={addToMyFav}
              removeFromFav={removeFromFav} />
          }) : ''}
          </> }
        </div>
    </div>
  );
}

export default Home;
