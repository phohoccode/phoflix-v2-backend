const express = require('express')
const commentController = require("../controller/commentController")

const route = express.Router()

route.get('/get-comments/:movieSlug', commentController.getComments)
route.post('/add-comment', commentController.addComment)
route.post('/delete-comment', commentController.deleteComment)
route.post('/update-comment', commentController.updateComment)

module.exports = route
