import React from 'react'
import AddUser from './AddUser'
import AddUser2 from './AddUser2'
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
                <form>
                    <AddUser api={this.props.api} static={this.props.static}/>
                </form>
                <form>
                    <ModifyUser api={this.props.api} static={this.props.static}/>
                </form>


                
            </div>

        )
    }
}
export default UserPage;