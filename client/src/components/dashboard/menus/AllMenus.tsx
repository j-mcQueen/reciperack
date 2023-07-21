import CreateMenu from "./CreateMenu";
import Menu from "./Menu";

export default function AllMenus({ ...props }) {
  return (
    <main>
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
