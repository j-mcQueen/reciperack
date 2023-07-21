import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "../DetailHeader";
import AddIcon from "../../../assets/icons/Add";

export default function MenuDetail() {
  const [updateMenuActive, setUpdateMenuActive] = useState(false);
  const [deleteMenuActive, setDeleteMenuActive] = useState(false);
  const [menu, setMenu] = useState({ title: "", id: "" });

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
        setUpdateItemActive={setUpdateMenuActive}
        setDeletItemActive={setDeleteMenuActive}
      />

      <section>
        <div>
          <AddIcon className="fill-txt2 w-5 h-5" />
        </div>
      </section>
    </main>
  );
}
