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
fakeFailNotifs = sinon.stub().rejects(5);
let fakeDB = {
    manyOrNone: fakeGetNotifs,
    any: fakeGetNotifs
}

describe('NotificationService', () => {
    beforeEach((done) => {
        fakeGetNotifs.resetHistory();
        fakeFailNotifs.resetHistory();
        fakeDB.any=fakeGetNotifs;
        fakeDB.manyOrNone=fakeGetNotifs;
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
        fakeDB.any = fakeFailNotifs;
        fakeDB.manyOrNone = fakeFailNotifs;
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.getNotifications(1,2);
        expect(data).to.eql([]);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return the modified entries when marking read', async function(){
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.markRead(1);
        sinon.assert.calledOnce(fakeGetNotifs);
        expect(data).to.eql(fakeNotifications);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return the modified entries when archiving', async function(){
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.archive(1);
        sinon.assert.calledOnce(fakeGetNotifs);
        expect(data).to.eql(fakeNotifications);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return an empty array when failing to mark read', async function(){
        fakeDB.any = fakeFailNotifs;
        fakeDB.manyOrNone = fakeFailNotifs;
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.markRead(1);
        sinon.assert.calledOnce(fakeFailNotifs);
        expect(data).to.eql([]);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
    it('should return an empty array when failing to archive', async function(){
        fakeDB.any = fakeFailNotifs;
        fakeDB.manyOrNone = fakeFailNotifs;
        notificationService = new NotificationService(fakeDB);
        data = await notificationService.archive(1);
        sinon.assert.calledOnce(fakeFailNotifs);
        expect(data).to.eql([]);
        //assert.equal(isValid, true);
//        expect(isValid).to.be.true;
    });
});

