import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    // retrieve recipes from the database on page load and update recipes state accordingly
    const getItems = async (path: string, setItems: any) => {
      try {
        const response = await axios.get(path);
        if (response) {
          setItems(response.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };

    // conditionally call the function based on the active nav item
    activeNavItem === 0
      ? getItems("http://localhost:3000/recipes", setRecipes)
      : activeNavItem === 1
      ? getItems("http://localhost:3000/menus", setMenus)
      : null;
  }, []);

  return (
    <div className="grid grid-cols-dashboard p-5">
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
