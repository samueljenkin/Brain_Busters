const express = require('express')

// middlewares
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

// controllers
const quizzesController = require('./controllers/quizzes_controller')
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

const app = express()
const port = 3000

// start web server
app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// receive request (from browser)
//  ↓
// log request info in the terminal
app.use(logger)
//  ↓
// send back our SPA
app.use(express.static('client'))
//  ↓
// parse JSON body in a POST, PUT or DELETE request, and assign the data to req.body
app.use(express.json())
//  ↓
// enable sessions
app.use(sessions)
//  ↓
// routes
app.use('/api/quizzes', quizzesController)
app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)
//  ↓
// send response back to user