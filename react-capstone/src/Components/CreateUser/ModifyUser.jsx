import React from 'react'
import UserTableHeader from './UserHeader'

class ModifyUser extends React.Component {
  constructor(props) {
    super(props) //api <router api>, users <object of all users>, static <static tables>
    this.state = {
      // updatedUser: this.props.users[0],
      newUserQualifications: [],
      newUserCertifications: [],
      // grades: [],
      // crews: [],
      // flights: [],
      // roles: [],
      // qualifications: [],
      // certifications: [],
      levels: ['None', 'Training', 'Instructor', 'Evaluator'],
      // updatedUserId: 1           
    };
  }

  SubmitUpdatedUser = async () => {
    await fetch(this.props.api + 'users/update',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.updatedUser)
      })
    this.SubmitUpdatedUserQualifications();
    this.SubmitUpdatedUserCertifications();
    this.setState({ updatedUser: null });

  }

  SubmitUpdatedUserQualifications = () => {
    this.setState({ newUserQualifications: { user_id: this.state.updatedUser.user_id } });
    console.log('quals: ' + this.state.newUserQualifications)
  }

  SubmitUpdatedUserCertifications = () => {
    this.setState({ newUserCertifications: { user_id: this.state.updatedUser.user_id } });
    console.log('certs: ' + this.state.newUserCertifications);
  }

  SelectUser = () => {

    const handleChange = (event) => {
      let tempId = Number.parseInt(event.target.value);
      let index = this.props.users.findIndex(user => user.user_id === tempId)
      let tempUser = this.props.users[index]
      this.setState(previousState => ({
        ...previousState,
        updatedUser: tempUser,
        newUserCertifications: tempUser.certifications,
        newUserQualifications: tempUser.qualifications
      }))
      // this.ModifyUserForm();
    }

    return (
      <select id="selectedUser" onChange={handleChange}>
        {(!this.state.updatedUser)
        ? <option id='selectedUser' value='Select User' selected disabled hidden>Select User</option>
        : <option id='selectedUser' value='Select User'>{this.state.updatedUser.last_name}, {this.state.updatedUser.first_name} {this.state.updatedUser.grade}</option> 
        }
        
        {this.props.users.map(user => <option id="selectedUser" value={user.user_id}>{user.last_name}, {user.first_name} {user.grade}</option>)}
      </select>
    )

  }

  SelectActiveUsers = () =>{

    const handleChange = () => {

    }

    return (
      <form>
        <label>
          <input
            type='radio'
            value='all'
            checked={this.state.activeUserSelection === 'all'}
            onChange={handleChange()}
            />
            All
          </label>
        <label>
          <input
            type='radio'
            value='active'
            checked={this.state.activeUserSelection === 'active'}
            onChange={handleChange()}
          />
            Active
        </label>
        <label>
          <input
            type='radio'
            value='archived'
            checked={this.state.activeUserSelection === 'archived'}
            onChange={handleChange()}
          />
            Active
        </label>
      </form>
    )
  }

  ModifyUserForm = () => {

    // let user = this.state.updatedUser;
    let roleIndex = this.props.static.roles.findIndex(role => this.state.updatedUser.role === role.role_id);
    let role = this.props.static.roles[roleIndex].role_name;
    let qual = 'None';
    let level = 'None';
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
            role: Number.parseInt(event.target.value)
          }
        }));
      }
      if (event.target.id === "qualification") {
        this.setState(previousState => ({
          newUserQualifications: {
            ...previousState.newUserQualifications,
            qual_id: Number.parseInt(event.target.value)
          }
        }));
      }

      if (event.target.id === "level") {
        let training = false;
        let evaluator = false;
        let instructor = false;

        if (event.target.value === 'Training') {
          training = true;
        }
        if (event.target.value === 'Instructor') {
          instructor = true;
        }
        if (event.target.value === 'Evaluator') {
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
            cert_id: Number.parseInt(event.target.value)
          }
        }));
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
          <select id="qualification" onChange={handleChange}>
            <option value={qual} selected disabled hidden>{qual}</option>
            {this.props.static.qualifications.map(qualification => <option id="qualification" value={qualification.qual_id}> {qualification.qual_name} </option>)}
          </select>
          <select id="level" onChange={handleChange}>
            {this.state.levels.map(level => <option id="level" value={level}> {level} </option>)}
          </select>
        </td>
        <td>
          <select id="certification" onChange={handleChange}>
            <option value={cert} selected disabled hidden>{cert}</option>
            {this.props.static.certifications.map(certification => <option id="certification" value={certification.cert_id}> {certification.cert_name} </option>)}
          </select>
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
        <td> <button onClick={this.SubmitUpdatedUser} value="Update User">Update User</button>  </td>

      </tr>
    )
  }



  render() {
    return (
      <div>
        <h2>Modify User <this.SelectUser /><this.SelectActiveUsers /></h2>
        {(this.state.updatedUser)
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