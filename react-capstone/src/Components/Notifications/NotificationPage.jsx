import { Checkbox } from '@material-ui/core';
import React from 'react'
class NotificationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: undefined,
            showArchived: false
        };
    }
    markRead = async(id)=>{
        let notifs = this.state.notifications;
        let notif = notifs.find(n=>n.id===id);
        if (notif) {
            const result = await fetch(this.props.api+"/notifications/"+id+"/read", { method: "POST"}).catch(err=>console.log("cannot mark read: ",err));
            let json = await result.json().catch((err)=>console.log("cannot convert to json: ",err, result));
            console.log(json, json!={} )
            if (json != {}) {
                notif = json
                notifs.splice(notifs.findIndex(n=>n.id===id),1,notif)
            }
            this.setState({notifications:notifs});
        }
    }
    archive = async(id)=>{
        let notifs = this.state.notifications;
        let notif = notifs.find(n=>n.id===id);
        if (notif) {
            const result = await fetch(this.props.api+"/notifications/"+id+"/archive", { method: "POST"}).catch(err=>console.log("cannot mark read: ",err));
            let json = await result.json().catch((err)=>console.log("cannot convert to json: ",err, result));
            console.log(json, json!={} )
            if (json != {}) {
                notif = json
                notifs.splice(notifs.findIndex(n=>n.id===id),1,notif)
                notifs.sort((a, b) => b.send_tm - a.send_tm)
            }
            this.setState({notifications:notifs});
        }
    }
    componentDidMount= async ()=> {
        if (this.props.api && this.props.user && this.props.user.user_id) {
            const result = await fetch(this.props.api+"/users/"+this.props.user.user_id+"/notifications/").catch(err=>console.log("cannot fetch: ",err));
            const json = await result.json().catch(err=>console.log("cannot convert to json: ",err,result));
            json.sort((a, b) => b.send_tm - a.send_tm)
            this.setState({notifications:json})
        }
    }
    render() {
        return (
            <div>
                <header> <h1>Notifications</h1></header>
                Show Archived: <Checkbox onChange={(evt)=>this.setState({showArchived:evt.target.checked})} />
                {(Array.isArray(this.state.notifications))?((this.state.notifications.length > 0)?
                    this.state.notifications.filter(n=>this.state.showArchived || n.archived===false).map(notification=>{
                        let msg = notification.sent_tm+" - "+notification.comment
                        if (!notification.is_read) {
                            msg = (<b>{msg}</b>)
                        }
                        if (notification.archived) {
                            msg = "*"+msg
                        }
                        return <p key={notification.id}>{msg}{(notification.is_read)?"":<button type="button" onClick={()=>this.markRead(notification.id)}>Mark Read</button>}{(notification.archived)?"":<button type="button" onClick={()=>this.archive(notification.id)}>Archive</button>}</p>
                    }):<p>No Notifications</p>):""
                }
            </div>
        )
    }
}
export default NotificationPage;