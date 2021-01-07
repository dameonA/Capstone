var express = require('express')
// var UserService = require('../services/user')
// var NotificationService = require('../services/notifications')
var NotificationService;
var router = express.Router()

// router.get('/:id', function (req, res) {
//   let notificationId = Number.parseInt(req.params.id);
//   if (!isNaN(notificationId)) {
//     var user = NotificationService.getNotification(notificationId)
//     .then(ret=>res.send(ret))
//     .catch(ret=>res.send("{ }"));
//   }else {
//     res.send("{ }")
//   }
// })


router.post('/:id/read', async function (req, res) {
  let notificationId = Number.parseInt(req.params.id);
  NotificationService.markRead(notificationId)
    .then((notif)=>{
      if (Array.isArray(notif) && notif.length > 0)
        res.send(notif[0]);
      else
        res.send({})
    })
    .catch(err=>{
//      console.log(err);
      res.send({ });
    })
})

router.post('/:id/archive', async function (req, res) {
    let notificationId = Number.parseInt(req.params.id);
    NotificationService.archive(notificationId)
      .then(notif=>{
        if (Array.isArray(notif) && notif.length > 0)
          res.send(notif[0]);
        else
          res.send({ })
      })
      .catch(err=>{
        //console.log(err);
        res.send({ });
      })
  })

module.exports = function(notificationService){
  NotificationService=notificationService;

  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}