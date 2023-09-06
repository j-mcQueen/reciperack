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
      const day: string = props.vals.activeDay.toLowerCase();
      const updatedDayRecipes = props.vals.menu[day];

      const replaceRecipe = (val: number) => {
        for (const key of updatedDayRecipes) {
          if (key.meal === val) key.recipe = chosenRecipeId;
        }
      };

      if (props.vals.modalAction === "add") {
        if (props.vals.activeMeal === "Breakfast") {
          // meal numbers represent their actual position in the menu - that way if other recipes get removed, their position in the table is not affected
          updatedDayRecipes.push({ meal: 0, recipe: chosenRecipeId });
        } else if (props.vals.activeMeal === "Lunch") {
          updatedDayRecipes.push({ meal: 1, recipe: chosenRecipeId });
        } else {
          updatedDayRecipes.push({ meal: 2, recipe: chosenRecipeId });
        }
      } else {
        if (props.vals.activeMeal === "Breakfast") {
          replaceRecipe(0);
        } else if (props.vals.activeMeal === "Lunch") {
          replaceRecipe(1);
        } else {
          replaceRecipe(2);
        }
      }
      const updatedMenu = { ...props.vals.menu, [day]: updatedDayRecipes };

      // TODO request should update the user rather than the menu
      const response = await axios.put(
        `http://localhost:3000/user/${props.vals.userId}`,
        { updatedMenu, target: "menu" },
        { withCredentials: true }
      );
      // const response = await axios.put(
      //   `http://localhost:3000/menus/${props.vals.menu._id}`,
      //   updatedMenu,
      //   { withCredentials: true }
      // );

      if (response) {
        // props.setters.setMenu(updatedMenu);
        props.setters.setMenu(response.data.menu);
        props.setters.setMenuModal(false);
      }
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
    props.setters.setMenuModal(false);
  };

  return (
    <div className="absolute bg-main p-3 border border-offmain border-solid rounded-lg">
      <div className="flex items-center justify-between tracking-tighter font-manrope gap-5 text-xl">
        {props.vals.modalAction === "add" ? (
          <h3>
            Add recipe to {props.vals.activeDay}: {props.vals.activeMeal}
          </h3>
        ) : (
          <h3>
            Update {props.vals.activeDay}: {props.vals.activeMeal} recipe
          </h3>
        )}

        <button
          autoFocus={true}
          className="border border-solid border-offgold rounded-lg p-1 hover:bg-offgold hover:transition-colors transition-colors"
          onClick={() => props.setters.setMenuModal(false)}
          type="button"
        >
          <CloseIcon title="Close menu modal" className="w-5 h-5 fill-txt2" />
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

        {props.vals.modalAction === "add" ? (
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
