const form = document.getElementById('profileform');

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
    const regex1 = /^[a-zA-Z0-9\s,'-]+$/;
    const regex2 = /^[a-zA-Z' -]+$/;
    const tradeError = ' Trade Type must use alphabetic characters!';
    const regionError = ' Region must use alphabetic characters!';
    const bioError = ' Bio must not be blank!';
    const availError = ' Availability Start Time must be before End Time!';
    const tradetype = document.getElementById('trade-input').value;
    const region = document.getElementById('region-input').value;
    const bio = document.getElementById('bio-input').value;
    const availstart = document.getElementById('availstart-input').value;
    const availend = document.getElementById('availend-input').value;
    let tradeValid = false;
    let regionValid = false;
    let bioValid = false;
    let availValid = false;

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

    if (tradeValid && regionValid && bioValid && availValid) {
        this.submit();
    }
});