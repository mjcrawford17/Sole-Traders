const conn = require('./../utils/dbconn');

exports.getServices = (req, res) => {
    const { id } = req.params;
    const selectServiceSQL = `SELECT * FROM service_listings WHERE trader_id = ?`;

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
                    message: `Trader ID: ${id}, services retrieved`,
                    result: rows
                });
            } else {
                res.status(400)
                res.json({
                    status: "failure",
                    message: `No services for Trader: ${id}`
                });
            }
        }
    });
};

exports.postServices = (req, res) => {
    const { id } = req.params;
    const { title, description, pricing_type, base_price } = req.body;
    const vals = [id, title, description, pricing_type, base_price];
    console.log(vals);

    const addServiceSQL = `INSERT INTO service_listings (trader_id, title, description, pricing_type, base_price) VALUES (?, ?, ?, ?, ?)`;

    conn.query(addServiceSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: "failure",
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: "success",
                message: `Service ID: ${rows.insertId}, record inserted`,
                result: rows
            });
        }
    }
    )
};

exports.updateService = (req, res) => {
    const { id } = req.params;
    const { title, description, pricing_type, base_price } = req.body;
    const vals = [title, description, pricing_type, base_price, id];

    const updateSQL = `UPDATE service_listings SET title = ?, description = ?, pricing_type = ?, base_price = ? WHERE service_id = ?`;

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
                    message: `Service ID: ${id}, updated`
                });
            } else {
                res.status(400);
                res.json({
                    status: 'failure',
                    message: `Invalid Service ID: ${id}`
                });
            }
        }
    });
};

exports.getEditService = (req, res) => {
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
                    message: `Service ID: ${id}, retrieved`,
                    result: rows
                });
            } else {
                res.status(400)
                res.json({
                    status: "failure",
                    message: `No Service ID: ${id}`
                });
            }
        }
    });
};

exports.deleteService = (req, res) => {

    const { id } = req.params;

    const deleteSQL = `DELETE FROM service_listings WHERE service_id = ${id}`;
    conn.query(deleteSQL, (err, rows) => {
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
                    message: `Service ID ${id} deleted`
                });
            } else {
                res.status(400);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }

        }

    });
};

exports.getServiceTitlesPerTrader = (req, res) => {

    const { id } = req.params;
    const titleSQL = `SELECT DISTINCT title FROM service_listings WHERE trader_id = ? ORDER BY title ASC;`;

    conn.query(titleSQL, [id], (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200);
            console.log(rows);
            res.json({
                status: 'success',
                message: `${rows.length} titles returned`,
                result: rows
            });
        }
    });
};