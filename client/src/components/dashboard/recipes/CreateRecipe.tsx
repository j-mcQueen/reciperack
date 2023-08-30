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
      const response = await axios.post(
        "http://localhost:3000/recipes",
        {
          // must use the absolute path to server endpoint
          title,
          ingredients,
          steps,
          notes,
          category,
          source,
        },
        { withCredentials: true }
      );

      if (response) {
        console.log(response);
        // if there is indeed a response, we should update state
        // in order to update state, we need to pass the data returned from the response to the state setter
        props.setRecipes([...props.recipes, response.data]);
      }
    } catch (err) {
      if (err instanceof Error) {
        // comply with strict type checking for errors in a catch block
        console.log(err);
      }
    }
  };

  return (
    // tab index of 0 set on h2 to ensure a user using assistive technology lands at a descriptive point on the modal when opened
    <div className="font-manrope absolute w-full xl:w-auto flex flex-col items-center bg-main border border-solid border-offmain rounded-lg p-5">
      <div className="flex items-center justify-between w-full py-3">
        <h2 className="text-2xl tracking-tighter font-bold" tabIndex={0}>
          Create a new recipe
        </h2>

        <button
          type="button"
          className="border border-gold rounded-lg p-1 hover:bg-offgold hover:transition-colors transition-colors"
          onClick={() => {
            props.setAddRecipeActive(false);
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

          props.setAddRecipeActive(false);
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
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Category
            <input
              name="category"
              type="text"
              placeholder="Enter a category for the recipe"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
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
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
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
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-24 focus:outline-none focus:border-offgreen"
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </label>

          <label>
            Instructions
            <textarea
              name="steps"
              placeholder="Copy and paste the instructions"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-24 focus:outline-none focus:border-offgreen"
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              placeholder="Enter some recipe notes"
              className="text-txt1 block w-full xl:w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-24 focus:outline-none focus:border-offgreen"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
        </div>

        <button
          className="font-semibold tracking-tighter bg-offgreen border border-green rounded-lg p-3"
          type="submit"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
