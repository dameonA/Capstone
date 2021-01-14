var express = require('express')
var ScheduleService;
var AutoScheduleService;
var router = express.Router()

router.get('', function (req, res) {
    var schedule = ScheduleService.getSchedule()
    .then(ret=>res.send(ret))
    .catch(ret=>res.send([ ]));
})

router.get('/positions', function (req, res) {
  var positions = ScheduleService.getPositions()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([]));
})

router.post('/autoschedule',async(req,res)=>{
  AutoScheduleService.autoschedule2week(Date.now()).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
})

router.post('/conflictresolution',async(req,res)=>{
  //AutoScheduleService.autoschedule2week(new Date("2021-01-21 20:00:00+00")).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
  res.send("success")
})

module.exports = function(scheduleService,autoScheduleService){
  ScheduleService=scheduleService;
  AutoScheduleService=autoScheduleService

  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}