import React from 'react'
class NotificationIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications:[]
        };
    }
    componentDidMount= async ()=> {
        const result = await fetch(this.props.api+"/user/"+this.props.user.user_id+"/notifications/").catch(err=>console.log("cannot fetch: ",err));
        const json = await result.json().catch(err=>console.log("cannot convert to json: ",err,result));
        //console.log(json);
        //console.log(json.notifications.filter(n=>!n.read && !n.archived))
        this.setState({notifications:json.notifications})

    }
    render() {
        return (
            <span>🔔{"("+this.state.notifications.filter(n=>!n.read && !n.archived).length+")"}</span>
        )
    }
}
export default NotificationIcon;