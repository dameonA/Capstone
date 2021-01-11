const { response } = require("express");
const bodyParser = require("body-parser");
var express = require("express");
var ConflictService;
var router = express.Router()

router.get('', function (req, response) {
    var conflict = ConflictService.getConflicts()
    .then(ret => response.send(ret))
    .catch(ret => response.send([ ]));
});

router.get('/:id', function(req, response, next) {
    let conflictTypeId = Number.parseInt(req.params.id);
    if(!isNaN(conflictTypeId)) {
        var conflicts = ConflictService.getConflicts(conflictTypeId)
        .then(ret => response.send(ret))
        .catch(ret => response.send("{ }"));
    }
    else {
        next()
    }
})

router.post('', function (req, response) {
    var conflict = req.body;
    console.log(conflict);
    ConflictService.postConflicts(conflict)
    .then(ret => response.send("Conflict added!"))
    .catch(ret => response.send("Conflict not submitted."));
})//This is a basic POST test to check if I know what I'm doing

module.exports = function(conflictService) {
    ConflictService = conflictService;
    //do as you wish
    //this runs in background, not on each request

    return router;
}