import React from 'react';

class ScheduleHomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            crewSchedules: [],
        };
    };
    // componentDidMount() {
    //     helpers.getEmpSchedules().then((response) => {
    //         if (response !== this.state.empSchedules) {
    //             this.setState({ empSchedules: response.data });
    //         }
    //     });
    // };
    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section schedule">
                        <h5>View of Schedule</h5>
                        <table className="bordered">
                            <thead>
                                <tr>
                                    <th data-field="name">Name</th>
                                    <th data-field="name">&#160;&#160;Mon</th>
                                    <th data-field="name">Tues</th>
                                    <th data-field="name">&#160;&#160;Wed</th>
                                    <th data-field="name">&#160;Thurs</th>
                                    <th data-field="name">&#160;&#160;Fri</th>
                                    <th data-field="name">&#160;Sat</th>
                                    <th data-field="name">Sun</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.crewSchedules.map((schedules, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="fullName">
                                            {schedules.firstName} {schedules.lastName}
                                        </td>
                                        <td className="schedule">
                                            {schedules.monday}
                                        </td>
                                        <td>
                                            {schedules.tuesday}
                                        </td>
                                        <td>
                                            {schedules.wednesday}
                                        </td>
                                        <td>
                                            {schedules.thursday}
                                        </td>
                                        <td>
                                            {schedules.friday}
                                        </td>
                                        <td>
                                            {schedules.saturday}
                                        </td>
                                        <td>
                                            {schedules.sunday}
                                        </td>
                                    </tr>
                                );
                            }, this)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default ScheduleHomePage;

// export default const ScheduleHomePage = [
//     {
//         title: 'View Entire Schedule',
//         path: '/',
//         cName: 'nav-text'
//     },

//     {
//         title: 'Overall 56 Day View',
//         path: '/overallview',
//         cName: 'nav-text'
//     },
//     {
//         title: 'Daily View',
//         path: '/dailyview',
//         cName: 'nav-text'
//     },
//     {
//         title: 'Entire Shift',
//         path: '/shift',
//         cName: 'nav-text'
//     },
//     {
//         title: 'Entire Section',
//         path: '/section',
//         cName: 'nav-text'
//     },
//     {
//         title: 'Crew Position',
//         path: '/crewpos',
//         cName: 'nav-text'
//     },
//     {
//         title: 'Individual Crew Member',
//         path: '/crewmem',
//         cName: 'nav-text'
//     }
// ];