var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var NotificationService = require('../services/notifications').Notifications
var sinon = require('sinon');
const pgp = require('pg-promise')();

let fakeNotifications=[
 "A Thing",
 "Another Thing"
]
fakeGetNotifs = sinon.stub().resolves(fakeNotifications);
let fakeDB = {
    manyOrNone: fakeGetNotifs,
    any: fakeGetNotifs
}

describe('NotificationService', () => {
    beforeEach((done) => {
        fakeGetNotifs.resetHistory();
        done();
        });

    it('should return an array of mocked db data', async function(){
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.getNotifications(1,2);
        sinon.assert.calledOnce(fakeGetNotifs);
        //fragile test
        sinon.assert.calledWith(fakeGetNotifs, sinon.match.any, [1,2])
        expect(data).to.eql(fakeNotifications);
    });
    it('should return an empty array if failing to connect with DB', async function(){
        fakeGetNotifs.rejects();
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.getNotifications(1,2);
        expect(data).to.eql([]);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });

});

