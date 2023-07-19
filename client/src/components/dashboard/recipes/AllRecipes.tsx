import CreateRecipe from "./CreateRecipe";
import Recipe from "./Recipe";

export default function AllRecipes({ ...props }) {
  return (
    <main className="flex gap-5">
      {props.addRecipeActive ? (
        <CreateRecipe
          addRecipeActive={props.addRecipeActive}
          setAddRecipeActive={props.setAddRecipeActive}
          recipes={props.recipes}
          setRecipes={props.setRecipes}
        />
      ) : null}

      {props.recipes.map((recipe: { _id: string }) => (
        <Recipe key={recipe._id} recipe={recipe}></Recipe>
      ))}
    </main>
  );
}
