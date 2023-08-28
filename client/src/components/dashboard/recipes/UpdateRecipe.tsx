import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.put(
        `http://localhost:3000/recipes/${props.recipe._id}`,
        {
          title,
          ingredients,
          steps,
          notes,
          category,
          source,
        },
        { withCredentials: true }
      );

      if (response.status === 200) navigate(0); // refresh page
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };

  return (
    <div className="font-manrope absolute w-screen flex flex-col items-center bg-logoBg">
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
        <label>
          Title <span className="text-red">*</span>
          <input
            required
            name="title"
            type="text"
            placeholder="Enter a title for the recipe"
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Ingredients
          <textarea
            name="ingredients"
            placeholder="Copy and paste the ingredients list"
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgreen"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </label>

        <label>
          Instructions
          <textarea
            name="steps"
            placeholder="Copy and paste the instructions"
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-48 focus:outline-none focus:border-offgreen"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            placeholder="Enter some recipe notes"
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg h-24 focus:outline-none focus:border-offgreen"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>

        <label>
          Category
          <input
            name="category"
            type="text"
            placeholder="Enter a category for this recipe"
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
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
            className="text-txt1 block w-96 p-3 mt-2 bg-logoBg border border-solid border-offmain rounded-lg focus:outline-none focus:border-offgreen"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </label>

        <div className="flex w-full justify-center gap-5">
          <button
            className="font-manrope bg-offgreen border border-green rounded-lg p-3"
            type="submit"
          >
            Update
          </button>

          <button
            type="button"
            className="font-manrope bg-offgold border border-gold rounded-lg p-3"
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
