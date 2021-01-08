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
      apiURL: 'http://localhost:3001/'
    }
  }


   render () {
      return (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
          <Header/>
          <Switch>
              <Route exact path='/'><Home/></Route>
              <Route exact path='/Users'><UserPage api={this.state.apiURL}/></Route>
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
