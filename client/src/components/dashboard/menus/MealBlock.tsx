import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/Edit";
import DeleteIcon from "../../../assets/icons/Delete";
import RecipeIcon from "../../../assets/icons/Recipe";
import BlockButton from "./BlockButton";
import axios from "axios";

export default function MealBlock({ ...props }) {
  const [blockRecipe, setBlockRecipe] = useState({ _id: "", title: "" });

  useEffect(() => {
    // if there has been a change in the selected menu for breakfast/lunch/dinner
    // change can occur via a recipe replacement or addition
    let ignore = false;

    const renderRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${props.mealRecipe.recipe}`,
          { withCredentials: true }
        );

        if (response && !ignore) {
          setBlockRecipe(response.data);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    };
    if (props.mealRecipe.recipe !== undefined) renderRecipe();

    return () => {
      ignore = true;
    };
  }, [props.mealRecipe.recipe]);

  return (
    <article className="font-manrope tracking-tighter rounded-lg bg-main border border-solid border-offmain grid grid-cols-2 gap-3 p-3">
      <h3 className="flex items-center justify-center bg-logoBg rounded-lg p-2 text-2xl font-bold">
        {props.meal}
      </h3>
      {props.mealRecipe.recipe ? (
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
              props.setMenuModal(true);
              props.setActiveMeal(props.meal);
              props.setModalAction("update");
            }}
            type="button"
            className="flex justify-center text-sm items-center gap-3 rounded-lg border border-solid border-blue bg-offblue py-2"
          >
            <EditIcon
              title="Update Menu Recipe"
              className="w-5 h-5 fill-txt1"
            />
            Edit
          </button>

          <button
            type="button"
            className="flex justify-center text-sm items-center gap-3 rounded-lg border border-solid border-red bg-offred py-2"
            onClick={() => {
              props.setActiveMeal(props.meal);
              props.setDeleteMenuRecipeActive(true);
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
          setActiveMeal={props.setActiveMeal}
          setModalAction={props.setModalAction}
          setMenuModal={props.setMenuModal}
          activeDay={props.activeDay}
          meal={props.meal}
        />
      )}
    </article>
  );
}
