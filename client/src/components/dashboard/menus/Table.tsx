import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import DeleteRecipe from "../recipes/DeleteRecipe";

export default function Table({ ...props }) {
  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});

  useEffect(() => {
    // ensures recipes from one day are not placed in the same row for another day
    setBreakfast({});
    setLunch({});
    setDinner({});
  }, [props.activeDay]);

  useEffect(() => {
    const day = props.activeDay.toLowerCase();
    const dayRecipes = props.menu[day];

    for (const recipe of dayRecipes) {
      if (recipe.meal === 0) {
        setBreakfast(recipe);
      } else if (recipe.meal === 1) {
        setLunch(recipe);
      } else {
        setDinner(recipe);
      }
    }
  }, [props.activeDay, props.menu]);

  return (
    <>
      {props.deleteMenuRecipeActive ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
          <DeleteRecipe
            setBreakfast={setBreakfast}
            setLunch={setLunch}
            setDinner={setDinner}
            activeDay={props.activeDay}
            activeMeal={props.activeMeal}
            menu={props.menu}
            setMenu={props.setMenu}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            source="menu"
          />
        </div>
      ) : null}

      <table className="font-manrope table-fixed border-collapse m-10">
        <caption className="text-3xl tracking-tighter p-3 border border-solid border-offmain">
          {props.activeDay} recipes
        </caption>

        <tbody>
          <TableRow
            meal={"Breakfast"}
            recipe={breakfast}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setAddModal={props.setAddModal}
            setActiveMeal={props.setActiveMeal}
          />

          <TableRow
            meal={"Lunch"}
            recipe={lunch}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setAddModal={props.setAddModal}
            setActiveMeal={props.setActiveMeal}
          />

          <TableRow
            meal={"Dinner"}
            recipe={dinner}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setAddModal={props.setAddModal}
            setActiveMeal={props.setActiveMeal}
          />
        </tbody>
      </table>
    </>
  );
}
