require("dotenv/config");
const User = require("./models/user");
const createError = require("http-errors");
const RateLimit = require("express-rate-limit");
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const indexRouter = require("./routes/index");

const app = express();
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

const main = async () => {
  try {
    await mongoose.connect(mongoDB);
  } catch (err) {
    console.log(err);
  }
};
main();

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  // 100 requests max per minute
});

app.enable("trust proxy");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://reciperack.vercel.app",
    ],
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "reciperack.vercel.app"],
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 7 * 24 * 60 * 60,
    }),
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
