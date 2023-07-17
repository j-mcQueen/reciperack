const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

router.get("/", recipeController.recipe_list);
router.post("/", recipeController.recipe_create_post);

router.get("/recipes/:id", recipeController.recipe_detail);
router.post("/recipes/:id", recipeController.recipe_update_post);

module.exports = router;
