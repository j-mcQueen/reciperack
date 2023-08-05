import { useEffect } from "react";
import TableRow from "./TableRow";

export default function Table({ ...props }) {
  const day = props.activeDay.toLowerCase();
  const dayRecipes = props.menu[day];

  useEffect(() => {
    for (const recipe of dayRecipes) {
      if (recipe.meal === 0) {
        props.setBreakfast(recipe);
      } else if (recipe.meal === 1) {
        props.setLunch(recipe);
      } else {
        props.setDinner(recipe);
      }
    }
  }, [dayRecipes, props.menu]);

  return (
    <table className="font-manrope table-fixed border-collapse m-10">
      <caption className="text-3xl tracking-tighter p-3 border border-solid border-offmain">
        {props.activeDay} recipes
      </caption>

      <tbody>
        <TableRow
          meal={"Breakfast"}
          recipe={props.breakfast}
          setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Lunch"}
          recipe={props.lunch}
          setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Dinner"}
          recipe={props.dinner}
          setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />
      </tbody>
    </table>
  );
}
