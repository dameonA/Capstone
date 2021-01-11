import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MUIDataTable from "mui-datatables";

// class ScheduleHomePage extends React.Component{
    function ScheduleHomePage(){
          
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         crewSchedules: [],
    //         firstName: "",
    //         lastName: "",

    //     };
        const columns = ["First Name", "Last Name", "Position", "Start Time", "End-Time"];

        const data = [
         ["Joe1", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Joe2", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Joe3", "Snuffy", "TT", "2021-01-01 06:30:00 PST", "2021-01-01 18:30:00 PST"],
         ["Paul", "Asphalt", "MCC", "2021-01-01 06:30:00 PST'", "2021-01-01 18:30:00 PST"],
        ];

        const options = {
            filterType: 'checkbox',
          };
  

        return ( 
            <div className="row">
                <header> 
                    <h1> Crew Schedule View </h1>
                        </header>
                <hr />
                <MUIDataTable 
                        data={data} 
                        columns={columns} 
                        options={options} 
                    />
            </div>
        );
    }

export default ScheduleHomePage;


// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function SwipeableTemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       {['left', 'right', 'top', 'bottom'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//           </SwipeableDrawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }