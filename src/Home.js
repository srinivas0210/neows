import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
// material-ui
import 'date-fns';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
// js files
import SearchById from './SearchById';
import SearchByDate from './SearchByDate';
import KEY from './constants';
import List from './List';
import data, {
  convToAsteroidObject,
  searchAsteroidById,
  searchAsteroidByDates,
  showMyFav,
  addFavToFirebase,
} from './Utils';
import db from './Firebase';
//css
import './Home.css';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  // const [ favData , setFavData ] = useState([]);
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
    const id = searchParams.get('userId')
    if (id) {
      setUserId(id);
      setUserName(searchParams.get('userName'))
      db.collection('users').doc(id).collection('favorites').onSnapshot((snapshot) => {
        setMyFav(snapshot.docs[0].data().favorites);
      })
    }
    const asterId = searchParams.get('id');
    const date1 = searchParams.get('startDate');
    const date2 = searchParams.get('endDate')
    if (asterId) {
      setAsteroidId(asterId);
      searchAsteroidById(asterId, KEY, myFav, setListItems, setLoading);
    }
    if (date1) {
      setStartDate(date1);
      setEndDate(date2);
      searchAsteroidByDates(date1, date2, KEY, myFav, setListItems, setLoading);
    }
  }, [location]);
  useEffect(() => {
    console.log('data is', apiData);
    setLoading(true)
    let a = apiData.near_earth_objects.map((object) => convToAsteroidObject(object, myFav));
    console.log(a);
    setListItems(a);
    setLoading(false);
  }, [apiData]);
  const addToMyFav = (favItemId) => {
    let favArray = myFav;
    if (myFav && !myFav.includes(favItemId) || !myFav) {
      favArray.push(favItemId)
      setMyFav(favArray);
      addFavToFirebase(favArray, db, userId);
    }
  }
  const removeFromFav = (favItemId) => {
    let favArray = myFav;
    favArray = favArray.filter((item) => item != favItemId);
    setMyFav(favArray);
    addFavToFirebase(favArray, db, userId);
  }

  return (
    <>
      <div className="home flex">
        <div className="home__title flex">
          <h1>N<br /><br />E<br /><br />O<br /><br />W<br /><br />S</h1>
        </div>
        <div className="home__details flex" >
          <div className='home__list flex'>
            {loading ?
              <div style={{ flexDirection: 'column' }} className="flex">
                <LoopOutlinedIcon />
                <br />
                <p>Please wait ,while asteroids are inching forward</p>
              </div> : <>
                {listItems ? listItems.map((item, index) => {
                  return <List
                    key={`${index}_${item.fav}`}
                    item={item}
                    userId={userId}
                    addToMyFav={addToMyFav}
                    removeFromFav={removeFromFav} />
                }) : ''}
              </>}
          </div>
          <div className="home__listHeading">
            <h1>Hey {userName}! , here are the {listItems.length} asteroids</h1>
          </div>
          <div className="home__border"></div>
        </div>
        <div className="home__header flex">
          <FontAwesomeIcon className="home__filter" icon={faFilter} />
          <div className="home__searchId">
            <SearchById />
          </div>
          <div className="home__myFav flex"
            onClick={() => showMyFav(userId, KEY, myFav, setLoading, setListItems, history)}>
            <StarsSharpIcon />
            <p>My Favorites</p>
          </div>
          <div className="home__searchDates">
            <SearchByDate />
          </div>
        </div>
      </div>

      <div className="visitOverBigScreens">
          <h1 style={{margin:'20px'}}>NeoWs</h1>

          <h4>Please visit the application on desktop or on devices with wider display</h4>
      </div>
    </>
  );
}

export default Home;
