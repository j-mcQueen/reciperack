import { useState } from "react";

import addIcon from "../../assets/icons/add.svg";
import CreateRecipe from "./CreateRecipe";

export default function Dashboard() {
  const [addRecipeActive, setAddRecipeActive] = useState<boolean>(false);
  return (
    <div>
      <button type="button" onClick={() => setAddRecipeActive(true)}>
        <img src={addIcon} alt="A magnifying glass icon" />
      </button>

      {addRecipeActive ? (
        <CreateRecipe
          addRecipeActive={addRecipeActive}
          setAddRecipeActive={setAddRecipeActive}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
