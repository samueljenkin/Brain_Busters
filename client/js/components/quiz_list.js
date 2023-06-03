function renderQuizList() {
    document.querySelector('#page').innerHTML = `
        <section class="quiz-list">
            ${renderQuizzes()}
        </section> 
    `
    // const audioGathering = document.getElementById("gatheringSound")
    // audioGathering.play()
}

function renderQuizzes() {
    return state.quizzes.map(quiz => `
        <section class="quiz" data-id="${quiz.id}">
            <header>
                <h2>${quiz.question}</h2>
            </header>
            <form action="" onSubmit="submitQuiz(event)">
                <input type="radio" id="a" name="option" value="${quiz.answer_a}">
                <label for="a">${quiz.answer_a}</label>
                <input type="radio" id="b" name="option" value="${quiz.answer_b}">
                <label for="b">${quiz.answer_b}</label>
                <input type="radio" id="c" name="option" value="${quiz.answer_c}">
                <label for="c">${quiz.answer_c}</label>
                <input type="radio" id="d" name="option" value="${quiz.answer_d}">
                <label for="d">${quiz.answer_d}</label>
                <button>Submit</button>
            </form>
            <span class="edit" onClick="renderEditQuiz(event)">edit</span>
            <span class="delete" onClick="deleteQuiz(event)">delete</span>
        </section>
    `).join('')
}

function submitQuiz(event) {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    const quizDOM = form.closest('.quiz')
    const quizId = quizDOM.dataset.id

    if (quizDOM.classList.contains('correct') || quizDOM.classList.contains('wrong')) {
        return;
    }

    const audioCorrect = document.getElementById("correctSound")
    const audioWrong = document.getElementById("wrongSound")

    const userChoice = data.option
    const answer = state.quizzes.find(quiz => quiz.id == quizId).correct_answer
    
    if (userChoice === answer) {
        state.counter++
        
        document.querySelector(`[data-id="${quizId}"]`).innerHTML = `<h2>Correct!</h2>` + quizDOM.innerHTML
        document.querySelector(`[data-id="${quizId}"]`).classList.add('correct')

        audioCorrect.play()
    } else {
        document.querySelector(`[data-id="${quizId}"]`).innerHTML = `<h2>Wrong!</h2>` + quizDOM.innerHTML
        document.querySelector(`[data-id="${quizId}"]`).classList.add('wrong')

        audioWrong.play()
    }
}

function deleteQuiz(event) {
    const deleteBtn = event.target
    const quizDOM = deleteBtn.closest('.quiz')
    const quizId = quizDOM.dataset.id
    fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    })
        .then(() => {
            state.quizzes = state.quizzes.filter(quiz => quiz.id != quizId)
            renderQuizList()
        })
}