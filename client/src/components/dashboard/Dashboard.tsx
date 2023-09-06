import axios from "axios";
import { useEffect, useState } from "react";

import Nav from "./sidebar/Nav";
import Header from "./Header";
import AllRecipes from "./recipes/AllRecipes";
import AllMenus from "./menus/AllMenus";
import MobileNav from "./sidebar/MobileNav";
import DeleteRecipe from "./recipes/DeleteRecipe";
import CreateRecipe from "./recipes/CreateRecipe";
import MenuModal from "./menus/MenuModal";

export default function Dashboard() {
  const viewport = window.matchMedia("(max-width: 1080px)");

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
    const getMenus = async () => {
      // TODO change fn name to getUserMenu
      try {
        const response = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });

        if (response) {
          setUserId(response.data._id);
          setMenu(response.data.menu);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    };
    getMenus();
  }, []);

  return (
    <div className="grid xl:grid-cols-dashboard mt-3 mx-3 mb-[calc(84px+1.5rem)] xl:m-5 gap-5">
      {deleteActive === true ? (
        <div className="fixed flex items-center xl:justify-center w-[calc(100vw-1.5rem)] xl:w-screen h-screen backdrop-brightness-50 xl:rounded-none rounded-lg">
          <DeleteRecipe
            vals={{ source: "source" }}
            source={"source"}
            setDeleteRecipeActive={setDeleteActive}
            recipe={targetRecipe}
            targetRecipe={targetRecipe}
            setTargetRecipe={setTargetRecipe}
          />
        </div>
      ) : null}

      {addRecipeActive ? (
        <div className="fixed flex items-center xl:justify-center w-[calc(100vw-1.5rem)] xl:w-screen h-screen backdrop-brightness-50 xl:rounded-none rounded-lg">
          <CreateRecipe
            addRecipeActive={addRecipeActive}
            setAddRecipeActive={setAddRecipeActive}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </div>
      ) : null}

      {menuModal ? (
        <div className="fixed flex items-center justify-center w-screen h-screen backdrop-brightness-50 px-5 xl:px-0">
          <MenuModal
            vals={{ activeMeal, activeDay, modalAction, menu, userId }}
            setters={{ setMenu, setMenuModal, setModalAction }}
          />
        </div>
      ) : null}

      {viewport.matches === true ? (
        <MobileNav
          mobileLinksActive={mobileLinksActive}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />
      ) : (
        <Nav
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />
      )}

      <div className="xl:col-start-2">
        {activeNavItem === 0 ? (
          <>
            <Header
              title="Recipes"
              addItem={"Add Recipe"}
              setActive={setAddRecipeActive}
              mobileLinksActive={mobileLinksActive}
              setMobileLinksActive={setMobileLinksActive}
            />

            <AllRecipes
              addRecipeActive={addRecipeActive}
              setAddRecipeActive={setAddRecipeActive}
              recipes={recipes}
              setRecipes={setRecipes}
              setDeleteActive={setDeleteActive}
              setTargetRecipe={setTargetRecipe}
            />
          </>
        ) : activeNavItem === 1 ? (
          <>
            <Header
              title="Menus"
              addItem={"Add Menu"}
              setActive={setAddMenuActive}
              mobileLinksActive={mobileLinksActive}
              setMobileLinksActive={setMobileLinksActive}
            />

            <AllMenus
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
              }}
            />
          </>
        ) : activeNavItem === 2 ? (
          <Header
            // TODO browse header will likely not have an addItem button so this may need its own component
            title="Browse"
            addItem={"Add Recipe"}
            setActive={setAddRecipeActive}
          />
        ) : null}
      </div>
    </div>
  );
}
