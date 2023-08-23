const Recipe = require("../models/recipe");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.recipe_list = asyncHandler(async (req, res, next) => {
  const allRecipes = await Recipe.find({ createdBy: req.user._id }).exec();
  res.send(allRecipes);
});

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
      console.log(user);

      // update the user
      res.send(newRecipe);
    }
  }),
];

exports.recipe_detail = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id).exec();

  if (recipe === null) {
    const error = new Error("Recipe not found");
    error.status = 404;
    next(error);
  }

  res.send(recipe);
});

exports.recipe_update_post = [
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
    const errors = validationResult(req);

    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      notes: req.body.notes,
      category: req.body.category,
      source: req.body.source,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.send({ recipe, errors: errors.array() });
      return;
    } else {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        recipe,
        {}
      );

      res.send(updatedRecipe);
    }
  }),
];

exports.recipe_delete_post = asyncHandler(async (req, res, next) => {
  const deleted = await Recipe.findByIdAndDelete(req.params.id).exec();
  res.send(deleted);
});
