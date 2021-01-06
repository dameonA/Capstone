var express = require('express')
var router = express.Router()
var db = null;
// define the home page route
router.get('/:id', function (req, res) {
  let userId = Number.parseInt(req.params.id);
  if (!isNaN(userId)) {
    db.one('select * from users where user_id = $1',userId)
    .then(ret=>res.send(ret))
    .catch(ret=>res.send("{ }"))
  }else {
    res.send("{ }")
  }
  //res.send('an Example')
})
// define the about route
router.get('/:id/notifications', async function (req, res) {
  let userId = Number.parseInt(req.params.id);
  let user = undefined;
  if (!isNaN(userId)) {
     user = await getUser(userId);
  }
  if (user) {
    let notifs = await db.any('select * from notification where userid = $1 or role_id = $2;',[userId,user.user_role]);
    res.send(notifs);
  }
  else {
    res.send([]);
  }

})

getUser = async (userId) => {
  try {
  return await db.oneOrNone('select * from users where user_id = $1',userId)
  } catch(error) {
    console.log(error);
    return undefined;
  }
}

module.exports = function(database){
  db = database;
  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}