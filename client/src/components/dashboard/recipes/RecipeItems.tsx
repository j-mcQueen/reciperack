import { Link } from "react-router-dom";
import DeleteIcon from "../../../assets/icons/Delete";
import Open from "../../../assets/icons/Open";

export default function RecipeItems({ ...props }) {
  return props.arr.map(
    (item: {
      _id: string;
      category: string;
      title: string;
      source: string;
    }) => (
      <article
        key={item._id}
        className="font-manrope bg-main flex flex-col p-5 rounded-lg gap-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-txt2 text-lg tracking-tighter">
            {item.category ? item.category : "N/A"}
          </h3>

          <button
            className="p-2 bg-offred border border-solid border-red rounded-lg xl:hover:bg-transred xl:hover:transition-colors transition-colors"
            type="button"
          >
            <DeleteIcon className="w-5 h-5 fill-txt1" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Link
            className="text-lg text-center font-bold tracking-tighter py-2 px-3 border border-solid border-green rounded-lg bg-offgreen xl:hover:bg-transgreen xl:hover:transition-colors transition-colors w-full"
            to={`/${props.page}/${item._id}`}
          >
            {item.title}
          </Link>

          <a
            className="flex items-center justify-center gap-2 text-lg tracking-tighter py-2 px-3 border border-solid border-gold rounded-lg bg-offgold xl:hover:bg-transgold xl:hover:transition-colors transition-colors w-full"
            href={item.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
            <Open className="w-5 h-5 fill-txt1" />
          </a>
        </div>
      </article>
    )
  );
}
