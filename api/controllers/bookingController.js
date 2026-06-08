const conn = require('./../utils/dbconn');

exports.getBookings = (req, res) => {

    const { id } = req.params;
    const { status } = req.query;
    console.log(status);

    const bookingSQL = `SELECT bookings.booking_id, bookings.client_name, service_listings.title, bookings.job_location, bookings.requested_date, bookings.status FROM bookings INNER JOIN service_listings ON bookings.service_id = service_listings.service_id WHERE bookings.trader_id = ?`;
    let bookingSQL2 = bookingSQL;
    const params = [id];

    if (status) {
        bookingSQL2 += ` AND bookings.status = ?`;
        params.push(status);
    }

    bookingSQL2 += ` ORDER BY bookings.requested_date DESC;`;
    
    conn.query(bookingSQL2, params, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            res.json({
                status: 'success',
                message: `${rows.length} records returned`,
                result: rows
            });
        }
    });
};

exports.getBooking = (req, res) => {

    const { id } = req.params;

    const bookingSQL = `SELECT bookings.booking_id, bookings.client_name, bookings.client_email, service_listings.title, bookings.job_location, bookings.requested_date, bookings.requested_start_time, bookings.requested_end_time, bookings.job_description, bookings.status, bookings.created_at, bookings.trader_id FROM bookings INNER JOIN service_listings ON bookings.service_id = service_listings.service_id WHERE bookings.booking_id = ?;`;

    conn.query(bookingSQL, [id], (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            res.json({
                status: 'success',
                message: `${rows.length} records returned`,
                result: rows
            });
        }
    });
};

exports.updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    const vals = [status, id];

    const updateSQL = `UPDATE bookings SET status = ? WHERE booking_id = ?`;

    conn.query(updateSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.affectedRows > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Booking ID: ${id}, updated`
                });
            } else {
                res.status(400);
                res.json({
                    status: 'failure',
                    message: `Invalid Booking ID: ${id}`
                });
            }
        }
    });
};

exports.postBooking = (req, res) => {
    const { id } = req.params;
    const { trader_id, name, email, description, location, requested_date, requested_start, requested_end } = req.body;
    const vals = [id, trader_id, name, email, description, location, requested_date, requested_start, requested_end];
    console.log(vals);

    const addBookingSQL = `INSERT INTO bookings (service_id, trader_id, client_name, client_email, job_description, job_location, requested_date, requested_start_time, requested_end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(addBookingSQL, vals, (err, rows) => {
        console.log(err);
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: "success",
                message: `Booking ID: ${rows.insertId}, record inserted`,
                result: rows
            });
        }
    }
    )
};

exports.getServicesForBooking = (req, res) => {
    const { id } = req.params;
    const selectServiceSQL = `SELECT * FROM service_listings WHERE service_id = ?`;

    conn.query(selectServiceSQL, [id], (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            console.log(rows);
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: "success",
                    message: `Service ID: ${id} retrieved`,
                    result: rows
                });
            } else {
                res.status(400)
                res.json({
                    status: "failure",
                    message: `No service: ${id}`
                });
            }
        }
    });
};