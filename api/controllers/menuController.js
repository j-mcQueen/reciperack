const Menu = require("../models/menu");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.menu_create_post = [
  body("title", "Title must not be empty").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const menu = new Menu({
      title: req.body.title,
    });

    if (!errors.isEmpty()) {
      res.send({ menu, errors: errors.array() });
      return;
    } else {
      await menu.save();
      res.send(menu);
    }
  }),
];
