import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "../DetailHeader";
import DeleteMenu from "./DeleteMenu";
import DeleteRecipe from "../recipes/DeleteRecipe";
import MenuModal from "./MenuModal";
import MobileDetailHeader from "../MobileDetailHeader";
import MealBlock from "./MealBlock";

export default function MenuDetail() {
  const [menuModal, setMenuModal] = useState(false);
  const [modalAction, setModalAction] = useState("add");
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeMeal, setActiveMeal] = useState("");
  const [deleteMenuActive, setDeleteMenuActive] = useState(false);
  const [deleteMenuRecipeActive, setDeleteMenuRecipeActive] = useState(false);

  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});

  const [menu, setMenu] = useState({
    title: "",
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    id: "",
    createdBy: "",
  });

  useEffect(() => {
    let ignore = false;

    const getMenuDetail = async () => {
      const urlArr = window.location.href.split("/menus/");
      const id = urlArr[urlArr.length - 1];
      try {
        const response = await axios.get(`http://localhost:3000/menus/${id}`, {
          withCredentials: true,
        });

        if (response && !ignore) setMenu(response.data);
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    };
    getMenuDetail();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setBreakfast({});
    setLunch({});
    setDinner({});
  }, [activeDay]);

  useEffect(() => {
    const day = activeDay.toLowerCase();
    const dayRecipes = menu[day];

    for (const recipe of dayRecipes) {
      if (recipe.meal === 0) {
        setBreakfast(recipe);
      } else if (recipe.meal === 1) {
        setLunch(recipe);
      } else {
        setDinner(recipe);
      }
    }
  }, [activeDay, menu]);

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const viewport = window.matchMedia("(max-width: 1080px)");

  return (
    <>
      {menuModal ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50 px-5 xl:px-0">
          <MenuModal
            meal={activeMeal}
            activeDay={activeDay}
            menu={menu}
            setMenu={setMenu}
            setMenuModal={setMenuModal}
            modal={{ modalAction, setModalAction }}
          />
        </div>
      ) : null}

      <main className="flex flex-col gap-10">
        {deleteMenuActive ? (
          <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
            <DeleteMenu setDeleteMenuActive={setDeleteMenuActive} menu={menu} />
          </div>
        ) : null}

        {deleteMenuRecipeActive ? (
          <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
            <DeleteRecipe
              setMeals={{ setBreakfast, setLunch, setDinner }}
              activeDay={activeDay}
              activeMeal={activeMeal}
              menu={menu}
              setMenu={setMenu}
              setDeleteMenuRecipeActive={setDeleteMenuRecipeActive}
              source="menu"
            />
          </div>
        ) : null}

        {viewport.matches === true ? (
          <MobileDetailHeader
            item={menu}
            // setUpdateItemActive={setUpdateRecipeActive}
            setDeleteItemActive={setDeleteMenuActive}
          />
        ) : (
          <DetailHeader
            item={menu}
            // setUpdateItemActive={setUpdateRecipeActive}
            setDeleteItemActive={setDeleteMenuActive}
          />
        )}

        <section>
          <form className="font-manrope flex justify-center">
            <label>
              Choose a day:
              <select
                onChange={(e) => setActiveDay(e.target.value)}
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

          <h2 className="font-manrope text-center font-bold text-3xl tracking-tighter pt-10">
            {activeDay} recipes
          </h2>
        </section>

        <section className="grid xl:grid-cols-3 items-start justify-center mx-3 gap-3 xl:mx-10">
          <MealBlock
            meal={"Breakfast"}
            mealRecipe={breakfast}
            setDeleteMenuRecipeActive={setDeleteMenuRecipeActive}
            activeDay={activeDay}
            setMenuModal={setMenuModal}
            setModalAction={setModalAction}
            setActiveMeal={setActiveMeal}
          />

          <MealBlock
            meal={"Lunch"}
            mealRecipe={lunch}
            setDeleteMenuRecipeActive={setDeleteMenuRecipeActive}
            activeDay={activeDay}
            setMenuModal={setMenuModal}
            setModalAction={setModalAction}
            setActiveMeal={setActiveMeal}
          />

          <MealBlock
            meal={"Dinner"}
            mealRecipe={dinner}
            setDeleteMenuRecipeActive={setDeleteMenuRecipeActive}
            activeDay={activeDay}
            setMenuModal={setMenuModal}
            setModalAction={setModalAction}
            setActiveMeal={setActiveMeal}
          />
        </section>
      </main>
    </>
  );
}
