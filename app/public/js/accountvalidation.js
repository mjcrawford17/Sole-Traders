const form = document.getElementById('accountform');

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
    const regex1 = /^[a-zA-Z0-9\s,'-]+$/;
    const regex2 = /^[a-zA-Z' -]+$/;
    const usernameError = ' Username must use alphanumeric characters!';
    const nameError = ' Full Name must use alphabetic characters!!';
    const emailError = ' Email must not be blank!';
    const tradeError = ' Trade Type must use alphabetic characters!';
    const regionError = ' Region must use alphabetic characters!';
    const bioError = ' Bio must not be blank!';
    const availError = ' Availability Start Time must be before End Time!';
    const username = document.getElementById('username-input').value;
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const tradetype = document.getElementById('trade-input').value;
    const region = document.getElementById('region-input').value;
    const bio = document.getElementById('bio-input').value;
    const availstart = document.getElementById('availstart-input').value;
    const availend = document.getElementById('availend-input').value;
    let usernameValid = false;
    let emailValid = false;
    let nameValid = false;
    let tradeValid = false;
    let regionValid = false;
    let bioValid = false;
    let availValid = false;

    if (regex.test(username) == true) {
        usernameValid = true;
    }

    if (name) {
        if (regex2.test(name) == true) {
            nameValid = true;
        }
    }

    if (email) {
        emailValid = true;
    }


    if (regex1.test(tradetype) == true) {
        tradeValid = true;
    }

    if (regex2.test(region) == true) {
        regionValid = true;
    }

    if (bio) {
        bioValid = true;
    }

    if (availstart < availend) {
        availValid = true;
    }

    if (!usernameValid) {
        const userMsgElement = document.getElementById('usermessage');
        fadeMessage(userMsgElement, usernameError);
    }

    if (!nameValid) {
        const passMsgElement = document.getElementById('namemessage');
        fadeMessage(passMsgElement, nameError);
    }

    if (!emailValid) {
        const passMsgElement = document.getElementById('emailmessage');
        fadeMessage(passMsgElement, emailError);
    }

    if (!tradeValid) {
        const userMsgElement = document.getElementById('trademessage');
        fadeMessage(userMsgElement, tradeError);
    }

    if (!regionValid) {
        const passMsgElement = document.getElementById('regmessage');
        fadeMessage(passMsgElement, regionError);
    }

    if (!bioValid) {
        const passMsgElement = document.getElementById('biomessage');
        fadeMessage(passMsgElement, bioError);
    }

    if (!availValid) {
        const passMsgElement = document.getElementById('availmessage');
        fadeMessage(passMsgElement, availError);
    }

    if (usernameValid && nameValid && emailValid && tradeValid && regionValid && bioValid && availValid) {
        this.submit();
    }

});