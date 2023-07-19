import { Link } from "react-router-dom";

export default function Recipe({ ...props }) {
  return (
    <div
      className="text-lg border border-gold border-solid rounded-md"
      key={props.key}
    >
      <h2 className="font-manrope text-center border-solid border-b border-gold p-3 tracking-tighter font-bold text-3xl">
        {props.recipe.title}
      </h2>

      <div className="flex justify-evenly gap-5 p-5">
        <Link
          className="font-manrope border-solid border-2 border-txt2 rounded-lg px-3 py-1"
          to={`/recipes/${props.recipe._id}`}
        >
          View
        </Link>

        <a
          className="font-manrope border-solid border-2 border-txt2 rounded-lg px-3 py-1"
          href={props.recipe.source}
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </div>
    </div>
  );
}
