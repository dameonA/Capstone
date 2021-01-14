var express = require('express');
const { Auth } = require('../services/auth');
var UserService;
var AuthService;
var router = express.Router()

router.post('', function (req, res) {
  let loginData = req.body;
  if (loginData.username && loginData.password) {
    AuthService.getLoginData(loginData.username).then(authData=>{
      //console.log(authData);
      UserService.getUser(authData.user_id).then(user=>{
        console.log(user);
        res.send(user);
      }).catch((err)=>{console.log(err);res.sendStatus(500)});
    }).catch(()=>res.sendStatus(403))
  }else{
    res.sendStatus(400)
  }

})

module.exports = function(userService, authService){
  UserService=userService;
  AuthService=authService;
  // do as you wish
  // this runs in background, not on each
  // request

  return router;
}