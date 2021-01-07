import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        selectedDate(date);
    };
};

class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };//end of constructor

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

                    <label>
                        Date/Time:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>


                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }//end of the rendering
}//end of ConflictPage-class

export default ConflictPage;
