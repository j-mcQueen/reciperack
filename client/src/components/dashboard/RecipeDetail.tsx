import axios from "axios";
import { useEffect, useState } from "react";

export default function RecipeDetail() {
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
          ingredients: response.data.ingredients.split("\n"),
          steps: response.data.steps.split("\n"),
          notes: response.data.notes.split("\n"),
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
    <main className="px-72">
      <div className="flex flex-col items-center p-10">
        <h1 className="font-heading text-6xl">{recipe.title}</h1>
        <a
          className="text-gold"
          href={recipe.source}
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </div>

      <section className="flex flex-col items-center">
        <h2 className="font-heading text-4xl">Ingredients</h2>
        <ul className="grid grid-cols-3 gap-x-5 py-5">
          {recipe.ingredients.map((ingredient, i) => (
            // using indexes not ideal as noted by React, but ingredients do not have an associated id, and using the recipe id throws warnings because of multiple list items using the same id. Tried using uuidv4() but for whatever reason it caused errors
            <li className="font-body text-lg text-center" key={i}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center">
        <h2 className="font-heading text-4xl">Instructions</h2>
        <ul>
          {recipe.steps.map((step, i) => (
            <li className="font-body text-lg leading-5 py-2" key={i}>
              {step}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center">
        <h2 className="font-heading text-4xl">Notes</h2>
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
