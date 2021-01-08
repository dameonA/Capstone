process.env.NODE_ENV = 'test';
var express = require('express')
let chai = require('chai');
let chaiHttp = require('chai-http');
//const { db } = jest.mock('../database');
let should = chai.should();
let app = express();
let bodyParser = require('body-parser')
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
let fakeLogin = {
    username:'joe4', 
    user_id: 5,
    password: 'password'
}
let successfulAuthCall = sinon.stub().resolves(fakeLogin);
let successfulUserCall = sinon.stub().resolves(fakeUser);
let failedAuthCall = sinon.stub().rejects();
let failedUserCall = sinon.stub().rejects();

let UserService={
    getUser: successfulUserCall
}
let AuthService = {
    getLoginData: successfulAuthCall
}

chai.use(chaiHttp);

let route = require('../routes/auth')(UserService,AuthService);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(route);

describe('Auth', () => {
    beforeEach((done) => {
            successfulUserCall.resetHistory();
            successfulAuthCall.resetHistory();
             UserService.getUser=successfulUserCall
            AuthService.getLoginData=successfulAuthCall
           done();
        });

  describe('/POST auth', () => {
      it('it should return user object', (done) => {
          chai.request(app)
            .post('/')
            .send(fakeLogin)
            .end((err, res) => {
                res.should.have.status(200);
                sinon.assert.calledOnce(UserService.getUser);
                sinon.assert.calledWith(UserService.getUser,fakeLogin.user_id)
                done();
            })
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
