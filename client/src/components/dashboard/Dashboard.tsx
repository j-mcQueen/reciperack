import { useState } from "react";

import Nav from "./sidebar/Nav";
import Header from "./Header";
import AllRecipes from "./recipes/AllRecipes";
import AllMenus from "./menus/AllMenus";
import MobileNav from "./sidebar/MobileNav";
import DeleteRecipe from "./recipes/DeleteRecipe";
import CreateMenu from "./menus/CreateMenu";
import CreateRecipe from "./recipes/CreateRecipe";

export default function Dashboard() {
  const viewport = window.matchMedia("(max-width: 1080px)");

  const [mobileLinksActive, setMobileLinksActive] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [addRecipeActive, setAddRecipeActive] = useState(false);
  const [addMenuActive, setAddMenuActive] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [menus, setMenus] = useState([]);

  // required for deleting recipes from the dashboard
  const [deleteActive, setDeleteActive] = useState(false);
  const [targetRecipe, setTargetRecipe] = useState(false);

  return (
    <div className="grid xl:grid-cols-dashboard mt-3 mx-3 xl:m-5 gap-5">
      {deleteActive === true ? (
        <div className="fixed flex items-center xl:justify-center w-[calc(100vw-1.5rem)] xl:w-screen h-screen backdrop-brightness-50 xl:rounded-none rounded-lg">
          <DeleteRecipe
            source={"source"}
            setDeleteRecipeActive={setDeleteActive}
            recipe={targetRecipe}
            targetRecipe={targetRecipe}
            setTargetRecipe={setTargetRecipe}
          />
        </div>
      ) : null}

      {addMenuActive ? (
        <div className="fixed flex items-center xl:justify-center w-[calc(100vw-1.5rem)] xl:w-screen h-screen backdrop-brightness-50 xl:rounded-none rounded-lg">
          <CreateMenu
            menus={menus}
            setMenus={setMenus}
            addMenuActive={addMenuActive}
            setAddMenuActive={setAddMenuActive}
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
              addMenuActive={addMenuActive}
              setAddMenuActive={setAddMenuActive}
              menus={menus}
              setMenus={setMenus}
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
