import React from 'react'

function UserTableHeader(props) {
    return(
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Grade</th>
              <th>Access Role</th>
              <th>Crew Qualification</th>
              <th>Certification</th>
              <th>Flight</th>
              <th>Crew</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
    )
}

export default UserTableHeader;