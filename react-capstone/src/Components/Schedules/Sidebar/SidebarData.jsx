import React from 'react'
import HomeIcon from '@material-ui/core/Home'
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

export const Sidebardata = [
{
    title: "Home",
    icon: <HomeIcon/>,
    link: "/home",
},
{
    title: "View OverAll 56 Day Schedule",
    icon: <ScheduleIcon/>,
    link: "/overall",
},

{
    title: "View Daily Schedule ",
    icon: <ScheduleIcon/>,
    link: "/daily",
},
{
    title: "Section Schedule",
    icon: <GroupIcon/>,
    link: "/section",
},

{
    title: "Shift Schedule",
    icon: <GroupIcon/>,
    link: "/shift",
},

{
    title: "Crew Member",
    icon: <PersonIcon/>,
    link: "/member",
},
{
    title: "Crew Position",
    icon: <PersonIcon/>,
    link: "/position,"
},

];
 

