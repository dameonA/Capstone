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
FROM users 
`

module.exports.Users = class Users {
  constructor(database) {
    this.db = database;
  }
  async getUser(userId) {
    //console.log(queryUsers + ' where user_id = '+userId)
    try {
      let user = (await this.db.one(queryUsers + ' where user_id = $1', userId)).json
      console.log(user)
      if (user.qualifications === null) {
        user.qualifications=[];
      }
      if (user.certifications === null) {
        user.certifications=[];
      }
      return user;
    } catch (error) {
      console.log(error);
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
      let ret = await this.db.one(
        'INSERT INTO users (first_name, last_name, grade, user_role, section, user_group, active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [firstName, lastName, grade, userRole, section, userGroup, active])
        if (Array.isArray(user.qualifications)) {
          //let qualifications = await this.getQualifications();
          for (let qIndex = 0; qIndex < user.qualifications.length; qIndex++) {
            let qual = user.qualifications[qIndex];
            if (qual) {
              try {
                await this.db.one('INSERT INTO user_qualifications (user_id,qual_id,is_evaluator,is_instructor, in_training) VALUES ($1,$2,$3,$4,$5)',[ret.user_id,qual.qual_id,qual.is_evaluator||false,qual.is_instructor||false,qual.in_training||false])
              } catch (ignored) {}
            }
          }
        }
        if (Array.isArray(user.certifications)) {
          //let certifications = await this.getCertifications();
          for (let cIndex = 0; cIndex < user.certifications.length; cIndex++) {
            let cert = user.certifications[cIndex];
            if (cert) {
              try {
                await this.db.one('INSERT INTO user_certifications (user_id,cert_id) VALUES ($1,$2)',[ret.user_id,cert.cert_id])
              } catch (ignored) {}
            }
          }
        }
        return await this.getUser(ret.user_id);
    } catch (error) {
      return {};
    }
  }

   updateUser = async (user) => {
    let userId = user.user_id;
    let firstName = user.first_name;
    let lastName = user.last_name;
    let grade = user.grade;
    let userRole = user.user_role;
    let section = user.section;
    let userGroup = user.user_group;
    let active = user.active;

    console.log('user passed into function: ',user)
    //update the existing user data
    try {
      await this.db.one(
        'UPDATE users SET first_name=$1, last_name=$2, grade=$3, user_role=$4, section=$5, user_group=$6, active=$7 WHERE user_id=$8 RETURNING *',
        [firstName, lastName, grade, userRole, section, userGroup, active, userId])
    } catch (error) {
      return error
    }   
    
    //update the quals 
    try {
      //delete existing quals associated with current user_id
      await this.db.any('DELETE FROM user_qualifications where user_id=$1', [userId]);
      // check to see if there are valid quals and loop through each with an INSERT
      if (Array.isArray(user.qualifications)) {
        console.log('In the quals array checker')
        for (let qIndex = 0; qIndex < user.qualifications.length; qIndex++) {
          console.log('iterating quals: ' + qIndex)
          let qual = user.qualifications[qIndex];
          if (qual) {
            try {
              await this.db.one('INSERT INTO user_qualifications (user_id,qual_id,is_evaluator,is_instructor, in_training) VALUES ($1,$2,$3,$4,$5)',[userId,qual.qual_id,qual.is_evaluator||false,qual.is_instructor||false,qual.in_training||false])
            } catch (ignored) {}
          }
        }
      }
    } catch (error) {
      return error
    }

    //update the certifications
    try {
      //delete existing certs associated with current user_id before inserting new ones
      await this.db.any('DELETE FROM user_certifications where user_id=$1', [userId])
      // check to see if there are valid quals and loop through each with an INSERT
      if (Array.isArray(user.certifications)) {
        for (let cIndex = 0; cIndex < user.certifications.length; cIndex++) {
          let cert = user.certifications[cIndex];
          if (cert) {
            try {
              await this.db.one('INSERT INTO user_certifications (user_id,cert_id) VALUES ($1,$2)',[userId,cert.cert_id])
            } catch (ignored) {}
          }
        }
      }
    } catch (error) {
      return error
    }
    //return the user join with quals and certs
    try {
      return await this.getUser(ret.user_id);
    } catch (error) {
      return {};
    }
  }

  async getUsers() {
    try {
      return (await this.db.any(queryUsers+' ORDER BY last_name')).map(e => e.json).map(u=>{
        return {...u,
          qualifications:(u.qualifications===null)?[]:u.qualifications,
          certifications:(u.certifications===null)?[]:u.certifications,
        }
      })
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