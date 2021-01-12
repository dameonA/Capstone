import axios from "axios";

const helper = {
  getAllSchedule() {
    return axios.get("/schedule");
  },
  getCurrentUser() {
    return axios.get("/user");
  },
  getEmployee(id) {
    return axios.get("/getEmployee/" + id);
  },
  getEmpSchedules() {
    return axios.get('/getEmpSchedules')
    .then((response) => {
        return response;
    })
  },

}
export default helper;