import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import { useNavigate } from "react-router-dom";

export default function DeleteRecipe({ ...props }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (props.vals.source === "source") {
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
        const day = props.vals.activeDay.toLowerCase();
        const dayRecipes = props.vals.menu[day];

        const findTarget = (arr: [{ meal: number }], meal: number) => {
          // helper to splice correct item from dayRecipes array
          let i = 0;
          for (const item of arr) {
            if (item.meal === meal) return i;
            i++;
          }
        };

        // maintains correct positioning of recipes in state after recipe removal
        if (props.vals.activeMeal === "Breakfast") {
          const index = findTarget(dayRecipes, 0);
          dayRecipes.splice(index, 1);
          props.setters.setBreakfast({});
        } else if (props.vals.activeMeal === "Lunch") {
          const index = findTarget(dayRecipes, 1);
          dayRecipes.splice(index, 1);
          props.setters.setLunch({});
        } else {
          const index = findTarget(dayRecipes, 2);
          dayRecipes.splice(index, 1);
          props.setters.setDinner({});
        }

        const updatedMenu = { ...props.vals.menu, [day]: dayRecipes };
        const response = await axios.put(
          `http://localhost:3000/user/${props.vals.userId}`,
          { updatedMenu, target: "menu" },
          { withCredentials: true }
        );

        if (response) {
          props.setters.setMenu(response.data.menu);
          props.setters.setDeleteMenuRecipeActive(false);
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
      props.setters.setDeleteMenuRecipeActive(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-main border-solid border rounded-lg border-offmain p-5 mx-3 xl:mx-0 xl:w-1/4">
      <div className="flex items-center gap-5">
        <div>
          <h3 className="font-manrope font-semibold text-2xl tracking-tighter pb-5">
            {props.recipe
              ? `Delete: ${props.recipe.title}`
              : `Remove recipe from ${props.vals.activeDay}: ${props.vals.activeMeal}`}
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
          onClick={() => handleClose(props.vals.source)}
        >
          <CloseIcon
            title="Close delete recipe modal"
            className="w-5 h-5 fill-txt2"
          />
        </button>
      </div>

      <button
        type="button"
        className="font-manrope bg-offred border border-solid border-red p-3 w-full rounded-lg xl:hover:bg-transred xl:hover:transition-colors xl:transition-colors"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}
