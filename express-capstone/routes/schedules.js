var express = require('express')
var ScheduleService;
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


module.exports = function(scheduleService){
  ScheduleService=scheduleService;


  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}