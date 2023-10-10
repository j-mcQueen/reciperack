require("dotenv/config");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.user_create_post = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username field must not be empty.")
    .isLength({ min: 5 })
    .withMessage("Username must be longer than 5 characters.")
    .isAlphanumeric()
    .withMessage("Username must contain alphanumerical characters only."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email field must not be empty")
    .isEmail()
    .withMessage("Please enter a valid email address, e.g. example@gmail.com"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty.")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Valid passwords must have a length of 8 or greater and contain at least 1 uppercase, 1 lowercase, and 1 symbol characters"
    ),
  body("cpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const existingEmail = await User.findOne({ email: req.body.email });
      const existingUsername = await User.findOne({
        username: req.body.username,
      });

      if (!errors.isEmpty()) {
        // there are validation errors
        return res.send({ errors: errors.array() });
      } else if (existingUsername) {
        // username already exists
        return res.send({
          usernameTaken: true,
          message: "Username already in use.",
        });
      } else if (existingEmail) {
        // email address already exists
        return res.send({
          emailTaken: true,
          message: "Email address already in use.",
        });
      } else {
        // add the user to the db
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            // encryption of password failed
            console.log(err);
            return next(err);
          }

          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });

          const result = await user.save();

          const token = jwt.sign(
            {
              _id: result._id,
              menu: result.menu,
              recipes: result.recipes,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
          );

          return res.status(200).send(token);
        });
      }
    } catch (err) {
      return next(err);
    }
  }),
];

exports.user_login_post = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Username must be longer than 5 characters.")
    .isAlphanumeric()
    .withMessage("Username must contain alphanumerical characters only."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field must not be empty.")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Valid passwords must have a length of 8 or greater and contain at least 1 uppercase, 1 lowercase, and 1 symbol characters"
    ),
  asyncHandler((req, res, next) => {
    // form validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are validation errors
      res.send({ errors: errors.array() });
      return;
    }
    next();
  }),
  passport.authenticate("local", {
    // authentication
    failWithError: true,
    session: false,
  }),
  (err, req, res, next) => {
    // handle error
    return res.sendStatus(401);
  },
  (req, res, next) => {
    // handle success
    const token = jwt.sign(
      { _id: req.user._id, menu: req.user.menu, recipes: req.user.recipes },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).send(token);
  },
];

exports.get_user = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, data) => {
    if (err || !data) {
      // handle error
      return res.sendStatus(401);
    }

    // handle success
    return res
      .status(200)
      .send({ _id: data._id, recipes: data.recipes, menu: data.menu });
  })(req, res, next);
};

exports.user_update = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, data) => {
    if (err || !data) {
      // auth error
      return res.sendStatus(401);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { menu: req.body.updatedMenu } },
        { new: true }
      );

      res.status(200).send(updatedUser.menu);
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};
