import React from 'react'
import UserTableHeader from './UserHeader'

class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newUser: {},
            newUserQualifications: {},
            newUserCertifications:{},
            grades: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6' ],
            crews: ['Blue', 'Green', 'Day Staff', 'DSG'],
            flights: ['C2', 'Weapons','APM', 'JICC', 'Battle Staff'],
            roles: ['Admin', 'Scheduler', 'Supervisor', 'Crew'],
            qualifications: ['MCC', 'MCCT', 'RSC', 'SD', 'ST', 'AWO', 'WD', 'ASO', 'AST', 'IDT', 'TT', 'ICO', 'ICOT', 'ICT'],
            certifications: ['None','RSC', 'FO', 'EA', 'ERSA', 'TANR', 'SS'],
            levels: ['None','Training', 'Instructor', 'Evaluator'], 
            newUserId: 1           
        };
    }



    // initialize newUser
    componentDidMount = () => {
        this.ResetNewUserForm();
    }

    ResetNewUserForm = () => {
        this.state.newUser = {
            grade: this.state.grades[0],
            first_name: '',
            last_name: '',
            user_role: this.state.roles[0],
            section: this.state.flights[0],
            user_group: this.state.crews[0],
            active: true
        }
        this.state.newUserCertifications = {
            cert_id: this.state.certifications.indexOf(this.state.certifications[0]) //this will need to be modified when the data base is connected
        }
        this.state.newUserQualifications = {
            qual_id: this.state.qualifications.indexOf(this.state.qualifications[0]), //this will need to be modified when the data base is connected
            in_training: false,
            is_instructor: false,
            is_evaluator: false
        }
    }

    SubmitNewUser = () => {
        console.log(this.state.newUser);
        //when submitting a new user, you will need to return the user_id that was created. newUserId is critical to creating the qualification and certification
        this.SubmitNewUserQualifications(this.state.newUserId);
        this.SubmitNewUserCertifications(this.state.newUserId);
    }

    SubmitNewUserQualifications = (userId) => {
        this.state.newUserQualifications.user_id = userId;
        console.log(this.state.newUserQualifications)
    }

    SubmitNewUserCertifications = (userId) => {
        this.state.newUserCertifications.user_id = userId;
        console.log(this.state.newUserCertifications);
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
                  <th>Certification</th>
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
                newUserQualifications: {
                  ...previousState.newUserQualifications, 
                  qual_id: this.state.qualifications.indexOf(event.target.value)
                }
              }));
          }

          if (event.target.id === "level") {
            let training = false;
            let evaluator = false;
            let instructor = false;

            if (event.target.value === 'Training')  {
                training = true;
            }
            if (event.target.value === 'Instructor')  {
                instructor = true;
            }
            if (event.target.value === 'Evaluator')  {
                evaluator = true;
            }   

            this.setState(previousState => ({
              newUserQualifications: {
                ...previousState.newUserQualifications, 
                in_training: training,
                is_instructor: instructor,
                is_evaluator: evaluator
              }
            }));
          }

          if (event.target.id === "certification") {
            this.setState(previousState => ({
                newUserCertifications: {
                  ...previousState.newUserCertifications, 
                  cert_id: this.state.certifications.indexOf(event.target.value) 
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
                        <select id="level" onChange={handleChange}> 
                            {this.state.levels.map(level => <option id="level" value={level}> {level} </option> )}
                        </select>                       
                    </td>                              
                    <td>
                        <select id="certification" onChange={handleChange}> 
                            {this.state.certifications.map(certification => <option id="certification" value={certification}> {certification} </option> )}
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
                    <UserTableHeader/>
                    <this.NewUserInputForm />
                </table>
            </div>

        )
    }
}
export default AddUser;