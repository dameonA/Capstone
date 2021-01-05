import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock"
import NotificationIcon from "../../Components/Notification/NotificationIcon"
beforeEach(() => {
    fetch.resetMocks();
  });
  

test('renders notification icon', () => {
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationIcon user={2}/>);
    expect(screen.getByText('🔔', { exact: false })).toBeInTheDocument();
  });
test('calls the api to get notifications', async ()=> {
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationIcon user={2}/>);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/user/2/notifications/");
})
test('displays unread notifications', async ()=>{
    fetch.mockResponse(JSON.stringify({notifications:[
        {time:'2021-01-03 04:05:06', msg:'You are working tomorrow', read:true, archived:false},
        {time:'2021-01-03 04:05:06', msg:'Has COVID', read:false, archived:false}
    ]}));
    render(<NotificationIcon user={2}/>);
    expect(await screen.findByText(/🔔.*(1)/, { exact: false })).toBeInTheDocument();
})
