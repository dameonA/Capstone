import React from 'react'

class CreateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    NewUser = () => {

        return (
            <a>Add New User</a>
        )

    };

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
                <h2>Users</h2>
                <this.NewUser />
                <this.ModifyUser />
                <this.ArchiveUser />
            </div>

        )
    }
}
export default CreateUser;