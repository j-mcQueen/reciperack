import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import { useNavigate } from "react-router-dom";

export default function DeleteRecipe({ ...props }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (props.source === "source") {
      // if user wants to delete the source recipe
      try {
        const response = await axios.post(
          `http://localhost:3000/recipes/${props.recipe.id}/delete`
        );

        if (response.status === 200) navigate("/dashboard");
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    } else {
      // if user wants to delete a menu recipe
      try {
        const day = props.activeDay.toLowerCase();
        const dayRecipes = props.menu[day];

        const findTarget = (arr: [{ meal: number }], meal: number) => {
          // helper to splice correct item from dayRecipes array
          let i = 0;
          for (const item of arr) {
            if (item.meal === meal) return i;
            i++;
          }
        };

        // maintains correct positioning of recipes in state after recipe removal
        if (props.activeMeal === "Breakfast") {
          const index = findTarget(dayRecipes, 0);
          dayRecipes.splice(index, 1);
          props.setBreakfast({});
        } else if (props.activeMeal === "Lunch") {
          const index = findTarget(dayRecipes, 1);
          dayRecipes.splice(index, 1);
          props.setLunch({});
        } else {
          const index = findTarget(dayRecipes, 2);
          dayRecipes.splice(index, 1);
          props.setDinner({});
        }

        const updatedMenu = { ...props.menu, [day]: dayRecipes };

        const response = await axios.post(
          `http://localhost:3000/menus/${props.menu._id}`,
          updatedMenu
        );

        if (response) {
          props.setMenu(response.data);
          props.setDeleteMenuRecipeActive(false);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-main border-solid border rounded-lg border-gold p-5 w-1/4">
      <div className="flex items-center gap-5">
        <div>
          <h3 className="font-manrope font-semibold text-2xl tracking-tighter pb-5">
            {props.recipe
              ? `Delete: ${props.recipe.title}`
              : `Remove recipe from ${props.menu.title}`}
          </h3>
          <p className="font-manrope">
            Are you sure you want to remove this recipe?
          </p>
          <p className="font-manrope text-txt2">
            This action cannot be undone.
          </p>
        </div>

        <button
          type="button"
          className="self-start border-solid border border-offgreen rounded-lg p-2 hover:bg-offgreen hover:transition-colors transition-colors"
          onClick={() =>
            props.source === "source"
              ? props.setDeleteRecipeActive(false)
              : props.setDeleteMenuRecipeActive(false)
          }
        >
          <CloseIcon className="w-5 h-5 fill-txt2" />
        </button>
      </div>

      <button
        type="button"
        className="font-manrope bg-offred border border-solid border-red p-3 w-full rounded-lg hover:bg-transred hover:transition-colors transition-colors"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}
