// import React from 'react';




// function ViewEntireSchedule() {
  
//   const columns = ["First Name", "Last Name", "Position", "Start Time", "End-Time"];

//   const data = [
//    ["Joe1", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
//    ["Joe2", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
//    ["Joe3", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
//    ["Paul", "Asphalt", "MCC", "2021-01-01 06:30:00 PST'", "2021-01-01 18:30:00 PST"],
//   ];

//   const options = {
//       filterType: 'checkbox',
//     };
//   return (
//     <div className="row">
//                 <header> 
//                     <h1> Crew Schedule View </h1>
//                         </header>
//                 <hr />
//                 <MUIDataTable 
//                         data={data} 
//                         columns={columns} 
//                         options={options} 
//                     />
//             </div>
//         );
//     }

// export default ViewEntireSchedule;




// import React from "react";
// import { Redirect } from 'react-router-dom';
// import helpers from "./utils/helpers";

// class Employee extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           email: "",
//           picture: ""
//         }
//     }
//     componentDidMount = () => {
//        helpers.getCurrentUser().then((response) => {
//           if (response !== this.state.email) {
//             this.setState({ picture: response.data.picture, email: response.data.email });
//           }
//         });
//    }
//     render() {
//        if(this.props.loggedIn){
//          return (
//                 <div className="container">
//                     {this.props.children}
//                 </div>
//         );
//         } 
//         else{
//           return <Redirect to="/" />
//         }
//     }
// }
// export default Employee;

    // function ScheduleHomePage(){
  
    //     const columns = ["First Name", "Last Name", "Position", "Start Time", "End-Time"];

    //     const data = [
    //      ["Joe1", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
    //      ["Joe2", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
    //      ["Joe3", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
    //      ["Paul", "Asphalt", "MCC", "2021-01-01 06:30:00 PST'", "2021-01-01 18:30:00 PST"],
    //     ];

    //     const options = {
    //         filterType: 'checkbox',
    //       };
  

    //     return ( 
    //         <div className="row">
    //             <header> 
    //                 <h1> Crew Schedule View </h1>
    //                     </header>
    //             <hr />
    //             <MUIDataTable 
    //                     data={data} 
    //                     columns={columns} 
    //                     options={options} 
    //                 />
    //         </div>
    //     );
    // }

