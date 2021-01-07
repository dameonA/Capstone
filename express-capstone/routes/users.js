var express = require('express')
// var UserService = require('../services/user')
// var NotificationService = require('../services/notifications')
var UserService;
var NotificationService;
var router = express.Router()

router.get('', function (req, res) {
    var users = UserService.getUsers()
    .then(ret=>res.send(ret))
    .catch(ret=>res.send([ ]));
})

router.get('/:id', function (req, res) {
  let userId = Number.parseInt(req.params.id);
  if (!isNaN(userId)) {
    var user = UserService.getUser(userId)
    .then(ret=>res.send(ret))
    .catch(ret=>res.send("{ }"));
  }else {
    res.send("{ }")
  }
})


router.get('/:id/notifications', async function (req, res) {
  let userId = Number.parseInt(req.params.id);
  UserService.getUser(userId).then(user=>{
    NotificationService.getNotifications(user.user_id, user.user_role)
    .then(notifs=>{
      //console.log("success");
      res.send(notifs);
    })
    .catch(err=>{
      //console.log(err);
      res.send([]);
    })
  })
  .catch(err=>{
    //console.log(err);
    res.send([]);
  })
})



module.exports = function(userService, notificationService){
  UserService=userService;
  NotificationService=notificationService;

  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}