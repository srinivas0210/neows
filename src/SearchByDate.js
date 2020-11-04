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
    const callSearchByDates = (dateStart, dateEnd) => {

        const start = [dateStart.getFullYear(), ('0' + (dateStart.getMonth() + 1)).slice(-2), ('0' + dateStart.getDate()).slice(-2)].join('-');
        const end = [dateEnd.getFullYear(), ('0' + (dateEnd.getMonth() + 1)).slice(-2), ('0' + dateEnd.getDate()).slice(-2)].join('-');

        const date1 = new Date(start);
        const date2 = new Date(end);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
            alert('date difference shoul not exceed 7 days , please try again');
        }
        else {
            history.push(`/?startDate=${start}&endDate=${end}`);
        }

        console.log(dateStart, dateEnd);
    }
    return (
        <div className="searchByName">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container  >
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
                </Grid>
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container  >
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={endDate}
                        onChange={(e) => {
                            callSearchByDates(startDate, e);
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





