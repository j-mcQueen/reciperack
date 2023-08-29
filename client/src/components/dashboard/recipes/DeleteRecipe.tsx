import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import { useNavigate } from "react-router-dom";

export default function DeleteRecipe({ ...props }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (props.source === "source") {
      // if user wants to delete the source recipe
      try {
        const response = await axios.delete(
          `http://localhost:3000/recipes/${props.recipe._id}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          // if the user has delete from the dashboard, there will be a target recipe, therefore refresh
          // otherwise, the user has deleted from the detail page so navigate to dashboard
          if (props.targetRecipe !== undefined) navigate(0);
          else navigate("/dashboard");
        }
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
          props.setMeals.setBreakfast({});
        } else if (props.activeMeal === "Lunch") {
          const index = findTarget(dayRecipes, 1);
          dayRecipes.splice(index, 1);
          props.setMeals.setLunch({});
        } else {
          const index = findTarget(dayRecipes, 2);
          dayRecipes.splice(index, 1);
          props.setMeals.setDinner({});
        }

        const updatedMenu = { ...props.menu, [day]: dayRecipes };

        const response = await axios.put(
          `http://localhost:3000/menus/${props.menu._id}`,
          updatedMenu,
          { withCredentials: true }
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

  const handleClose = (source: string) => {
    if (source === "source") {
      props.setDeleteRecipeActive(false);
      if (props.targetRecipe !== undefined) props.setTargetRecipe(false);
    } else {
      props.setDeleteMenuRecipeActive(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-main border-solid border rounded-lg border-offmain p-5 xl:w-1/4">
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
          className="self-start border-solid border border-gold rounded-lg p-2 hover:bg-offgold hover:transition-colors transition-colors"
          onClick={() => handleClose(props.source)}
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
