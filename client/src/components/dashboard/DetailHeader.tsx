import { Link } from "react-router-dom";
import BackIcon from "../../assets/icons/Back";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";

export default function DetailHeader({ ...props }) {
  return (
    <header className="flex justify-between items-center p-6">
      <nav className="flex gap-5">
        <Link
          to="/dashboard"
          className="border-solid border border-offgreen rounded-lg p-2 hover:bg-offgreen hover:transition-colors transition-colors"
        >
          <BackIcon title="Previous page" className="w-5 h-5" />
        </Link>

        {props.item.source ? (
          <a
            className="font-manrope font-bold rounded text-main bg-gold px-3 py-2"
            href={props.item.source}
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        ) : null}
      </nav>

      <h1 className="font-manrope font-bold tracking-tighter text-6xl">
        {props.item.title}
      </h1>

      <div className="flex gap-5">
        <button
          className="rounded border-solid border border-offmain p-2 hover:border-offgold hover:transition-colors transition-colors"
          type="button"
          onClick={() => props.setUpdateItemActive(true)}
        >
          <EditIcon
            title="Update entire document"
            className="w-5 h-5 fill-blue"
          />
        </button>

        <button
          className="rounded border-solid border border-offmain p-2 hover:border-offgold hover:transition-colors transition-colors"
          type="button"
          onClick={() => props.setDeleteItemActive(true)}
        >
          <DeleteIcon
            title="Delete entire document"
            className="w-5 h-5 fill-red"
          />
        </button>
      </div>
    </header>
  );
}
