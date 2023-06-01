function renderQuizList() {
    document.querySelector('#page').innerHTML = `
        <section class="quiz-list">
            ${renderQuizzes()}
        </section> 
    `
}

function renderQuizzes() {
    return state.quizzes.map(quiz => `
        <section class="quiz" data-id='${quiz.id}'>
            <header>
                <h2>${quiz.question}</h2>
            </header>
            <p>${quiz.answer_a}</p>
            <p>${quiz.answer_b}</p>
            <p>${quiz.answer_c}</p>
            <p>${quiz.answer_d}</p>
            <span class="edit" onClick="renderEditQuiz(event)">edit</span>
            <span class="delete" onClick="deleteQuiz(event)">delete</span>
        </section>
    `).join('')
}

function deleteQuiz(event) {
    const deleteBtn = event.target
    const quizDOM = deleteBtn.closest('.quiz')
    const quizId = quizDOM.dataset.id
    fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    })
        .then(() => {
            state.quizzes = state.quizzes.filter(t => t.id != quizId)
            renderQuizList()
        })
}