import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock"
import NotificationPage from "../../Components/Notification/NotificationPage"
beforeEach(() => {
    fetch.resetMocks();
  });
test('element exists', ()=>{
    
});