import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import ConflictPage from '../../Components/Conflict_Page/conflict_page'
var apiUrl = "MANDO";

beforeEach(() => {
    fetch.resetMocks();
});//end of Before Each loop

test('View Entire Schedule exists', async () => {
    fetch.mockResponse(JSON.stringify({conflict: []}));
    render(<ConflictPage user={{user_id:2}} api={apiUrl}/>);
    expect(screen.getByText("Conflict")).toBeInTheDocument();
    });

test('View Entire Schedule exists', async () => {
    fetch.mockResponse(JSON.stringify({conflict: []}));
    render(<ConflictPage user={{user_id:2}} api={apiUrl}/>);
    expect(screen.getByText("Conflict")).toBeInTheDocument();
    });

test('View Entire Schedule exists', async () => {
        fetch.mockResponse(JSON.stringify({conflict: []}));
        render(<ConflictPage user={{user_id:2}} api={apiUrl}/>);
        expect(screen.getByText("Conflict")).toBeInTheDocument();
    });

test('View Entire Schedule exists', async () => {
    fetch.mockResponse(JSON.stringify({conflict: []}));
    render(<ConflictPage user={{user_id:2}} api={apiUrl}/>);
    expect(screen.getByText("Conflict")).toBeInTheDocument();
    });

test('View Entire Schedule exists', async () => {
    fetch.mockResponse(JSON.stringify({conflict: []}));
    render(<ConflictPage user={{user_id:2}} api={apiUrl}/>);
    expect(screen.getByText("Conflict")).toBeInTheDocument();
    });//end of conflict page test

