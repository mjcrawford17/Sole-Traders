const form = document.getElementById('bookingform');

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

form.addEventListener('submit', async function (event) {

    event.preventDefault();
    const regex1 = /^[a-zA-Z ]+$/;
    const regex2 = /^[a-zA-Z' -]+$/;
    const nameError = ' Name must use alphabetic characters!';
    const emailError = ' Email must not be blank!';
    const descriptionError = ' Description must not be blank!';
    const locationError = ' Location must use alphabetic characters!';
    const dateError = ' Requested Date  must not be blank!';
    const timeError = ' Requested Time must not be blank!';
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const description = document.getElementById('description-input').value;
    const location = document.getElementById('location-input').value;
    const requested_date = document.getElementById('date-input').value;
    const requested_start = document.getElementById('start-input').value;
    const requested_end = document.getElementById('end-input').value;
    let nameValid = false;
    let emailValid = false;
    let descriptionValid = false;
    let locationValid = false;
    let dateValid = false;
    let timeValid = false;

    if (regex2.test(name) == true) {
        nameValid = true;
    }

    if (email) {
        emailValid = true;
    }

    if (description) {
        descriptionValid = true;
    }

    if (regex1.test(location) == true) {
        locationValid = true;
    }

    if(requested_date) {
        dateValid = true;
    }

    if (requested_start && requested_end) {
        timeValid = true;
    }

    if (!nameValid) {
        const userMsgElement = document.getElementById('namemessage');
        fadeMessage(userMsgElement, nameError);
    }

    if (!emailValid) {
        const passMsgElement = document.getElementById('emailmessage');
        fadeMessage(passMsgElement, emailError);
    }

    if (!descriptionValid) {
        const passMsgElement = document.getElementById('descriptionmessage');
        fadeMessage(passMsgElement, descriptionError);
    }

    if (!locationValid) {
        const passMsgElement = document.getElementById('locationmessage');
        fadeMessage(passMsgElement, locationError);
    }

    if (!dateValid) {
        const passMsgElement = document.getElementById('datemessage');
        fadeMessage(passMsgElement, dateError);
    }

    if (!timeValid) {
        const passMsgElement = document.getElementById('timemessage');
        fadeMessage(passMsgElement, timeError);
    }

    if (nameValid && emailValid && descriptionValid && locationValid && dateValid && timeValid) {
        this.submit();
    }
});