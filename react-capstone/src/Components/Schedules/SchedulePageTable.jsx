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

export default function SchedulePageTable(props) { 
      const classes = useStyles();  
      const [page, setPage] = React.useState(0);  
      const [data, setData] = useState([]);   
      const [rowsPerPage, setRowsPerPage] = React.useState(5);  
      
      useEffect((props) => {    
            const GetData = async () => {    
              const result = await axios('this.props.api${props.schedule');    
              setData(result.data);    
            }  
            GetData(props);      
    }, []);   
      const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
      };  

      const handleChangeRowsPerPage = event => {  
        setRowsPerPage(+event.target.value);  
        setPage(0);  
      };  
 
      return (  
        <>
        <Paper className={classes.root}>  
          <TableContainer className={classes.container}>  
            <Table stickyHeader aria-label="sticky table">  
            <TableHead>  
                <TableRow>  
                  <TableCell>Position</TableCell>  
                  <TableCell align="right">Name</TableCell>  
                  <TableCell align="right">Sunday</TableCell>  
                  <TableCell align="right">Monday</TableCell>     
                  <TableCell align="right">Tuesday</TableCell> 
                  <TableCell align="right">Wednesday</TableCell>  
                  <TableCell align="right">Thursday</TableCell>     
                  <TableCell align="right">Friday</TableCell>  
                  <TableCell style={{paddingRight:"60px"}} align="right" >Saturday</TableCell>   
                </TableRow>  
              </TableHead>  
              <TableBody>  
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (  
               <TableRow >  
                     <TableCell component="th" scope="row"> {row.position_id} </TableCell> 
                     <TableCell align="right">{row.firstName}  {row.lastName}</TableCell>  
                      <TableCell align="right">{row.sunday}</TableCell>   
                      <TableCell align="right">{row.monday}</TableCell>   
                      <TableCell align="right">{row.tuesday}</TableCell>  
                      <TableCell align="right">{row.wednesday}</TableCell>   
                      <TableCell align="right">{row.thursday}</TableCell>   
                      <TableCell align="right">{row.friday}</TableCell>      
                      <TableCell style={{paddingRight:"114px"}} align="right">{row.saturday}</TableCell>
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
        </>
      );  
    } 
