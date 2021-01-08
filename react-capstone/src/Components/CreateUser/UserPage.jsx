import React from 'react'
import AddUser from './AddUser'
import ModifyUser from './ModifyUser'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    ArchiveUser = () => {

        return (
            <a>Archive User</a>
        )

    };

    render() {
        return (
            <div>
                <h1>Users</h1>
                <AddUser />
                <ModifyUser api={this.props.api}/>
                <this.ArchiveUser />
            </div>

        )
    }
}
export default UserPage;