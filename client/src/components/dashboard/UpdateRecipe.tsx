import axios from "axios";
import { useState } from "react";
export default function UpdateRecipe({ ...props }) {
  const format = (arr: string[]) => {
    // helper to present the recipe details in the form field in a manner that is easy to edit
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
  const [source, setSource] = useState(props.recipe.source);

  // when the update recipe form loads, we want the current recipe information to be entered in the form in a formatted manner

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/recipes/${props.recipe.id}`,
        {
          title,
          ingredients,
          steps,
          notes,
          source,
        }
      );

      console.log(response);
      location.reload();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  return (
    <div className="absolute w-screen flex flex-col items-center bg-logoBg">
      <h2 className="font-manrope text-3xl tracking-tighter py-3 border-b-2 border-gold border-solid">
        Update: {props.recipe.title}
      </h2>
      <form
        className="flex flex-col items-center w-screen gap-5 py-3"
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="title">
          Title
          <input
            required
            name="title"
            id="title"
            type="text"
            placeholder="Enter a title for the recipe"
            className="block text-main w-96"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="ingredients">
          Ingredients
          <textarea
            name="ingredients"
            id="ingredients"
            placeholder="Copy and paste the ingredients list"
            className="block text-main w-96 h-48"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="steps">
          Instructions
          <textarea
            name="steps"
            id="steps"
            placeholder="Copy and paste the instructions"
            className="block text-main w-96 h-48"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </label>

        <label htmlFor="notes">
          Notes
          <textarea
            name="notes"
            id="notes"
            placeholder="Enter some recipe notes"
            className="block text-main w-96 h-24"
            value={notes}
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
            className="block text-main w-96"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </label>

        <div>
          <button className="border border-green rounded-lg p-3" type="submit">
            Update
          </button>

          <button
            type="button"
            className="border border-gold rounded-lg p-3"
            onClick={() => {
              props.setUpdateRecipeActive(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
