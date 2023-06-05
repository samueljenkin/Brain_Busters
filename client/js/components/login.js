function renderLogin() {
    document.querySelector('#page').innerHTML = `
        <section class='log-in'>
            <form action="" onSubmit="logIn(event)">
                <h2>Login:</h2>
                <fieldset>
                    <label for="">Email: </label>
                    <input type="text" name="email">
                </fieldset>
                <fieldset>
                    <label for="">Password: </label>
                    <input type="password" name="password">
                </fieldset>
                <button>Log in</button>
            </form>
        </section>
    `
}

function logIn(event) {
    event.preventDefault()
    const form = event.target
  
    // converts form data into an object
    const data = Object.fromEntries(new FormData(form))
  
    fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
            if (res.error) {
                renderLogin()
                renderError(res.error)
            } else {
                state.loggedInUser = res
                renderSignedIn()
            }
      })
}

function renderError(errorMessage) {
    document.querySelector('#page').innerHTML =
        `<h2 style='color: red;'>${errorMessage}</h2>` + document.querySelector('#page').innerHTML
}

function renderSignedIn() {
    if (state.loggedInUser) {
        document.querySelector('#controls').innerHTML = `
            <li class="material-symbols-outlined home" onClick="renderSignedIn()">home</li>
<<<<<<< HEAD
            <li class="material-symbols-outlined add-quiz" onClick="renderAddQuiz()">add_circle</li>
=======
            <li class="material-symbols-outlined add-quiz" onClick="renderAddQuiz()">add_circle</li>    
>>>>>>> update readme file
            <li class="material-symbols-outlined log-out" onClick="logOut()">logout</li>
        `
        renderQuizList()
    } else {
        document.querySelector('#controls').innerHTML = `
            <li class="material-symbols-outlined sign-up" onClick="renderSignUp()">person_add</li>
            <li class="material-symbols-outlined login" onClick="renderLogin()">login</li>
        `
        renderSignUp()
    }
}

function logOut() {
    fetch('/api/sessions', {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                renderError(res.error)
            } else if (res.message === 'success') {
                state.loggedInUser = null
                renderSignedIn()
            }
        })
}