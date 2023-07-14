import { Link } from "react-router-dom";
export default function Recipe({ ...props }) {
  // each recipe UI acts as an overview for each recipe and should be concise
  // the UI for each recipe should contain the recipe title, source, and a button which links to a separate page containing its details (for now)
  return (
    <div
      className="text-lg border border-gold border-solid rounded-md"
      key={props.key}
    >
      <div className="text-center border-solid border-b border-gold p-3">
        <h2 className="font-heading text-3xl">{props.recipe.title}</h2>
      </div>

      <div className="flex justify-evenly gap-5 p-5">
        <div>
          <Link to={`/recipes/${props.recipe._id}`}>
            <button
              className="border-solid border-2 border-txt2 rounded-lg px-3 py-1"
              type="button"
            >
              View
            </button>
          </Link>
        </div>

        <div>
          <a href={props.recipe.source} target="_blank" rel="noreferrer">
            <button
              className="border-solid border-2 border-txt2 rounded-lg px-3 py-1"
              type="button"
            >
              Source
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
