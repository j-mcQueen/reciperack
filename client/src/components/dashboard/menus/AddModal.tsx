import { useEffect, useState } from "react";
import CloseIcon from "../../../assets/icons/Close";
import axios from "axios";

export default function AddModal({ ...props }) {
  const [chosenRecipe, setChosenRecipe] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);

  // on mount, perform a get request which retrieves all the recipes in the given category

  useEffect(() => {
    const getRecipes = async () => {
      try {
        // find all recipes
        const response = await axios.get("http://localhost:3000/recipes");
        if (response) setAllRecipes(response.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getRecipes();
  }, []);

  const handleSubmit = async () => {
    // menu should get updated
    // pass all mealRecipes to post request
    // look up $set in mongodb docs
    props.setAddModal(false);
  };

  return (
    <div className="absolute bg-main p-3 border border-offmain border-solid rounded-lg">
      <div className="flex font-manrope">
        <h2 tabIndex={0}>
          Add recipe to {props.menu.title}, {props.meal}: {props.activeDay}
        </h2>

        <button
          className="border border-solid border-offgold rounded-lg p-1"
          onClick={() => props.setAddModal(false)}
          type="button"
        >
          <CloseIcon className="w-5 h-5 fill-txt2" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          {/* select tag has an onchange event which updates chosen recipe state which gets sent in the post request */}
          <select
            className="font-manrope text-offmain w-full p-2 my-3 rounded-lg"
            onChange={(e) => setChosenRecipe(e.target.id)}
            name="recipes"
            required
          >
            {allRecipes.map((recipe: { _id: string; title: string }) => (
              <option key={recipe._id} value={recipe.title} id={recipe._id}>
                {recipe.title}
              </option>
            ))}
            {/* populate options based on recipes with a specific meal value (breakfast, lunch, dinner) - likely going to need a get request here */}
          </select>
        </label>

        <button
          className="font-manrope py-2 bg-offgreen border border-solid border-green rounded-lg w-full"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
