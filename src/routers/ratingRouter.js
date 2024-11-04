const express = require('express')
const ratingController = require("../controller/ratingController")

const route = express.Router()


route.get('/get-ratings/:movieSlug', ratingController.getRatings)
route.post('/add-rating', ratingController.addRating)

module.exports = route
