const { response } = require("express");
const bodyParser = require("body-parser");
var express = require("express");
const { dateRangeIntersects } = require("../services/utils");
const {parseISO}=require('date-fns');
var ConflictService;
var ScheduleService;
var NotificationService;
var router = express.Router()

router.get('', function (req, response) {
    var conflict = ConflictService.getConflicts()
    .then(ret => response.send(ret))
    .catch(ret => response.send([ ]));
});

router.get('/types', function(req, response) {
    var conflict = ConflictService.getConflictTypes()
    .then(ret => response.send(ret))
    .catch(ret => response.send([ ])); 
})

router.get('/:id', function(req, response, next) {
    let conflictTypeId = Number.parseInt(req.params.id);
    if(!isNaN(conflictTypeId)) {
        var conflicts = ConflictService.getConflict(conflictTypeId)
        .then(ret => response.send(ret))
        .catch(ret => response.send("{ }"));
    }
    else {
        next()
    }
})

router.post('', function (req, response) {
    var conflict = req.body;
    ConflictService.postConflicts(conflict)
    .then(async ret => {
        let sched = (await ScheduleService.getSchedule()).filter(s=>s.user_id===conflict.user_id)
        let conflicted_schedule = sched.filter(s=>dateRangeIntersects(s.start_time,s.stop_time,parseISO(conflict.start_time), parseISO(conflict.stop_time)));
        //console.log(parseISO(conflict.start_time), parseISO(conflict.stop_time))
        conflicted_schedule.forEach((s)=>{
            //console.log(s,conflict);
            NotificationService.postNotification({role_id:2,type_notify:2,comment:"Schedule conflict on "+s.start_time});
        });
        response.send("Conflict added!")

    })
    .catch(ret => response.send("Conflict not submitted."));
})//This is a basic POST test to check if I know what I'm doing

module.exports = function(conflictService,scheduleService,notificationService) {
    ConflictService = conflictService;
    ScheduleService=scheduleService;
    NotificationService=notificationService;

    return router;
}