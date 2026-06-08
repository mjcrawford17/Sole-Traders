const conn = require('../utils/dbconn');

exports.postLogin = (req, res) => {
    const { username } = req.body;

    const checkuserSQL = `SELECT trader_id, password_hash FROM traders WHERE username = ?`;

    conn.query(checkuserSQL, [username], (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: "failure",
                message: err
            });
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: "success",
                    message: `${rows.length} records retrieved`,
                    result: rows
                });
            } else {
                res.status(400);
                res.json({
                    status: "failure",
                    message: `Invalid user credentials`
                });
            }
        }
    }
    )
};

exports.postRegistration = (req, res) => {

    const { fullname, usernamereg, email, hashpassword } = req.body;
    const vals = [fullname, usernamereg, email, hashpassword];
    console.log(vals);

    const addTraderSQL = `INSERT INTO traders (full_name, username, email_address, password_hash) VALUES (?, ?, ?, ?)`;

    conn.query(addTraderSQL, vals, (err, rows) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400);
                res.json({
                    status: "failure",
                    message: `Duplicate username or email`
                });
            } else {
                res.status(500);
                res.json({
                    status: "failure",
                    message: err
                });
            }
        } else {
            res.status(201);
            res.json({
                status: "success",
                message: `Trader ID: ${rows.insertId}, record inserted`,
                result: rows
            });
        }
    }
    )
};

exports.getProfile = (req, res) => {

    const { id } = req.params;

    const checkuserSQL = `SELECT * FROM profiles WHERE trader_id = ?`;

    conn.query(checkuserSQL, id, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: "failure",
                message: err
            })
        } else {
            if (rows.length > 0) {
                res.status(200);
                res.json({
                    status: "success",
                    message: `Trader ID: ${rows[0].trader_id}, profile retrieved`,
                    result: rows
                });
            } else {
                res.status(400)
                res.json({
                    status: "failure",
                    message: `No profile for Trader: ${id}`
                });
            }
        }
    })
};

exports.postProfileSetup = (req, res) => {
    const { id } = req.params;
    const { trade_type, region, bio, avail_start, avail_end, avail_details } = req.body;
    const vals = [id, trade_type, region, bio, avail_start, avail_end, avail_details];

    const insertSQL = `INSERT INTO profiles (trader_id, trade_type, region_town, bio, availability_start_time, availability_end_time, availability_details) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: 'success',
                message: `Record ID ${rows.insertId} added`,
                result: rows.insertId
            });
        }
    });
};

exports.getAccount = (req, res) => {
    const { id } = req.params;
    const selectSQL = `SELECT traders.trader_id,traders.full_name, traders.username, traders.email_address, traders.created_at, profiles.profile_id, profiles.trade_type, profiles.region_town, profiles.bio, profiles.availability_start_time, profiles.availability_end_time, profiles.availability_details
FROM traders INNER JOIN profiles ON traders.trader_id = profiles.trader_id WHERE traders.trader_id = ?;`;

    conn.query(selectSQL, [id, id], (err, rows) => {
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
                    message: `Trader ID: ${id}, profile retrieved`,
                    result: rows
                });
            } else {
                res.status(400)
                res.json({
                    status: "failure",
                    message: `No profile for Trader: ${id}`
                });
            }
        }
    });
};

exports.updateAccount = (req, res) => {
    const { id } = req.params;
    const { name, username, email, trade_type, region, bio, avail_start, avail_end, avail_details } = req.body;
    const vals = [name, username, email, id, trade_type, region, bio, avail_start, avail_end, avail_details, id];

    const updateSQL = `UPDATE traders SET full_name = ?, username = ?, email_address = ? WHERE trader_id = ?; UPDATE profiles SET trade_type = ?, region_town = ?, bio = ?, availability_start_time = ?, availability_end_time = ?, availability_details = ? WHERE trader_id = ?`;

    conn.query(updateSQL, vals, (err, rows) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log('Duplicate username or email');
                res.status(400);
                res.json({
                    status: 'failure',
                    message: 'Duplicate username or email'
                });
            } else {
                res.status(500);
                res.json({
                    status: 'failure',
                    message: err
                });
            }
        } else {
            if (rows[0].affectedRows > 0 && rows[1].affectedRows > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Trader ID: ${id}, profile updated`
                });
            } else {
                res.status(400);
                res.json({
                    status: 'failure',
                    message: `Invalid Trader ID: ${id}`
                });
            }
        }
    });
};