const axios = require('axios');

exports.home = async (req, res) => {

    try {
        const endpoint1 = `http://localhost:3002/soletraders/toptraders`;
        const endpoint2 = `http://localhost:3002/soletraders/trades`;

        const [topTradersRes, tradeTypesRes] = await Promise.all([
            axios.get(endpoint1),
            axios.get(endpoint2)
        ]);

        res.render('general/home', { traders: topTradersRes.data.result, tradeTypes: tradeTypesRes.data.result });
    } catch (error) {
        console.log(`Error making API request: ${error}`);
    }
};


exports.getTerms = (req, res) => {
    res.render('trader/terms');
}

exports.getTraders = async (req, res) => {

    const trade = (req.query.trade ?? '').trim();
    const location = (req.query.location ?? '').trim();

    try {
        const endpoint1 = `http://localhost:3002/soletraders/`;
        const endpoint2 = `http://localhost:3002/soletraders/trades`;

        const [tradersRes, tradeTypesRes] = await Promise.all([
            axios.get(endpoint1, { params: { trade, location } }),
            axios.get(endpoint2)
        ]);

        res.render('trader/traders', { traders: tradersRes.data.result, tradeTypes: tradeTypesRes.data.result });
    } catch (error) {
        console.log(`Error making API request: ${error}`);
        res.redirect('/');
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const endpoint1 = `http://localhost:3002/soletraders/trader/${id}`;
        const endpoint2 = `http://localhost:3002/soletraders/services/${id}`;
        const endpoint3 = `http://localhost:3002/soletraders/bookings/${id}`;
        const endpoint4 = `http://localhost:3002/soletraders/servicetitle/${id}`;

        const [traderRes, servicesRes, bookingsRes, serviceTitleRes] = await Promise.allSettled([
            axios.get(endpoint1),
            axios.get(endpoint2),
            axios.get(endpoint3),
            axios.get(endpoint4),
        ]);

        if (traderRes.status !== "fulfilled") {
            return res.redirect('/404');
        }

        const trader = traderRes.value.data.result[0] ?? null;

        const services =
            servicesRes.status === "fulfilled" ? (servicesRes.value.data.result ?? []) : [];

        const bookings =
            bookingsRes.status === "fulfilled" ? (bookingsRes.value.data.result ?? []) : [];
        console.log(bookingsRes.value.data.result);

        const titleData =
            serviceTitleRes.status === "fulfilled" ? (serviceTitleRes.value.data.result ?? []) : [];
        console.log(serviceTitleRes.value.data.result);

        return res.render("trader/traderprofile", { trader, services, bookings, titleData });
    } catch (error) {
        console.log(`Error making API request: ${error}`);
        return res.redirect('/404');
    }
};