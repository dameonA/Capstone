import React from 'react'
class NotificationIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications:[]
        };
    }
    componentDidMount= async ()=> {
        if (this.props.api && this.props.user && this.props.user.user_id) {
            const result = await fetch(this.props.api+"user/"+this.props.user.user_id+"/notifications/").catch(err=>console.log("cannot fetch: ",err));
            result.json().then(data=>{this.setState({notifications:data})}).catch(err=>console.log("cannot convert to json: ",err,result));
        }        
    }
    render() {
        let length = 0;
        let unreadMsg = "";
        if (Array.isArray(this.state.notifications)) {
            length = this.state.notifications.filter(n=>!n.read && !n.archived).length;
            if (length > 0) {
                unreadMsg = "("+length+")"
            }
        }
        return (
            <span>🔔{unreadMsg}</span>
        )
    }
}
export default NotificationIcon;