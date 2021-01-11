import React from 'react'
import AddUser from './AddUser'
import ModifyUser from './ModifyUser'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <AddUser api={this.props.api} static={this.props.static}/>
                <ModifyUser api={this.props.api} static={this.props.static}/>
            </div>

        )
    }
}
export default UserPage;