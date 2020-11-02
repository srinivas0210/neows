import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
// material-ui
import TextField from '@material-ui/core/TextField';
// js files
import { useStyles } from './constants';

function SearchById() {
    const [id, setId] = useState(0);
    const classes = useStyles();

    let history = useHistory();

    // methods 
    const callIdComponent = (e) => {
        e.preventDefault();
        history.push(`/?id=${id}`);
    }
    
    return (
        <div className="searchById">
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={(e) => callIdComponent(e)}>
                <TextField
                    id="standard-basic"
                    label="Search by Id"
                    helperText="ex: 3729835"
                    onChange={(e) => setId(e.target.value)} />
            </form>
        </div>
    )
}

export default SearchById
