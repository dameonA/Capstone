import React, { Component } from 'react'
import axios from 'axios';
import '../../../App.js'
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import { deprecatedPropType } from '@material-ui/core';
import Sidebar from '../Sidebar/Sidebar';

class SectionScheduler extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastName: "",
            firstName: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: "",
            selectedUserId: "",
            selectedUserSchedule: "",
            userSchedule: "", 
        };
    };

    componentDidMount(){
        axios.get(this.props.api+'schedule').then(response => {   
            this.setState({  
              userSchedule: response.data  
            });  
          });  
        } 
    }

    handleUserChange = (index, event) => {
        const updatedUserSchedules = this.state.userSchedules.map((userSchedule, j) => {
            if(index === j){
                //index is the index of the currently selected employee
                userSchedule[event.target.name] = event.target.value;
                this.setState({selectedUserSchedule: userSchedule});
                this.setState({ selectedUserId: userSchedule._id });
            }
            return userSchedule;
        });
        this.setState({ userSchedules: updatedUserSchedules});
    };
    handleUpdateUserSchedule = (event) => {
        const saveButtonBlue = document.getElementById(event);
        saveButtonBlue.innerHTML = "Add";
        saveButtonBlue.className = "btn btn-small waves-effect waves-light green accent-3";

        if (this.state.selectedUserSchedule !== "") {
            helpers.updateUserSchedule(this.state.selectedUserSchedule).then((response) => {
                const userName = this.state.selectedUserSchedule.firstName + " " + this.state.selectedUserSchedule.lastName + "'s ";
                this.clearStates();
            });
        }
    };
   
    handleClearUserSchedule(i, Event) {
        // i is the index of the currently selected employee
        Event.preventDefault();
        const updatedUserSchedules = this.state.userSchedules.map((userSchedule, j) => {
            if(i === j){
                const saveButton = document.getElementById(i);
                saveButton.innerHTML = "save";
                saveButton.className = "btn btn-small waves-effect waves-light blue accent-3";
                userSchedule.monday = "";
                userSchedule.tuesday = "";
                userSchedule.wednesday = "";
                userSchedule.thursday = "";
                userSchedule.friday = "";
                userSchedule.saturday = "";
                userSchedule.sunday = "";
                this.setState({selectedUserSchedule:userSchedule});
            }
            return userSchedule;
        });
        this.setState({ userSchedules: updatedUserSchedules});
    };
    
    clearStates = ()  => {
        this.setState({ firstName: "", lastName: "", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "", user_id: "", selectedUserSchedule: "", selectedUserId: ""});
    };

    render() {
        return (
            <>
            <h7><center>Week At A Glance</center></h7>
            <TableContainer component={Paper}>  
            <Table stickyHeader  aria-label="sticky table">  
              <TableHead>  
                <TableRow>  
                <TableCell>Name</TableCell> 
                <TableCell align="right">&#160; &#160;Position</TableCell> 
                  <TableCell align="right">&#160; &#160;Monday</TableCell>
                  <TableCell align="right">&#160;Tuesday</TableCell> 
                  <TableCell align="right">&#160;&#160;Wednesday</TableCell>
                  <TableCell align="right">&#160;Thursday</TableCell>
                  <TableCell align="right">&#160;&#160;Friday</TableCell> 
                  <TableCell align="right">&#160;Saturday</TableCell>
                  <TableCell align="right">Sunday</TableCell>    
                <TableRow>
                  <EditIcon/>
                </TableRow>
                </TableRow>  
              </TableHead>   
              <TableBody>   
              
                {  
    
                  this.state.ScheduleData.map((p, index) => {  
                    return <TableRow key={index}>  
                     <TableCell component="th" scope="row"> {this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].last_name}
                     &#160; {this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].first_name}</TableCell> 
                     <TableCell align="right">{this.props.static.positions[this.props.static.positions.findIndex(position => position.position_id === p.position_id)].position_name}</TableCell> 
                     <TableCell align="right">7am-7pm</TableCell> 
                     <TableCell  align="right">7pm-7am</TableCell>
                      <TableCell align="right">10am-4pm</TableCell> 
                      <TableCell align="right">OFF</TableCell> 
                      <TableCell align="right">10am-4pm</TableCell> 
                      <TableCell align="right">4pm-11pm</TableCell>   
                      <TableCell align="right">OFF</TableCell>   
                             
                     </TableRow>   
                  })   
                }  
              </TableBody>   
            </Table>  
          </TableContainer>  
          </>
  
          );  
        }   
      }  

export default SectionScheduler;
