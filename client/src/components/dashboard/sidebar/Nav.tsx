import { Link } from "react-router-dom";
import icons from "../../../assets/icons/export";

export default function Nav({ ...props }) {
  return (
    <div className="flex flex-col justify-between col-start-1">
      <h2 className="font-logo text-center">reciperack</h2>

      <nav>
        <ul className="flex flex-col items-center gap-1 py-5">
          <li
            className={
              props.activeNavItem === 0
                ? "bg-offgreen rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
                : "flex gap-2 rounded-lg items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
            }
          >
            <img
              className="w-5 h-5"
              src={icons.recipe}
              alt="A knife and fork icon"
            />

            <button onClick={() => props.setActiveNavItem(0)} type="button">
              Recipes
            </button>
          </li>

          <li
            className={
              props.activeNavItem === 1
                ? "bg-offgreen rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
                : "flex gap-2 rounded-lg items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
            }
          >
            <img className="w-5 h-5" src={icons.menu} alt="A list icon" />
            <button onClick={() => props.setActiveNavItem(1)} type="button">
              Menus
            </button>
          </li>

          <li
            className={
              props.activeNavItem === 2
                ? "bg-offgreen rounded-lg flex gap-2 items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
                : "flex gap-2 rounded-lg items-center font-manrope font-semibold tracking-tighter px-3 py-2 hover:transition-colors transition-colors"
            }
          >
            <img
              className="w-5 h-5"
              src={icons.search}
              alt="A magnifying glass icon"
            />
            <button onClick={() => props.setActiveNavItem(2)} type="button">
              Browse
            </button>
          </li>
        </ul>

        <div className="flex justify-center gap-3">
          <Link to="">
            <img
              className="border-offmain border-solid border rounded-lg p-2 hover:border-offgreen hover:transition-colors transition-colors"
              src={icons.settings}
              alt="A cogwheel icon"
            />
          </Link>

          <Link to="">
            <img
              className="border-offmain border-solid border rounded-lg p-2 hover:border-offgreen hover:transition-colors transition-colors"
              src={icons.logout}
              alt="A logout icon"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
