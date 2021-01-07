import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//import { useState } from 'react';

// function MaterialUIPickers() {
//     const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

//     const handleDateChange = (date) => {
//         selectedDate(date);
//     };
// };

class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: [],
            selectedDate: new Date('2020-08-18T21:11:54')
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    };//end of constructor   
    
    handleDateChange = (date) => {
            this.setState({selectedDate: date});
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Conflict was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <header> <h1>Conflict</h1></header>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>

                    <label>
                        Conflict Type:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>

                    {/* <label>
                           Date/Time:
                            <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label> */}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="start-date"
                                label="Start Date"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin='normal'
                                id="start-time"
                                label="Start Time"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                            <KeyboardDatePicker 
                                margin="normal"
                                id="end-date"
                                label="End Date"
                                format="yyyy-MM-dd"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{"aria-label": 'change date',}}
                            />
                            <KeyboardTimePicker 
                                margin="normal"
                                id="end-time"
                                label="End Time"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{"aria-label": "change time",}}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <label>
                        Comments:
                        <textarea value={this.state.value} onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }//end of the rendering

}//end of ConflictPage-class

export default ConflictPage;
