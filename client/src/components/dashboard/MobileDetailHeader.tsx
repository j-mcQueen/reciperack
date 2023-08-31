import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/icons/Delete";
import EditIcon from "../../assets/icons/Edit";
import BackIcon from "../../assets/icons/Back";
import Open from "../../assets/icons/Open";

export default function MobileDetailHeader({ ...props }) {
  return (
    <header className="flex flex-col items-center">
      <h1 className="font-manrope font-bold tracking-tighter text-4xl py-8">
        {props.item.title}
      </h1>

      <div className="flex justify-between gap-7">
        <nav>
          <ul className="flex gap-7">
            <li>
              <Link
                to="/dashboard"
                className="text-sm flex flex-col items-center font-manrope bg-offgreen border-solid border border-green rounded-lg py-2 px-3"
              >
                <BackIcon className="w-5 h-5 fill-txt1" />
                Back
              </Link>
            </li>

            {props.item.source ? (
              <a
                className="text-sm font-manrope flex flex-col items-center justify-center tracking-tighter py-1 px-2 border border-solid border-gold rounded-lg bg-offgold"
                href={props.item.source}
                target="_blank"
                rel="noreferrer"
              >
                <Open className="w-5 h-5 fill-txt1" />
                Source
              </a>
            ) : null}
          </ul>
        </nav>

        <button
          className="flex flex-col items-center text-sm font-manrope tracking-tighter rounded border-solid border border-offmain py-2 px-4"
          type="button"
          onClick={() => props.setUpdateItemActive(true)}
        >
          <EditIcon className="w-5 h-5 fill-blue" />
          Edit
        </button>

        <button
          className="flex flex-col items-center text-sm font-manrope tracking-tighter rounded border-solid border border-offmain py-2 px-3"
          type="button"
          onClick={() => props.setDeleteItemActive(true)}
        >
          <DeleteIcon className="w-5 h-5 fill-red" />
          Delete
        </button>
      </div>
    </header>
  );
}
