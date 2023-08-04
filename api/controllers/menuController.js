const Menu = require("../models/menu");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.menu_list = asyncHandler(async (req, res, next) => {
  const allMenus = await Menu.find().exec();
  res.send(allMenus);
});

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

exports.menu_detail = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id).exec();

  if (menu === null) {
    const error = new Error("Recipe not found");
    error.status = 404;
    next(error);
  }

  res.send(menu);
  return;
});

exports.menu_update_post = [
  // validate and sanitize
  // body("recipes", "Please select a recipe."),
  // handle request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const menu = new Menu({
      title: req.body.title,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.send({ menu, errors: errors.array() });
    } else {
      const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, menu);
      res.send(updatedMenu);
      return;
    }
  }),
];

exports.menu_delete_post = asyncHandler(async (req, res, next) => {
  // menu will likely have associations, so will need to remove those references before actually deleting the menu
  const deleted = await Menu.findByIdAndDelete(req.params.id).exec();
  res.send(deleted);
});
