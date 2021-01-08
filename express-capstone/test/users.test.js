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

let fakeNotifications=[
 
]

let successfulUserCall = sinon.stub().resolves(fakeUser);
let successfulUsersCall = sinon.stub().resolves(fakeUsers);
let failedUserCall = sinon.stub().resolves(1).rejects();
let failedUsersCall = sinon.stub().rejects();
let successfulNotificationCall = sinon.stub().resolves(fakeNotifications);
let failedNotificationCall = sinon.stub().resolves(1).rejects();

let UserService={
    getUser: successfulUserCall,
    getUsers: successfulUsersCall
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
  
