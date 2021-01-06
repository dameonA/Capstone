import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock"
import NotificationPage from "../../Components/Notifications/NotificationPage"
var apiUrl = "BALOOGA";

beforeEach(() => {
    fetch.resetMocks();
  });


test('header exists', ()=>{
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
});
test('calls api to get notifications for user', ()=>{
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(fetch).toHaveBeenCalledWith(apiUrl+"/user/2/notifications/");
});
test('displays notifications', async ()=>{
    fetch.mockResponse(JSON.stringify({notifications:[
        {time:'2021-01-03 04:05:06', msg:'You are working tomorrow', read:true, archived:false},
        {time:'2021-01-03 04:05:06', msg:'Has COVID', read:false, archived:false}
    ]}));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.findByText("You are working tomorrow", { exact: false })).toBeInTheDocument();
    expect(await screen.findByText("Has COVID", { exact: false })).toBeInTheDocument();

});
test('displays message for no notifications', async ()=>{
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
});