import { useEffect } from "react";
import TableRow from "./TableRow";

export default function Table({ ...props }) {
  useEffect(() => {
    props.setMeals.setBreakfast({});
    props.setMeals.setLunch({});
    props.setMeals.setDinner({});
  }, [props.activeDay]);

  useEffect(() => {
    const day = props.activeDay.toLowerCase();
    const dayRecipes = props.menu[day];

    for (const recipe of dayRecipes) {
      if (recipe.meal === 0) {
        props.setMeals.setBreakfast(recipe);
      } else if (recipe.meal === 1) {
        props.setMeals.setLunch(recipe);
      } else {
        props.setMeals.setDinner(recipe);
      }
    }
  }, [props.activeDay, props.menu]);

  return (
    <>
      <table className="font-manrope table-fixed border-collapse m-10">
        <caption className="text-3xl tracking-tighter p-3 border border-solid border-offmain">
          {props.activeDay} recipes
        </caption>

        <tbody>
          <TableRow
            meal={"Breakfast"}
            recipe={props.meals.breakfast}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setMenuModal={props.setMenuModal}
            setModalAction={props.setModalAction}
            setActiveMeal={props.setActiveMeal}
          />

          <TableRow
            meal={"Lunch"}
            recipe={props.meals.lunch}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setMenuModal={props.setMenuModal}
            setModalAction={props.setModalAction}
            setActiveMeal={props.setActiveMeal}
          />

          <TableRow
            meal={"Dinner"}
            recipe={props.meals.dinner}
            setDeleteMenuRecipeActive={props.setDeleteMenuRecipeActive}
            activeDay={props.activeDay}
            setMenuModal={props.setMenuModal}
            setModalAction={props.setModalAction}
            setActiveMeal={props.setActiveMeal}
          />
        </tbody>
      </table>
    </>
  );
}
