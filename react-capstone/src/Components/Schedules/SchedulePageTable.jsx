import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';  
import axios from 'axios';    
import { useState, useEffect } from 'react'   
  

const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 440,  
  },  
});  


export default function SchedulePageTable() { 
      const classes = useStyles();  
      const [page, setPage] = React.useState(0);  
      const [data, setData] = useState([]);   
      const [rowsPerPage, setRowsPerPage] = React.useState(5);  
      
      useEffect(() => {    
            const GetData = async () => {    
              const result = await axios('http://localhost:3001/schedule');    
              setData(result.data);    
            }  
            GetData();    
            console.log(data);  
    }, []);   
      const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
      };  

      const handleChangeRowsPerPage = event => {  
        setRowsPerPage(+event.target.value);  
        setPage(0);  
      };  
 
      return (  
        <Paper className={classes.root}>  
          <TableContainer className={classes.container}>  
            <Table stickyHeader aria-label="sticky table">  
            <TableHead>  
                <TableRow>  
                  <TableCell>Last Name</TableCell>  
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Schedule ID</TableCell>  
                  <TableCell align="right">Start Time</TableCell>  
                  <TableCell align="right">Stop Time</TableCell>     
                  <TableCell align="right">Position ID</TableCell>   
                  <TableCell style={{paddingRight:"60px"}} align="right" >User ID</TableCell>   
                </TableRow>  
              </TableHead>  
              <TableBody>  
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (  
               <TableRow >  
                     <TableCell component="th" scope="row"> {row.lastName} </TableCell> 
                     <TableCell align="right">{row.firstName}</TableCell> 
                      <TableCell align="right">{row.schedule_id}</TableCell>  
                      <TableCell align="right">{row.start_time}</TableCell>   
                      <TableCell align="right">{row.stop_time}</TableCell>   
                      <TableCell align="right">{row.position_id}</TableCell>       
                      <TableCell style={{paddingRight:"114px"}} align="right">{row.user_id}</TableCell>
                  </TableRow>  
                  );  
                })}  
              </TableBody>  
            </Table>  
          </TableContainer>  
          <TablePagination  
            rowsPerPageOptions={[5, 10, 15]}  
            component="div"  
            count={data.length}  
            rowsPerPage={rowsPerPage}  
            page={page}  
            onChangePage={handleChangePage}  
            onChangeRowsPerPage={handleChangeRowsPerPage}  
          />  
        </Paper>  
      );  
    } 
