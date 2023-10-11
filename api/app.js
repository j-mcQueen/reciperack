require("dotenv").config();
const User = require("./models/user");
const createError = require("http-errors");
const RateLimit = require("express-rate-limit");
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { ExtractJwt } = require("passport-jwt");

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

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://reciperack.vercel.app",
    ],
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
      const match = await bcrypt.compare(password, user.password);
      if (!user || !match) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(null, false);
      }
    }
  )
);

app.use(passport.initialize());
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
