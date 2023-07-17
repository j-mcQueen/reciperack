import { useEffect, useState } from "react";
import axios from "axios";

import addIcon from "../../assets/icons/add.svg";
import CreateRecipe from "./CreateRecipe";
import Recipe from "./Recipe";

export default function Dashboard() {
  const [addRecipeActive, setAddRecipeActive] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // retrieve recipes from the database on page load and update recipes state accordingly
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        if (response) {
          setRecipes(response.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getRecipes();
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-manrope font-bold tracking-tighter text-5xl">
            Recipe Dashboard
          </h1>
          <p className="font-manrope text-xl text-txt2 py-2">Welcome!</p>
        </div>

        <div>
          <button
            className="font-manrope font-bold tracking-tighter text-main bg-gold rounded flex gap-1 items-center px-3 py-3"
            type="button"
            onClick={() => setAddRecipeActive(true)}
          >
            <img
              className="w-5 h-5"
              src={addIcon}
              alt="A magnifying glass icon"
            />{" "}
            Add Recipe
          </button>
        </div>
      </div>

      <div className="flex gap-5">
        {addRecipeActive ? (
          <CreateRecipe
            addRecipeActive={addRecipeActive}
            setAddRecipeActive={setAddRecipeActive}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        ) : (
          <></>
        )}

        {recipes.map((recipe: any) => (
          <Recipe key={recipe._id} recipe={recipe}></Recipe>
        ))}
      </div>
    </div>
  );
}
