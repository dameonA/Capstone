import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LoginMenu from './LoginMenu'
import logo from '../Assets/logo.png'
import {Link,Router} from 'react-router-dom'

function ElevationScroll(props) {
    const { children} = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const useStyles = makeStyles(theme => ({
    toolbarMargin:{
        ...theme.mixins.toolbar 
    },
    tabContainer:{
        flexGrow: 1
    },
    tab:{
        ...theme.typography.tab
    },
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
    },
    logo: {
        maxWidth: "60px",
        paddingRight: "20px"
    },
    background: {
        ...theme.background
    }

})) 
export default function Header(props){
    const classes=useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
        <React.Fragment>
        <ElevationScroll>
            <AppBar>
                <Toolbar>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography variant="h4">
                        Ops Crew Schedule
                    </Typography>
                    <Tabs className={classes.tabContainer} centered onChange={handleChange} value={value}>
                        <Tab component={Link} to={'/'} className={classes.tab} label="Home" />
                        <Tab component={Link} to={'/Users'} className={classes.tab} label="Users" />                        
                        {/* <Tab component={Link} to={'/opscap'} className={classes.tab} label="OpsCap" />
                        <Tab component={Link} to={'/logs'} className={classes.tab} label="Logs" />
                        <Tab component={Link} to={'/mx'} className={classes.tab} label="MX" />
                        <Tab component={Link} to={'/posneg'} className={classes.tab} label="Pos/Neg" />
                        <Tab component={Link} to={'/assetrequest'} className={classes.tab} label="Asset Task" /> */}
                    </Tabs>
                <LoginMenu/>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
        </React.Fragment>
    )
}