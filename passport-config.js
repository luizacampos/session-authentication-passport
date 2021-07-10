const User = require("./models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            async (email, password, done) => {
                const user = await User.findOne({ email: email });
                if (user == null) {
                    return done(null, false, {
                        message: "User with that email was not found",
                    });
                }
                try {
                    var checkPassword = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (checkPassword) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Passwords not matching",
                        });
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            if (user != null) {
                done(null, user);
            }
        } catch (error) {
            done(null, false, { message: "Error deserializing user" });
        }
    });
}
module.exports = initialize;
