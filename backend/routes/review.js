const router = require('express').Router();
let Review = require('../models/reviewmodel');

router.route('/').post((req,res)=>{
    const obj = {
        username: req.body.username,
        animeId: req.body.id,
        review: req.body.review
    }
    const newReview = new Review(obj); 

    newReview.save()
        .then(()=>res.send('Review Added'));
});

router.route('/getreview').post((req,res)=>{
    const animeId = req.body.id;
    Review.find({animeId: animeId},(err, anime)=>{
        if(anime){
            res.send(anime);
        }else{
            res.send('Username And Password Do Not Match');
        }
    });
});

module.exports = router;