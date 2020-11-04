import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import db from './Firebase';
import { goToSignUpPage ,signIn } from './Utils';
import KEY, { useStyles } from './constants';

import './Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    let history = useHistory();

    return (
        <div className="login flex">
            <div style={{
                backgroundColor: '#dd0052',
                borderRadius: '50%',
                padding: '4px'
            }} >
                <LockOutlinedIcon />
            </div>

            <h1 style={{ margin: '15px', color: 'black' }}>Login</h1>
            <div className="login__form flex">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="UserName"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setUserName(e.target.value)}

                    />
                    <br />
                    <TextField
                        id="outlined-secondary"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={classes.root && 'flex'}>
                        <Button
                            onClick={() => signIn(userName , password , history ,db)}
                            style={{ padding: '8px 90px' }}
                            variant="contained"
                            color="secondary">
                            Sign In
                        </Button>
                    </div>

                    <br />
                    <div className="flex">
                        <p style={{ color: 'black' }}>or</p>
                    </div>
                    <div className={classes.root && 'flex'}>
                        <Button
                            onClick={()=> goToSignUpPage(history)}
                            style={{ padding: '8px 90px', backgroundColor: '#4450a5' }}
                            variant="contained"
                            color="secondary">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
