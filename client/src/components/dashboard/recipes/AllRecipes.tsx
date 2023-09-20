import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import SearchIcon from "../../../assets/icons/Search";
import CloseIcon from "../../../assets/icons/Close";
import RecipeItems from "./RecipeItems";
import AddIcon from "../../../assets/icons/Add";

export default function AllRecipes({ ...props }) {
  const [search, setSearch] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    // retrieve recipes from the database on component load and update recipes state accordingly
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes", {
          withCredentials: true,
        });
        if (response) {
          props.setters.setRecipes(response.data);
        }
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

    const filtered = props.vals.recipes.filter((recipe: { title: string }) =>
      recipe.title.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
      setNoResult(true);
    } else {
      setResult(filtered);
    }
  };

  const ClearButton = () => {
    return (
      <button
        onClick={() => {
          setNoResult(false);
          setResult([]);
          setSearch("");
        }}
        type="button"
        className="font-manrope bg-transred border border-solid border-red rounded-lg flex items-center gap-1 p-2 xl:ps-3"
      >
        <CloseIcon className="w-5 h-5 fill-txt2" />
        Clear
      </button>
    );
  };

  return (
    <main className="flex flex-col gap-3 xl:gap-5">
      <section className="flex flex-col xl:flex-row items-center gap-3 xl:gap-5 bg-main xl:mr-5 p-5 rounded-lg">
        <form
          onSubmit={(e) => onSearch(e)}
          role="search"
          className="font-manrope flex xl:w-fit"
        >
          <label className="flex items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (noResult) setNoResult(false); // allows UI to rerender all recipes if a user types into the field after a search finds no results
              }}
              className="bg-main border border-solid rounded-lg rounded-e-none border-offmain focus:outline-none focus:border-offgold p-3"
              type="search"
              name="search"
              placeholder="Search recipes"
            />
          </label>

          <button
            className="border border-solid border-s-0 border-offmain rounded-lg rounded-s-none focus:bg-offgold focus:border-gold focus:outline-none p-2 px-3"
            type="submit"
          >
            <SearchIcon title="Search recipes" className="w-5 h-5 fill-txt2" />
          </button>
        </form>

        {noResult || result.length > 0 ? <ClearButton /> : <></>}

        <button
          className="font-manrope font-bold tracking-tighter text-txt1 bg-offgreen border border-solid border-green rounded-lg flex gap-1 items-center p-2 xl:px-3 xl:py-3 xl:hover:bg-transgreen xl:transition-colors xl:hover:transition-colors"
          type="button"
          onClick={() => props.setters.setAddRecipeActive(true)}
        >
          <AddIcon
            title="Add Recipe"
            needsLabel={true}
            className="w-5 h-5 fill-txt1"
          />
          {/* {viewport.matches === true ? null : props.addItem} */}
        </button>
      </section>

      {noResult ? (
        // rectifies an edge case where searched results would show after all recipes
        <>
          <p className="font-manrope">
            Hmmm... Your search turned up empty ¯\_(ツ)_/¯
          </p>
          <p className="font-manrope">
            {" "}
            Please clear the search and try again.
          </p>
        </>
      ) : result.length > 0 ? (
        <section className="grid xl:grid-cols-3 gap-3 xl:gap-5 xl:mr-5">
          <RecipeItems
            setTargetRecipe={props.setters.setTargetRecipe}
            setDeleteActive={props.setters.setDeleteActive}
            arr={result}
            page="recipes"
          />
        </section>
      ) : (
        <section className="grid xl:grid-cols-3 items-start gap-3 xl:gap-5 xl:mr-5">
          <RecipeItems
            setTargetRecipe={props.setters.setTargetRecipe}
            setDeleteActive={props.setters.setDeleteActive}
            arr={props.vals.recipes}
            page="recipes"
          />
        </section>
      )}
    </main>
  );
}
