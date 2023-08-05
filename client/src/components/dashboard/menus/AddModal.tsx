import { useEffect, useState } from "react";
import CloseIcon from "../../../assets/icons/Close";
import axios from "axios";

export default function AddModal({ ...props }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [chosenRecipeId, setChosenRecipeId] = useState("");

  useEffect(() => {
    // on mount, perform a get request which retrieves all the recipes in the given category
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");

        if (response) {
          setAllRecipes(response.data);
          setChosenRecipeId(response.data[0]._id); // set the default chosen recipe to the first item in all recipes
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getRecipes();
  }, []);

  const handleSubmit = async () => {
    try {
      const day: string = props.activeDay.toLowerCase();
      const updatedDayRecipes = props.menu[day];

      // meal numbers represent their actual position in the menu - that way if other recipes get removed, their position in the table is not affected
      if (props.meal === "Breakfast") {
        updatedDayRecipes.push({ meal: 0, recipe: chosenRecipeId });
      } else if (props.meal === "Lunch") {
        updatedDayRecipes.push({ meal: 1, recipe: chosenRecipeId });
      } else {
        updatedDayRecipes.push({ meal: 2, recipe: chosenRecipeId });
      }

      const updatedMenu = { ...props.menu, [day]: updatedDayRecipes };
      console.log(updatedMenu);

      const response = await axios.post(
        `http://localhost:3000/menus/${props.menu._id}`,
        updatedMenu
      );

      if (response) props.setMenu(updatedMenu);
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
    props.setAddModal(false);
  };

  return (
    <div className="absolute bg-main p-3 border border-offmain border-solid rounded-lg">
      <div className="flex font-manrope gap-5">
        <h2 tabIndex={0}>
          Add recipe to {props.menu.title}, {props.meal}: {props.activeDay}
        </h2>

        <button
          className="border border-solid border-offgold rounded-lg p-1 hover:bg-offgold hover:transition-colors transition-colors"
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
          <select
            className="font-manrope text-offmain w-full p-2 my-3 rounded-lg"
            name="recipes"
            required
          >
            {allRecipes.map((recipe: { _id: string; title: string }) => (
              <option
                onClick={() => setChosenRecipeId(recipe._id)}
                key={recipe._id}
                value={recipe._id}
              >
                {recipe.title}
              </option>
            ))}
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
