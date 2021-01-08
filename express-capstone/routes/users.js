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

router.get('/:id', function (req, res, next) {
  let userId = Number.parseInt(req.params.id);
  if (!isNaN(userId)) {
    var user = UserService.getUser(userId)
    .then(ret=>res.send(ret))
    .catch(ret=>res.send("{ }"));
  }else {next()}
})

router.get('/roles', function (req, res) {
  var users = UserService.getRoles()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([ ]));
})

router.get('/usergroups', function (req, res) {
  var users = UserService.getUserGroups()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([ ]));
})

router.get('/sections', function (req, res) {
  var users = UserService.getSections()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([ ]));
})

router.get('/certifications', function (req, res) {
  var users = UserService.getCertifications()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([ ]));
})

router.get('/qualifications', function (req, res) {
  var users = UserService.getQualifications()
  .then(ret=>res.send(ret))
  .catch(ret=>res.send([ ]));
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