
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app.js');
let Database = require('../services/database').database
let should = chai.should();
let sinon = require('sinon');

chai.use(chaiHttp);

describe('App test', () => {
    beforeEach((done) => {
            // do something
           done();
        });
    });
    it('should respond with success initdb endpoint is reached',(done)=>{
        sinon.stub(Database.prototype, "initDB").resolves(5);
        chai.request(app)
            .get('/initdb')
            .end((err, res) => {
                  Database.prototype.initDB.restore();
                  res.should.have.status(200);
                  res.text.should.eql("success");
              done();
            })
    });
    it('should respond with status code 500 if initdb rejects',(done)=>{
        sinon.stub(Database.prototype, "initDB").resolves(5).rejects(5);
        chai.request(app)
            .get('/initdb')
            .end((err, res) => {
                Database.prototype.initDB.restore();
                res.should.have.status(500);
                done();
            });
    });