import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
// material-ui
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// js files


function SearchByDate() {
    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = React.useState(new Date('2014-08-20T21:11:54'));

    let history = useHistory();
    
    //methods 
    const callSearchByDates = () => {
        const start = [startDate.getFullYear(), ('0' + (startDate.getMonth() + 1)).slice(-2), ('0' + startDate.getDate()).slice(-2)].join('-');
        const end = [endDate.getFullYear(), ('0' + (endDate.getMonth() + 1)).slice(-2), ('0' + endDate.getDate()).slice(-2)].join('-');
        history.push(`/?startDate=${start}&endDate=${end}`);
    }
    return (
        <div className="searchByName">
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
                            callSearchByDates();
                            setEndDate(e);
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default SearchByDate





