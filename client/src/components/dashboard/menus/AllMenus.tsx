import axios from "axios";
import { useEffect } from "react";
import CreateMenu from "./CreateMenu";
import Menu from "./Menu";

export default function AllMenus({ ...props }) {
  useEffect(() => {
    const getMenus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/menus", {
          withCredentials: true,
        });
        if (response) {
          console.log(response);
          props.setMenus(response.data);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    };
    getMenus();
  }, []);

  return (
    <main className="flex gap-5">
      {props.addMenuActive ? (
        <CreateMenu
          menus={props.menus}
          setMenus={props.setMenus}
          addMenuActive={props.addMenuActive}
          setAddMenuActive={props.setAddMenuActive}
        />
      ) : null}

      {props.menus.map((menu: { _id: string }) => (
        <Menu key={menu._id} menu={menu} />
      ))}
    </main>
  );
}
