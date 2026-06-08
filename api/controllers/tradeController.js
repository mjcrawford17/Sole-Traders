const conn = require('./../utils/dbconn');

exports.getTradeType = (req, res) => {

    const tradeTypeSQL = `SELECT DISTINCT trade_type FROM profiles ORDER BY trade_type;`;

    conn.query(tradeTypeSQL, (err, rows) => {
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
                message: `${rows.length} records returned`,
                result: rows
            });
        }
    });
};

exports.getTopTraders = (req, res) => {

    const traderSQL = `SELECT t.trader_id, t.full_name, p.trade_type, p.region_town, COUNT(b.booking_id) AS total_bookings, ROUND(AVG(r.stars), 1) AS avg_rating FROM traders t INNER JOIN profiles p ON t.trader_id = p.trader_id LEFT JOIN bookings b ON t.trader_id = b.trader_id LEFT JOIN ratings r ON t.trader_id = r.trader_id GROUP BY t.trader_id, t.full_name, p.trade_type, p.region_town ORDER BY total_bookings DESC, avg_rating DESC, t.trader_id ASC LIMIT 8;`;
    conn.query(traderSQL, (err, rows) => {
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

exports.getTraders = (req, res) => {

    const { trade, location } = req.query;

    const traderSQL = `SELECT traders.trader_id, traders.full_name, profiles.trade_type, profiles.region_town, ROUND(AVG(ratings.stars), 1) AS avg_rating FROM traders INNER JOIN profiles ON traders.trader_id = profiles.trader_id LEFT JOIN ratings ON traders.trader_id = ratings.trader_id`;
    let traderSQL2 = traderSQL;
    const params = [];

    if (trade !== '' && location === '') {
        traderSQL2 += ` WHERE profiles.trade_type = ? GROUP BY traders.trader_id, traders.full_name, profiles.trade_type, profiles.region_town ORDER BY avg_rating DESC LIMIT 16`
        params.push(trade);
    } else if (trade === '' && location !== '') {
        traderSQL2 += ` WHERE profiles.region_town = ? GROUP BY traders.trader_id, traders.full_name, profiles.trade_type, profiles.region_town ORDER BY avg_rating DESC LIMIT 16`
        params.push(location);
    } else if (trade !== '' && location !== '') {
        traderSQL2 += ` WHERE profiles.trade_type = ? AND profiles.region_town = ? GROUP BY traders.trader_id, traders.full_name, profiles.trade_type, profiles.region_town ORDER BY avg_rating DESC LIMIT 16`
        params.push(trade, location);
    } else {
        traderSQL2 += ` GROUP BY traders.trader_id, traders.full_name, profiles.trade_type, profiles.region_town ORDER BY avg_rating DESC LIMIT 16`
    }

    conn.query(traderSQL2, params, (err, rows) => {
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

exports.getTrader = (req, res) => {

    const { id } = req.params;

    const selectSQL = `SELECT traders.trader_id,traders.full_name, traders.username, traders.email_address, traders.created_at, profiles.trade_type, profiles.region_town, profiles.bio, profiles.availability_start_time, profiles.availability_end_time, profiles.availability_details, ROUND(AVG(ratings.stars), 1) AS avg_rating
FROM traders INNER JOIN profiles ON traders.trader_id = profiles.trader_id LEFT JOIN ratings ON traders.trader_id = ratings.trader_id WHERE traders.trader_id = ?;`

    conn.query(selectSQL, [id], (err, rows) => {
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
    })
};