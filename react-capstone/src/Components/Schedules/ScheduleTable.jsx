import React from 'react'
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ScheduleTable(props) {
    return (
        <TableContainer component={Paper}>  
        <Table stickyHeader  aria-label="sticky table">  
          <TableHead>  
            <TableRow>  
            <TableCell>Last Name</TableCell>  
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Position</TableCell> 
              <TableCell align="right">Start Time</TableCell>  
              <TableCell style={{paddingRight:"60px"}} align="right">Stop Time</TableCell>    
            <TableRow>
              <EditIcon/>
            </TableRow>
            </TableRow>  
          </TableHead>   
          <TableBody>      
            {  

              this.state.ScheduleData.map((p, index) => {  
                return <TableRow key={index}>  
                 <TableCell component="th" scope="row"> {this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].last_name} </TableCell> 
                 <TableCell align="right">{this.props.users[this.props.users.findIndex(user => user.user_id === p.user_id)].first_name}</TableCell> 
                 <TableCell  align="right">{this.props.static.positions[this.props.static.positions.findIndex(position => position.position_id === p.position_id)].position_name}</TableCell>
                  <TableCell align="right">{p.start_time}</TableCell>   
                  <TableCell style={{paddingRight:"114px"}}  align="right">{p.stop_time}</TableCell>   
                         
                 </TableRow>   
              })   
            }  
          </TableBody>   
        </Table>  
      </TableContainer>  
    )
}
