import * as React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock"
import LoginForm from '../../Components/Login/LoginForm'

var apiUrl = "BALOOGA";
beforeEach(() => {
    fetch.resetMocks();
  });
  
test('renders username input', () => {
    render(<LoginForm api={apiUrl} />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
  test('renders password input', () => {
    render(<LoginForm api={apiUrl} />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
  test('renders login button', () => {
    render(<LoginForm api={apiUrl} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  test('Validates login information with api', () => {
    fetch.mockResponse((req)=>{
        return new Promise(()=>{value:true});
    });
    render(<LoginForm api={apiUrl} handleLogIn={()=>{}} />);
    fireEvent.change(screen.getByLabelText('Username'),{target:{value:'aUser'}});
    fireEvent.change(screen.getByLabelText('Password'),{target:{value:'aPassword'}});
    fireEvent.click(screen.getByText('Login'));
    expect(fetch).toHaveBeenCalledWith(apiUrl+"/auth",expect.anything());
  });


