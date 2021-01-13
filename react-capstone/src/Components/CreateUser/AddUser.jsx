import React from 'react'
import UserTableHeader from './UserHeader'

class AddUser extends React.Component {
    constructor(props) {
        super(props) //api <router api>, static <static tables>
        this.state = {
          newUser: {
            grade: '',
            first_name: '',
            last_name: '',
            user_role: 1,
            section: 1,
            user_group: 1,
            active: true,
            qualifications: [{}],
            certifications: [{cert_id: 0, cert_name: 'None'}]
          },
          levels: ['None', 'Training', 'Instructor', 'Evaluator'],
          newCertification: this.props.static.certifications[0],
          removeCertification: {cert_id: 0, cert_name: 'None'},
          newQualification: this.props.static.qualifications[0],
          removeQualification: {},
        }
        this.baseState = this.state
    }

    // initialize newUser
    componentDidMount = () => {
        this.ResetNewUserForm();
    }

    ResetNewUserForm = () => {

      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = '')
      );
      this.setState(this.baseState)
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
  //TODO check to see if the newUser cert_id is 0. this indicates no certs to pass and will need to pass a null []
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
          if (event.target.id === "assigned_qualification") {

            this.setState(previousState => ({
                ...previousState, 
                assigned_qualification: Number.parseInt(event.target.value)
              
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

          if (event.target.id === "unassigned_certifications") {
            this.setState({
              newCertification: this.props.static.certifications[this.props.static.certifications.findIndex(cert => cert.cert_id==event.target.value)]
            })
          }

          if (event.target.id === "assigned_certifications" ) {
            this.setState({
              removeCertification: this.props.static.certifications[this.props.static.certifications.findIndex(cert => cert.cert_id==event.target.value)]
            })
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

        const assign_certification = () => {
          let tempArray = this.state.newUser.certifications;
          if (tempArray.length === 1 && tempArray[0].cert_id===0 ) {
            tempArray[0] = this.state.newCertification       
          } else if (tempArray.includes(this.state.newCertication)) {
            tempArray = tempArray;
          } else {
            tempArray.push(this.state.newCertification)
          };

          this.setState(previousState => ({
            newUser: {
              ...previousState.newUser,
              certifications: tempArray,
            }
          }))
        }

        const remove_certification = () => {
          let tempArray;
          if (this.state.newUser.certifications.length === 1) {
            tempArray = [{cert_id: 0, cert_name: 'None'}]
          } else {
            tempArray = this.state.newUser.certifications.filter(cert => (this.state.removeCertification.cert_id !== cert.cert_id));
          }
          this.setState(previousState => ({
            newUser: {
              ...previousState.newUser,
              certifications: tempArray,
            }
          }))
        }

        const assign_qualification = () {

        }

        const remove_qualification = () => {

        }
        
        const showLevel = (qual) => {
          if (qual.in_training) return "Training"
          if (qual.is_evaluator) return "Evaluator"
          if (qual.is_instructor) return "Instructor"
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
                  <select id="unassigned_qualifications" onChange={handleChange} > 
                      {this.props.static.qualifications.filter(q=>!this.state.newUser.qualifications.includes(q)).map(q => <option id="unassigned_qualifications" value={q.qual_id}> {qu.qual_name} </option> )}
                  </select>
                  <select id="new_level" onChange={handleChange} value={this.state.levels[0]}> 
                      {this.state.levels.map(level => <option id="new_level" value={level}> {level} </option> )}
                  </select>   
                  <button type="button" onClick={assign_qualification}>Add</button>                    
              </td>    
              <td>    
                <select id="assigned_qualifications" onChange={handleChange} > 
                  {this.state.newUser.qualifications.map(qual => <option id="assigned_qualifications" value={qual.qual_id}> {qual.qual_name} {showLevel(qual)} </option> )}
                </select> 
                
                <button type="button" onClick={remove_qualification}>Remove</button>
              </td>                           
              <td>
                <select id="unassigned_certifications" onChange={handleChange} > 
                  {this.props.static.certifications.filter(v=>!this.state.newUser.certifications.includes(v)).map(v => <option id="unassigned_certifications" value={v.cert_id} name={v.cert_name}> {v.cert_name} </option> )}
                </select>
                <button type="button" onClick={assign_certification}>Add</button>
              </td>
              <td>    
                <select id="assigned_certifications" onChange={handleChange} > 
                  {this.state.newUser.certifications.map(cert => <option id="assigned_certifications" value={cert.cert_id}> {cert.cert_name} </option> )}
                </select> 
                <button type="button" onClick={remove_certification}>Remove</button>
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