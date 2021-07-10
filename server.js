const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

// config passport
const initializePassport = require("./passport-config");
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();
app.use(cors());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // used for form data
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log("Database connected OK!");
    })
    .catch((error) => {
        console.log("Sorry. Did not connect");
    });

const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", homeRoutes);
app.use("/user", userRoutes);

app.listen(3001, () => {
    console.log("The server is listening...");
});
