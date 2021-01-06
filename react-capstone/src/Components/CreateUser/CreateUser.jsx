import React from 'react'
import AddUser from './AddUser'

class CreateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }



    ModifyUser = () => {

        return (
            <a>Modify Existing User</a>
        )

    };

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
                <this.ModifyUser />
                <this.ArchiveUser />
            </div>

        )
    }
}
export default CreateUser;