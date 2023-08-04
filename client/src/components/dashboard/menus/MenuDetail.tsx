import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "../DetailHeader";
import Table from "./Table";
import AddModal from "./AddModal";
import DeleteMenu from "./DeleteMenu";

export default function MenuDetail() {
  const [addModal, setAddModal] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeMeal, setActiveMeal] = useState("");
  const [deleteMenuActive, setDeleteMenuActive] = useState(false);

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
  });

  useEffect(() => {
    let ignore = false;

    const getMenuDetail = async () => {
      const urlArr = window.location.href.split("/menus/");
      const id = urlArr[urlArr.length - 1];
      try {
        const response = await axios.get(`http://localhost:3000/menus/${id}`);

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
        {addModal ? (
          <AddModal
            meal={activeMeal}
            activeDay={activeDay}
            menu={menu}
            setMenu={setMenu}
            setAddModal={setAddModal}
          />
        ) : null}

        <Table
          menu={menu}
          setMenu={setMenu}
          setActiveMeal={setActiveMeal}
          activeDay={activeDay}
          addModal={addModal}
          setAddModal={setAddModal}
        />
      </section>
    </main>
  );
}
