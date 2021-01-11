import React from 'react'
import UserTableHeader from './UserHeader'

class AddUser extends React.Component {
    constructor(props) {
        super(props) //api <router api>, static <static tables>
        this.state = {
            newUser: {},
            newUserQualifications: {},
            newUserCertifications:{},
            levels: ['None', 'Training', 'Instructor', 'Evaluator'],
            newUserId: -1           
        };
    }

    // initialize newUser
    componentDidMount = () => {
        this.ResetNewUserForm();
        console.log(this.props.static.roles)
    }

    ResetNewUserForm = () => {
        this.setState({newUser: {
            grade: this.props.static.grades[0],
            first_name: '',
            last_name: '',
            user_role: this.props.static.roles[0].role_id,
            section: this.props.static.sections[0].section_id,
            user_group: this.props.static.usergroups[0].group_id,
            active: true
        }})
        
        this.setState({newUserQualifications: {
            qual_id: -1, //this will need to be modified when the data base is connected
            in_training: false,
            is_instructor: false,
            is_evaluator: false
        }})

        this.setState({newUserCertifications: {
          cert_id: -1
        }})
      }

    SubmitNewUser = async () => {
        console.log(this.state.newUser);
        await fetch(this.props.api + 'users/new',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.newUser)
        }).then(userId => {
           this.SubmitNewUserQualifications(userId.user_id);
           this.SubmitNewUserCertifications(userId.user_id);
           this.ResetNewUserForm();
        })
 
     }

    SubmitNewUserQualifications = (userId) => {
        this.state.newUserQualifications.user_id = userId;
        console.log(this.state.newUserQualifications)
    }

    SubmitNewUserCertifications = (userId) => {
        this.state.newUserCertifications.user_id = userId;
        console.log(this.state.newUserCertifications);
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
                  qual_id: this.props.static.qualifications.indexOf(event.target.value)
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
                  cert_id: this.props.static.certifications.indexOf(event.target.value) 
                }
              }));
          }
          if (event.target.id === "flight") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                section: event.target.value
              }
            }));
          }

          if (event.target.id === "crew") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                user_group: event.target.value
              }
            }));
          }   
          
          if (event.target.id === "active") {
            let active = true;
            if (event.target.value === 'false') {
              active = false;
            }
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser,
                active: active
              }
            }));
          }
        } 

        return (

          <tr>
              <td><input required onChange={handleChange} type="text" id="lastName" placeholder='Last Name'></input></td>    
              <td><input required onChange={handleChange} type="text" id="firstName" placeholder='First Name'></input></td>    
              <td>
                  <select id="grade" onChange={handleChange}> 
                      {this.props.static.grades.map(grade => <option id="grade" value={grade}> {grade} </option> )}
                  </select>
              </td> 
              <td>
                  <select id="role" onChange={handleChange}> 
                      {this.props.static.roles.map(role => <option id="role" value={role.role_id}> {role.role_name} </option> )}
                  </select>
              </td> 
              <td>
                  <select id="qualification" onChange={handleChange}> 
                      <option id="qualification" value='None' >None</option>
                      {this.props.static.qualifications.map(qualification => <option id="qualification" value={qualification.qual_id}> {qualification.qual_name} </option> )}
                  </select>
                  <select id="level" onChange={handleChange}> 
                      {this.state.levels.map(level => <option id="level" value={level}> {level} </option> )}
                  </select>                       
              </td>                              
              <td>
                  <select id="certification" onChange={handleChange}> 
                      <option id="certification" value='None' >None</option>
                      {this.props.static.certifications.map(certification => <option id="certification" value={certification.cert_id}> {certification.cert_name} </option> )}
                  </select>
              </td> 

              <td>
                  <select id="flight" onChange={handleChange}> 
                      {this.props.static.sections.map(flight => <option id="flight" value={flight.section_id}> {flight.section_name} </option> )}
                  </select>
              </td>  
              <td>
                  <select id="crew" onChange={handleChange}> 
                      {this.props.static.usergroups.map(crew => <option id="crew" value={crew.group_id}> {crew.group_name} </option> )}
                  </select>
              </td>               
              <td>
                <select id="active" onChange={handleChange}>
                  <option id='active' value={true}>Active</option>
                  <option id='active' value={false}>Archived</option>
                </select>
              </td>                                              
              <td> <button onClick={this.SubmitNewUser} value="Add New User">Add New User</button>  </td>
          </tr>   

        )
    }

     render() {
        return (
            <div>
                <h2>Add New User</h2>
                <table>
                    <UserTableHeader/>
                    <tbody>
                    <this.NewUserInputForm />
                    </tbody>
                </table>
            </div>

        )
    }
}
export default AddUser;