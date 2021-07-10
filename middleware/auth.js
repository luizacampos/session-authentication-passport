function checkAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/user/login");
}

function checkNotAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}

module.exports = { checkAuthenticate, checkNotAuthenticate };
