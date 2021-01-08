import * as React from 'react'
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock"
import NotificationIcon from "../../Components/Notifications/NotificationIcon"
var apiUrl = "BALOOGA";
beforeEach(() => {
    fetch.resetMocks();
  });
  

test('renders notification icon', () => {
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationIcon user={{user_id:2}}  api={apiUrl} />);
    expect(screen.getByText('🔔', { exact: false })).toBeInTheDocument();
  });
test('calls the api to get notifications', async ()=> {
    fetch.mockResponse(JSON.stringify({notifications:[]}));
    render(<NotificationIcon user={{user_id:2}} api={apiUrl} />);
    expect(fetch).toHaveBeenCalledWith(apiUrl+"/user/2/notifications/");
})
test('displays unread notifications', async ()=>{
    fetch.mockResponse(JSON.stringify([
        {id:1,time:'2021-01-03 04:05:06', msg:'You are working tomorrow', read:true, archived:false},
        {id:2, time:'2021-01-03 04:05:06', msg:'Has COVID', read:false, archived:false}
    ]));
    render(<NotificationIcon user={{user_id:1}} api={apiUrl} />);
    expect(await screen.findByText(/🔔.*\(1\)/, { exact: false })).toBeInTheDocument();
})
test('does not display unread notifications if invalid properties provided', async () => {
  fetch.mockResponse(JSON.stringify([
    {id:1,time:'2021-01-03 04:05:06', msg:'You are working tomorrow', read:true, archived:false},
    {id:2, time:'2021-01-03 04:05:06', msg:'Has COVID', read:false, archived:false}
  ]));
  render(<NotificationIcon user={{}} api={apiUrl} />)
  expect(screen.queryByText(/🔔\(1\)/, { exact: false })).toBeNull();
  cleanup();
  render(<NotificationIcon api={apiUrl} />)
  expect(screen.queryByText(/🔔\(1\)/, { exact: false })).toBeNull();
  cleanup();
  render(<NotificationIcon user={{user_id:2}} />)
  expect(screen.queryByText(/🔔\(1\)/, { exact: false })).toBeNull();
})

