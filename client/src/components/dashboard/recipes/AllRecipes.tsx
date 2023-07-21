import axios from "axios";
import { useEffect } from "react";
import CreateRecipe from "./CreateRecipe";
import Recipe from "./Recipe";

export default function AllRecipes({ ...props }) {
  useEffect(() => {
    // retrieve recipes from the database on page load and update recipes state accordingly
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        if (response) props.setRecipes(response.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getRecipes();
  }, []);

  return (
    <main className="flex gap-5">
      {props.addRecipeActive ? (
        <CreateRecipe
          addRecipeActive={props.addRecipeActive}
          setAddRecipeActive={props.setAddRecipeActive}
          recipes={props.recipes}
          setRecipes={props.setRecipes}
        />
      ) : null}

      {props.recipes.map((recipe: { _id: string }) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </main>
  );
}
