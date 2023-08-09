const express = require("express");
const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const menuController = require("../controllers/menuController");
const router = express.Router();

router.post("/signup", userController.user_create_post);

router.get("/recipes", recipeController.recipe_list);
router.post("/recipes", recipeController.recipe_create_post);
router.get("/recipes/:id", recipeController.recipe_detail);
router.post("/recipes/:id", recipeController.recipe_update_post);
router.post("/recipes/:id/delete", recipeController.recipe_delete_post);

router.get("/menus", menuController.menu_list);
router.post("/menus", menuController.menu_create_post);
router.get("/menus/:id", menuController.menu_detail);
router.post("/menus/:id", menuController.menu_update_post);
router.post("/menus/:id/delete", menuController.menu_delete_post);

module.exports = router;
