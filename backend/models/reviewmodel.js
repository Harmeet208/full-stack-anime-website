//create model
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    animeId:{
        type: Number
    },
    username:{
        type: String
    },
    review:{
        type: String,
        required: true,
    }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;