var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var UserService = require('../services/users').Users
var sinon = require('sinon');
const pgp = require('pg-promise')();

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

let fakeDB = {
    manyOrNone: sinon.stub().resolves([{user_id: 3}]),
    any: sinon.stub().resolves([{user_id: 1},{user_id: 2},{user_id: 3}]),
    one: sinon.stub().resolves({user_id: 3})
    
}

let fakeUsergroups = [{group_id: 6, group_name: 'Yellow'}, {group_id: 9, group_name: 'Purple'}]
let fakeSections = [{section_id: 7, section_name: 'Banana'}, {section_id: 10, section_name: 'Apple'}]
let fakeCerts = [{cert_id: 8, cert_name: 'IOU'}, {cert_id: 11, cert_name: 'Money'}]
let fakeQuals = [{qual_id: 9, qual_name: 'Ford'}, {qual_id: 12, qual_name: 'Chevy'}]
let fakeRoles = [{role_id: 10, role_name: 'Boeing'}, {role_id: 13, role_name: 'Airbus'}]


describe('UserService', () => {
    beforeEach((done) => {
        fakeDB.one.resetHistory();
        fakeDB.any.resetHistory();
        fakeDB.manyOrNone.resetHistory();
        done();
        });

    it('should return a mocked db entry', async function(){
        userService = new UserService(fakeDB);
        data = await userService.getUser(3);
        sinon.assert.calledOnce(fakeDB.one);
        expect(data).to.eql({user_id: 3});
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return undefined failing to access the database', async function(){
        fakeDB.one.rejects();
        userService = new UserService(fakeDB);
        data = await userService.getUser(3);
        expect(data).to.eql(undefined);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for all Users', async function(){
        fakeDb.any = sinon.stub().resolves(fakeUsers);
        userService = new UserService(fakeDB);
        data = await userService.getUsers();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeUsers);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for Sections', async function(){
        fakeDb.any = sinon.stub().resolves(fakeSections);
        userService = new UserService(fakeDB);
        data = await userService.getSections();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeSections);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for Certifications', async function(){
        fakeDb.any = sinon.stub().resolves(fakeCerts);
        userService = new UserService(fakeDB);
        data = await userService.getCertifications();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeCerts);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for Usergroups', async function(){
        fakeDb.any = sinon.stub().resolves(fakeUsergroups);
        userService = new UserService(fakeDB);
        data = await userService.getUserGroups();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeUserGroups);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for Quals', async function(){
        fakeDb.any = sinon.stub().resolves(fakeQuals);
        userService = new UserService(fakeDB);
        data = await userService.getQualifications();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeQuals);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return a mocked db array for Roles', async function(){
        fakeDb.any = sinon.stub().resolves(fakeRoles);
        userService = new UserService(fakeDB);
        data = await userService.getRoles();
        sinon.assert.calledOnce(fakeDB.any);
        expect(data).to.eql(fakeRoles);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });

});

