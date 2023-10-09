const passport = require("passport");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.recipe_list = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, data) => {
    if (err || !data) {
      // handle auth error or lack of data
      return res.sendStatus(401);
    }

    // handle success
    try {
      const allRecipes = await Recipe.find({ createdBy: data._id }).exec();
      return res.status(200).send(allRecipes);
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

exports.recipe_create_post = [
  // validate & sanitize
  body("title", "Title must be specified.").trim(),
  body("ingredients").optional({ values: "falsy" }).trim(),
  body("steps").optional({ values: "falsy" }).trim(),
  body("notes").optional({ values: "falsy" }).trim(),
  body("source")
    .optional({ values: "falsy" })
    .isLength({ min: 1 })
    .withMessage("URL must be specified")
    .isURL()
    .withMessage("Please enter a valid URL")
    .trim(),
  (req, res, next) => {
    // handle validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are validation errors
      return res.send({ errors: errors.array() });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (err, data) => {
      if (err || !data) {
        // handle auth error
        // TODO send a 401 error in the response and display the failed auth modal on client
        return res.sendStatus(401);
      }

      const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        notes: req.body.notes,
        category: req.body.category,
        source: req.body.source,
        createdBy: data._id,
      });

      try {
        const newRecipe = await recipe.save();
        await User.findByIdAndUpdate(
          data._id,
          {
            $set: { recipes: [...data.recipes, newRecipe] },
          },
          { new: true }
        );

        return res.status(200).send(newRecipe);
      } catch (err) {
        // error on recipe save, user update, or otherwise
        // TODO send generic error to client
        return next(err);
      }
    })(req, res, next);
  },
];

exports.recipe_detail = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, data) => {
    if (err || !data) {
      // auth error
      return res.sendStatus(401);
    }

    try {
      const recipe = await Recipe.findOne({
        _id: req.params.id,
        createdBy: data._id,
      }).exec();

      return res.send(recipe);
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

exports.recipe_update = [
  // validate & sanitize
  body("title", "Title must be specified.").trim(),
  body("ingredients").optional({ values: "falsy" }).trim(),
  body("steps").optional({ values: "falsy" }).trim(),
  body("notes").optional({ values: "falsy" }).trim(),
  body("source")
    .optional({ values: "falsy" })
    .isLength({ min: 1 })
    .withMessage("URL must be specified")
    .isURL()
    .withMessage("Please enter a valid URL")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (err, data) => {
      const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        notes: req.body.notes,
        category: req.body.category,
        source: req.body.source,
        _id: req.params.id,
        createdBy: data._id,
      });

      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          req.params.id,
          recipe,
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: data._id, recipes: updatedRecipe._id },
          {
            $set: { "recipes.$": updatedRecipe },
          },
          { new: true }
        );

        res.send(updatedRecipe);
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  },
];

exports.recipe_delete = asyncHandler(async (req, res, next) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id).exec();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          recipes: deleted._id,
          // remove all occurrences of deleted recipe in user
          "menu.monday": { recipe: deleted._id },
          "menu.tuesday": { recipe: deleted._id },
          "menu.wednesday": { recipe: deleted._id },
          "menu.thursday": { recipe: deleted._id },
          "menu.friday": { recipe: deleted._id },
          "menu.saturday": { recipe: deleted._id },
          "menu.sunday": { recipe: deleted._id },
        },
      },
      { new: true }
    );

    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});
