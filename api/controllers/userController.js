const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.user_create_post = [
  // TODO validation & sanitization,
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req.body);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      if (!errors.isEmpty()) {
        // there are errors
        res.send({ user, errors: errors.array() });
        return;
      } else {
        const result = await user.save();
        res.send(result);
      }
    } catch (err) {
      return next(err);
    }
  }),
];
