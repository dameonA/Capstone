import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import ScheduleHomePage from '../../Components/ScheduleHomePage/ScheduleHomePage'
import ViewEntireSchedule from '../../Components/ScheduleHomePage/Pages/ViewEntireSchedule'
var apiUrl = "WASSUPP";

beforeEach(() => {
    fetch.resetMocks();
  });

//Test to verify Schedule page renders
test('Schedule Display exists', ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ViewEntireSchedule user={{user_id:2}} api={apiUrl} />);
    expect(screen.getByText("viewenterschedule")).toBeInTheDocument();
});

//Test that verifies the entire schedule is displayed
/*
test('Display the Entire View of the Schedule', ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(screen.getByText("ViewEntireSchedule")).toBeInTheDocument();
});
*/

//Test that allows for a range of days to be displayed
//  attributes that are the table are (start_time, stop_time, position_id, user_id) 
// Table Values  ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 1, 1),

/*
test('returns schedule for 56 day view', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.getByText("OverAllView")).toBeInTheDocument();
});
*/

//Test that allows for user the select just a daily view of the schedule

/*
test('renders the display for daily views', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[
        {day:'2021-01-01', time:'8:30:00 PST', users:1, position:1},
    ]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.findByText("DailyView")).toBeInTheDocument();
});
*/

//Test That allows for user to view just the entire shift of users
/*
test('renders the schedule of user for an entire shift', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.getByText("EntireShift")).toBeInTheDocument();
});
*/

//Test that allows for user to view schedule for entire section (C2, Weapons, etc.)
/*
test('renders the schedule for the entire section', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.getByText("EntireSection")).toBeInTheDocument();
});
*/

//Test that allows for user to view their crew position
/*
test('display the user position on a crew', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.getByText("CrewPosition")).toBeInTheDocument();
});
*/

//Test that aloows for user to know if they are part of a particular crew
/*
test('returns true of individual is a member of crew', async ()=>{
    fetch.mockResponse(JSON.stringify({schedule:[]}));
    render(<ScheduleHomePage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.getByText("CrewMember")).toBeInTheDocument();
});
*/