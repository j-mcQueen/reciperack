import axios from "axios";
import { useEffect, useState } from "react";
import UpdateRecipe from "./UpdateRecipe";
import DeleteRecipe from "./DeleteRecipe";
import DetailHeader from "../DetailHeader";
import MobileDetailHeader from "../MobileDetailHeader";
import { useNavigate } from "react-router-dom";
import Unauthorized from "../Unauthorized";

export default function RecipeDetail() {
  const navigate = useNavigate();
  const viewport = window.matchMedia("(max-width: 1080px)");

  const [unauthorized, setUnauthorized] = useState(false);

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

  const UList = ({ ...props }) => {
    interface Complete {
      [key: number]: number;
    }
    const [complete, setComplete] = useState<Complete>({});

    const handleIngClick = (index: number) => {
      if (complete[index]) {
        setComplete({ ...complete, [index]: 0 });
      } else {
        setComplete({ ...complete, [index]: 1 });
      }
    };

    return (
      <>
        {props.vals.arr.length > 0 ? (
          <ul className="mt-3 xl:mt-3">
            {props.vals.arr.map((item: string, i: number) => (
              // using indexes not ideal as noted by React, but ingredients do not have an associated id, and using the recipe id throws warnings because of multiple list items using the same id. Tried using uuidv4() but for whatever reason it caused errors
              <li
                onClick={() => (!props.vals.notes ? handleIngClick(i) : null)}
                className={`text-lg tracking-tight list-none mb-3 ${
                  !props.vals.notes
                    ? "xl:hover:translate-x-2 xl:transition-transform"
                    : "border border-solid border-blue rounded-lg bg-offblue text-left py-4 pl-5 w-full"
                }`}
                key={i}
              >
                {!props.vals.notes ? (
                  <button
                    type="button"
                    className={`${
                      complete[i] === 1
                        ? "border-logoBg bg-offmain xl:hover:bg-main line-through"
                        : "border-gold bg-offgold xl:hover:bg-transgold"
                    } ${
                      props.vals.notes ? "xl:hover:" : ""
                    } text-left py-4 w-full border border-solid rounded-lg pl-5 xl:transition-colors`}
                  >
                    {item.trimStart()}
                  </button>
                ) : (
                  item.trimStart()
                )}
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
      const token = localStorage.getItem("token");
      const urlArr = window.location.href.split("/recipes/");
      const id = urlArr[urlArr.length - 1];

      try {
        const response = await axios.get(
          `https://reciperack-api.vercel.app/recipes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
      } catch (err) {
        if (err instanceof Error && err.message.includes("401")) {
          setUnauthorized(true);
          localStorage.removeItem("token");

          setTimeout(() => {
            return navigate("/gate");
          }, 5000);
        }
      }
    };
    getRecipeDetail();
  }, [navigate]);

  return (
    <main>
      {updateRecipeActive ? (
        <div className="fixed xl:flex xl:items-center xl:justify-center overscroll-contain xl:overscroll-auto overflow-y-scroll xl:overflow-y-auto inset-0 xl:inset-auto w-screen h-[100dvh] rounded-lg backdrop-brightness-50">
          <UpdateRecipe
            setUpdateRecipeActive={setUpdateRecipeActive}
            setUnauthorized={setUnauthorized}
            recipe={recipe}
          />
        </div>
      ) : null}

      {deleteRecipeActive ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50">
          <DeleteRecipe
            vals={{ source: "source", detail: true, recipe }}
            setters={{ setDeleteRecipeActive, setUnauthorized }}
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

      {unauthorized ? (
        <div className="fixed flex items-center justify-center w-[calc(100dvw-1.5rem)] xl:w-[100dvw] h-[calc(100dvh-1.5rem)]  xl:h-[100dvh] backdrop-brightness-50 rounded-lg">
          <Unauthorized />
        </div>
      ) : null}

      <div className="grid grid-cols-recipeDetails justify-center items-center gap-5 xl:gap-10 my-10 mx-3 xl:m-10">
        <section className="font-manrope flex self-start flex-col p-5 xl:p-10">
          <h2 className="font-bold tracking-tighter text-4xl text-center py-5 border border-solid border-gold rounded-lg">
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

        <section className="font-manrope flex self-start flex-col p-5 xl:p-10">
          <h2 className="font-bold tracking-tight text-4xl text-center py-5 border border-solid border-green rounded-lg">
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

        <section className="font-manrope flex self-start flex-col p-5 xl:p-10">
          <h2 className="font-bold tracking-tighter text-4xl text-center py-5 rounded-lg border border-solid border-blue ">
            Notes
          </h2>

          <UList
            vals={{
              arr: recipe.notes,
              notes: true,
              emptyText:
                "Any tips or tricks that you have for this recipe will appear here.",
            }}
          />
        </section>
      </div>
    </main>
  );
}
