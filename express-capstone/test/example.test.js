process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app.js');
let should = chai.should();


chai.use(chaiHttp);

describe('Example', () => {
    beforeEach((done) => {
            // do something
           done();
        });
    });
  describe('/GET /example ', () => {
      it('it should GET an Example', (done) => {
        chai.request(app)
            .get('/example')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.text.should.eql("an Example");
              done();
            });
      });
      it('it should GET another example', (done) => {
        chai.request(app)
            .get('/example2')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.text.should.eql("another example");
              done();
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
