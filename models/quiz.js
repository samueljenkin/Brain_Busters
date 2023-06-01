const db = require('../db/db')

const Quiz = {
    findAll: () => {
        const sql = 'SELECT * FROM quizzes'

        return db
            .query(sql)
            .then(dbRes => dbRes.rows)
    },


    create: (question, answer_a, answer_b, answer_c, answer_d, correct_answer) => {
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
      },

    edit: (quizId, question, answer_a, answer_b, answer_c, answer_d, correct_answer) => {
        const sql = `
            UPDATE quizzes SET question=$1, answer_a=$2, answer_b=$3, answer_c=$4, answer_d=$5, correct_answer=$6 WHERE id=$7 RETURNING *
        `

        return db
            .query(sql, [question, answer_a, answer_b, answer_c, answer_d, correct_answer, quizId])
            .then(dbRes => dbRes.rows[0])
    },

    findQuiz: (quizId) => {
        const sql = `
            SELECT * FROM quizzes WHERE id=$1
        `

        return db
            .query(sql, [quizId])
            .then(dbRes => dbRes.rows[0])
    }
}

module.exports = Quiz