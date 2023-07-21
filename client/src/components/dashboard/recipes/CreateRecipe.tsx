import axios from "axios";
import { useState } from "react";
import CloseIcon from "../../../assets/icons/Close";

export default function CreateRecipe({ ...props }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/recipes", {
        // must use the explicit server endpoint here - "/" refers to the client endpoint
        title,
        ingredients,
        steps,
        notes,
        source,
      });

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
    <div className="font-manrope absolute flex flex-col items-center bg-logoBg border border-solid border-offmain rounded-lg p-5">
      <div className="flex items-center justify-between w-full py-3">
        <h2 className="text-xl" tabIndex={0}>
          Create a new recipe
        </h2>

        <button
          type="button"
          className="border border-gold rounded-lg p-1"
          onClick={() => {
            props.setAddRecipeActive(false);
          }}
        >
          <CloseIcon className="w-5 h-5 fill-txt2" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();

          props.setAddRecipeActive(false);
        }}
        className="flex flex-col gap-5"
      >
        <label htmlFor="title">
          Title
          <input
            required
            name="title"
            id="title"
            type="text"
            placeholder="Enter a title for the recipe"
            className="text-main"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="ingredients">
          Ingredients
          <textarea
            name="ingredients"
            id="ingredients"
            placeholder="Copy and paste the ingredients list"
            className="text-main"
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="steps">
          Instructions
          <textarea
            name="steps"
            id="steps"
            placeholder="Copy and paste the instructions"
            className="text-main"
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            placeholder="Enter some recipe notes"
            className="text-main"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="source">
          Source
          <input
            name="source"
            id="source"
            type="text"
            placeholder="Enter a valid URL for the recipe"
            className="text-main"
            onChange={(e) => setSource(e.target.value)}
          />
        </label>

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
