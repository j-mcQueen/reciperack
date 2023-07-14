import { Link } from "react-router-dom";
export default function Recipe({ ...props }) {
  // each recipe UI acts as an overview for each recipe and should be concise
  // the UI for each recipe should contain the recipe title, source, and a button which links to a separate page containing its details (for now)
  return (
    <div key={props.key}>
      <div className="text-center">
        <h2>{props.recipe.title}</h2>
      </div>

      <div className="flex gap-5">
        <div>
          <Link to="">
            <button type="button">View</button>
          </Link>
        </div>

        <div>
          <a href={props.recipe.source} target="_blank" rel="noreferrer">
            <button type="button">Source</button>
          </a>
        </div>
      </div>
    </div>
  );
}
