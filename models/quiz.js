const db = require('../db/db')

const Quiz = {
    findAll: () => {
        const sql = 'SELECT * FROM quizzes'

        return db
            .query(sql)
            .then(dbRes => dbRes.rows)
    },


    create:(question, answer_a, answer_b, answer_c, answer_d, correct_answer) => {
        const sql = `
            INSERT INTO quizzes(question, answer_a, answer_b, answer_c, answer_d, correct_answer)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `

        return db
            .query(sql, [question, answer_a, answer_b, answer_c, answer_d, correct_answer])
            .then(dbRes => dbRes.rows[0])
    },
    delete: (quizId) => {
        const sql = 'DELETE FROM quizzes WHERE id = $1'
    
        return db.query(sql, [quizId])
      }

}

module.exports = Quiz