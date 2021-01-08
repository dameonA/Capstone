var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var UserService = require('../services/users').Users
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

let fakeUsers = [{json:fakeUser}, {json:fakeUser2}];

describe('UserService', () => {
    beforeEach((done) => {
        done();
        });

    it('should return a mocked db entry', async function(){
        let one = sinon.stub().resolves({json:fakeUser})
        let userService = new UserService({one:one});
        let data = await userService.getUser(3);
        sinon.assert.calledOnce(one);
        expect(data).to.eql(fakeUser);

    });
    it('should return undefined failing to access the database', async function(){
        let one = sinon.stub().rejects();
        let userService = new UserService({one:one});
        let data = await userService.getUser(3);
        expect(data).to.eql(undefined);

    });
    it('should return a mocked db array', async function(){
        let any = sinon.stub().resolves(fakeUsers);
        let userService = new UserService({any:any});
        let data = await userService.getUsers();
        sinon.assert.calledOnce(any);
        expect(data).to.eql([fakeUser,fakeUser2]);
    });

});

