const axios = require('axios');
const { validationResult } = require('express-validator');

exports.getBookings = async (req, res) => {
    try {
        const { trader_id } = req.session;
        const { status } = req.query;

        const accountEndpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
        const accountResponse = await axios.get(accountEndpoint);

        const bookingsEndpoint = `http://localhost:3002/soletraders/bookings/${trader_id}`;
        const bookingsResponse = await axios.get(bookingsEndpoint, { params: { status } });

        if (bookingsResponse.status === 200) {
            const bookings = bookingsResponse.data.result;
            console.log(bookings);
            return res.render('booking/bookings', { bookings: bookings, status: status });
        }

    } catch (error) {
        if (error.response.status === 400) {
            res.redirect('/setupprofile');
        } else {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        }
    }
};

exports.getSingleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { trader_id } = req.session;

        const accountEndpoint = `http://localhost:3002/soletraders/account/${trader_id}`;
        const accountResponse = await axios.get(accountEndpoint);

        const bookingEndpoint = `http://localhost:3002/soletraders/booking/${id}`;
        const bookingResponse = await axios.get(bookingEndpoint);

        const bookings = bookingResponse.data.result[0];

        console.log('Booking data:', bookings);
        console.log('Session trader_id:', trader_id);
        console.log('Booking trader_id:', bookings.trader_id);

        if (!bookings) {
            console.log('No booking found');
            return res.redirect('/bookings');
        }

        if (trader_id && bookings.trader_id !== trader_id) {
            console.log('Trader ID mismatch');
            return res.redirect('/bookings');
        }

        console.log(bookings);
        res.render('booking/moreInfoBookings', { bookings });

    } catch (error) {

        if (error.status === 400) {
            if (error.config.url.includes('/account/')) {
                return res.redirect('/setupprofile');
            }
            return res.redirect('/bookings');
        }
        console.log(`Error making API request: ${error}`);
        res.redirect('/bookings');
    }
};

exports.updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const endpoint = `http://localhost:3002/soletraders/updatebooking/${id}`;
    axios
        .put(endpoint, { status })
        .then((response) => {
            console.log(response.data);
            const status = response.status;
            if (status === 200) {
                res.redirect('/bookings');
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.getBookingPage = (req, res) => {
    res.status(200);

    const errors = req.session.bookingErrors || [];
    req.session.bookingErrors = null;

    const { id } = req.params;

    const endpoint = `http://localhost:3002/soletraders/bookingserv/${id}`;

    axios
        .get(endpoint)
        .then((response) => {
            const status = response.status;
            if (status === 200) {
                const service = response.data.result[0];
                console.log(service);
                res.render('booking/bookingpage', { service: service, errors: errors });
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};

exports.postBookingPage = async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        req.session.bookingErrors = errors.array();
        return res.redirect(`/bookservice/${id}`);
    }

    const vals = ({ trader_id, name, email, description, location, requested_date, requested_start, requested_end } = req.body);

    try {
        const vals1 = { requested_date, requested_start, requested_end };

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const currentDate = `${year}-${month}-${day}`;


        if (!requested_date || requested_date < currentDate) {
            const dateError = [{
                path: 'requested_date',
                msg: ' Requested Date must be today or after!'
            }];
            req.session.bookingErrors = dateError
            return res.redirect(`/bookservice/${id}`);
        }

        const startDateTime = new Date(`${requested_date}T${requested_start}`);
        const endDateTime = new Date(`${requested_date}T${requested_end}`);
        console.log('Start:', startDateTime);
        console.log('End:', endDateTime);

        if (startDateTime >= endDateTime) {
            const timeError = [{ path: 'requested_start', msg: ' Start time must be before end time' }]
            req.session.bookingErrors = timeError;
            return res.redirect(`/bookservice/${id}`);
        }

        const availEndpoint = `http://localhost:3002/soletraders/checkavail/${trader_id}`;
        const availResponse = await axios.post(availEndpoint, vals1);

        const availStatus = availResponse.data.result[0].availability_status;
        console.log('Availability:', availStatus);

        if (availStatus !== 'AVAILABLE') {
            const availError = [{
                path: 'avail',
                msg: ' Booking Slot is not available. Try again!'
            }];
            req.session.bookingErrors = availError;
            return res.redirect(`/bookservice/${id}`);
        }
    } catch (error) {
        console.log(`Error making API request: ${error}`);
        res.redirect('/404');
    }

    const endpoint = `http://localhost:3002/soletraders/bookingserv/${id}`;
    axios
        .post(endpoint, vals)
        .then((response) => {
            const bookingId = response.data.result.insertId;
            console.log(bookingId);
            res.render('booking/bookingconfirmation', { booking: vals, bookingId });
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/404');
        });
};