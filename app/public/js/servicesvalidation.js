const form = document.getElementById('servicesform');

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
    const regex1 = /^[a-zA-Z0-9\s.,'&]+$/;
    const titleError = ' Title must use alphabetic characters!';
    const descriptionError = ' Description must not be blank!';
    const priceError = ' Pricing Type must not be blank!';
    const basepriceError = ' Base Price must not be blank!';
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const pricetype = document.getElementById('pricetype-input').value;
    const baseprice = document.getElementById('baseprice-input').value;
    let titleValid = false;
    let descriptionValid = false;
    let priceValid = false;
    let basepriceValid = false;

    if (regex1.test(title) == true) {
        titleValid = true;
    }

    if (description) {
        descriptionValid = true;
    }

    if (pricetype) {
        priceValid = true;
    }

    if (baseprice) {
        basepriceValid = true;
    }

    if (!titleValid) {
        const userMsgElement = document.getElementById('titlemessage');
        fadeMessage(userMsgElement, titleError);
    }

    if (!descriptionValid) {
        const userMsgElement = document.getElementById('descriptionmessage');
        fadeMessage(userMsgElement, descriptionError);
    }

    if (!priceValid) {
        const passMsgElement = document.getElementById('pricemessage');
        fadeMessage(passMsgElement, priceError);
    }

    if (!basepriceValid) {
        const passMsgElement = document.getElementById('basepricemessage');
        fadeMessage(passMsgElement, basepriceError);
    }

    if (titleValid && descriptionValid && priceValid && basepriceValid) {
        this.submit();
    }
});