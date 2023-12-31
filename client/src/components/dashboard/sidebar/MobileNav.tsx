import { useNavigate } from "react-router-dom";
import RecipeIcon from "../../../assets/icons/Recipe";
import MenuIcon from "../../../assets/icons/Menu";
import LogoutIcon from "../../../assets/icons/Logout";
import SpinnerIcon from "../../../assets/icons/Spinner";

export default function MobileNav({ ...props }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.setSpinner(true);
    localStorage.removeItem("token");
    return navigate("/gate");
  };

  const Button = ({ ...props }) => {
    return (
      <button
        className={
          props.activeNavItem === props.value
            ? "flex flex-col items-center border-b-2 border-solid border-b-green p-2"
            : "flex flex-col items-center border-b-2 border-solid border-b-main p-2"
        }
        onClick={() => props.setter(props.value)}
        type="button"
      >
        {props.icon}
        {props.text}
      </button>
    );
  };

  return (
    <nav
      className={
        props.mobileLinksActive
          ? "transition-transform duration-300 fixed bottom-0 w-[calc(100%-1.5rem)] bg-main rounded-lg p-3 my-3 border border-solid border-offmain"
          : "transition-transform duration-300 transform translate-y-full fixed bottom-0 w-[calc(100%-1.5rem)] bg-main rounded-lg p-3 my-3 border border-solid border-offmain"
      }
    >
      <ul className="font-manrope tracking-tighter text-txt2 text-sm flex justify-evenly gap-5">
        <li>
          <Button
            icon={<RecipeIcon className="w-5 h-5 fill-txt1" />}
            activeNavItem={props.activeNavItem}
            setter={props.setActiveNavItem}
            value={0}
            text="Recipes"
          />
        </li>

        <li>
          <Button
            icon={<MenuIcon className="w-5 h-5 fill-txt1" />}
            activeNavItem={props.activeNavItem}
            setter={props.setActiveNavItem}
            value={1}
            text="Menus"
          />
        </li>

        <li>
          <button
            onClick={() => handleLogout()}
            className="flex flex-col items-center border border-solid border-main p-2"
            type="button"
          >
            {props.spinner ? (
              <SpinnerIcon className="w-5 h-5 fill-txt1" />
            ) : (
              <>
                <LogoutIcon className="w-5 h-5 fill-txt1" />
                Logout
              </>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
