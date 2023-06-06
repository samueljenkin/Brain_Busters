function renderQuizList() {
    state.correct = 0
    state.attempts = 0
    document.querySelector('#page').innerHTML = `
        <section class="quiz-list">
            ${renderQuizzes()}
        </section> 
    `
    const audioGathering = document.getElementById("gatheringSound")
    audioGathering.volume = 0.1
    audioGathering.play()
}

function renderQuizzes() {
    return state.quizzes.map(quiz => `
        <section class="quiz" data-id="${quiz.id}">
            <header>
                <h2>${quiz.question}</h2>
            </header>
            <form action="" onSubmit="submitQuiz(event)">
                <ul>
                    <li>
                        <p>a.</p>
                        <label for="a">${quiz.answer_a}</label>
                        <input type="radio" id="a" name="option" value="${quiz.answer_a}">
                    </li>
                    <li>
                        <p>b.</p>
                        <label for="b">${quiz.answer_b}</label>
                        <input type="radio" id="b" name="option" value="${quiz.answer_b}">
                    </li>
                    <li>
                        <p>c.</p>
                        <label for="c">${quiz.answer_c}</label>
                        <input type="radio" id="c" name="option" value="${quiz.answer_c}">
                    </li>
                    <li>
                        <p>d.</p>
                        <label for="d">${quiz.answer_d}</label>
                        <input type="radio" id="d" name="option" value="${quiz.answer_d}">
                    </li>
                </ul>
                <section class='quiz-controllers'>
                    <button>Submit</button>
                    <section>
                        <span class="material-symbols-outlined edit" onClick="renderEditQuiz(event)">edit</span>
                        <span class="material-symbols-outlined delete" onClick="deleteQuiz(event)">delete</span>
                    </section>
                </section>
            </form>
        </section>
    `).join('')
}

function submitQuiz(event) {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    const quizDOM = form.closest('.quiz')
    const quizId = quizDOM.dataset.id

    // if quiz already attempted, exit function
    if (quizDOM.classList.contains('correct') || quizDOM.classList.contains('wrong')) {
        return;
    }

    // audio
    const audioCorrect = document.getElementById("correctSound")
    const audioWrong = document.getElementById("wrongSound")

    // users choice & correct answer
    const userChoice = data.option
    const answer = state.quizzes.find(quiz => quiz.id == quizId).correct_answer
    
    // if users choice equals correct answer they get a point and winning message, else losing message
    if (userChoice === answer) {
        state.attempts++
        state.correct++

        document.querySelector(`[data-id="${quizId}"]`).innerHTML = `<h2>Correct!</h2>` + quizDOM.innerHTML
        document.querySelector(`[data-id="${quizId}"]`).classList.add('correct')

        audioCorrect.play()
    } else {
        state.attempts++

        document.querySelector(`[data-id="${quizId}"]`).innerHTML = `<h2>Wrong!</h2> 
        <h3><em>Correct Answer: ${answer}</em></h3>` + quizDOM.innerHTML
        document.querySelector(`[data-id="${quizId}"]`).classList.add('wrong')

        audioWrong.play()
    }

    // update the score
    updateScore()

    // If we want to push the quiz to the bottom
    // const quiz = state.quizzes.find(quiz => quiz.id == quizId)
    // state.quizzes = state.quizzes.filter(quiz => quiz.id != quizId)
    // state.quizzes.push(quiz)
    // renderQuizList()
    // console.log(state.quizzes)

    // if user attempts all questions, display score
    if (state.attempts === state.quizzes.length) {

        document.querySelector('#page').innerHTML =
            `<h2>You scored ${state.correct}/${state.attempts} (${(state.correct / state.attempts * 100).toFixed(0)}%)</h2><button onClick="renderQuizList()">Try again?</button>` + document.querySelector('#page').innerHTML
        const scoreDiv = document.querySelector('#score')
        scoreDiv.innerHTML = ''
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

function updateScore() {
    const scoreDiv = document.querySelector('#score')
    scoreDiv.innerHTML = `
        <h2>Score: ${state.correct}</h2>
    `
}