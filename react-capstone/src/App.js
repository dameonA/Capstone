import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CrewMember from './Pages/CrewMember';
import CrewPosition from './Pages/CrewPosition';
import DailyView from './Pages/DailyView';
import EntireSection from './Pages/EntireSection';
import EntireShift from './Pages/EntireShift';
import OverAllView from './Pages/OverAllView';
import ViewEntireSchedule from './Pages/ViewEntireSchedule';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={ViewEntireSchedule} />
          <Route path='/overallview' component={OverAllView} />
          <Route path='/dailyview' component={DailyView} />
          <Route path='/shift'  component={EntireShift} />
          <Route path='/section' component={EntireSection} />
          <Route path='/crewpos' component={CrewPosition} />
          <Route path='/crewmem' component={CrewMember} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
