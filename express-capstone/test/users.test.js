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
let fakeNotifications=[
 
]
let successfulUserCall = sinon.stub().resolves(fakeUser);
let failedUserCall = sinon.stub().resolves(1).rejects();
let successfulNotificationCall = sinon.stub().resolves(fakeNotifications);
let failedNotificationCall = sinon.stub().resolves(1).rejects();

let UserService={
    getUser: successfulUserCall
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
            UserService.getUser = successfulUserCall;
            NotificationService.getNotifications = successfulNotificationCall;
           done();
        });

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
        it('it should return an empty object if provided invalid user id', (done) => {
            UserService.getUser=failedUserCall;
          chai.request(app)
              .get('/seven')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.eql({})
                  done();
              });
          });

    //   it('it should GET another example', (done) => {
    //     chai.request(app)
    //         .get('/example2')
    //         .end((err, res) => {
    //               res.should.have.status(200);
    //               res.text.should.eql("another example");
    //           done();
    //         });
    //   });
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
  /*
  * Test the /POST route
  */
//   describe('/POST book', () => {
//       it('it should not POST a book without pages field', (done) => {
//           let book = {
//               title: "The Lord of the Rings",
//               author: "J.R.R. Tolkien",
//               year: 1954
//           }
//         chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('errors');
//                   res.body.errors.should.have.property('pages');
//                   res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });

//   });
