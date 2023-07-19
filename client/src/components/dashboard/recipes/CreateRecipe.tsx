import axios from "axios";
import { useState } from "react";

export default function CreateRecipe({ ...props }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/", {
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
    <div className="absolute flex flex-col items-center bg-logoBg">
      <h2>Create a new recipe</h2>
      <form
        method="POST"
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();

          props.setAddRecipeActive(false);
        }}
        className="flex flex-col items-center gap-5"
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

        <label htmlFor="notes">
          Notes
          <textarea
            name="notes"
            id="notes"
            placeholder="Enter some recipe notes"
            className="text-main"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="source">
          Source
          <input
            required
            name="source"
            id="source"
            type="text"
            placeholder="Enter a valid URL for the recipe"
            className="text-main"
            onChange={(e) => setSource(e.target.value)}
          />
        </label>

        <div>
          <button className="border border-green rounded-lg p-3" type="submit">
            Submit
          </button>

          <button
            type="button"
            className="border border-gold rounded-lg p-3"
            onClick={() => {
              props.setAddRecipeActive(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
