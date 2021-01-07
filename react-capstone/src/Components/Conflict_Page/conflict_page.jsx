import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: [],
            selectedDate: new Date('2020-08-18T21:11:54')
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    };//end of constructor   
    
    // handleDateChange = (date) => {
    //         this.setState({selectedDate: date});
    // }

    handleStartDateChange = (date) => {
        this.setState({selectedStartDate: date})
    }

    handleEndDateChange = (date) => {
        this.setState({selectedEndDate: date})
    }
    
    handleConflictChange= (event) => {
        this.setState({conflict: event.target.value});
    }

    handleFirstNameChange= (event) => {
        this.setState({firstname: event.target.value})
    }

    handleLastNameChange= (event) => {
        this.setState({lastname: event.target.value})
    }

    handleCommentChange= (event) => {
        this.setState({comment: event.target.value})
    }

    handleSubmit(event) {
        alert('Conflict was submitted: ' + this.state.conflict);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <header> <h1>Conflict</h1></header>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" value={this.state.firstname} onChange={this.handleFirstNameChange}/>
                        Last Name:
                        <input type="text" value={this.state.lastname} onChange={this.handleLastNameChange}/>
                    </label>
                    <br />
                    <br />
                    <label>
                        Select Conflict Type:
                        <select value={this.state.conflict} onChange={this.handleConflictChange}>
                            <option value="leave-approved">1 Leave Approved</option>
                            <option value="leave-requested">2 Leave Requested</option>
                            <option value="tdy">3 TDY</option>
                            <option value="dnic">4 DNIC</option>
                            <option value="appointment">5 Appointment</option>
                            <option value="other">6 Other</option>
                        </select>
                    </label>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="start-date"
                                label="Start Date"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin='normal'
                                id="start-time"
                                label="Start Time"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                            <KeyboardDatePicker 
                                margin="normal"
                                id="end-date"
                                label="End Date"
                                format="yyyy-MM-dd"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin="normal"
                                id="end-time"
                                label="End Time"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <label>
                        Comments:
                        <textarea value={this.state.comment} onChange={this.handleCommentChange} />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }//end of the rendering

}//end of ConflictPage-class

export default ConflictPage;
