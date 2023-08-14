import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Nav from "./sidebar/Nav";
import Header from "./Header";
import AllRecipes from "./recipes/AllRecipes";
import AllMenus from "./menus/AllMenus";

export default function Dashboard() {
  const navigate = useNavigate();

  // TODO user is currently logged thrice, might be worth sticking it inside a useEffect with an empty array dependency, then updating state for use in the rest of the component
  const { state } = useLocation();
  if (state) {
    const { user } = state;
    console.log(user);
  } else {
    // redirects the viewer to the login page if a user is not logged in
    navigate("/");
  }

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
