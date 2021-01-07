var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var Database = require('../services/database').database
var sinon = require('sinon');
//const pgp = require('pg-promise')();
var fs = require('fs')

describe('Database Service', () => {
    beforeEach((done) => {
        done();
        });

    it('should walk the files when initdb is called', async function(){
        db = new Database();
        let stubcall = sinon.stub().resolves(1);
        db.db = {any:stubcall};
        let dir = "./";
        fs.writeFileSync('./test.sql', 'SELECT * FROM table');
        let ret = await db.initDB(dir);
        sinon.assert.calledOnce(stubcall);
        fs.unlinkSync('./test.sql');
    });
});

