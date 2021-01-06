import React from 'react'

class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newUser: {},
            grades: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6' ],
            crews: ['Blue', 'Green', 'Day Staff', 'DSG'],
            flights: ['C2', 'Weapons','APM', 'JICC', 'Battle Staff'],
            roles: ['Admin', 'Scheduler', 'Supervisor', 'Crew'],
            qualifications: ['MCC', 'MCCT', 'RSC', 'SD', 'ST', 'AWO', 'WD', 'ASO', 'AST', 'IDT', 'TT', 'ICO', 'ICOT', 'ICT'],
            certification: ['RSC', 'FO', 'EA', 'ERSA', 'TANR', 'SS'],
            levels: ['Training', 'Instructor', 'Evaluator']            
        };
    }
    // first_name
    // last_name
    // grade (drop down)
    // user_role (drop down) fk
    // section (drop down) fk
    // user_group (drop down) fk
    // active (default to true)

    SubmitNewUser = () => {
        this.state.newUser.active = true;
        console.log(this.state.newUser.first_name);
    }

    NewUserTableHeader = () => {
        return(
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Access Role</th>
                  <th>Crew Qualification</th>
                  <th>Flight</th>
                  <th>Crew</th>
                  <th></th>
                </tr>
              </thead>
        )
    }

    NewUserInputForm = () => {

        const handleChange = (event) => {//handles the ongoing changes for each of the inputs for creating new flight
          
          if (event.target.id === "grade") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                grade: event.target.value
              }
            }));
          }
          if (event.target.id === "firstName") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                first_name: event.target.value
              }
            }));
          }
          if (event.target.id === "lastName") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                last_name: event.target.value
              }
            }));
          }
          if (event.target.id === "role") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                role: event.target.value
              }
            }));
          }
          if (event.target.id === "qualification") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                qualification: event.target.value
              }
            }));
          }
          if (event.target.id === "flight") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                flight: event.target.value
              }
            }));
          }

          if (event.target.id === "crew") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                crew: event.target.value
              }
            }));
          }          
        } 

        return (
            <tbody>
                <tr>
                    <td>
                        <select id="grade" onChange={handleChange}> 
                            {this.state.grades.map(grade => <option id="grade" value={grade}> {grade} </option> )}
                        </select>
                    </td> 
                    <td><input onChange={handleChange} type="text" id="firstName"></input></td>    
                    <td><input onChange={handleChange} type="text" id="lastName"></input></td>    
                    <td>
                        <select id="role" onChange={handleChange}> 
                            {this.state.roles.map(role => <option id="role" value={role}> {role} </option> )}
                        </select>
                    </td> 
                    <td>
                        <select id="qualification" onChange={handleChange}> 
                            {this.state.qualifications.map(qualification => <option id="qualification" value={qualification}> {qualification} </option> )}
                        </select>
                    </td>  
                    <td>
                        <select id="flight" onChange={handleChange}> 
                            {this.state.flights.map(flight => <option id="flight" value={flight}> {flight} </option> )}
                        </select>
                    </td>  
                    <td>
                        <select id="crew" onChange={handleChange}> 
                            {this.state.crews.map(crew => <option id="crew" value={crew}> {crew} </option> )}
                        </select>
                    </td>                                                             
                    <td> <button onClick={this.SubmitNewUser} value="Add New User">Add New User</button>  </td>
                </tr>   
            </tbody>
        )
    }

     render() {
        return (
            <div>
                <h2>Add New User</h2>
                <table>
                    <this.NewUserTableHeader/>
                    <this.NewUserInputForm />
                </table>
            </div>

        )
    }
}
export default AddUser;