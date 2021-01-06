import React from 'react'
class NotificationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
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
            <div>
                <header> <h1>Notifications</h1></header>
                <hr />
                {(Array.isArray(this.state.notifications) && this.state.notifications.length > 0)?
                    this.state.notifications.map(notification=>{
                        let msg = notification.time+" - "+notification.msg
                        if (notification.read) {
                            return <p key={msg}><b>{msg}</b></p>
                        }
                        return <p key={0}>{msg}</p>
                    }):<p>No Notifications</p>
                }
            </div>
        )
    }
}
export default NotificationPage;