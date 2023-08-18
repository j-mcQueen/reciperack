import { useState } from "react";

import Nav from "./sidebar/Nav";
import Header from "./Header";
import AllRecipes from "./recipes/AllRecipes";
import AllMenus from "./menus/AllMenus";

export default function Dashboard() {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [addRecipeActive, setAddRecipeActive] = useState(false);
  const [addMenuActive, setAddMenuActive] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [menus, setMenus] = useState([]);

  return (
    <div className="grid grid-cols-dashboard m-5 gap-5">
      <Nav activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} />

      <div className="col-start-2">
        {activeNavItem === 0 ? (
          <>
            <Header
              title="Recipes"
              addItem={"Add Recipe"}
              setActive={setAddRecipeActive}
            />

            <AllRecipes
              addRecipeActive={addRecipeActive}
              setAddRecipeActive={setAddRecipeActive}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          </>
        ) : activeNavItem === 1 ? (
          <>
            <Header
              title="Menus"
              addItem={"Add Menu"}
              setActive={setAddMenuActive}
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
