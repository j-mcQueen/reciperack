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
  // process request, return errors in response if they exist or a success message (for now)
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        notes: req.body.notes,
        category: req.body.category,
        source: req.body.source,
        createdBy: req.user._id,
      });

      if (!errors.isEmpty()) {
        // There are validation errors - send them in the response and return
        res.send({ recipe, errors: errors.array() });
        return;
      } else {
        // save the recipe to the database and send the response
        const newRecipe = await recipe.save();

        const user = await User.findByIdAndUpdate(
          req.user._id,
          {
            $set: { recipes: [...req.user.recipes, newRecipe] },
          },
          { new: true }
        );

        // update the user
        res.send(newRecipe);
      }
    } catch (err) {
      return next(err);
    }
  }),
];

exports.recipe_detail = asyncHandler(async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    }).exec();

    res.send(recipe);
  } catch (err) {
    return next(err);
  }
});

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
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        notes: req.body.notes,
        category: req.body.category,
        source: req.body.source,
        _id: req.params.id,
        createdBy: req.user._id,
      });

      if (!errors.isEmpty()) {
        res.send({ recipe, errors: errors.array() });
        return;
      } else {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          req.params.id,
          recipe,
          { new: true }
        );

        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id, recipes: updatedRecipe._id },
          {
            $set: { "recipes.$": updatedRecipe },
          },
          { new: true }
        );

        res.send(updatedRecipe);
      }
    } catch (err) {
      return next(err);
    }
  }),
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
