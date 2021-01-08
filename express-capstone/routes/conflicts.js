const { response } = require("express");
var express = require("express")
var ConflictService;
var router = express.Router()

router.get('/conflicts', function (request, response) {
    var conflicts = ConflictService.getConflicts()
    .then(ret => response.send(ret))
    .catch(ret => response.send([ ]));
})

router.post('/conflicts/:id', function (request, response) {

})

module.exports = function(conflictService) {
    ConflictService = conflictService;

    return router;
}