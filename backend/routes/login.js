const router = require('express').Router();
let User = require('../models/usermodel');

router.route('/').post((req,res)=>{
    const {username, password} = req.body;
    User.findOne({username: username}, (err, user)=>{
        if(user){
            if(password == user.password){
                res.send('Login Successfully');
            }else{
                res.send('Username And Password Do Not Match');
            }
        }else if(err){
            res.send('Error');
        }else{
            res.send('Username And Password Do Not Match');
        }
    });
});

module.exports = router;