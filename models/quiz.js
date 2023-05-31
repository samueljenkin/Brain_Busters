const db = require('../db/db')

const Quiz = {
    findAll: () => {
        const sql = 'SELECT * FROM quizzes'

        return db
            .query(sql)
            .then(dbRes => dbRes.rows)
    }
}

module.exports = Quiz