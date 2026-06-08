exports.isAuth = (req, res, next) => {

    const { isloggedin } = req.session;
    
    if (!isloggedin) {
        console.log(`isAuth: Current Route = ${req.originalUrl}`);
        req.session.route = req.originalUrl;
        return res.redirect("/login");
    }

    next();

};

exports.authLocal = (req, res, next) => {

    res.locals.loggedin = !!req.session.isloggedin;
    next();

};