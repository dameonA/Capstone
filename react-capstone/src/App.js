import React from 'react'
import Header from './Components/Header/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/ui/Theme'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home/Home'
import UserPage from './Components/CreateUser/UserPage'
import ConflictPage from './Components/Conflict_Page/conflict_page'
import NotificationPage from './Components/Notifications/NotificationPage'
import LoginForm from './Components/Login/LoginForm'
import SchedulePage from './Components/Schedules/children/SchedulePage'





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      staticTables: {}, //contains grades, usergroups, sections, qualifications, certifications, positions 
      apiURL: 'http://localhost:8080/'
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

    let response6 = await fetch(this.state.apiURL+'schedule/positions').catch(err=>console.log("cannot get positions: ", err));
    let tempArray6 = await response6.json();
    
    this.setState({staticTables: {
      grades: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6' ],
      usergroups: tempArray1,
      roles: tempArray2,
      certifications: tempArray3,
      qualifications: tempArray4,
      sections: tempArray5,
      positions: tempArray6

    }});
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Header api={this.state.apiURL} user={this.state.user} handleLogin={(user)=>{this.setState({user:user})}}/>
        {this.state.user
         ?<Switch>
            

            <Route exact path='/'><Home user={this.state.user}/></Route>
            {this.state.user.user_role !== 4
            ? <Route exact path='/Users'><UserPage api={this.state.apiURL} users={this.state.users} static={this.state.staticTables}/></Route>
            :''}

            <Route exact path='/Conflicts'><ConflictPage api={this.state.apiURL} users={this.state.users} static={this.state.staticTables}/></Route>    
            <Route exact path='/Notifications'><NotificationPage api={this.state.apiURL} user={this.state.user} /></Route>

            <Route exact path='/Schedule'><SchedulePage api={this.state.apiURL} users={this.state.users} static={this.state.staticTables} /></Route> 
         
          </Switch>
          : ''
            }
            <Route exact path='/Login'><LoginForm api={this.state.apiURL} handleLogIn={(user)=>{this.setState({user:user})}}/></Route>                
        
        </BrowserRouter>
      </ThemeProvider>
    );
  }

}


export default App;
