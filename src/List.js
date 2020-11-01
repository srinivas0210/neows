import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';

import './List.css';

function List({ item }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    
    return (
        <div className='list'>
            <div className={classes.root}>
                <AppBar position="static"  >
                    <Toolbar variant="dense" className="list__items ">
                        <IconButton edge="start" className={classes.menuButton && 'list__menuIcon'} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="list__asteroidId">
                            Id: 3256423
                        </Typography>
                        <Typography variant="h6" color="inherit" className="list__asteroidName">
                            Asteriod Name: {item}
                        </Typography>
                        <div className="list__myFav">
                            <StarsSharpIcon />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        </div>
    )
}

export default List
