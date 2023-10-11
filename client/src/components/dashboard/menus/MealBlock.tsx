import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/Edit";
import DeleteIcon from "../../../assets/icons/Delete";
import RecipeIcon from "../../../assets/icons/Recipe";
import BlockButton from "./BlockButton";
import axios from "axios";

export default function MealBlock({ ...props }) {
  const navigate = useNavigate();
  const [blockRecipe, setBlockRecipe] = useState({ _id: "", title: "" });

  useEffect(() => {
    // if there has been a change in the selected menu for breakfast/lunch/dinner
    // change can occur via a recipe replacement or addition
    let ignore = false;

    const renderRecipe = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          // `https://reciperack-api.vercel.app/recipes/${props.vals.mealRecipe.recipe}`,
          `http://localhost:3000/recipes/${props.vals.mealRecipe.recipe}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response && !ignore) {
          setBlockRecipe(response.data);
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes("401")) {
          props.setters.setUnauthorized(true);
          localStorage.removeItem("token");

          setTimeout(() => {
            return navigate("/gate");
          }, 100000);
        }
      }
    };
    if (props.vals.mealRecipe.recipe !== undefined) renderRecipe();

    return () => {
      ignore = true;
    };
  }, [props.vals.mealRecipe.recipe]);

  return (
    <article className="font-manrope tracking-tighter rounded-lg bg-main border border-solid border-offmain grid grid-cols-2 gap-3 p-3">
      <h3 className="flex items-center justify-center bg-logoBg rounded-lg p-2 text-2xl font-bold">
        {props.vals.meal}
      </h3>

      {props.vals.mealRecipe.recipe ? (
        <>
          <Link
            className="flex flex-col text-lg justify-center items-center border border-solid border-offgold bg-offgold rounded-lg p-3 hover:bg-transgold hover:transition-colors transition-colors"
            to={`/recipes/${blockRecipe._id}`}
          >
            <RecipeIcon className="w-5 h-5 fill-txt1" />
            {blockRecipe.title}
          </Link>

          <button
            onClick={() => {
              props.setters.setMenuModal(true);
              props.setters.setActiveMeal(props.vals.meal);
              props.setters.setModalAction("update");
            }}
            type="button"
            className="flex justify-center text-sm items-center gap-3 rounded-lg border border-solid border-blue bg-offblue xl:hover:bg-blue xl:transition-colors xl:hover:transition-colors py-2"
          >
            <EditIcon
              title="Update Menu Recipe"
              className="w-5 h-5 fill-txt1"
            />
            Edit
          </button>

          <button
            type="button"
            className="flex justify-center text-sm items-center gap-3 rounded-lg border border-solid border-red bg-offred xl:hover:bg-transred xl:hover:transition-colors xl:transition-colors py-2"
            onClick={() => {
              props.setters.setActiveMeal(props.vals.meal);
              props.setters.setDeleteMenuRecipeActive(true);
            }}
          >
            <DeleteIcon
              title="Delete Menu Recipe"
              className="w-5 h-5 fill-txt1"
            />
            Delete
          </button>
        </>
      ) : (
        <BlockButton
          vals={{ meal: props.vals.meal, activeDay: props.vals.activeDay }}
          setters={{
            setActiveMeal: props.setters.setActiveMeal,
            setModalAction: props.setters.setModalAction,
            setMenuModal: props.setters.setMenuModal,
          }}
        />
      )}
    </article>
  );
}
