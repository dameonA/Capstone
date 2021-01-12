const queryUsers = `
SELECT json_build_object(
  'user_id', users.user_id, 
  'first_name',users.first_name,
  'last_name',users.last_name,
  'grade',users.grade,
  'section',users.section,
  'user_group',users.user_group,
  'active',users.active,
  'user_role', users.user_role, 
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
FROM users ORDER BY last_name 
`

module.exports.Users = class Users {
  constructor(database) {
    this.db = database;
  }
  async getUser(userId) {
    try {
      return (await this.db.one(queryUsers + ' where user_id = $1', userId)).json
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  }

  async postUser(user) {
    let firstName = user.first_name;
    let lastName = user.last_name;
    let grade = user.grade;
    let userRole = user.user_role;
    let section = user.section;
    let userGroup = user.user_group;
    let active = user.active;
    try {
      return await this.db.one(
        'INSERT INTO users (first_name, last_name, grade, user_role, section, user_group, active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [firstName, lastName, grade, userRole, section, userGroup, active])
    } catch (error) {
      return {};
    }
  }

  async updateUser(user) {
    let userId = user.user_id;
    let firstName = user.first_name;
    let lastName = user.last_name;
    let grade = user.grade;
    let userRole = user.user_role;
    let section = user.section;
    let userGroup = user.user_group;
    let active = user.active;
    try {
      return await this.db.one(
        'UPDATE users SET first_name=$1, last_name=$2, grade=$3, user_role=$4, section=$5, user_group=$6, active=$7 WHERE user_id=$8 RETURNING *',
        [firstName, lastName, grade, userRole, section, userGroup, active, userId])
    } catch (error) {
      return {};
    }
  }

  async getUsers() {
    try {
      return (await this.db.any(queryUsers)).map(e => e.json)
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  }

  async getUserGroups() {
    try {
      return await this.db.any('SELECT * FROM usergroups')
    } catch (error) {
      return undefined;
    }
  }

  async getSections() {
    try {
      return await this.db.any('SELECT * FROM sections')
    } catch (error) {
      return undefined;
    }
  }

  async getCertifications() {
    try {
      return await this.db.any('SELECT * FROM certifications')
    } catch (error) {
      return undefined;
    }
  }

  async postCertification(userId, certs) {//expects an array of cert objects
    await certs.map(async (cert) => {
      if (cert && cert > 0) {
        try {
          await this.db.one('INSERT INTO user_certifications (user_id, cert_id) VALUES ($1, $2)', [userId, cert])
        } catch (error) {
          return null;
        }
      }
    })
  }
  
  async updateCertifications(userId, certs) {//expects an array of cert objects
    try {
      await this.db.any('DELETE FROM user_certifications where user_id=$1', [userId]);
      await this.postCertification(userId, certs);
    } catch (error) {
      console.log(error)
      return [];
    } 

  }
  

  async getQualifications() {
    try {
      return await this.db.any('SELECT * FROM qualifications')
    } catch (error) {
      return undefined;
    }
  }

  async postQualification(userId, quals) {//expects an array of qual objects
    quals.forEach(async (qual) => {
      let qualId = qual.qual_id;
      let inTraining = qual.in_training;
      let isInstructor = qual.is_instructor;
      let isEvaluator = qual.is_evaluator;
      if (qualId && qualId > 0) {
        try {
          await this.db.any('INSERT INTO user_qualifications (user_id, qual_id, in_training, is_instructor, is_evaluator) VALUES ($1, $2, $3, $4, $5)', [userId, qualId, inTraining, isInstructor, isEvaluator])
        } catch (error) {
          console.log(error)
          return {};
        }
      }

    });
  }  

  async getRoles() {
    try {
      return await this.db.any('SELECT * FROM roles')
    } catch (error) {
      return undefined;
    }
  }
}