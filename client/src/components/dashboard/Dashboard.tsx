import axios from "axios";
import { useEffect, useState } from "react";

import Nav from "./sidebar/Nav";
import Header from "./Header";
import AllRecipes from "./recipes/AllRecipes";
import MobileNav from "./sidebar/MobileNav";
import DeleteRecipe from "./recipes/DeleteRecipe";
import CreateRecipe from "./recipes/CreateRecipe";
import MenuModal from "./menus/MenuModal";
import RecipeIcon from "../../assets/icons/Recipe";
import UserMenu from "./menus/UserMenu";
import { useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";

export default function Dashboard() {
  const viewport = window.matchMedia("(max-width: 1080px)");
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const [mobileLinksActive, setMobileLinksActive] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [addRecipeActive, setAddRecipeActive] = useState(false);
  const [addMenuActive, setAddMenuActive] = useState(false);

  const [userId, setUserId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [menu, setMenu] = useState({});

  // required for deleting recipes from the dashboard
  const [deleteActive, setDeleteActive] = useState(false);
  const [targetRecipe, setTargetRecipe] = useState(false);

  const [menuModal, setMenuModal] = useState(false);
  const [modalAction, setModalAction] = useState("add");
  const [activeMeal, setActiveMeal] = useState("");
  const [activeDay, setActiveDay] = useState("Monday");

  useEffect(() => {
    // the main dashboard component has been displayed, so get the current user data and update menu & recipe state accordingly
    const getUserMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://reciperack-api.vercel.app/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setUserId(response.data._id);
          setMenu(response.data.menu);
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
    getUserMenu();
  }, [navigate]);

  return (
    <div className="xl:grid xl:grid-cols-dashboard mt-3 mx-3 mb-[calc(84px+1.5rem)] xl:m-5 gap-5">
      {viewport.matches === true ? (
        <MobileNav
          spinner={spinner}
          setSpinner={setSpinner}
          mobileLinksActive={mobileLinksActive}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />
      ) : (
        <Nav
          spinner={spinner}
          setSpinner={setSpinner}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />
      )}

      {unauthorized ? (
        <div className="fixed flex items-center justify-center w-[calc(100dvw-1.5rem)] xl:w-[calc(100dvw-2.5rem)] h-[calc(100dvh-1.5rem)]  xl:h-[calc(100dvh-2.5rem)] backdrop-brightness-50 rounded-lg">
          <Unauthorized />
        </div>
      ) : null}

      <div className="xl:col-start-2">
        {activeNavItem === 0 ? (
          <>
            {addRecipeActive ? (
              <div className="fixed xl:flex xl:items-center xl:justify-center overscroll-contain overflow-y-scroll inset-0 xl:inset-auto w-screen xl:w-[calc(100vw-10%-3.5rem)] h-[100dvh] xl:h-[calc(100vh-2.5rem)] rounded-lg backdrop-brightness-50">
                <CreateRecipe
                  vals={{ addRecipeActive, recipes }}
                  setters={{ setAddRecipeActive, setRecipes, setUnauthorized }}
                />
              </div>
            ) : null}

            {deleteActive ? (
              <div className="fixed flex items-center justify-center overscroll-contain xl:overscroll-auto overflow-y-scroll xl:overflow-y-auto inset-0 xl:inset-auto w-screen xl:w-[calc(100vw-10%-3.5rem)] h-screen xl:h-[calc(100vh-2.5rem)] rounded-lg backdrop-brightness-50">
                <DeleteRecipe
                  vals={{ source: "source", recipe: targetRecipe }}
                  setters={{
                    setDeleteRecipeActive: setDeleteActive,
                    setTargetRecipe,
                    setUnauthorized,
                  }}
                />
              </div>
            ) : null}

            <Header
              source="Recipes"
              setActive={setAddRecipeActive}
              mobileLinksActive={mobileLinksActive}
              setMobileLinksActive={setMobileLinksActive}
            />

            <AllRecipes
              vals={{ addRecipeActive, recipes }}
              setters={{
                setAddRecipeActive,
                setRecipes,
                setDeleteActive,
                setTargetRecipe,
                setUnauthorized,
              }}
            />
          </>
        ) : activeNavItem === 1 ? (
          recipes.length > 0 ? (
            <>
              {menuModal ? (
                <div className="fixed flex items-center justify-center overscroll-contain xl:overscroll-auto overflow-y-scroll xl:overflow-y-auto inset-0 xl:inset-auto w-screen xl:w-[calc(100vw-10%-3.5rem)] h-screen xl:h-[calc(100vh-2.5rem)] rounded-lg backdrop-brightness-50">
                  <MenuModal
                    vals={{ activeMeal, activeDay, modalAction, menu, userId }}
                    setters={{
                      setMenu,
                      setMenuModal,
                      setModalAction,
                      setUnauthorized,
                    }}
                  />
                </div>
              ) : null}

              <Header
                source={`${activeDay} Menu`}
                setActive={setAddMenuActive}
                mobileLinksActive={mobileLinksActive}
                setMobileLinksActive={setMobileLinksActive}
              />

              <UserMenu
                vals={{
                  addMenuActive,
                  menu,
                  activeDay,
                  activeMeal,
                  userId,
                }}
                setters={{
                  setMenu,
                  setActiveDay,
                  setMenuModal,
                  setModalAction,
                  setActiveMeal,
                  setUnauthorized,
                }}
              />
            </>
          ) : (
            <main className="flex justify-center items-center xl:h-[calc(100vh-2.5rem)]">
              <section className="font-manrope tracking-tighter rounded-lg">
                <h1 className="flex justify-center items-center gap-4 font-bold tracking-tighter text-3xl xl:text-7xl py-5">
                  <RecipeIcon className="w-10 h-10 xl:w-14 xl:h-14 bg-offgreen border border-solid border-green p-2 rounded-lg fill-txt1" />
                  Add some recipes!
                </h1>

                <p className="mx-10 xl:mx-96 text-lg text-txt2">
                  You'll need some recipes to begin building a menu. Head on
                  over to the <strong>Recipes</strong> tab where you'll be able
                  to add a recipe of your own creation or one of your favourites
                  from online.
                </p>
              </section>
            </main>
          )
        ) : null}
      </div>
    </div>
  );
}
