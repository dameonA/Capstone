import React from 'react'
import Header from './Components/Header/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/ui/Theme'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home/Home'
import UserPage from './Components/CreateUser/UserPage'
import ConflictPage from './Components/Conflict_Page/conflict_page'
import NotificationPage from './Components/Notifications/NotificationPage'
import ScheduleHomePage from './Components/ScheduleHomePage/ScheduleHomePage'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      staticTables: {}, //contains grades, usergroups, sections, qualifications, certifications, grades
      apiURL: 'http://localhost:3001/'
    }
  }

  componentDidMount = async () => {
    this.intializeUsers();
    this.setStaticTables();
  }

  intializeUsers = async () => {
    let response = await fetch(this.state.apiURL+'users').catch(err=>console.log("cannot get users: ", err)); //get the users
    let usersArray = await response.json();
    this.setState({users: usersArray});
  }

  setStaticTables = async () => {
    let response1 = await fetch(this.state.apiURL+'users/usergroups').catch(err=>console.log("cannot get usergroups: ", err)); //get the users
    let tempArray1 = await response1.json();

    let response2 = await fetch(this.state.apiURL+'users/roles').catch(err=>console.log("cannot get roles: ", err)); //get the users
    let tempArray2 = await response2.json();

    let response3 = await fetch(this.state.apiURL+'users/certifications').catch(err=>console.log("cannot get certifications: ", err)); //get the users
    let tempArray3 = await response3.json();

    let response4 = await fetch(this.state.apiURL+'users/qualifications').catch(err=>console.log("cannot get qualifications: ", err)); //get the users
    let tempArray4 = await response4.json();

    let response5 = await fetch(this.state.apiURL+'users/sections').catch(err=>console.log("cannot get sections: ", err)); //get the users
    let tempArray5 = await response5.json();
    
    this.setState({staticTables: {
      grades: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6' ],
      usergroups: tempArray1,
      roles: tempArray2,
      certifications: tempArray3,
      qualifications: tempArray4,
      sections: tempArray5
    }});
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path='/'><Home/></Route>
            <Route exact path='/Users'><UserPage api={this.state.apiURL} users={this.state.users} static={this.state.staticTables}/></Route>
            <Route exact path='/Conflicts'><ConflictPage/></Route>    
            <Route exact path='/Notifications'><NotificationPage/></Route>
            <Route exact path='/Schedule'><ScheduleHomePage/></Route>                
        </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  }


export default App;
