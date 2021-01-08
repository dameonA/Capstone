process.env.NODE_ENV = 'test';
var express = require('express')
let chai = require('chai');
let chaiHttp = require('chai-http');
//const { db } = jest.mock('../database');
let should = chai.should();
let app = express();
var sinon = require('sinon');

let fakeUser= {
    "user_id": -1,
    "first_name": "red",
    "last_name": "green",
    "grade": "tidy",
    "user_role": 100,
    "section": 200,
    "user_group": 300,
    "active": false
}

let fakeUser2 = {
    "user_id": -2,
    "first_name": "blue",
    "last_name": "yellow",
    "grade": "unkempt",
    "user_role": 102,
    "section": 202,
    "user_group": 302,
    "active": true
}

let fakeUsers = [fakeUser, fakeUser2];
let fakeUsergroups = [{group_id: 6, group_name: 'Yellow'}, {group_id: 9, group_name: 'Purple'}]
let fakeSections = [{section_id: 7, section_name: 'Banana'}, {section_id: 10, section_name: 'Apple'}]
let fakeCerts = [{cert_id: 8, cert_name: 'IOU'}, {cert_id: 11, cert_name: 'Money'}]
let fakeQuals = [{qual_id: 9, qual_name: 'Ford'}, {qual_id: 12, qual_name: 'Chevy'}]
let fakeRoles = [{role_id: 10, role_name: 'Boeing'}, {role_id: 13, role_name: 'Airbus'}]

let fakeNotifications=[
 
]

let successfulUserCall = sinon.stub().resolves(fakeUser);
let successfulUsersCall = sinon.stub().resolves(fakeUsers);
let failedUserCall = sinon.stub().resolves(1).rejects();
let failedUsersCall = sinon.stub().rejects();
let successfulNotificationCall = sinon.stub().resolves(fakeNotifications);
let failedNotificationCall = sinon.stub().resolves(1).rejects();
let successfulUsergroupsCall = sinon.stub().resolves(fakeUsergroups);
let failedUsergroupsCall = sinon.stub().resolves(1).rejects();
let successfulSectionsCall = sinon.stub().resolves(fakeSections);
let failedSectionsCall = sinon.stub().resolves(1).rejects();
let successfulCertsCall = sinon.stub().resolves(fakeCerts);
let failedCertsCall = sinon.stub().resolves(1).rejects();
let successfulQualsCall = sinon.stub().resolves(fakeQuals);
let failedQualsCall = sinon.stub().resolves(1).rejects();
let successfulRolesCall = sinon.stub().resolves(fakeRoles);
let failedRolesCall = sinon.stub().resolves(1).rejects();

let UserService={
    getUser: successfulUserCall,
    getUsers: successfulUsersCall,
    getUserGroups: successfulUsergroupsCall,
    getSections: successfulSectionsCall,
    getCertifications: successfulCertsCall,
    getQualifications: successfulQualsCall,
    getRoles: successfulRolesCall
}

let NotificationService={
    getNotifications: successfulNotificationCall
}

chai.use(chaiHttp);

let route = require('../routes/users')(UserService,NotificationService);
app.use(route);

describe('User', () => {
    beforeEach((done) => {
            successfulNotificationCall.resetHistory();
            successfulUserCall.resetHistory();
            successfulUsersCall.resetHistory();
            UserService.getUser = successfulUserCall;
            UserService.getUsers = successfulUsersCall;
            NotificationService.getNotifications = successfulNotificationCall;
           done();
        });

    describe('/GET /UserGroups', () => {
        it('it should GET all user groups', (done) => {
            chai.request(app)
                .get('')
                .end((err, res) => {
                    res.should.have.status(200);
                    sinon.assert.calledOnce(UserService.getUserGroups);
                    done();
                })
        });
        it('it should return an empty array if the service rejects', (done) => {
            UserService.getUserGroups=failedUsersCall;
        chai.request(app)
            .get('')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql([])
                done();
            });
        });  
        it('it should return an array of user objects in the database', (done) => {
            chai.request(app)
                .get('/users/usergroups')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.eql(fakeUsergroups);
                    done();
                })
        })
    }) 

  describe('/GET /users', () => {
      it('it should GET all users', (done) => {
          chai.request(app)
            .get('')
            .end((err, res) => {
                res.should.have.status(200);
                sinon.assert.calledOnce(UserService.getUsers);
                done();
            })
      });
      it('it should return an empty array if the service rejects', (done) => {
        UserService.getUsers=failedUsersCall;
      chai.request(app)
          .get('')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.eql([])
              done();
          });
      });  
      it('it should return an array of user objects in the database', (done) => {
          chai.request(app)
            .get('')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql(fakeUsers);
                done();
            })
      })
  })        

  describe('/GET /:id ', () => {
      it('it should GET a sample user', (done) => {
        chai.request(app)
            .get('/1')
            .end((err, res) => {
                  res.should.have.status(200);
                  sinon.assert.calledOnce(UserService.getUser);
              done();
            });
      });
      it('it should return an empty object if the service rejects', (done) => {
          UserService.getUser=failedUserCall;
        chai.request(app)
            .get('/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql({})
                done();
            });
        });
  });
  describe('/GET /:id/notifications ', () => {
    it('it should use the Notification service to GET a sample notification', (done) => {
        chai.request(app)
            .get('/1/notifications')
            .end((err, res) => {
                res.should.have.status(200);
                sinon.assert.calledOnce(UserService.getUser);
                sinon.assert.calledOnce(NotificationService.getNotifications);
                done();
            });
    });
    it('it should return the sample notification', (done) => {
        chai.request(app)
            .get('/1/notifications')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql(fakeNotifications)
                done();
            });
    });
    it('it should return an empty array if the notification service rejects', (done) => {
        NotificationService.getNotifications=failedNotificationCall;
      chai.request(app)
          .get('/1/notifications')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.eql([])
              done();
          });
      });
      it('it should return an empty array if the user service rejects', (done) => {
        UserService.getUser=failedUserCall;
      chai.request(app)
          .get('/1/notifications')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.eql([])
              done();
          });
      });
  });   
});
  
