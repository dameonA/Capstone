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

router.all('/autoschedule',async(req,res)=>{
  AutoScheduleService.autoschedule2week(new Date("2021-01-18 08:00:00+00")).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
})

router.all('/reschedule',async(req,res)=>{
  if (req.body.schedule_id) {
    AutoScheduleService.autoschedule1(req.body).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));;
  }else{
    res.send("failed")
  }
  //AutoScheduleService.autoschedule2week(new Date("2021-01-21 20:00:00+00")).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
})

router.all('/resolve',async(req,res)=>{
  AutoScheduleService.resolve().then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
  //AutoScheduleService.autoschedule2week(new Date("2021-01-21 20:00:00+00")).then(r=>res.send("success")).catch(c=>res.status(500).send("failed"));
})
router.all('/clear',async(req,res)=>{
  ScheduleService.clearSchedule().then(r=>res.send("success")).catch(r=>res.send("error"));
})
module.exports = function(scheduleService,autoScheduleService){
  ScheduleService=scheduleService;
  AutoScheduleService=autoScheduleService

  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}