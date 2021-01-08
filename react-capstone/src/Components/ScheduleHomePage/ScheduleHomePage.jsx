import React from 'react';

import MUIDataTable from "mui-datatables";

// class ScheduleHomePage extends React.Component{
    function ScheduleHomePage(){
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         crewSchedules: [],
    //         firstName: "",
    //         lastName: "",

    //     };
        const columns = ["First Name", "Last Name", "Position", "Start Time", "End-Time"];

        const data = [
         ["Joe1", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Joe2", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Joe3", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Paul", "Asphalt", "MCC", "2021-01-01 06:30:00 PST'", "2021-01-01 18:30:00 PST"],
        ];

        const options = {
            filterType: 'checkbox',
          };
  

        return ( 
            <div className="row">
                <header> 
                    <h1> Crew Schedule View </h1>
                        </header>
                <hr />
                <MUIDataTable 
                        data={data} 
                        columns={columns} 
                        options={options} 
                    />
            </div>
        );
    }

export default ScheduleHomePage;