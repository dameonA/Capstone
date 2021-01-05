import React from 'react'
class ConflictPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conflict: []
        };
    };//end of constructor

    componentDidMount = async () => {
        const result = await fetch("http://localhost:300/user/" + this.props.user + "/conflict/").catch(error => console.log("cannot display fetch: ", error, result));
        const json = await result.json().catch(error => "cannot convert to json: ", error, result);
        this.setState({conflict: json.conflict})
    }//end of component mount

    render() {
        return (
            <br />
        )
    }
}//end of ConflictPage-class

export default ConflictPage;