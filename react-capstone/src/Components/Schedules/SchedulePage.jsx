import React from 'react';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import axios from 'axios';  



class SchedulePage extends React.Component {
    constructor(props){//api, users, static(contains grades, usergroups, sections, qualifications, certifications)
        super(props)
        this.state={
            ProductData: []
        }
    }
    
      componentDidMount() {  
        axios.get(this.props.api+'schedule').then(response => {   
          this.setState({  
            ProductData: response.data  
          });  
        });  
      }  

      // let tempId = Number.parseInt(event.target.value);
      // let index = this.props.users.findIndex(user => user.user_id === p.user_id)
      // let tempUser = this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].last_name;

      render() {  
        return (  
          <TableContainer component={Paper}>  
            <Table stickyHeader  aria-label="sticky table">  
              <TableHead>  
                <TableRow>  
                <TableCell>Last Name</TableCell>  
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Start Time</TableCell>  
                  <TableCell align="right">Stop Time</TableCell>     
                  <TableCell style={{paddingRight:"60px"}}align="right">Position ID</TableCell>   

                </TableRow>  
              </TableHead>   
              <TableBody>      
                {  
   
                  this.state.ProductData.map((p, index) => {  
                    return <TableRow key={index}>  
                     <TableCell component="th" scope="row"> {this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].last_name} </TableCell> 
                     <TableCell align="right">{this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].first_name}</TableCell> 
                      <TableCell align="right">{p.start_time}</TableCell>   
                      <TableCell align="right">{p.stop_time}</TableCell>   
                      <TableCell style={{paddingRight:"114px"}}  align="right">{p.position_id}</TableCell>       
                     </TableRow>   
                  })   
                }  
              </TableBody>   
            </Table>  
          </TableContainer>  
        );  
      }   
    }  
  
    export default SchedulePage
 







// import React from 'react';
// import ViewSchedule from './ViewSchedule'
// import SideMenu from "./Navigation/SideMenu"
// import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'

//     class ShedulePage extends React.Component{
 


//         constructor(props) {
//             super(props)
//             this.state = {
    
//             };
//         }
    
//         render() {
//             return (
//                 <>
//                 <SideMenu/>
//                 <div>
//                     <h1>Users</h1>
//                     <ViewSchedule api={this.props.api} static={this.props.static}/>
//                     <ModifySchedule api={this.props.api} static={this.props.static}/>
//                 </div>
//                 </>
    
//             )
//         }
//     }

//     export default ShedulePage;



    // constructor(props){
    //     super(props)
    // }



    //   render () {
    //     return (
    //   <>
    //   <ViewSchedule/>
    //   </>
    //     );
    //   }
    
    // }

       