import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import ConflictPage from '../../Components/Conflict_Page/conflict_page'

beforeEach(() => {
    fetch.resetMocks();
});//end of Before Each loop

test('renders conflict page', async () => {
    fetch.mockResponse(JSON.stringify({conflict: []}));
    render(<ConflictPage user={2}/>);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/user/2/conflict");
})//end of conflict page test