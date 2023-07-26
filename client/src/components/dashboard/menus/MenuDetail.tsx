import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "../DetailHeader";
import Table from "./Table";
import AddModal from "./AddModal";

export default function MenuDetail() {
  const [addModal, setAddModal] = useState(false);
  // const [updateMenuActive, setUpdateMenuActive] = useState(false);
  // const [deleteMenuActive, setDeleteMenuActive] = useState(false);
  const [menu, setMenu] = useState({ title: "", id: "" });
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeMeal, setActiveMeal] = useState("");

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const getMenuDetail = async () => {
      const urlArr = window.location.href.split("/menus/");
      const id = urlArr[urlArr.length - 1];
      try {
        const response = await axios.get(`http://localhost:3000/menus/${id}`);
        if (response)
          setMenu({ title: response.data.title, id: response.data._id });
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getMenuDetail();
  }, []);

  return (
    <main>
      <DetailHeader
        item={menu}
        // setUpdateItemActive={setUpdateMenuActive}
        // setDeletItemActive={setDeleteMenuActive}
      />
      <section>
        <form>
          <label>
            <select
              onChange={(e) => setActiveDay(e.target.value)}
              className="text-offmain font-manrope"
              name="days"
            >
              {week.map((day: string) => (
                <option className="text-offmain" value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
        </form>
      </section>

      <section className="flex">
        {addModal ? (
          <AddModal
            meal={activeMeal}
            activeDay={activeDay}
            menu={menu}
            setAddModal={setAddModal}
          />
        ) : null}

        <Table
          setActiveMeal={setActiveMeal}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          addModal={addModal}
          setAddModal={setAddModal}
        />
      </section>
    </main>
  );
}
