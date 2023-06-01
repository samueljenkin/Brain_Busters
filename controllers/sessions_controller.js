const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// models
const User = require('../models/user')

// routes
router.post('/', (req, res) => {
  const { email, password } = req.body

  User
    .findByEmail(email)
    .then(user => {
      if (!user || email == '' || password == '') {
        res.status(400).json({ error: 'email and/or password are incorrSect' })
      } else {
        // using bcrypt to validate the password:
        const isValidPassword = bcrypt.compareSync(password, user.password_digest)

        if (user && isValidPassword) {
          // log the user in
          req.session.userId = user.id
          res.json(user.email)
        }
      }
    })
})

router.get('/', (req, res) => {
  const userId = req.session.userId
  // if logged in:
  if (userId) {
    User
      .findById(userId)
      .then(email => res.json({ result: 'successful', email: email }))
  } else {
    res.json({})
  }
})

module.exports = router