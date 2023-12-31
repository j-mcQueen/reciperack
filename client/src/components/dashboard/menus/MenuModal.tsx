import axios from "axios";
import { useState, useEffect } from "react";
import CloseIcon from "../../../assets/icons/Close";
import AddIcon from "../../../assets/icons/Add";
import EditIcon from "../../../assets/icons/Edit";
import { useNavigate } from "react-router-dom";

export default function MenuModal({ ...props }) {
  const navigate = useNavigate();

  const [allRecipes, setAllRecipes] = useState([]);
  const [chosenRecipeId, setChosenRecipeId] = useState("");

  useEffect(() => {
    // on mount, perform a get request which retrieves all the recipes in the given category
    const getRecipes = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://reciperack-api.vercel.app/recipes",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response) {
          setAllRecipes(response.data);
          setChosenRecipeId(response.data[0]._id); // set the default chosen recipe to the first item in all recipes
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes("401")) {
          props.setters.setUnauthorized(true);
          localStorage.removeItem("token");

          setTimeout(() => {
            return navigate("/gate");
          }, 5000);
        }
      }
    };
    getRecipes();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
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
          // meal numbers represent their actual position in the menu - that way if other recipes get removed, their order is unaffected
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

      const response = await axios.put(
        `https://reciperack-api.vercel.app/user/${props.vals.userId}`,
        { updatedMenu },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response) {
        props.setters.setMenu(response.data);
        props.setters.setMenuModal(false);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        props.setters.setUnauthorized(true);
        localStorage.removeItem("token");

        setTimeout(() => {
          return navigate("/gate");
        }, 5000);
      }
    }
    props.setters.setMenuModal(false);
  };

  return (
    <div className="absolute bg-main p-3 border border-offmain border-solid rounded-lg">
      <div className="flex items-center justify-between tracking-tighter font-manrope gap-5 text-2xl">
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
          className="border border-solid border-offgold rounded-lg p-2 hover:bg-offgold hover:transition-colors transition-colors"
          onClick={() => props.setters.setMenuModal(false)}
          type="button"
        >
          <CloseIcon title="Close menu modal" className="w-5 h-5 fill-txt2" />
        </button>
      </div>

      <form
        className="font-manrope tracking-tighter"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          <select
            onChange={(e) => setChosenRecipeId(e.target.value)}
            className="font-manrope text-offmain w-full p-2 my-3 rounded-lg"
            name="recipes"
            required
          >
            {allRecipes.map((recipe: { _id: string; title: string }) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </label>

        {props.vals.modalAction === "add" ? (
          <button
            className="flex justify-center items-center bg-offgreen border-solid border-green border rounded-lg w-full p-3 gap-2 hover:bg-transgreen hover:transition-colors transition-colors"
            type="submit"
          >
            <AddIcon className="w-5 h-5 fill-txt1" />
            Add Recipe
          </button>
        ) : (
          <button
            className="flex justify-center items-center bg-offblue border-solid border-blue border rounded-lg w-full p-3 gap-2 hover:bg-blue hover:transition-colors transition-colors"
            type="submit"
          >
            <EditIcon className="w-5 h-5 fill-txt1" />
            Update Recipe
          </button>
        )}
      </form>
    </div>
  );
}
