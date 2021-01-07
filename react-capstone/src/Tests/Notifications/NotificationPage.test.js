import * as React from 'react'
import {render, screen, cleanup, fireEvent} from '@testing-library/react'
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
    expect(fetch).toHaveBeenCalledWith(apiUrl+"/users/2/notifications/");
});
test('displays notifications', async ()=>{
    fetch.mockResponse(JSON.stringify([
        {id:1,sent_tm:'2021-01-03 04:05:06', comment:'You are working tomorrow', is_read:true, archived:false},
        {id:17,sent_tm:'2021-01-03 04:05:06', comment:'Has COVID', is_read:false, archived:false}
    ]));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.findByText("You are working tomorrow", { exact: false })).toBeInTheDocument();
    expect(await screen.findByText("Has COVID", { exact: false })).toBeInTheDocument();
});
test('displays message for no notifications', async ()=>{
    fetch.mockResponse(JSON.stringify([]));
    render(<NotificationPage user={{user_id:2}} api={apiUrl} />);
    expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
    cleanup();
    render(<NotificationPage user={{}} api={apiUrl} />)
    expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
    cleanup();
    render(<NotificationPage api={apiUrl} />)
    expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
    cleanup();
    render(<NotificationPage user={{user_id:2}} />)
    expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
});
test('marks message as read when clicked', async ()=>{
    fetch.mockResponse(req=>{
        if (req.url.includes('users')) {
            console.log("users")
            return Promise.resolve(JSON.stringify([
                {
                    "id": 2,
                    "userid": 1,
                    "role_id": null,
                    "type_notify": 3,
                    "sent_tm": "2021-01-03T12:05:06.000Z",
                    "comment": "Joe is on quarters",
                    "is_read": false,
                    "archived": false
                }
            ]));
        }else{
            console.log("nousers")
            return Promise.resolve(
                JSON.stringify({
                    "id": 2,
                    "userid": 1,
                    "role_id": null,
                    "type_notify": 3,
                    "sent_tm": "2021-01-03T12:05:06.000Z",
                    "comment": "Joe is on quarters",
                    "is_read": true,
                    "archived": false
                })
            )
        }
    }


    );
    await render(<NotificationPage user={{user_id:1}} api={apiUrl} />);
    let element = await screen.findByText("Joe is on quarters", {exact: false});
    screen.debug();
    await fireEvent.click(element);
    screen.debug();
    //expect((await screen.findByText("Joe is on quarters", {exact: false})).type
    //expect(await screen.findByText("No Notifications", { exact: false })).toBeInTheDocument();
});