const axios = require('axios');
const { validationResult } = require('express-validator');

exports.getReview = (req, res) => {
    const { id } = req.params;
    res.status(200);

    const errors = req.session.reviewErrors || [];
    req.session.reviewErrors = null;

    if (errors) {
        return res.render('general/review', { id: id, errors: errors });
    }
};

exports.postReview = (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        req.session.reviewErrors = errors.array();
        return res.redirect(`/review/${id}`);
    }

    const vals = ({ client_email, client_name, stars } = req.body);

    console.log(vals);

    const endpoint = `http://localhost:3002/soletraders/reviews/${id}`;
    axios
        .post(endpoint, vals)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect(`/profile/${id}`);
        })
        .catch((error) => {
            const status = error.response.status;
            if (status === 400) {
                const emailError = [{
                    path: 'client_email',
                    msg: ' Client Email has already reviewed this trader!'
                }];
                req.session.reviewErrors = emailError;
                res.redirect(`/review/${id}`);
            } else {
                console.log(`Error making API request: ${error}`);
                res.redirect('/404');
            }
        });
};

exports.get404Page = (req, res) => {
    res.render('general/404notfound');
};