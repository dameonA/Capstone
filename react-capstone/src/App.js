import React from 'react'
import Header from './Components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/ui/Theme'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home/Home'


function App() {
  const apiUrl = 'http//localhost:3001';
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path='/'><Home/></Route>
          {/* <Route exact path='/mx'><Mx/></Route>
          <Route exact path='/logs'><Logs/></Route>
          <Route exact path='/assetrequest'><AssetRequest/></Route>
          <Route exact path='/opscap'><Opscap/></Route>
          <Route exact path='/posneg'><PosNeg/></Route> */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
