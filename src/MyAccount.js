import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';

import './MyAccount.css';
import picture from './images/Asteroids_Earth_web_1024.jpg';

function MyAccount({ match }) {
    console.log(match.url);
    return (
        <div className="myAccount flex">
            <img src={picture} />
            <div className="authentication flex">
                        <Switch>
                            <Route path={match.path + "/login"} component={Login} />
                            <Route path={match.path + "/signup"} component={SignUp} />
                        </Switch>
            </div>
            <div className="neows__description flex">
                <div>
                    <h1>NeoWs </h1>

                    <br />
                    <div style={{ width: '100px', border: '1px solid green' }}></div>
                    <br />
                    <br />
                    <p>
                        - (Near Earth Object Web Service)
                        A web service for near earth objects. All the data is from the NASA JPL Asteroid team.
                        NeoWs is proud to power AsteroidTracker on iOS and Android as well as related apps.
                </p>
                </div>

            </div>
            
        </div>
    )
}

export default MyAccount
