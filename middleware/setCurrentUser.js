function setCurrentUser(req, res, next) {
    res.locals.currentUser = req.user;
    return next();
}

module.exports = { setCurrentUser };
