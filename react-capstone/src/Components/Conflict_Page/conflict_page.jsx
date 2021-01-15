import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { date } from 'date-fns/locale/af';

class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getConflictTypes: [],
            selectedStartDate: Date.now(),
            selectedEndDate: Date.now(),
            updatedUser: {},
            getConflicts: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    };//end of constructor

    componentDidMount = () => {
        fetch(this.props.api + 'conflicts/types')
            .then(ret => ret.json())
            .then(json => this.setState({ getConflictTypes: json }))
        fetch(this.props.api + 'conflicts')
            .then(ret => ret.json())
            .then(json => this.setState({ getConflicts: json }))
    }

    submitConflict = async () => {
        if (this.state.updatedUser && this.state.conflict) {
            await fetch(this.props.api + 'conflicts', {
                method: "POST",
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "conflict_type_id": this.state.conflict,
                    "start_time": this.state.selectedStartDate,
                    "stop_time": this.state.selectedEndDate,
                    "comment": this.state.comment,
                    "user_id": this.state.updatedUser.user_id
                })
            })
        }
        fetch(this.props.api + 'conflicts')
            .then(ret => ret.json())
            .then(json => this.setState({ getConflicts: json }))
    }

    handleStartDateChange = (date) => {
        this.setState({ selectedStartDate: date })
    }

    handleEndDateChange = (date) => {
        this.setState({ selectedEndDate: date })
    }

    handleConflictChange = (event) => {
        this.setState({ conflict: Number.parseInt(event.target.value) });
    }

    handleCommentChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    handleSubmit(event) {
        alert('Conflict was submitted: ' + this.state.conflict);
        event.preventDefault();
        this.setState({isSubmitted: true})
    }

    SelectUser = () => {
        const handleChange = (event) => {
            let tempId = Number.parseInt(event.target.value);
            let index = this.props.users.findIndex(user => user.user_id === tempId)
            let tempUser = this.props.users[index]
            this.setState(previousState => ({
                ...previousState,
                updatedUser: tempUser,
                isSubmitted: false
            }))
        }

        return (
            <select id="selectedUser" onChange={handleChange}>
                {(!this.state.updatedUser)
                    ? <option id='selectedUser' value='Select User' selected disabled hidden>Select User</option>
                    : <option id='selectedUser' value='Select User'>{this.state.updatedUser.last_name}, {this.state.updatedUser.first_name} {this.state.updatedUser.grade}</option>
                }

                {this.props.users.map(user => <option id="selectedUser" value={user.user_id}>{user.last_name}, {user.first_name} {user.grade}</option>)}
            </select>
        )

    }

    render() {
        const conflictsubmission = (Array.isArray(this.state.getConflicts) && this.state.getConflicts.length > 0) ?
        this.state.getConflicts.filter(c => c.user_id === this.state.updatedUser.user_id).map(c =>
            <b>{c.start_time + " - " + c.stop_time + " - " + c.comment}</b>) : <p>No Conflicts</p>

        return (
            <div>
                <header> <h1>Conflict</h1></header>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <this.SelectUser />
                    <br />
                    <br />
                    <label>
                        Select Conflict Type:
                        <select value={this.state.conflict} onChange={this.handleConflictChange}>
                            {this.state.getConflictTypes.map(typeID => <option value={typeID.conflict_type_id}>{typeID.conflict_type_name}</option>)}
                        </select>
                    </label>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="start-date"
                                label="Start Date"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{ "aria-label": 'change date', }}
                            />
                            <KeyboardTimePicker
                                margin='normal'
                                id="start-time"
                                label="Start Time"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{ "aria-label": "change time", }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="end-date"
                                label="End Date"
                                format="yyyy-MM-dd"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{ "aria-label": 'change date', }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="end-time"
                                label="End Time"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{ "aria-label": "change time", }}
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
                    <input type="submit" value="Submit" onClick={this.submitConflict} />

                </form>

                { 
                 this.state.isSubmitted ? conflictsubmission : <div />
                }

            </div>
        );
    }//end of the rendering

}//end of ConflictPage-class

export default ConflictPage;
