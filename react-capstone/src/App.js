import React from 'react'
import Header from './Components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/ui/Theme'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home/Home'
import CreateUser from './Components/CreateUser/CreateUser'


function App() {
  const apiUrl = 'http//localhost:3001';
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
      <div>
        <Switch>
          <Route exact path='/'><Home/></Route>
          <Route exact path='/Users'><CreateUser/></Route>
          {/* <Route exact path='/mx'><Mx/></Route>
          <Route exact path='/logs'><Logs/></Route>
          <Route exact path='/assetrequest'><AssetRequest/></Route>
          <Route exact path='/opscap'><Opscap/></Route>
          <Route exact path='/posneg'><PosNeg/></Route> */}
        </Switch>
      </div>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
