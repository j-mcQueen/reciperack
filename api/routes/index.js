const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

router.get("/", recipeController.recipe_list);
router.post("/", recipeController.recipe_create_post);

module.exports = router;
