const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

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
        res.send({ errors: errors.array() });
        return;
      } else if (existingUsername) {
        // username already exists
        res.send({
          usernameTaken: true,
          message: "Username already in use.",
        });
        return;
      } else if (existingEmail) {
        // email address already exists
        res.send({
          emailTaken: true,
          message: "Email address already in use.",
        });
        return;
      } else {
        // add the user to the db
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            console.log(err);
            return;
          }

          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });

          const result = await user.save();
          res.send({
            username: result.username,
            recipes: result.recipes,
            menus: result.menus,
            _id: result._id,
          });
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
    failureMessage: true,
  }),
  (err, req, res, next) => {
    // handle error
    res.send(req.session.messages);
    return;
  },
  (req, res, next) => {
    // handle success
    res.send({
      username: req.user.username,
      recipes: req.user.recipes,
      menus: req.user.menus,
      _id: req.user._id,
    });
  },
];

exports.user_logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send("success");
  });
});
