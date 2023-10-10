import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import { useNavigate } from "react-router-dom";
import Warning from "../../../assets/icons/Warning";

export default function DeleteRecipe({ ...props }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (props.vals.source === "source") {
      // if user wants to delete the source recipe
      try {
        const response = await axios.delete(
          // `https://reciperack-api.vercel.app/recipes/${props.vals.recipe._id}`,
          `http://localhost:3000/recipes/${props.vals.recipe._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          // if props.vals.detail has been set to true, the source of the deletion comes from the recipe detail page, so navigate to dashboard
          if (props.vals.detail) navigate("/dashboard");
          else navigate(0);
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
          // `https://reciperack-api.vercel.app/user/${props.vals.userId}`,
          `http://localhost:3000/user/${props.vals.userId}`,
          { updatedMenu },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response) {
          props.setters.setMenu(response.data);
          props.setters.setDeleteMenuRecipeActive(false);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    }
  };

  const handleClose = (source: string) => {
    if (source === "source") {
      props.setters.setDeleteRecipeActive(false);
      if (props.vals.targetRecipe !== undefined)
        props.setters.setTargetRecipe(false);
    } else {
      props.setters.setDeleteMenuRecipeActive(false);
    }
  };

  return (
    <div className="flex flex-col gap-7 xl:gap-7 bg-main border-solid border rounded-lg border-offmain p-5 xl:mx-0 xl:w-1/3 w-[calc(100%-1.25rem)]">
      <div className="flex items-center justify-between xl:gap-3">
        <h3 className="font-manrope font-semibold text-2xl tracking-tighter">
          {props.vals.recipe
            ? `Delete recipe: ${props.vals.recipe.title}`
            : `Remove recipe from ${props.vals.activeDay}: ${props.vals.activeMeal}`}
        </h3>

        <button
          type="button"
          className="self-start border-solid border border-offgold rounded-lg p-2 hover:bg-transgold hover:transition-colors transition-colors"
          onClick={() => handleClose(props.vals.source)}
        >
          <CloseIcon
            title={
              props.vals.recipe
                ? "Close delete recipe modal"
                : "Close remove menu recipe modal"
            }
            className="w-5 h-5 fill-txt2"
          />
        </button>
      </div>

      <div className="font-manrope flex items-center gap-3">
        <Warning title="Delete warning" className="w-10 h-10 fill-red" />

        <div className="tracking-tighter">
          <p className="text-lg">
            Are you sure you want to remove this recipe?
          </p>

          <p className=" text-txt2">
            <strong>This action cannot be undone.</strong>
          </p>
        </div>
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
