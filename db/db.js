const pg = require('pg')

let db
// if you're a WSL user
if (process.env.DB_PASSWORD) {
    db = new pg.Pool({
        database: 'quiz_app',
        password: process.env.DB_PASSWORD
    })
} else { // if you're a Mac user
    db = new pg.Pool({
        database: 'quiz_app'
    })
}

module.exports = db