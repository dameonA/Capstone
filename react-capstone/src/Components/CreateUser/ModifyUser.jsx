import React from 'react'
import UserTableHeader from './UserHeader'
import Button from '@material-ui/core/Button';

class ModifyUser extends React.Component {
  constructor(props) {
    super(props) //api <router api>, users <object of all users>, static <static tables>
    this.state = {
      users: [],
      updatedUser: {
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
      activeUserSelection: 'all',
      newCertification: {},
      removeCertification: {},
      newQualification: {
        qual_id: 1,
        qual_name: "",
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
      showModifyUserForm:false,
    };
    this.baseState = this.state
  }

  componentDidMount = async () => {
      await this.intializeUsers();
    
  }

  intializeUsers = async () => {
    let response = await fetch(this.props.api+'users').catch(err=>console.log("cannot get users: ", err)); //get the users
    let usersArray = await response.json();
    this.setState(this.baseState)
    this.setState(previousState => ({
      ...previousState,
      users: usersArray,
    }));
    this.setState(previousState =>({
      updatedUser: {
        ...previousState.updatedUser,
        qualifications: [{qual_id: 0, qual_name: 'None'}],
        certifications: [{cert_id: 0, cert_name: 'None'}]
      }
    }))
    this.setState(previousState => ({
      ...previousState,
      newCertification: {cert_id: 1, cert_name: "RSC"},
      removeCertification: {cert_id: 0, cert_name: 'None'},

    }))
    this.setState(previousState=>({
      newQualification: {
        ...previousState.newQualification,
        qual_id: 1,
        qual_name: "MCC",
        in_training: false,
        is_instructor: false,
        is_evaluator:false,
      },
    }))
  }
  

  SubmitUpdatedUser = async () => {
    //check for no certs
    if (this.state.updatedUser.certifications[0].cert_id === 0) {
      this.setState(previousState => ({
        updatedUser: {
          ...previousState.updatedUser,
          certifications: []
        }
      }))
    }
    //check for no quals 
    if (this.state.updatedUser.qualifications[0].qual_id === 0) {
      this.setState(previousState => ({
        updatedUser: {
          ...previousState.updatedUser,
          qualifications: []
        }
      }))
    }

    await fetch(this.props.api + 'users/update',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.updatedUser)
      })
    alert(`User Updated! \n Name: ${this.state.updatedUser.last_name}, ${this.state.updatedUser.first_name} ${this.state.updatedUser.grade}`);

    this.intializeUsers(); //reset the state to the database to bring in the new updates of the user
    
  } //end of SubmitUpdatedUser

  SelectUser = () => {

    const handleChange = (event) => {

      if (event.target.value === 'None') {
        this.intializeUsers()
      } else {
          let tempId = Number.parseInt(event.target.value);
          let index = this.state.users.findIndex(user => user.user_id === tempId)
          let tempUser = this.state.users[index]

          if (Array.isArray(tempUser.certifications) && tempUser.certifications.length > 0) {
            for (let i =0; i<tempUser.certifications.length; i++) {
              tempUser.certifications[i].cert_name = this.props.static.certifications[this.props.static.certifications.findIndex(cert => cert.cert_id == tempUser.certifications[i].cert_id)].cert_name
            }
          } else{
            tempUser.certifications = [{cert_id: 0, cert_name: 'None'}]
          }

          if (Array.isArray(tempUser.qualifications) && tempUser.qualifications.length > 0) {
            for (let i =0; i<tempUser.qualifications.length; i++) {
              tempUser.qualifications[i].qual_name = this.props.static.qualifications[this.props.static.qualifications.findIndex(qual => qual.qual_id == tempUser.qualifications[i].qual_id)].qual_name
            }
          } else{
            tempUser.qualifications = [{qual_id: 0, qual_name: 'None'}]
          }

          this.setState(previousState => ({
            ...previousState,
            updatedUser: tempUser,
            removeQualification: tempUser.qualifications[0],
            removeCertification: tempUser.certifications[0],
          }))
      }
    } //end of handleChange



    return (
      <select id="selectedUser" onChange={handleChange} defaultValue="Select User">
        <option id="selectedUser" value="None">Select User</option>
        {this.state.users.map(user => <option id="selectedUser" value={user.user_id}>{user.last_name}, {user.first_name} {user.grade}</option>)}
      </select>
    )

  }//end of SelectUser

  SelectActiveUsers = () =>{

    const handleChange = (event) => {
      this.setState({activeUserSelection: event.target.value})
      console.log(this.state.activeUserSelection)
    }

    return (
      <td>
        <label>
          <input
            type='radio'
            value='all'
            checked={this.state.activeUserSelection === 'all'}
            onChange={handleChange}
            />
            All
          </label>
        <label>
          <input
            type='radio'
            value='active'
            checked={this.state.activeUserSelection === 'active'}
            onChange={handleChange}
          />
            Active
        </label>
        <label>
          <input
            type='radio'
            value='archived'
            checked={this.state.activeUserSelection === 'archived'}
            onChange={handleChange}
          />
            Archived
        </label>
      </td>
    )
  }

  ModifyUserForm = () => {

    // let user = this.state.updatedUser;
    let roleIndex = this.props.static.roles.findIndex(role => this.state.updatedUser.user_role === role.role_id);
    let role = this.props.static.roles[roleIndex].role_name;
    let qual = 'None';
    var level = 'None';
    if (Array.isArray(this.state.updatedUser.qualifications) && this.state.updatedUser.qualifications.length > 0) {
      let qualIndex = this.props.static.qualifications.findIndex(qual => qual.qual_id === this.state.updatedUser.qualifications[0].qual_id);
      if (qualIndex >= 0) {
        qual = this.props.static.qualifications[qualIndex].qual_name;
        if (this.state.updatedUser.qualifications.in_training) { level = 'Training' }
        if (this.state.updatedUser.qualifications.is_evaluator) { level = 'Evaluator' }
        if (this.state.updatedUser.qualifications.is_instructor) { level = 'Instructor' }
      }
    }
    let cert = 'None';
    if (Array.isArray(this.state.updatedUser.certifications) && this.state.updatedUser.certifications.length > 0) {
      let certIndex = this.props.static.certifications.findIndex(cert => cert.cert_id === this.state.updatedUser.certifications[0].cert_id);
      if (certIndex >= 0) {
        cert = this.props.static.certifications[certIndex].cert_name
      };
    }
    let flight = 'None';
    let flightIndex = this.props.static.sections.findIndex(section => section.section_id === this.state.updatedUser.section);
    if (flightIndex >= 0) {
      flight = this.props.static.sections[flightIndex].section_name
    };
    let crew = 'None';
    let crewIndex = this.props.static.usergroups.findIndex(group => group.group_id === this.state.updatedUser.user_group);
    if (crewIndex >= 0) {
      crew = this.props.static.usergroups[crewIndex].group_name
    };

    let active = 'Active';
    if (this.state.updatedUser.active === false) { active = 'Archived' }


    const handleChange = (event) => {//handles the ongoing changes for each of the inputs for creating new flight

      if (event.target.id === "grade") {
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
            grade: event.target.value
          }
        }));
      }
      if (event.target.id === "firstName") {
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
            first_name: event.target.value
          }
        }));
      }
      if (event.target.id === "lastName") {
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
            last_name: event.target.value
          }
        }));
      }
      if (event.target.id === "role") {
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
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
          updatedUser: {
            ...previousState.updatedUser,
            section: Number.parseInt(event.target.value)
          }
        }));
      }

      if (event.target.id === "crew") {
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
            user_group: Number.parseInt(event.target.value)
          }
        }));
      }

      if (event.target.id === "active") {
        console.log('active target value: ' + event.target.value)
        let active = true;
        console.log('active: ' + active)
        if (event.target.value === 'false') {
          active = false;
        }
        this.setState(previousState => ({
          updatedUser: {
            ...previousState.updatedUser,
            active: active
          }
        }));
      }
    }

    const assign_certification = () => {
      let tempArray = this.state.updatedUser.certifications;
      if (tempArray.length === 1 && tempArray[0].cert_id===0 ) {
        tempArray[0] = this.state.newCertification       
      } else if (tempArray.includes(this.state.newCertication)) {
        tempArray = tempArray;
      } else {
        tempArray.push(this.state.newCertification)
      };

      this.setState(previousState => ({
        updatedUser: {
          ...previousState.updatedUser,
          certifications: tempArray,
        }
      }))
    }

    const remove_certification = () => {
      let tempArray;
      if (this.state.updatedUser.certifications.length === 1) {
        tempArray = [{cert_id: 0, cert_name: 'None'}]
      } else {
        tempArray = this.state.updatedUser.certifications.filter(cert => (this.state.removeCertification.cert_id !== cert.cert_id));
      }
      this.setState(previousState => ({
        updatedUser: {
          ...previousState.updatedUser,
          certifications: tempArray,
        }
      }))
    }

    const assign_qualification = () => {
      let tempArray = this.state.updatedUser.qualifications;
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
        updatedUser: {
          ...previousState.updatedUser,
          qualifications: tempArray,
        }
      }))
    }

    const remove_qualification = () => {
      let tempArray;
      if (this.state.updatedUser.qualifications.length === 1) {
        tempArray = [{qual_id: 0, qual_name: 'None', in_training: false, is_instructor: false, is_evaluator: false}]
      } else {
        tempArray = this.state.updatedUser.qualifications.filter(qual => (this.state.removeQualification.qual_id != qual.qual_id));
      }
      this.setState(previousState => ({
        updatedUser: {
          ...previousState.updatedUser,
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
        <td><input onChange={handleChange} type="text" id="lastName" value={this.state.updatedUser.last_name}></input></td>
        <td><input onChange={handleChange} type="text" id="firstName" value={this.state.updatedUser.first_name}></input></td>
        <td>
          <select id="grade" onChange={handleChange}>
            <option value={this.state.updatedUser.grade} selected disabled hidden>{this.state.updatedUser.grade} </option>
            {this.props.static.grades.map(grade => <option id="grade" value={grade} > {grade} </option>)}
          </select>
        </td>
        <td>
          <select id="role" onChange={handleChange}>
            <option value={role} selected disabled hidden>{role}</option>
            {this.props.static.roles.map(role => <option id="role" value={role.role_id} > {role.role_name} </option>)}
          </select>
        </td>
        <td>
          <select id="unassigned_qualifications" onChange={handleChange} > 
              {this.props.static.qualifications.filter(q=>!this.state.updatedUser.qualifications.find(newq => newq.qual_id===q.qual_id)).map(q => <option id="unassigned_qualifications" value={q.qual_id}> {q.qual_name} </option> )}
          </select>
          <select id="new_level" onChange={handleChange} defaultValue={this.state.levels[0]}> 
              {this.state.levels.map(level => <option id="new_level" value={level}> {level} </option> )}
          </select>   
          <button type="button" onClick={assign_qualification}>Add</button>                    
        </td>    
        <td>    
          <select id="assigned_qualifications" onChange={handleChange} defaultValue={this.state.updatedUser.qualifications[0]}> 
            {this.state.updatedUser.qualifications.map(qual => <option id="assigned_qualifications" value={qual.qual_id}> {qual.qual_name} {showLevel(qual)} </option> )}
          </select> 
          
          <button type="button" onClick={remove_qualification}>Remove</button>
        </td>                           
        <td>
          <select id="unassigned_certifications" onChange={handleChange} > 
            {this.props.static.certifications.filter(v=>!this.state.updatedUser.certifications.includes(v)).map(v => <option id="unassigned_certifications" value={v.cert_id} name={v.cert_name}> {v.cert_name} </option> )}
          </select>
          <button type="button" onClick={assign_certification}>Add</button>
        </td>
        <td>    
          <select id="assigned_certifications" onChange={handleChange} defaultValue={this.state.updatedUser.certifications[0]}> 
            {this.state.updatedUser.certifications.map(cert => <option id="assigned_certifications" value={cert.cert_id}> {cert.cert_name} </option> )}
          </select> 
          <button type="button" onClick={remove_certification}>Remove</button>
        </td> 

        <td>
          <select id="flight" onChange={handleChange}>
            <option value={flight} selected disabled hidden>{flight}</option>
            {this.props.static.sections.map(flight => <option id="flight" value={flight.section_id}> {flight.section_name} </option>)}
          </select>
        </td>
        <td>
          <select id="crew" onChange={handleChange}>
            <option value={crew} selected disabled hidden>{crew}</option>
            {this.props.static.usergroups.map(crew => <option id="crew" value={crew.group_id}> {crew.group_name} </option>)}
          </select>
        </td>
        <td>
          <select id="active" onChange={handleChange}>
            <option value={active} selected disabled hidden>{active}</option>
            <option id='active' value={true}>Active</option>
            <option id='active' value={false}>Archived</option>
          </select>
        </td>
        <button onClick={this.SubmitUpdatedUser} value="Update User">Update User</button>

      </tr>
    )
  }


  ModifyUserButton = () => {

    const handleClick =()=>{
      let temp = !this.state.showModifyUserForm
      this.setState({showModifyUserForm: temp})
    }

    return (
        <Button
            variant="contained"
            color="seconday"
            id="addUserButton"
            onClick={handleClick}
        >
        Modify Existing User
        </Button>
    );
}

  render() {
    return (
      <div>
        
        {!this.state.showModifyUserForm
        ?<this.ModifyUserButton/>
        :
        <this.SelectUser />
        }
        {(this.state.updatedUser.user_id > 0)
          ? <table>
            <UserTableHeader />
            <tbody>
              <this.ModifyUserForm />
            </tbody>

          </table>
          : ""
        }

      </div>

    )
  }
}
export default ModifyUser;