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
            qualifications: [{qual_id: 0, qual_name: 'None'}],
            certifications: [{cert_id: 0, cert_name: 'None'}]
          },
          levels: ['None', 'Training', 'Instructor', 'Evaluator'],
          newCertification: this.props.static.certifications[0],
          removeCertification: {cert_id: 0, cert_name: 'None'},
          newQualification: {
            qual_id: this.props.static.qualifications[0].qual_id,
            qual_name: this.props.static.qualifications[0].qual_name,
            in_training: false,
            is_instructor: false,
            is_evaluator:false,
          },
          removeQualification: {
            qual_id: 0,
            qual_name: 'None',
            in_training: false,
            is_instructor: false,
            is_evaluator:false,
          },
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

      let newUser = await fetch(this.props.api + 'users/new',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.newUser)
      }).catch(err => {
        console.log(err);
      })


      if (!newUser.ok) {
        throw new Error('Waiting on newUser to add to the database')
      } else {
        let tempObj = await newUser.json()
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
          if (event.target.id === "unassigned_qualifications") {

            this.setState(previousState => ({
              newQualification: {
                ...previousState.newQualification, 
                qual_id: Number.parseInt(event.target.value),
                qual_name: this.props.static.qualifications[this.props.static.qualifications.findIndex(qual => qual.qual_id==event.target.value)].qual_name
              
            }}))
          }

          if (event.target.id === "assigned_qualifications") {

            this.setState(previousState => ({
              removeQualification: {
                ...previousState.removeQualification, 
                qual_id: Number.parseInt(event.target.value),
                qual_name: this.props.static.qualifications[this.props.static.qualifications.findIndex(qual => qual.qual_id==event.target.value)].qual_name
              
            }}))
          }

          if (event.target.id === "new_level") {
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
              newQualification: {
                ...previousState.newQualification,
                in_training: training,
                is_instructor: instructor,
                is_evaluator: evaluator
              }
            }));
          }

          if (event.target.id === "remove_level") {
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
              removeQualification: {
                ...previousState.removeQualification,
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

        const assign_qualification = () => {
          let tempArray = this.state.newUser.qualifications;
          if (tempArray.length === 1 && tempArray[0].qual_id===0 ) {
            tempArray[0] = this.state.newQualification       
          } else if (tempArray.filter(qual => qual.qual_id==this.state.newQualification.qual_id).length > 0) {//filter to see if the qual_id is already in the tempArray tempArray.filter(qual => qual.qual_id==this.state.newQualification.qual_id).length > 0
            //remove the old and replace with new
            tempArray = tempArray.filter(qual => qual.qual_id != this.state.newQualification.qual_id)
            tempArray.push(this.state.newQualification)
          } else {
            tempArray.push(this.state.newQualification)
          };

          this.setState(previousState => ({
            newUser: {
              ...previousState.newUser,
              qualifications: tempArray,
            }
          }))
        }

        const remove_qualification = () => {
          let tempArray;
          if (this.state.newUser.qualifications.length === 1) {
            tempArray = [{qual_id: 0, qual_name: 'None', in_training: false, is_instructor: false, is_evaluator: false}]
          } else {
            tempArray = this.state.newUser.qualifications.filter(qual => (this.state.removeQualification.qual_id != qual.qual_id));
          }
          this.setState(previousState => ({
            newUser: {
              ...previousState.newUser,
              qualifications: tempArray,
            }
          }))
        }

        const showLevel = (qual) => {
          if (qual.in_training) return "Training"
          if (qual.is_evaluator) return "Evaluator"
          if (qual.is_instructor) return "Instructor"
          else return ""
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
                      {this.props.static.qualifications.filter(q=>!this.state.newUser.qualifications.find(newq => newq.qual_id===q.qual_id)).map(q => <option id="unassigned_qualifications" value={q.qual_id}> {q.qual_name} </option> )}
                  </select>
                  <select id="new_level" onChange={handleChange} defaultvalue={this.state.levels[0]}> 
                      {this.state.levels.map(level => <option id="new_level" value={level}> {level} </option> )}
                  </select>   
                  <button type="button" onClick={assign_qualification}>Add</button>                    
              </td>    
              <td>    
                <select id="assigned_qualifications" onChange={handleChange} defaultvalue={this.state.newUser.qualifications[0]}> 
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
                <select id="assigned_certifications" onChange={handleChange} defaultvalue={this.state.newUser.certifications[0]}> 
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