import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/styles'
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(() => ({
    textField:{
        borderColor: 'white',
        margin: "7px"
    },
    input: {
        color: 'white',
        borderColor: 'white'
    },
    button: {
        marginLeft: "20px"
    }

})) 

export default function LoginMenu(props){
    const classes=useStyles();
    //let loggedIn = true;

    function ButtonClick () {
        //loggedIn = !loggedIn
    }
    let login=(
        <Link to="/Login" >
        <Button 
            className={classes.button} 
            variant="contained" 
            color="secondary"
        >
            Login
        </Button>
        </Link>
    );
    let logout=(
        <Link to="/Login" >
        <Button 
            className={classes.button} 
            variant="contained" 
            color="secondary"
            onClick={()=>props.handleLogin(undefined)}
        >
            Logout
        </Button>
        </Link>

    )
    return(
        <React.Fragment>
                 {props.user
                 ? logout
                 : login
                }
        </React.Fragment>
    )
}