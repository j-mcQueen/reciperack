import { useEffect, useState } from "react";
import MealBlock from "./MealBlock";
import DeleteRecipe from "../recipes/DeleteRecipe";
import ClearIcon from "../../../assets/icons/Clear";
import ClearMenu from "./ClearMenu";

// TODO change component name to UserMenu
export default function AllMenus({ ...props }) {
  const [deleteMenuRecipeActive, setDeleteMenuRecipeActive] = useState(false);
  const [clearModalActive, setClearModalActive] = useState(false);

  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});

  useEffect(() => {
    setBreakfast({});
    setLunch({});
    setDinner({});
  }, [props.vals.activeDay]);

  useEffect(() => {
    const day = props.vals.activeDay.toLowerCase();
    const dayRecipes = props.vals.menu[day];

    for (const recipe of dayRecipes) {
      if (recipe.meal === 0) {
        setBreakfast(recipe);
      } else if (recipe.meal === 1) {
        setLunch(recipe);
      } else {
        setDinner(recipe);
      }
    }
  }, [props.vals.activeDay, props.vals.menu]);

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      {deleteMenuRecipeActive ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
          <DeleteRecipe
            vals={{
              activeDay: props.vals.activeDay,
              activeMeal: props.vals.activeMeal,
              menu: props.vals.menu,
              source: "menu",
              userId: props.vals.userId,
            }}
            setters={{
              setMenu: props.setters.setMenu,
              setBreakfast,
              setLunch,
              setDinner,
              setDeleteMenuRecipeActive,
            }}
          />
        </div>
      ) : null}

      {clearModalActive ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
          <ClearMenu
            vals={{
              menu: props.vals.menu,
              userId: props.vals.userId,
              activeDay: props.vals.activeDay,
            }}
            setters={{
              setBreakfast,
              setLunch,
              setDinner,
              setClearModalActive,
              setMenu: props.setters.setMenu,
            }}
          />
        </div>
      ) : null}

      <main className="flex flex-col gap-5">
        <section className="flex flex-col xl:flex-row xl:justify-between items-center gap-3 xl:gap-5 bg-main xl:mr-5 p-5 rounded-lg">
          <form className="font-manrope flex justify-center">
            <label>
              Choose a day:
              <select
                onChange={(e) => props.setters.setActiveDay(e.target.value)}
                className="bg-main border border-solid border-offmain py-2 px-3 mx-3 rounded-lg focus:border-offgold"
                name="days"
              >
                {week.map((day: string) => (
                  <option key={day} className="text-offmain" value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
          </form>

          <button
            onClick={() => setClearModalActive(true)}
            className="font-manrope flex items-center gap-2 bg-offred border border-solid border-red rounded-lg p-2 xl:hover:transition-colors xl:transition-colors xl:hover:bg-transred"
            type="button"
          >
            <ClearIcon className="fill-txt1 w-5 h-5" />
            Clear
          </button>
        </section>

        <section className="grid xl:grid-cols-3 items-start justify-center mx-3 gap-3 xl:mx-10">
          <MealBlock
            vals={{
              meal: "Breakfast",
              mealRecipe: breakfast,
              activeDay: props.vals.activeDay,
            }}
            setters={{
              setDeleteMenuRecipeActive,
              setMenuModal: props.setters.setMenuModal,
              setModalAction: props.setters.setModalAction,
              setActiveMeal: props.setters.setActiveMeal,
            }}
          />

          <MealBlock
            vals={{
              meal: "Lunch",
              mealRecipe: lunch,
              activeDay: props.vals.activeDay,
            }}
            setters={{
              setDeleteMenuRecipeActive,
              setMenuModal: props.setters.setMenuModal,
              setModalAction: props.setters.setModalAction,
              setActiveMeal: props.setters.setActiveMeal,
            }}
          />

          <MealBlock
            vals={{
              meal: "Dinner",
              mealRecipe: dinner,
              activeDay: props.vals.activeDay,
            }}
            setters={{
              setDeleteMenuRecipeActive,
              setMenuModal: props.setters.setMenuModal,
              setModalAction: props.setters.setModalAction,
              setActiveMeal: props.setters.setActiveMeal,
            }}
          />
        </section>
      </main>
    </>
  );
}
