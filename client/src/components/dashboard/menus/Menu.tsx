import { Link } from "react-router-dom";

export default function Menu({ ...props }) {
  return (
    <article key={props.key}>
      <h2>{props.menu.title}</h2>

      <Link
        className="font-manrope border-solid border-2 border-txt2 rounded-lg px-3 py-1"
        to={`/menus/${props.menu._id}`}
      >
        View
      </Link>
    </article>
  );
}
