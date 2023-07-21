const express = require("express");
const recipeController = require("../controllers/recipeController");
const menuController = require("../controllers/menuController");
const router = express.Router();

router.get("/recipes", recipeController.recipe_list);
router.post("/recipes", recipeController.recipe_create_post);
router.get("/recipes/:id", recipeController.recipe_detail);
router.post("/recipes/:id", recipeController.recipe_update_post);
router.post("/recipes/:id/delete", recipeController.recipe_delete_post);

router.get("/menus", menuController.menu_list);
router.post("/menus", menuController.menu_create_post);

module.exports = router;
