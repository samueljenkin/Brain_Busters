const state = {
    quizzes: []
}

fetch('/api/quizzes')
    .then(res => res.json())
    .then(quizzes => {
        state.quizzes = quizzes
        renderSignedIn()
        renderQuizList()
    })

fetch('/api/sessions')
    .then(res => res.json())
    .then(data => {
        if (data.result === 'successful') {
            state.loggedInUser = data.email
            renderSignedIn()
            renderQuizList()
        }
    })