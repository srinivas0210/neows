import { makeStyles } from '@material-ui/core/styles';

const KEY = 'R4mkEoNDu4aQs7xDmsnJlOVScdUXCZzugtuB0EQy';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default KEY;
export { useStyles } ;
