const form = document.getElementById('registrationform');

function fadeMessage(msgElement, errMsg) {

    msgElement.innerText = errMsg;
    msgElement.style.color = 'red';
    msgElement.style.opacity = null;

    const fadeEffect = setInterval(() => {

        if (!msgElement.style.opacity) {
            msgElement.style.opacity = 1;
        }

        if (msgElement.style.opacity > 0) {
            msgElement.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

form.addEventListener('submit', function (event) {

    event.preventDefault();
    const regex1 = /^[a-zA-Z0-9]+$/;
    const regex2 = /^[a-zA-Z' -]+$/;
    const usernameError = ' Username must use alphanumeric characters!';
    const passwordError = ' Password must not be blank!';
    const nameError = ' Full Name must use alphabetic characters!!';
    const emailError = ' Email must not be blank!';
    const username = document.getElementById('username-reg-input').value;
    const userpass = document.getElementById('password-reg-input').value;
    const name = document.getElementById('fullname-reg-input').value;
    const email = document.getElementById('email-reg-input').value;
    let usernameValid = false;
    let passwordValid = false;
    let emailValid = false;
    let nameValid = false;

    if (regex1.test(username) == true) {
        usernameValid = true;
    }

    if (userpass) {
        passwordValid = true;
    }

    if (name) {
        if(regex2.test(name) == true) {
            nameValid = true;
        }
    }

    if (email) {
        emailValid = true;
    }

    if (!usernameValid) {
        const userMsgElement = document.getElementById('usernamemessage');
        fadeMessage(userMsgElement, usernameError);
    }

    if (!passwordValid) {
        const passMsgElement = document.getElementById('passwordmessage');
        fadeMessage(passMsgElement, passwordError);
    }

    if (!nameValid) {
        const passMsgElement = document.getElementById('namemessage');
        fadeMessage(passMsgElement, nameError);
    }

    if (!emailValid) {
        const passMsgElement = document.getElementById('emailmessage');
        fadeMessage(passMsgElement, emailError);
    }

    if (usernameValid && passwordValid && nameValid && emailValid) {
        this.submit();
    }
});