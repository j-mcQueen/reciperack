import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../../assets/icons/Close";

export default function UpdateRecipe({ ...props }) {
  const navigate = useNavigate();

  const format = (arr: string[]) => {
    // helper to present the recipe details in the form field in a manner that is easier to edit
    let str = "";
    for (const item of arr) {
      str += item + "\n";
    }
    return str;
  };

  const [title, setTitle] = useState(props.recipe.title);
  const [ingredients, setIngredients] = useState(
    format(props.recipe.ingredients)
  );
  const [steps, setSteps] = useState(format(props.recipe.steps));
  const [notes, setNotes] = useState(format(props.recipe.notes));
  const [category, setCategory] = useState(props.recipe.category);
  const [source, setSource] = useState(props.recipe.source);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://reciperack-api.vercel.app/recipes/${props.recipe._id}`,
        {
          title,
          ingredients,
          steps,
          notes,
          category,
          source,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) navigate(0); // refresh page
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        props.setUnauthorized(true);
        localStorage.removeItem("token");

        setTimeout(() => {
          return navigate("/gate");
        }, 5000);
      }
    }
  };

  return (
    <div className="font-manrope flex flex-col w-[calc(100%-1.5rem)] xl:w-auto items-center bg-main m-3 xl:m-10 rounded-lg border border-solid border-offmain p-3">
      <div className="flex items-center justify-between w-full py-5 xl:p-5">
        <h2 className="text-2xl tracking-tighter font-bold">
          Update recipe: {props.recipe.title}
        </h2>

        <button
          type="button"
          className="border border-offgold rounded-lg p-2 xl:hover:bg-transgold xl:hover:transition-colors xl:transition-colors"
          onClick={() => {
            props.setUpdateRecipeActive(false);
          }}
        >
          <CloseIcon
            title="Close update recipe modal"
            className="w-5 h-5 fill-txt1"
          />
        </button>
      </div>

      <form
        className="flex flex-col items-center w-full xl:m-3 gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col xl:justify-center w-full xl:flex-row gap-5">
          <label>
            Title <span className="text-red">*</span>
            <input
              required
              name="title"
              type="text"
              placeholder="Enter a title for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Category
            <input
              name="category"
              type="text"
              placeholder="Enter a category for this recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label>
            Source
            <input
              name="source"
              type="text"
              placeholder="Enter a valid URL for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col xl:justify-center xl:flex-row w-full xl:px-0 gap-5">
          <label>
            Ingredients
            <textarea
              name="ingredients"
              placeholder="Copy and paste the ingredients list"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </label>

          <label>
            Instructions
            <textarea
              name="steps"
              placeholder="Copy and paste the instructions"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              placeholder="Enter some recipe notes"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
        </div>

        <button
          className="w-full xl:w-1/4 font-semibold tracking-tighter bg-offgreen xl:hover:bg-transgreen border border-green rounded-lg p-3 xl:transition-colors xl:hover:transition-colors"
          type="submit"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}
