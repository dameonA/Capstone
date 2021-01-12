import React from 'react'
import UserTableHeader from './UserHeader'

class AddUser extends React.Component {
    constructor(props) {
        super(props) //api <router api>, static <static tables>
        this.state = {
            levels: ['None', 'Training', 'Instructor', 'Evaluator'],
        };
    }

    // initialize newUser
    componentDidMount = () => {
        this.ResetNewUserForm();
    }

    ResetNewUserForm = () => {

      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = '')
      );
      this.setState({
        newUser: {
          grade: this.props.static.grades[0],
          first_name: '',
          last_name: '',
          user_role: this.props.static.roles[0].role_id,
          section: this.props.static.sections[0].section_id,
          user_group: this.props.static.usergroups[0].group_id,
          active: true
        },
        qualification: {},
        newUserQualifications: [],
        newUserCertifications: []
      })
    }

    SubmitNewUser = async () => {

      let newUserId = await fetch(this.props.api + 'users/new',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.newUser)
      }).catch(err => {
        console.log(err);
      })


      if (!newUserId.ok) {
        throw new Error('Waiting on newUserId')
      } else {
        let tempObj = await newUserId.json()
        let userId = tempObj.user_id
        await this.SubmitNewUserQualifications(userId);
        await this.SubmitNewUserCertifications(userId);
        alert(`New User Created! \n Name: ${tempObj.last_name}, ${tempObj.first_name} ${tempObj.grade}`);
      }
        
      this.ResetNewUserForm();

    }
  
    SubmitNewUserQualifications  = async (userId) => {
      let qualifications = [this.state.qualification]
      this.setState( {newUserQualifications: qualifications} );
      let jsonBody = {"user_id": userId, "quals": this.state.newUserQualifications}
  
      await fetch(this.props.api +'users/new/userqualifications',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody)
        }
      )

 
    }

    SubmitNewUserCertifications = async (userId) => {
      let jsonBody = {"user_id": userId, "certs": this.state.newUserCertifications}
      await fetch(this.props.api +'users/new/usercertifications',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody)
        }
      )
    }

    NewUserInputForm = () => {

        const handleChange = (event) => {//handles the ongoing changes for each of the inputs for creating new flight
          event.preventDefault();
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
                user_role: Number.parseInt(event.target.value)
              }
            }));
          }
          if (event.target.id === "qualification" && event.target.value !== 'None') {

            this.setState(previousState => ({
               qualification: {
                ...previousState.qualification, 
                qual_id: Number.parseInt(event.target.value)
              }
            }))
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
              qualification: {
                ...previousState.qualification,
                in_training: training,
                is_instructor: instructor,
                is_evaluator: evaluator
              }
            }));
          }

          if (event.target.id === "certification") {
            let tempCert = this.state.newUserCertifications;
            if (!tempCert.includes(Number.parseInt(event.target.value)) && Number.parseInt(event.target.value) > 0) {
              tempCert.shift();
              tempCert.push(Number.parseInt(event.target.value))
            }
            this.setState( {newUserCertifications: tempCert} );
          }
          if (event.target.id === "flight") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                section: Number.parseInt(event.target.value)
              }
            }));
          }

          if (event.target.id === "crew") {
            this.setState(previousState => ({
              newUser: {
                ...previousState.newUser, 
                user_group: Number.parseInt(event.target.value)
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
                  <select id="grade" onChange={handleChange} value={this.props.static.grades[0]}> 
                      {this.props.static.grades.map(grade => <option id="grade" value={grade}> {grade} </option> )}
                  </select>
              </td> 
              <td>
                  <select id="role" onChange={handleChange} value={this.props.static.roles[0]}> 
                      {this.props.static.roles.map(role => <option id="role" value={role.role_id}> {role.role_name} </option> )}
                  </select>
              </td> 
              <td>
                  <select id="qualification" onChange={handleChange} value="None"> 
                      <option id="qualification" value='None' >None</option>
                      {this.props.static.qualifications.map(qualification => <option id="qualification" value={qualification.qual_id}> {qualification.qual_name} </option> )}
                  </select>
                  <select id="level" onChange={handleChange} value={this.state.levels[0]}> 
                      {this.state.levels.map(level => <option id="level" value={level}> {level} </option> )}
                  </select>                       
              </td>                              
              <td>
                  <select id="certification" onChange={handleChange} value="None"> 
                      <option id="certification" value='None' >None</option>
                      {this.props.static.certifications.map(certification => <option id="certification" value={certification.cert_id}> {certification.cert_name} </option> )}
                  </select>
              </td> 

              <td>
                  <select id="flight" onChange={handleChange} value={this.props.static.sections[0]}> 
                      {this.props.static.sections.map(flight => <option id="flight" value={flight.section_id}> {flight.section_name} </option> )}
                  </select>
              </td>  
              <td>
                  <select id="crew" onChange={handleChange} value={this.props.static.usergroups[0]}> 
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