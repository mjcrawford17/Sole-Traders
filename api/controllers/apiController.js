const conn = require('./../utils/dbconn');

exports.postReview = (req, res) => {
    const { id } = req.params;
    const { client_email, client_name, stars } = req.body;
    const vals = [id, client_email, client_name, stars];
    console.log(vals);

    const addReviewSQL = `INSERT INTO ratings (trader_id, client_email, client_name, stars) VALUES (?, ?, ?, ?)`;

    conn.query(addReviewSQL, vals, (err, rows) => {
        console.log(err);
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log('Duplicate client email');
                res.status(400);
                res.json({
                    status: 'failure',
                    message: 'Duplicate client email'
                });
            } else {
                res.status(500);
                res.json({
                    status: 'failure',
                    message: err
                });
            }
        } else {
            res.status(201);
            res.json({
                status: "success",
                message: `Rating ID: ${rows.insertId}, record inserted`,
                result: rows
            });
        }
    }
    )
};

exports.checkAvailability = (req, res) => {
    const { id } = req.params;
    const { requested_date, requested_start, requested_end } = req.body;
    const vals = [id, requested_start, requested_end, id, requested_date, requested_end, requested_start, id]


    const checkAvailSQL = `SELECT 
        CASE 
            WHEN NOT EXISTS (
                SELECT 1
                FROM profiles p
                WHERE p.trader_id = ?
                    AND p.availability_start_time <= ?
                    AND p.availability_end_time >= ?
            ) THEN 'UNAVAILABLE'
            WHEN EXISTS (
                SELECT 1 
                FROM bookings b
                WHERE b.trader_id = ?
                    AND b.status = 'accepted'
                    AND b.requested_date = ?
                    AND b.requested_start_time < ?
                    AND b.requested_end_time > ?
            ) THEN 'UNAVAILABLE'
            ELSE 'AVAILABLE'
        END AS availability_status
        FROM profiles
        WHERE trader_id = ?
        LIMIT 1`;

    conn.query(checkAvailSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            res.json({
                status: "success",
                message: `Availability retrieved`,
                result: rows
            });
            console.log(rows);
        }
    });

};