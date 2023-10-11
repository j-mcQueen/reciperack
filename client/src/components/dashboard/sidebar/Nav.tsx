import { useNavigate } from "react-router-dom";
import RecipeIcon from "../../../assets/icons/Recipe";
import MenuIcon from "../../../assets/icons/Menu";
import LogoutIcon from "../../../assets/icons/Logout";
import SpinnerIcon from "../../../assets/icons/Spinner";

export default function Nav({ ...props }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.setSpinner(true);
    localStorage.removeItem("token");
    return navigate("/gate");
  };

  return (
    <div className="flex flex-col fixed h-[calc(100vh-2.5rem)] justify-center col-start-1 bg-main rounded-lg p-5">
      <h2 className="font-logo text-center">reciperack</h2>

      <nav className="flex flex-col items-center">
        <ul className="flex flex-col items-center gap-5 py-5">
          <li
            className={
              props.activeNavItem === 0
                ? "bg-offgreen border-green border border-solid rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
                : "border-main border border-solid flex gap-2 rounded-lg items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
            }
          >
            <RecipeIcon className="w-5 h-5 fill-txt2" />
            <button onClick={() => props.setActiveNavItem(0)} type="button">
              Recipes
            </button>
          </li>

          <li
            className={
              props.activeNavItem === 1
                ? "bg-offgreen border-green border border-solid rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
                : " border-main border border-solid flex gap-2 rounded-lg items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
            }
          >
            <MenuIcon className="w-5 h-5 fill-txt2" />
            <button onClick={() => props.setActiveNavItem(1)} type="button">
              Menu
            </button>
          </li>
        </ul>

        <button onClick={() => handleLogout()} type="button">
          {props.spinner ? (
            <SpinnerIcon className="w-10 h-10 p-2 fill-txt2 border-offmain border-solid border rounded-lg hover:border-offgreen hover:transition-colors transition-colors" />
          ) : (
            <LogoutIcon
              title="Logout"
              className="w-10 h-10 p-2 fill-txt2 border-offmain border-solid border rounded-lg hover:border-offgreen hover:transition-colors transition-colors"
            />
          )}
        </button>
      </nav>
    </div>
  );
}
