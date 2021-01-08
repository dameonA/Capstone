const queryUsers = `
SELECT json_build_object(
  'user_id', users.user_id, 
  'first_name',users.first_name,
  'last_name',users.last_name,
  'grade',users.grade,
  'section',users.section,
  'user_group',users.user_group,
  'active',users.active,
  'role', users.user_role, 
  'qualifications',
      (SELECT json_agg(
          json_build_object(
              'qual_id', user_qualifications.qual_id, 
              'in_training',user_qualifications.in_training,
              'is_instructor',user_qualifications.is_instructor,
              'is_evaluator',user_qualifications.is_evaluator
            )
          )
       FROM user_qualifications WHERE users.user_id = user_qualifications.user_id),
  'certifications',
      (SELECT json_agg(json_build_object('cert_id', user_certifications.cert_id))
       FROM user_certifications WHERE users.user_id = user_certifications.user_id)
      
) json
FROM users
`

module.exports.Users = class Users {
    constructor(database) {
        this.db=database;
    }
    async getUser (userId) {
      try {
          return (await this.db.one(queryUsers+' where user_id = $1',userId)).json
      } catch(error) {
        //console.log(error);
        return undefined;
      }
    }

    async getUsers () {
      try {
          return (await this.db.any(queryUsers)).json
      } catch(error) {
        //console.log(error);
        return undefined;
      }
    }
}
