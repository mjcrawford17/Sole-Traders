const form = document.getElementById('loginform');

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
    const regex = /^[a-zA-Z0-9]+$/;
    const usernameError = ' Username must use alphanumeric characters!';
    const passwordError = ' Password must not be blank!';
    const username = document.getElementById('username-input').value;
    const userpass = document.getElementById('password-input').value;
    let usernameValid = false;
    let passwordValid = false;

    if (regex.test(username) == true) {
        usernameValid = true;
    }

    if (userpass) {
        passwordValid = true;
    }

    if (!usernameValid) {
        const userMsgElement = document.getElementById('usermessage');
        fadeMessage(userMsgElement, usernameError);
    }

    if (!passwordValid) {
        const passMsgElement = document.getElementById('passmessage');
        fadeMessage(passMsgElement, passwordError);
    }

    if (usernameValid && passwordValid) {
        this.submit();
    }
});