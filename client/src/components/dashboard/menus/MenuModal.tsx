import axios from "axios";
import { useState, useEffect } from "react";
import CloseIcon from "../../../assets/icons/Close";

export default function MenuModal({ ...props }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [chosenRecipeId, setChosenRecipeId] = useState("");

  useEffect(() => {
    // on mount, perform a get request which retrieves all the recipes in the given category
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes", {
          withCredentials: true,
        });

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

      const replaceRecipe = (val: number) => {
        for (const key of updatedDayRecipes) {
          if (key.meal === val) key.recipe = chosenRecipeId;
        }
      };

      if (props.modal.modalAction === "add") {
        if (props.meal === "Breakfast") {
          // meal numbers represent their actual position in the menu - that way if other recipes get removed, their position in the table is not affected
          updatedDayRecipes.push({ meal: 0, recipe: chosenRecipeId });
        } else if (props.meal === "Lunch") {
          updatedDayRecipes.push({ meal: 1, recipe: chosenRecipeId });
        } else {
          updatedDayRecipes.push({ meal: 2, recipe: chosenRecipeId });
        }
      } else {
        if (props.meal === "Breakfast") {
          replaceRecipe(0);
        } else if (props.meal === "Lunch") {
          replaceRecipe(1);
        } else {
          replaceRecipe(2);
        }
      }
      const updatedMenu = { ...props.menu, [day]: updatedDayRecipes };

      const response = await axios.put(
        `http://localhost:3000/menus/${props.menu._id}`,
        updatedMenu,
        { withCredentials: true }
      );

      if (response) {
        props.setMenu(updatedMenu);
        props.setMenuModal(false);
      }
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
    props.setMenuModal(false);
  };

  return (
    <div className="absolute bg-main p-3 border border-offmain border-solid rounded-lg">
      <div className="flex font-manrope gap-5">
        {props.modal.modalAction === "add" ? (
          <h2 tabIndex={0}>
            Add recipe to {props.menu.title}, {props.meal}: {props.activeDay}
          </h2>
        ) : (
          <h2 tabIndex={0}>
            Update {props.meal}: {props.activeDay} recipe
          </h2>
        )}

        <button
          className="border border-solid border-offgold rounded-lg p-1 hover:bg-offgold hover:transition-colors transition-colors"
          onClick={() => props.setMenuModal(false)}
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

        {props.modal.modalAction === "add" ? (
          <button
            className="font-manrope py-2 bg-offgreen border border-solid border-green rounded-lg w-full"
            type="submit"
          >
            Add
          </button>
        ) : (
          <button
            className="font-manrope py-2 bg-offgreen border border-solid border-green rounded-lg w-full"
            type="submit"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
}
