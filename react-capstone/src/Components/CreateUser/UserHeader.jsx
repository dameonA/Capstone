import React from 'react'

function UserTableHeader(props) {
    return(
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Grade</th>
              <th>Access Role</th>
              <th>Available Qualifications</th>
              <th>User's Qualifications</th>
              <th>Available Certifications</th>
              <th>User's Certifications</th>
              <th>Flight</th>
              <th>Crew</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
    )
}

export default UserTableHeader;