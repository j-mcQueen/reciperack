import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "../DetailHeader";
import Table from "./Table";
import DeleteMenu from "./DeleteMenu";
import DeleteRecipe from "../recipes/DeleteRecipe";
import MenuModal from "./MenuModal";

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
    <main>
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

      <DetailHeader setDeleteItemActive={setDeleteMenuActive} item={menu} />

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
      </section>

      <section className="flex justify-center">
        {menuModal ? (
          <MenuModal
            meal={activeMeal}
            activeDay={activeDay}
            menu={menu}
            setMenu={setMenu}
            setMenuModal={setMenuModal}
            modal={{ modalAction, setModalAction }}
          />
        ) : null}

        <Table
          menu={menu}
          deleteMenuRecipeActive={deleteMenuRecipeActive}
          setDeleteMenuRecipeActive={setDeleteMenuRecipeActive}
          setActiveMeal={setActiveMeal}
          activeDay={activeDay}
          setMenuModal={setMenuModal}
          setModalAction={setModalAction}
          meals={{ breakfast, lunch, dinner }}
          setMeals={{ setBreakfast, setLunch, setDinner }}
        />
      </section>
    </main>
  );
}
