const express = require("express");
const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

router.post("/signup", userController.user_create_post);
router.post("/login", userController.user_login_post);
router.get("/user", userController.get_user);
router.put("/user/:id", userController.user_update);

router.get("/recipes", recipeController.recipe_list);
router.post("/recipes", recipeController.recipe_create_post);
router.get("/recipes/:id", recipeController.recipe_detail);
router.put("/recipes/:id", recipeController.recipe_update);
router.delete("/recipes/:id", recipeController.recipe_delete);

module.exports = router;
