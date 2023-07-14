const Recipe = require("../models/recipe");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.recipe_list = asyncHandler(async (req, res, next) => {
  const allRecipes = await Recipe.find().exec();
  res.send(allRecipes);
});

exports.recipe_create_post = [
  // validate & sanitize
  body("title", "Title must be specified.").trim().escape(),
  body("ingredients").optional({ values: "falsy" }).trim().escape(),
  body("steps").optional({ values: "falsy" }).trim().escape(),
  body("notes").optional({ values: "falsy" }).trim().escape(),
  body("source")
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
      source: req.body.source,
    });

    if (!errors.isEmpty()) {
      // There are validation errors - send them in the response and return
      res.send({ recipe, errors });
      return;
    } else {
      // save the recipe to the database and send the response
      await recipe.save();
      res.send(recipe);
    }
  }),
];

exports.recipe_detail = asyncHandler(async (req, res, next) => {
  console.log("All in order so far!");
});
