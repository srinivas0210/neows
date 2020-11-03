import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

//material-ui 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { faLink } from '@fortawesome/free-solid-svg-icons'

// js file imports
import db from './Firebase';
// css file 
import './List.css';

function List({ item , userId ,addToMyFav , removeFromFav}) {
    const [fav, setFav] = useState(false);
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    let history = useHistory();

    const bull = <span className={classes.bullet}>•</span>;
    // methods

    const myFav = () => {
        console.log(fav);
        setFav(!fav);
        if (!fav && userId) {
            addToMyFav(item.id);
        }
        else if (!userId) {
            history.push('/login');
        }
        else{
            removeFromFav(item.id);
        }
    }

    return (
        <div className={classes.root && 'list flex'} >
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Name :
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {item.isHazardous ?
                            <div style={{ color: 'red' }}>{item.name}</div> :
                            <div style={{ color: 'green' }}>{item.name}</div>
                        }
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        AbsoluteHeight: {item.height}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {item.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <div className="list__id">
                <p>{item.id}</p>
            </div>
            <div className={`list__fav ${fav && 'list__favAdded'}`} onClick={myFav}>
                {fav ? 
                <BookmarkOutlinedIcon /> :
                <BookmarkBorderOutlinedIcon />
                }
            </div>
            <div className="list__link">
            
            <FontAwesomeIcon className="linkIcon" icon={faLink} />
                
            </div>

        </div>
    )
}

export default List
