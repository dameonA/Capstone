var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var AuthService = require('../services/auth').Auth
var sinon = require('sinon');

describe('AuthService', () => {
    beforeEach((done) => {
        done();
        });
    it('should return a mocked db entry', async function(){
        let one = sinon.stub().resolves("FancyPants")
        let authService = new AuthService({one:one});
        let data = await authService.getLoginData(3);
        sinon.assert.calledOnce(one);
        sinon.assert.calledWithMatch(one,sinon.match.any,3)

    });
    it('should return undefined failing to access the database', async function(){
        let one = sinon.stub().rejects();
        let authService = new AuthService({one:one});
        let data = await authService.getLoginData(3);
        expect(data).to.eql(undefined);
    });

});

