const axios = require('axios');
const { validationResult } = require('express-validator');

exports.getServices = async (req, res) => {
    try {
        const { trader_id } = req.session;

        const accountEndpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
        const accountResponse = await axios.get(accountEndpoint);

        const servicesEndpoint = `http://localhost:3002/soletraders/services/${trader_id}`;
        const servicesResponse = await axios.get(servicesEndpoint);

        const services = servicesResponse.data.result;
        res.render('service/services', { services });

    } catch (error) {
        if (error.response.status === 400) {
            if (error.config.url.includes('/account/')) {
                return res.redirect('/setupprofile');
            } else {
                return res.render('service/services', { services: [] });
            }
        } else {
            console.log(`Error making API request: ${error}`);
            return res.redirect('/404');
        }
    }
};

exports.getAddService = (req, res) => {
    res.status(200);

    const errors = req.session.serviceErrors || [];
    req.session.serviceErrors = null;

    const { trader_id } = req.session;

    const endpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
    axios
        .get(endpoint)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                res.render('service/addService', { errors: errors });
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

exports.postAddService = (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        req.session.serviceErrors = errors.array();
        return res.redirect('/addservice');
    }

    const { title, description, pricing_type, base_price } = req.body;
    const { trader_id } = req.session;
    const vals = { title, description, pricing_type, base_price };
    console.log(vals);

    const endpoint = `http://localhost:3002/soletraders/addservice/${trader_id}`;
    axios
        .post(endpoint, vals)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.redirect('/services');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.getEditService = async (req, res) => {
    res.status(200);

    const errors = req.session.serviceErrors || [];
    req.session.serviceErrors = null;

    try {
        const { id } = req.params;
        const { trader_id } = req.session;

        const accountEndpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
        const accountResponse = await axios.get(accountEndpoint);

        const serviceEndpoint = `http://localhost:3002/soletraders/editservice/${id}`;
        const serviceResponse = await axios.get(serviceEndpoint);

        const services = serviceResponse.data.result[0];

        if (!services) {
            return res.redirect('/services');
        }

        if (trader_id && services.trader_id !== trader_id) {
            return res.redirect('/services');
        }

        res.render('service/editService', { services: services, errors: errors });

    } catch (error) {
        if (error.response.status === 400) {
            return res.redirect('/setupprofile');
        } else {
            console.log(`Error making API request: ${error}`);
            return res.redirect('/404');
        }
    }
};

exports.updateService = (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        req.session.serviceErrors = errors.array();
        return res.redirect(`/editservice/${id}`);
    }

    const { title, description, pricing_type, base_price } = req.body;
    const vals = { title, description, pricing_type, base_price };
    console.log(vals);

    const endpoint = `http://localhost:3002/soletraders/editservice/${id}`;
    axios
        .put(endpoint, vals)
        .then((response) => {
            console.log(response.data);
            const status = response.status;
            if (status === 200) {
                res.redirect('/services');
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.deleteService = (req, res) => {

    const { id } = req.params;

    const endpoint = `http://localhost:3002/soletraders/deleteservice/${id}`;

    axios
        .delete(endpoint)
        .then((response) => {
            console.log(response.data);
            const status = response.status;
            if (status === 200) {
                res.redirect('/services');
            }

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};