import React from 'react'; 
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
// import ScheduleTable from '../ScheduleTable';
// import Sidebar from '../Sidebar/Sidebar';



class SchedulePage extends React.Component {
    constructor(props){//api, users, static(contains grades, usergroups, sections, qualifications, certifications)
        super(props)
        this.state={
            ScheduleData: []
        }
        
    }
    
      componentDidMount() {  
        axios.get(this.props.api+'schedule').then(response => {   
          this.setState({  
            ScheduleData: response.data  
          });  
        });  
      }  

      // handleSubmit = (event) => {
      //   this.setState({})
      // }
      // let tempId = Number.parseInt(event.target.value);
      // let index = this.props.users.findIndex(user => user.user_id === p.user_id)
      // let tempUser = this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].last_name;
      // let tempUser = this.props.tempArray6[this.props.tempArray6.findIndex(position => position.posistion_id === p.position_id)].position_name;
      // this.props.position[this.props.static.position.findIndex(position => position.position_id === p.position_id)].position_name
      //{this.props.static.positions[this.props.static.positions.findIndex(position => position.position_id === p.position_id)].position_name}

      // let roleIndex = this.props.static.roles.findIndex(role => this.state.updatedUser.user_role === role.role_id);
      // let role = this.props.static.roles[roleIndex].role_name;

      //&#160;&#160;

      render() {  
        return (
          
          <>
          {/* <div className="Side">
            <Sidebar/>
            </div> */}
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
  
    export default SchedulePage

       