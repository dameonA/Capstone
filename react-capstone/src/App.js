import React from 'react'
import Header from './Components/Header/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/ui/Theme'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home/Home'
import CreateUser from './Components/CreateUser/CreateUser'
import ConflictPage from './Components/Conflict_Page/conflict_page'
import NotificationPage from './Components/Notifications/NotificationPage'
import ScheduleHomePage from './Components/ScheduleHomePage/ScheduleHomePage'



function App() {
  const apiUrl = 'http//localhost:3001';
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
      <Switch>
          <Route exact path='/'><Home/></Route>
          <Route exact path='/Users'><CreateUser/></Route>
          <Route exact path='/Conflicts'><ConflictPage/></Route>    
          <Route exact path='/Notifications'><NotificationPage/></Route>
          <Route exact path='/Schedule'><ScheduleHomePage/></Route>                
      </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
