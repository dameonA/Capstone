const { response } = require("express");
var express = require("express")
var ConflictService;
var router = express.Router()

router.get('', function (request, response) {
    var conflicts = ConflictService.getConflicts()
})

module.exports = function(conflictService) {
    ConflictService = conflictService;

    return router;
}