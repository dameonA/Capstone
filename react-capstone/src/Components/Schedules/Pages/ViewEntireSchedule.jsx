import React from 'react';
import SchedulePage from '../children/SchedulePage';

class ViewEntireSchedule extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
     return (
         <div>
           <div className="row">
             <div className="col s12">
                  <h2 className="emp-h2">Schedule Dashboard</h2>
             </div>
           </div>
           <div className="col s12">
             <SchedulePage />
           </div>
         </div>
     );
 }
}

export default ViewEntireSchedule;