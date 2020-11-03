import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}














// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import StarsSharpIcon from '@material-ui/icons/StarsSharp';

// import './List.css';

// function List({ item }) {
//     const useStyles = makeStyles((theme) => ({
//         root: {
//             flexGrow: 1,
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//         },
//     }));
//     const classes = useStyles();
    
//     return (
//         <div className='list'>
//             <div className={classes.root}>
//                 <AppBar position="static"  >
//                     <Toolbar variant="dense" className="list__items ">
//                         <IconButton edge="start" className={classes.menuButton && 'list__menuIcon'} color="inherit" aria-label="menu">
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" color="inherit" className="list__asteroidId">
//                             Id: 3256423
//                         </Typography>
//                         <Typography variant="h6" color="inherit" className="list__asteroidName">
//                             Asteriod Name: {item}
//                         </Typography>
//                         <div className="list__myFav">
//                             <StarsSharpIcon />
//                         </div>
//                     </Toolbar>
//                 </AppBar>
//             </div>

//         </div>
//     )
// }

// export default List
