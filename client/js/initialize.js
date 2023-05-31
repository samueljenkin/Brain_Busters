const state = {
    quizzes: []
}

fetch('/api/quizzes')
    .then(res => res.json())
    .then(quizzes => {
        state.quizzes = quizzes
        renderQuizzesList()
    })