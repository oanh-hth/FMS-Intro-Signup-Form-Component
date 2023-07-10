const form = document.querySelector('.form')
const inputs = Array.from(document.querySelectorAll('.form__control'))
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const firstNameInput = document.getElementById('first-name')
const lastNameInput = document.getElementById('last-name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

inputs.forEach( input => input.addEventListener('input', () => removeInvalidClass(input) ))

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    if (!firstNameInput.value.trim()) {
        addInvalidClass(firstNameInput)
    } else {
        removeInvalidClass(firstNameInput)
    }

    if (!lastNameInput.value.trim()) {
        addInvalidClass(lastNameInput)
    } else {
        removeInvalidClass(lastNameInput)
    }

    if (!passwordInput.value.trim()) {
        addInvalidClass(passwordInput)
    } else if (passwordInput.value.length < 6) {
        addInvalidClass(passwordInput, 'Password must have at least 6 characters long')
    } else {
        removeInvalidClass(passwordInput)
    }

    if (!emailInput.value) {
        addInvalidClass(emailInput, 'Email cannot be empty')
    } else if (!emailPattern.test(emailInput.value.trim())) {
        addInvalidClass(emailInput, 'Looks like this is not an email')
    } else {
        removeInvalidClass(emailInput)
    }

    if (firstNameInput.value && lastNameInput.value && passwordInput.value.length >= 6 && emailPattern.test(emailInput.value)) {
        setSuccessfulNotification()
        inputs.forEach( input => input.value = '')
    }

})

function addInvalidClass(input, message) {
    input.nextElementSibling.classList.add('invalid')
    if (message) {
        input.nextElementSibling.textContent = message
    }
}

function removeInvalidClass(input) {
    input.nextElementSibling.classList.remove('invalid')
    document.querySelector('.form__status').style.display = 'none'
}

function setSuccessfulNotification() {
    document.querySelector('.form__status').style.display = 'block'
}