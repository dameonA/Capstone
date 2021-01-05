import React from 'react'
class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conflict: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };//end of constructor

    componentDidMount = async () => {
        const result = await fetch(this.props.api +
        "/user/" + this.props.user_id + "/conflict/").catch(error => console.log("can't fetch: ", error));
        const json = await result.json().catch(error => console.log("can't convert to json: ", error, result));
        this.setState({conflict: json.conflict})
    }//end of component mount

    handleChange(event) {
        this.setState({conflict: event.target.conflict});
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
                        Name:
                        <input type="text" value={this.state.conflict} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }//end of the rendering
}//end of ConflictPage-class

export default ConflictPage;