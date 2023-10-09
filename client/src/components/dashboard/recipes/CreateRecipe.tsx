import axios from "axios";
import { useState } from "react";
import CloseIcon from "../../../assets/icons/Close";

export default function CreateRecipe({ ...props }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        // "https://reciperack-api.vercel.app/recipes",
        "http://localhost:3000/recipes",
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

      if (response.status === 200) {
        props.setters.setRecipes([...props.vals.recipes, response.data]);
      }
    } catch (err) {
      if (err instanceof Error) {
        // comply with strict type checking for errors in a catch block
        console.log(err);
      }
    }
  };

  return (
    <div className="font-manrope m-3 w-[calc(100vw-1.5rem)] xl:w-auto flex flex-col justify-center items-center bg-main border border-solid border-offmain rounded-lg p-5">
      <div className="flex items-center justify-between w-full py-3">
        <h2 className="text-2xl tracking-tighter font-bold">
          Create a new recipe
        </h2>

        <button
          type="button"
          className="border border-offgold rounded-lg p-2 xl:hover:bg-transgold xl:hover:transition-colors xl:transition-colors"
          onClick={() => {
            props.setters.setAddRecipeActive(false);
          }}
        >
          <CloseIcon
            title="Close create recipe modal"
            className="w-5 h-5 fill-txt2"
          />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          props.setters.setAddRecipeActive(false);
        }}
        className="flex flex-col w-full gap-5"
      >
        <div className="flex flex-col xl:flex-row gap-5">
          <label>
            Title <span className="text-red">*</span>
            <input
              required
              name="title"
              type="text"
              placeholder="Enter a title for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Category
            <input
              name="category"
              type="text"
              placeholder="Enter a category for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label htmlFor="source">
            Source
            <input
              name="source"
              id="source"
              type="text"
              placeholder="Enter a valid URL for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgold"
              onChange={(e) => setSource(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          <label>
            Ingredients
            <textarea
              name="ingredients"
              placeholder="Copy and paste the ingredients list"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </label>

          <label>
            Instructions
            <textarea
              name="steps"
              placeholder="Copy and paste the instructions"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              placeholder="Enter some recipe notes"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgold"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
        </div>

        <button
          className="font-semibold tracking-tighter bg-offgreen xl:hover:bg-transgreen border border-green rounded-lg p-3 xl:transition-colors xl:hover:transition-colors"
          type="submit"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
