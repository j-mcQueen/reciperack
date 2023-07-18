import { Link } from "react-router-dom";
export default function Recipe({ ...props }) {
  return (
    <div
      className="text-lg border border-gold border-solid rounded-md"
      key={props.key}
    >
      <div className="text-center border-solid border-b border-gold p-3">
        <h2 className="font-manrope tracking-tighter font-bold text-3xl">
          {props.recipe.title}
        </h2>
      </div>

      <div className="flex justify-evenly gap-5 p-5">
        <div>
          <Link to={`/recipes/${props.recipe._id}`}>
            <span className="font-manrope border-solid border-2 border-txt2 rounded-lg px-3 py-1">
              View
            </span>
          </Link>
        </div>

        <div>
          <a href={props.recipe.source} target="_blank" rel="noreferrer">
            <span className="font-manrope border-solid border-2 border-txt2 rounded-lg px-3 py-1">
              Source
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
