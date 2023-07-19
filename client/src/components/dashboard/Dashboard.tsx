import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import icons from "../../assets/icons/export";
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
    <div className="grid grid-cols-dashboard p-5">
      <div className="flex flex-col justify-between col-start-1">
        <h2 className="font-logo text-center">reciperack</h2>

        <nav>
          <ul className="flex flex-col items-center">
            <li className="bg-offgreen rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter p-3">
              <img
                className="w-5 h-5"
                src={icons.recipe}
                alt="A knife and fork icon"
              />
              <button type="button">Recipes</button>
            </li>

            <li className="flex gap-2 items-center font-manrope font-semibold tracking-tighter m-3">
              <img className="w-5 h-5" src={icons.menu} alt="A list icon" />
              <button type="button">Menus</button>
            </li>

            <li className="flex gap-2 items-center font-manrope font-semibold tracking-tighter m-3">
              <img
                className="w-5 h-5"
                src={icons.search}
                alt="A magnifying glass icon"
              />
              <button type="button">Browse</button>
            </li>
          </ul>

          <div className="flex justify-center gap-3">
            <Link to="">
              <img
                className="border-offmain border-solid border rounded-lg p-2 hover:border-offgreen hover:transition-colors transition-colors"
                src={icons.settings}
                alt="A cogwheel icon"
              />
            </Link>

            <Link to="">
              <img
                className="border-offmain border-solid border rounded-lg p-2 hover:border-offgreen hover:transition-colors transition-colors"
                src={icons.logout}
                alt="A logout icon"
              />
            </Link>
          </div>
        </nav>
      </div>

      <div className="col-start-2">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="font-manrope font-bold tracking-tighter text-5xl">
              Recipes Dashboard
            </h1>
            <p className="font-manrope text-xl text-txt2 py-2">Welcome!</p>
          </div>

          <button
            className="font-manrope font-bold tracking-tighter text-main bg-gold rounded flex gap-1 items-center px-3 py-3"
            type="button"
            onClick={() => setAddRecipeActive(true)}
          >
            <img
              className="w-5 h-5"
              src={icons.add}
              alt="A magnifying glass icon"
            />{" "}
            Add Recipe
          </button>
        </header>

        <main className="flex gap-5">
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

          {recipes.map((recipe: { _id: string }) => (
            <Recipe key={recipe._id} recipe={recipe}></Recipe>
          ))}
        </main>
      </div>
    </div>
  );
}
