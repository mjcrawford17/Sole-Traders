const form = document.getElementById('reviewform');

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
    const regex1 = /^[a-zA-Z' -]+$/;
    const nameError = ' Client Name must use alphabetic characters!!';
    const emailError = ' Email must not be blank!';
    const client_name = document.getElementById('name-input').value;
    const client_email = document.getElementById('email-input').value;
    let nameValid = false;
    let emailValid = false;

    if (regex1.test(client_name) == true) {
        nameValid = true;
    }

    if (client_email) {
        emailValid = true;
    }

    if (!nameValid) {
        const passMsgElement = document.getElementById('namemessage');
        fadeMessage(passMsgElement, nameError);
    }

    if (!emailValid) {
        const passMsgElement = document.getElementById('emailmessage');
        fadeMessage(passMsgElement, emailError);
    }

    if (nameValid && emailValid) {
        this.submit();
    }
});