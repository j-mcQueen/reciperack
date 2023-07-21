import { Link } from "react-router-dom";
import icons from "../../assets/icons/export";

export default function DetailHeader({ ...props }) {
  return (
    <header className="flex justify-between items-center p-6">
      <nav className="flex gap-5">
        <Link to="/">
          <img
            className="border-solid border border-offgreen rounded-lg p-2 hover:bg-offgreen hover:transition-colors transition-colors"
            src={icons.back}
            alt="A left-facing arrow icon"
          />
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
          className="rounded border-solid border border-offmain p-2"
          type="button"
          onClick={() => props.setUpdateItemActive(true)}
        >
          <img src={icons.edit} alt="A pencil icon" />
        </button>

        <button
          className="rounded border-solid border border-offmain p-2"
          type="button"
          onClick={() => props.setDeleteItemActive(true)}
        >
          <img src={icons.del} alt="A bin icon" />
        </button>
      </div>
    </header>
  );
}
