import axios from "axios";
import { useState } from "react";

export default function CreateRecipe({ ...props }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("");
  const [recipes, setRecipes] = useState([{}]);

  return (
    <div className="absolute w-screen flex flex-col items-center bg-logoBg">
      <h2>Create a new recipe</h2>
      <form
        method="POST"
        action=""
        onSubmit={async (e) => {
          e.preventDefault();

          axios
            .post("http://localhost:3000/", {
              // must use the explicit server endpoint here - "/" refers to the client endpoint
              title,
              ingredients,
              steps,
              notes,
              source,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response, "ERROR"));
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
            className="text-main"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="ingredients">
          Ingredients
          <textarea
            name="ingredients"
            id="ingredients"
            className="text-main"
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="steps">
          Instructions
          <textarea
            name="steps"
            id="steps"
            className="text-main"
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="notes">
          Notes
          <textarea
            name="notes"
            id="notes"
            className="text-main"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="source">
          Link to recipe
          <input
            name="source"
            id="source"
            type="text"
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
