import axios from "axios";
import { useEffect, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import UpdateRecipe from "./UpdateRecipe";

export default function RecipeDetail() {
  const [updateRecipeActive, setUpdateRecipeActive] = useState(false);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    steps: [],
    notes: [],
    source: "",
    id: "",
  });

  useEffect(() => {
    const getRecipeDetail = async () => {
      const urlArr = window.location.href.split("/recipes/");
      const id = urlArr[urlArr.length - 1];
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        console.log(response);

        setRecipe({
          title: response.data.title,
          ingredients: response.data.ingredients
            .split("\n")
            .filter((ing: string) => ing !== ""),
          steps: response.data.steps
            .split("\n")
            .filter((step: string) => step !== ""),
          notes: response.data.notes
            .split("\n")
            .filter((note: string) => note !== ""),
          source: response.data.source,
          id: response.data._id,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };
    getRecipeDetail();
  }, []);

  return (
    <main>
      {updateRecipeActive ? (
        <UpdateRecipe
          setUpdateRecipeActive={setUpdateRecipeActive}
          recipe={recipe}
        />
      ) : null}

      <div className="flex justify-between items-center p-10">
        <h1 className="font-manrope font-bold tracking-tighter text-6xl">
          {recipe.title}
        </h1>

        <div className="flex gap-5">
          <button
            className="rounded border-solid border border-offmain p-2"
            type="button"
            onClick={() => setUpdateRecipeActive(true)}
          >
            <img src={editIcon} alt="A pencil icon" />
          </button>

          <button
            className="rounded border-solid border border-offmain p-2"
            type="button"
          >
            <img src={deleteIcon} alt="A bin icon" />
          </button>

          <button
            className="font-manrope font-bold rounded text-main bg-gold px-3 py-2"
            type="button"
          >
            <a
              className=""
              href={recipe.source}
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-recipeDetails">
        <section className="flex flex-col">
          <h2 className="font-manrope font-bold tracking-tighter text-4xl">
            Ingredients
          </h2>
          <ul className="py-5">
            {recipe.ingredients.map((ingredient, i) => (
              // using indexes not ideal as noted by React, but ingredients do not have an associated id, and using the recipe id throws warnings because of multiple list items using the same id. Tried using uuidv4() but for whatever reason it caused errors
              <li className="font-body text-lg" key={i}>
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col">
          <h2 className="font-manrope font-bold tracking-tighter text-4xl">
            Instructions
          </h2>
          <ol className="list-decimal list-inside">
            {recipe.steps.map((step, i) => (
              <li className="font-body text-lg leading-5 py-2" key={i}>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="flex flex-col items-center">
        <h2 className="font-manrope font-bold tracking-tighter text-4xl">
          Notes
        </h2>
        <ul>
          {recipe.notes.map((note, i) => (
            <li className="font-body text-lg" key={i}>
              {note}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
