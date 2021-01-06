import React from 'react'
import { shallow } from 'enzyme'
// the shallow method from the Enzyme library ensures that
// tests aren't indirectly asserting on behavior of child components
import CreateUser from '../../Components/CreateUser/CreateUser'
// we have to import the PersonList component
// however to assert its presence

import App from '../../App.js' 

describe('App', () => {
  it('renders a Create User feature', () => {
    const appWrapper = shallow(<App />)
    const childElement = appWrapper.find(User)

    expect(expectedElement).toHaveLength(1)
  })
})

// The main app should have a link to CreateUser
// CreateUser should have an option to add a new user
// Adding a user should be a form that allows entry of the mandatory elements for a user
// CreateUser should have an option to modify an existing user
// CreateUser should have an option to archive a user