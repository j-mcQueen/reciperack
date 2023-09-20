import axios from "axios";
import { useEffect, useState } from "react";
import UpdateRecipe from "./UpdateRecipe";
import DeleteRecipe from "./DeleteRecipe";
import DetailHeader from "../DetailHeader";
import MobileDetailHeader from "../MobileDetailHeader";

export default function RecipeDetail() {
  const [updateRecipeActive, setUpdateRecipeActive] = useState(false);
  const [deleteRecipeActive, setDeleteRecipeActive] = useState(false);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    steps: [],
    notes: [],
    source: "",
    category: "",
    _id: "",
    createdBy: "",
  });

  const viewport = window.matchMedia("(max-width: 1080px)");

  const UList = ({ ...props }) => {
    return (
      <>
        {props.vals.arr.length > 0 ? (
          <ul className="mt-3 xl:mt-3">
            {props.vals.arr.map((item: string, i: number) => (
              // using indexes not ideal as noted by React, but ingredients do not have an associated id, and using the recipe id throws warnings because of multiple list items using the same id. Tried using uuidv4() but for whatever reason it caused errors
              <li
                className="text-lg tracking-tight list-disc list-inside py-2 text-txt2"
                key={i}
              >
                {item.trimStart()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-txt2 pt-5">{props.vals.emptyText}</p>
        )}
      </>
    );
  };

  useEffect(() => {
    const getRecipeDetail = async () => {
      const urlArr = window.location.href.split("/recipes/");
      const id = urlArr[urlArr.length - 1];
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${id}`,
          { withCredentials: true }
        );

        if (response) {
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
            category: response.data.category,
            source: response.data.source,
            _id: response.data._id,
            createdBy: response.data.createdBy,
          });
        }
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
        <div className="fixed xl:flex xl:items-center xl:justify-center overscroll-contain xl:overscroll-auto overflow-y-scroll xl:overflow-y-auto inset-0 xl:inset-auto w-screen h-screen rounded-lg backdrop-brightness-50">
          <UpdateRecipe
            setUpdateRecipeActive={setUpdateRecipeActive}
            recipe={recipe}
          />
        </div>
      ) : null}

      {deleteRecipeActive ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
          <DeleteRecipe
            vals={{ source: "source", detail: true, recipe }}
            setters={{ setDeleteRecipeActive }}
          />
        </div>
      ) : null}

      {viewport.matches === true ? (
        <MobileDetailHeader
          item={recipe}
          setUpdateItemActive={setUpdateRecipeActive}
          setDeleteItemActive={setDeleteRecipeActive}
        />
      ) : (
        <DetailHeader
          item={recipe}
          setUpdateItemActive={setUpdateRecipeActive}
          setDeleteItemActive={setDeleteRecipeActive}
        />
      )}

      <div className="grid grid-cols-recipeDetails justify-center items-center gap-5 xl:gap-10 my-10 mx-3 xl:m-10">
        <section className="font-manrope flex self-start flex-col border border-solid border-gold rounded-lg p-5 xl:p-10">
          <h2 className="font-bold tracking-tighter text-4xl py-3 xl:py-0">
            Ingredients
          </h2>

          <UList
            vals={{
              arr: recipe.ingredients,
              emptyText:
                "You have not yet added any ingredients for this recipe.",
            }}
          />
        </section>

        <section className="font-manrope flex self-start flex-col rounded-lg border border-solid border-green p-5 xl:p-10">
          <h2 className="font-bold tracking-tight text-4xl py-3 xl:py-0">
            Instructions
          </h2>

          {recipe.steps.length > 0 ? (
            <ol className="list-decimal list-inside mt-3 xl:mt-3">
              {recipe.steps.map((step: string, i) => (
                <li className="text-lg tracking-tighter py-2 text-txt2" key={i}>
                  {step.trimStart()}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-txt2 pt-5">
              There are currently no instructions for this recipe.
            </p>
          )}
        </section>

        <section className="font-manrope flex self-start flex-col rounded-lg border border-solid border-blue p-5 xl:p-10">
          <h2 className="font-bold tracking-tighter text-4xl">Notes</h2>

          <UList
            vals={{
              arr: recipe.notes,
              emptyText:
                "Any tips or tricks that you have for this recipe will appear here.",
            }}
          />
        </section>
      </div>
    </main>
  );
}
