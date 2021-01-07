process.env.NODE_ENV = 'test';
var express = require('express')
let chai = require('chai');
let chaiHttp = require('chai-http');
//const { db } = jest.mock('../database');
let should = chai.should();
let app = express();
var sinon = require('sinon');

let fakeNotification={
 id: 1, comment:"hey buddy, come see us"
}
let successfulNotificationCall = sinon.stub().resolves([fakeNotification]);
let failedNotificationCall = sinon.stub().rejects();

let NotificationService={
    markRead:successfulNotificationCall,
    archive:successfulNotificationCall
}

chai.use(chaiHttp);

let route = require('../routes/notifications')(NotificationService);
app.use(route);

describe('Notification', () => {
    beforeEach((done) => {
            successfulNotificationCall.resetHistory();
            failedNotificationCall.resetHistory();
            NotificationService.markRead = successfulNotificationCall;
            NotificationService.archive = successfulNotificationCall;
           done();
        });

  
  describe('/POST /:id/read ', () => {
    it('it should use the Notification service to mark it read', (done) => {
        chai.request(app)
            .post('/1/read')
            .end((err, res) => {
                res.should.have.status(200);
                sinon.assert.calledOnce(NotificationService.markRead);
                res.body.should.eql(fakeNotification)
                done();
            });
    });
    it('it should return an empty object if the notification service rejects', (done) => {
        NotificationService.markRead=failedNotificationCall;
      chai.request(app)
          .post('/1/read')
          .end((err, res) => {
              res.should.have.status(200);
              sinon.assert.calledOnce(failedNotificationCall);
              res.body.should.eql({})
              done();
          });
      });
});
describe('/POST /:id/archive ', () => {
    it('it should use the Notification service to mark it archived', (done) => {
        chai.request(app)
            .post('/1/archive')
            .end((err, res) => {
                res.should.have.status(200);
                sinon.assert.calledOnce(successfulNotificationCall);
                res.body.should.eql(fakeNotification)
                done();
            });
    });
    it('it should return an empty object if the notification service rejects', (done) => {
        NotificationService.archive=failedNotificationCall;
      chai.request(app)
          .post('/1/archive')
          .end((err, res) => {
              res.should.have.status(200);
              sinon.assert.calledOnce(failedNotificationCall);
              res.body.should.eql({})
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
