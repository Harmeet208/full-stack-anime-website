const router = require('express').Router();
let User = require('../models/usermodel');

router.route('/').post((req,res)=>{
    const obj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const newUser = new User(obj); 

    newUser.save()
        .then(()=>res.json('User Added'))
        .catch((err)=>res.status(400).json(err));
});

module.exports = router;