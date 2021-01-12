process.env.NODE_ENV = 'test';
var express = require("express")
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let app = express;
var sinon = require("sinon");
const { response } = require("express");
const { it } = require("date-fns/locale");

let fakeConflict = {
    "conflict_id": -1,
    "conflict_type_id": 2,
    "start_time": 1300,
    "stop_time": 0300,
    "comment": "this is the way",
    "schedule_id": 3
}

let fakeConflict2 = {
    "conflict_id": -2,
    "conflict_type_id": 3,
    "start_time": 1400,
    "stop_time": 0400,
    "comment": "resol'nare",
    "schedule_id": 4 
}

let fakeConflicts = [fakeConflict, fakeConflict2];

let successfulConflictCall = sinon.stub().resolves(fakeConflict);
let successfulConflictsCall = sinon.stub().resolves(fakeConflicts);
let failedConflictCall = sinon.stub().resolves(1).rejects();
let failedConflictsCall = sinon.stub().rejects();

let ConflictService = {
    getConflicts: successfulConflictsCall,
    getConflict: successfulConflictCall
}

chai.use(chaiHttp);

let route = require('../routes/conflicts')(ConflictService);
app.use(route);

describe('Conflicts', () => {
    beforeEach((done) => {
        ConflictService.getConflict = successfulConflictCall;
        ConflictService.getConflicts = successfulConflictsCall;
        done();
    });

    describe('/GET /Conflicts', () => {
        it('it should GET all conflicts', (done) => {
            chai.request(app)
                .get('/')
                .end((error, response) => {
                    response.should.have.status(200);
                    sinon.assert.calledOnce(ConflictService.getConflicts);
                    done();
                })
        });
        it('it should return an empty array if the service rejects', (done) => {
            ConflictService.getConflicts = failedConflictsCall;
        chai.request(app)
            .get('/')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.eql([])
                done();
            });
        });
        it('it should return an array of conflict objects in the database', (done) => {
            chai.request(app)
                .get('/')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.eql(fakeConflicts);
                    done();
                })
        })
    })

    describe('/GET /:id', () => {
        it('it should GET all the conflicts based on conflict type', (done) => {
            chai.request(app)
                .get('/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    sinon.assert.calledOnce(ConflictService.getConflict);
                    done();
                });
        });
        it('it should return an empty object if the service rejects', (done) => {
            ConflictService.getConflict = failedConflictCall;
        chai.request(app)
            .get('/1')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.eql([])
                done();
            });
        });
    })
})