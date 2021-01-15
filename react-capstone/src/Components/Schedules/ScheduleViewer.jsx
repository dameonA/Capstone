import React, { Component } from 'react'
//import SchedulePage from './children/SchedulePage'
import AutoScheduleButton from './AutoScheduleButton'
import ResolveConflictsButton from './ResolveConflictsButton'

class ScheduleViewer extends Component {
    constructor(props){
        super(props);
        
    }
  
    render() {
        return (
            <div>
                <AutoScheduleButton api={this.props.api}/> <ResolveConflictsButton api={this.props.api}/>
                <ScheduleComponent currentView='Week'>
                    <Inject services={[Day, Week, Month]} />

                </ScheduleComponent>
            </div>
        )
    }
}

export default ScheduleViewer;