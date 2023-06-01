function renderAddQuiz() {
	document.querySelector('#page').innerHTML = `
	  <section class='create-quiz'>
		<form action="" onSubmit="createQuiz(event)">
		  <h2>Add Quiz</h2>
		  <fieldset>
			<label for="">Question: </label>
			<input type="text" name="question">
		  </fieldset>
		  <fieldset>
			<label for="">Response a: </label>
			<input type="text" name="answer_a">
		  </fieldset>
		  <fieldset>
			<label for="">Response b: </label>
			<input type="text" name="answer_b">
		  </fieldset>
		  <fieldset>
			<label for="">Response c: </label>
			<input type="text" name="answer_c">
		  </fieldset>
		  <fieldset>
			<label for="">Response d: </label>
			<input type="text" name="answer_d">
		  </fieldset>
		  <fieldset>
			<label for="">Correct Response: </label>
			<input type="text" name="correct_answer">
		  </fieldset>
		  <button>Add Quiz</button>
		</form>
	  </section>
	`
  }
  
  function createQuiz(event) {
	event.preventDefault()
	const form = event.target
  
	// converts form data into an object
	const data = Object.fromEntries(new FormData(form))
  
	fetch('/api/quizzes', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(data)
	})
	  .then(res => res.json())
	  .then(quiz => {
		state.treasures.push(quiz)
		renderQuizList()
	  })
  }