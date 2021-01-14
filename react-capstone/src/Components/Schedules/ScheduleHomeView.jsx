import React from 'react';
import "../../App.css";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month } from '@syncfucion/ej2-react-schedule';


class ScheduleHomeView extends React.Component {
    render() {
        return (
            <ScheduleComponent>
                <Inject services={[Day, Week, WorkWeek, Month]}/>

            </ScheduleComponent>
        )
    }
}

export default ScheduleHomeView;

  
   
