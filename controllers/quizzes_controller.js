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

router.post('/', (req, res) => {
    const question = req.body.question
    const answer_a = req.body.answer_a
    const answer_b = req.body.answer_b
    const answer_c = req.body.answer_c
    const answer_d = req.body.answer_d
    const correct_answer = req.body.correct_answer
  
    Quiz
      .create(question, answer_a, answer_b, answer_c, answer_d, correct_answer)
      .then(quiz => res.json(quiz))
  })
  router.delete('/:id', (req, res) => {
    const quizId = req.params.id
  
    Quiz
      .delete(quizId)
      .then(() => res.json({ message: 'deleted successfully' }))
  })
module.exports = router