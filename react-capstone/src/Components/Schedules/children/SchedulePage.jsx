import React from 'react'; 
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import 'date-fns';



class SchedulePage extends React.Component {
    constructor(props){//api, users, static(contains grades, usergroups, sections, qualifications, certifications)
        super(props)
        this.state={
            ScheduleData: [],
            date: new Date(),
            selectedStartDate: Date.now(),
            selectedEndDate: Date.now()
        }
        
    }
    
      componentDidMount() {  
        axios.get(this.props.api+'schedule').then(response => {   
          this.setState({  
            ScheduleData: response.data  
          });  
        });  
      } 
      
      handleSearch = (event) => {
        this.setState({})
      }

   

      render() {  
        return (       
          <>
              <label>
                  Search Name:
                    <input type="text" value={this.state.first_name} onChange={this.handleSearch} />
                </label>
                    <br />
                    <br/>
          <h7><center>Schedule Weekly Page &#160;
          {this.state.date.toLocaleDateString()}
            </center></h7>
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

