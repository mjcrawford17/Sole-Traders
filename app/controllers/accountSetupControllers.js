const axios = require('axios');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { json } = require('express');
const SALT_ROUNDS = 12;

exports.getLogin = (req, res) => {
    res.status(200);

    const errors = req.session.loginErrors || [];
    req.session.loginErrors = null;
    const errorsreg = req.session.regErrors || [];
    req.session.regErrors = null;
    const session = req.session;
    if (!session.isloggedin) {
        return res.render('account/login', { errors: errors, errorsreg: errorsreg });
    } else {
        const orig_route = session.route || '/';
            console.log(`postLogin: orig_route = ${orig_route}`);
            res.redirect(`${orig_route}`);
    }
};

exports.postLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            req.session.loginErrors = errors.array();
            return res.redirect('/login');
        }

        const vals = ({ username, userpass } = req.body);
        console.log(vals);

        const endpoint = `http://localhost:3002/soletraders/login`;
        const response = await axios.post(endpoint, { username }, { validateStatus: (status) => status < 500 });

        const status = response.status;

        if (status === 200) {
            const data = response.data.result;
            console.log(data);

            const hashpass = data[0].password_hash;

            const passwordMatch = await bcrypt.compare(userpass, hashpass);
            console.log(`Password match: ${passwordMatch}`);

            if (passwordMatch) {
                req.session.trader_id = data[0].trader_id;
                req.session.isloggedin = true;
                console.log(req.session);
                return res.redirect('/setupprofile');
            } else {
                req.session.loginErrors = [{ path: 'userpass', msg: ' Invalid user credentials!' }];
                return res.redirect('/login');
            }
        }

        if (status === 400) {
            req.session.loginErrors = [{ path: 'username', msg: ' User does not exist!' }];
            return res.redirect('/login');
        }

        return res.redirect('/login');
    } catch (error) {
        console.log(`Error making API request: ${error}`);
        res.redirect('/404');
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.postRegistration = async (req, res) => {
    const errorsreg = validationResult(req);
    console.log(errorsreg);
    if (!errorsreg.isEmpty()) {
        req.session.regErrors = errorsreg.array();
        return res.redirect('/login#register');
    }

    const { fullname, usernamereg, email, userpassreg } = req.body;
    const hashpassword = await bcrypt.hash(userpassreg, SALT_ROUNDS);

    const vals = { fullname, usernamereg, email, hashpassword };
    console.log(vals);

    const endpoint = `http://localhost:3002/soletraders/register`;

    axios
        .post(endpoint, vals, { validateStatus: (status) => { return status < 500 } })
        .then((response) => {
            const status = response.status;
            if (status === 201) {
                const data = response.data.result;
                console.log(data);

                const session = req.session;
                session.isloggedin = true;
                session.trader_id = data.insertId;
                console.log(session);
                res.redirect('/setupprofile');
            } else if (status === 400) {
                req.session.regErrors = [{ path: 'usernamereg', msg: ' Username or email already taken!' }];
                return res.redirect('/login#register');
            } else {
                const data = response.data;
                console.log(data);
                res.redirect('/login#register');
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.getProfileSetup = (req, res) => {

    const session = req.session;
    const trader_id = session.trader_id;

    res.status(200);

    const errors = req.session.profileErrors || [];
    req.session.profileErrors = null;

    if (errors.length) {
        return res.render('account/profilesetup', { errors: errors });
    }

    const endpoint = `http://localhost:3002/soletraders/profile/${trader_id}`;

    axios
        .get(endpoint)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                const orig_route = session.route;
                if (orig_route == '/setupprofile') {
                    res.redirect('/');
                } else if (typeof orig_route !== 'undefined') {
                    console.log(`postLogin: orig_route = ${orig_route}`);
                    res.redirect(`${orig_route}`);
                } else {
                    res.redirect('/');
                }
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.render('account/profilesetup', { errors: errors });
        });
};

exports.postProfileSetup = (req, res) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        req.session.profileErrors = errors.array();
        return res.redirect('/setupprofile');
    }

    const { trade_type, region, bio, avail_start, avail_end, avail_details } = req.body;
    const { trader_id } = req.session;
    const vals = { trade_type, region, bio, avail_start, avail_end, avail_details };
    console.log(trader_id);
    console.log(vals);

    const today = new Date().toISOString().split('T')[0];
    const startDateTime = new Date(`${today}T${avail_start}`);
    const endDateTime = new Date(`${today}T${avail_end}`);
    console.log('Start:', startDateTime);
    console.log('End:', endDateTime);

    if (startDateTime >= endDateTime) {
        const timeError = [{ path: 'avail_start', msg: ' Start time must be before end time' }]
        req.session.profileErrors = timeError;
        return res.redirect(`/setupprofile`);
    }

    const endpoint = `http://localhost:3002/soletraders/setupprofile/${trader_id}`;
    axios
        .post(endpoint, vals)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect('/');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.getAccount = (req, res) => {
    const { trader_id } = req.session;

    const endpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
    axios
        .get(endpoint)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                const data = response.data.result;
                console.log(data);
                const trader = data[0];
                res.render('account/account', { trader });
            }
        })
        .catch((error) => {
            if (error.status === 400) {
                res.redirect('/setupprofile');
            } else {
                console.log(`Error making API request: ${error}`);
                res.redirect('/404');
            }
        });
};

exports.getEditAccount = (req, res) => {
    const { trader_id } = req.session;

    res.status(200);

    const errors = req.session.accountErrors || [];
    req.session.accountErrors = null;

    const endpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
    axios
        .get(endpoint)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                const data = response.data.result;
                console.log(data);
                const trader = data[0];
                res.render('account/editaccount', { trader: trader, errors: errors });
            }
        })
        .catch((error) => {
            if (error.status === 400) {
                res.redirect('/setupprofile');
            } else {
                console.log(`Error making API request: ${error}`);
                res.redirect('/404');
            }
        });
};

exports.updateAccount = (req, res) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        req.session.accountErrors = errors.array();
        return res.redirect('/editaccount');
    }

    const vals = ({ name, username, email, trade_type, region, bio, avail_start, avail_end, avail_details } = req.body);
    const { trader_id } = req.session;

    const today = new Date().toISOString().split('T')[0];
    const startDateTime = new Date(`${today}T${avail_start}`);
    const endDateTime = new Date(`${today}T${avail_end}`);
    console.log('Start:', startDateTime);
    console.log('End:', endDateTime);

    if (startDateTime >= endDateTime) {
        const timeError = [{ path: 'avail_start', msg: ' Start time must be before end time' }]
        req.session.accountErrors = timeError;
        return res.redirect(`/editaccount`);
    }

    const endpoint = `http://localhost:3002/soletraders/updateaccount/${trader_id}`;

    axios
        .put(endpoint, vals)
        .then((response) => {
            console.log(response.data);
            res.redirect('/account');
        })
        .catch((error) => {
            if (error.status === 400) {
                console.log('Duplicate username or email');
                req.session.accountErrors = [{ path: 'username', msg: ' Username or Email already taken!' }];
                return res.redirect('/editaccount');
            } else {
                console.log(`Error making API request: ${error}`);
                return res.redirect('/editaccount');
            }
        });
};