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
    <div>
      <div>
        <button type="button" onClick={() => setAddRecipeActive(true)}>
          <img src={addIcon} alt="A magnifying glass icon" />
        </button>
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
