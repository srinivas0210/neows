import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import db from './Firebase';
import KEY, { useStyles } from './constants';

import './SignUp.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [helpingText, setHelpingText] = useState('Same as the password');
    const classes = useStyles();
    let history = useHistory();

    const signUp = () => {
        if (password != confirmPassword) {
            history.push('/signup');
            setError(true);
            setHelpingText('Different from the password,Try again');
        }
        else {
            db.collection('users').add({
                userName: userName,
                password: password,
            })
            console.log(userId);
            db.collection('users').onSnapshot((snapshot)=> {
                snapshot.docs.map((doc)=> {
                   if (userName == doc.data().userName && password == doc.data().password) {
                    db.collection('users').doc(doc.id).collection('favorites').doc('favorites').set({
                        favorites: [ ],
                      });        
                    }
                })
            })
            history.push('/account/login');
        }
    }

    return (
        <div className="login flex">
            <div style={{
                backgroundColor: '#4450a5',
                borderRadius: '50%',
                padding: '4px'
            }} >
                <PersonOutlineOutlinedIcon />
            </div>
            <h1 style={{color: 'black', margin: '15px' }}>SIGN UP</h1>
            <div className="login__form flex">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="First Name"
                        helperText="* this will be your userName"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        id="outlined-secondary"
                        label="Last Name"
                        variant="outlined"
                        color="secondary"
                    />
                    <br />
                    <TextField
                        id="outlined-secondary"
                        label="Email"
                        variant="outlined"
                        color="secondary"
                        style={{ width: '524px' }}
                    />
                    <br />
                    <TextField
                        id="outlined-secondary"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        style={{ width: '524px' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <TextField
                        error={error}
                        helperText={helpingText}
                        id="outlined-secondary"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        style={{ width: '524px' }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className={classes.root}>
                        <Button
                            onClick={signUp}
                            style={{ width: '510px', backgroundColor: '#4450a5' }}
                            variant="contained"
                            color="primary">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
