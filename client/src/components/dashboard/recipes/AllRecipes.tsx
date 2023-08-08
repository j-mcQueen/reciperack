import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import CreateRecipe from "./CreateRecipe";
import Recipe from "./Recipe";
import SearchIcon from "../../../assets/icons/Search";
import CloseIcon from "../../../assets/icons/Close";

export default function AllRecipes({ ...props }) {
  const [search, setSearch] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    // retrieve recipes from the database on page load and update recipes state accordingly
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        if (response) props.setRecipes(response.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    getRecipes();
  }, []);

  const onSearch = (e: FormEvent) => {
    // filter all recipes for recipe objects which contain titles that include the search state value
    e.preventDefault();

    const filtered = props.recipes.filter((recipe: { title: string }) =>
      recipe.title.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
      setNoResult(true);
    } else {
      setResult(filtered);
    }
  };

  return (
    <main className="flex flex-col gap-5 bg-main mr-5 p-5 rounded-lg">
      {props.addRecipeActive ? (
        <CreateRecipe
          addRecipeActive={props.addRecipeActive}
          setAddRecipeActive={props.setAddRecipeActive}
          recipes={props.recipes}
          setRecipes={props.setRecipes}
        />
      ) : null}

      <div className="flex items-center gap-5">
        <form
          onSubmit={(e) => onSearch(e)}
          role="search"
          className="font-manrope flex w-fit"
        >
          <label className="flex items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-main border border-solid rounded-lg rounded-e-none border-offmain focus:outline-none focus:border-offgreen p-3"
              type="search"
              name="search"
              placeholder="Search for a recipe title"
            />
          </label>

          <button
            className="border border-solid border-s-0 border-offmain rounded-lg rounded-s-none focus:bg-offgreen focus:border-green focus:outline-none p-2 px-3"
            type="submit"
          >
            <SearchIcon className="w-5 h-5 fill-txt2" />
          </button>
        </form>

        {noResult ? (
          <button
            onClick={() => {
              setNoResult(false);
              setResult([]);
              setSearch("");
            }}
            type="button"
            className="font-manrope bg-transred border border-solid border-red rounded-lg flex items-center gap-1 p-2"
          >
            <CloseIcon className="w-5 h-5 fill-txt2" />
            Remove
          </button>
        ) : (
          <></>
        )}
      </div>

      {noResult ? (
        // rectifies an edge case where searched results would show after all recipes
        <>
          <p className="font-manrope">
            Hmmm... Your search turned up empty ¯\_(ツ)_/¯
          </p>
          <p className="font-manrope"> Please clear the search or try again.</p>
        </>
      ) : result.length > 0 ? (
        result.map((recipe: { _id: string }) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))
      ) : (
        props.recipes.map((recipe: { _id: string }) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))
      )}
    </main>
  );
}
