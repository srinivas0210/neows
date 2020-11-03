import React, {useState, useEffect}from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import db from './Firebase';

import './Login.css';

function Login() {
    const [userId , setUserId] = useState('');
    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();
    let history = useHistory();

    const signIn = () => {
        db.collection('users').onSnapshot((snapshot)=> {
            snapshot.docs.map((doc)=> {
               if (userName == doc.data().userName && password == doc.data().password) {
                    setUserId(doc.id);
                    console.log(doc.id);

                    history.push(`/?userName=${userName}&userId=${doc.id}`); 
                }
            })
        })
    }

    const goToSignUpPage = () => {
        history.push("/signup");
    }
    return (
        <div className="login flex">
            <div style={{
                backgroundColor: '#dd0052',
                borderRadius: '50%',
                padding: '4px'
            }} >
                <LockOutlinedIcon />
            </div>

            <h1 style={{ margin: '15px' }}>Login</h1>
            <div className="login__form flex">
                <form  className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="UserName"
                        variant="outlined"
                        color="secondary"
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                    <br />
                    <TextField
                        id="outlined-secondary"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div  className={classes.root && 'flex'}>
                        <Button 
                        onClick={signIn}
                        style={{ padding: '8px 90px' }}
                         variant="contained" 
                         color="secondary">
                            Sign In
                        </Button>
                    </div>

                    <br />
                    <div className="flex">
                        <p>or</p>
                    </div>
                    <div  className={classes.root && 'flex'}>
                        <Button 
                        onClick={goToSignUpPage}
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
