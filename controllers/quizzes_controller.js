const express = require('express')
const router = express.Router()

// models
const Quiz = require('../models/quiz')

// routes
router.get('/', (req, res) => {
    Quiz    
        .findAll()
        .then(quizzes => res.json(quizzes))
})

module.exports = router