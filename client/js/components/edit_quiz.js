function renderEditQuiz(event) {
    const editBtn = event.target
    const quizDOM = editBtn.closest('.quiz')
    const quizId = quizDOM.dataset.id

    const quiz = state.quizzes.filter(quiz => quiz.id == quizId)[0]

    document.querySelector('#page').innerHTML = `
        <section class='edit-quiz' data-id='${quiz.id}'>
            <form action="" onSubmit="editQuiz(event)">
                <h2>Edit Quiz</h2>
                <fieldset>
                    <label for="">Question: </label>
                    <input type="text" name="question" value="${quiz.question}">
                </fieldset>
                <fieldset>
                    <label for="">Response a: </label>
                    <input type="text" name="answer_a" value="${quiz.answer_a}">
                </fieldset>
                <fieldset>
                    <label for="">Response b: </label>
                    <input type="text" name="answer_b" value="${quiz.answer_b}">
                </fieldset>
                <fieldset>
                    <label for="">Response c: </label>
                    <input type="text" name="answer_c" value="${quiz.answer_c}">
                </fieldset>
                <fieldset>
                    <label for="">Response d: </label>
                    <input type="text" name="answer_d" value="${quiz.answer_d}">
                </fieldset>
                <fieldset>
                    <label for="">Correct Response: </label>
                    <input type="text" name="correct_answer" value="${quiz.correct_answer}">
                </fieldset>
                <button>Edit Quiz</button>
            </form>
        </section>
    `
}

function editQuiz(event) {
	event.preventDefault()
	const form = event.target
    const quizDOM = form.closest('.edit-quiz')
    const quizId = quizDOM.dataset.id

	// converts form data into an object
	const data = Object.fromEntries(new FormData(form))
  
	fetch(`/api/quizzes/${quizId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
	})
        .then(res => res.json())
        .then(quiz => {
            state.quizzes = state.quizzes.filter(quiz => quiz.id != quizId)
            state.quizzes.push(quiz)
            renderQuizList()
	    })
}