import { Link } from "react-router-dom";

export default function Menu({ ...props }) {
  return (
    <article
      key={props.key}
      className="font-manrope bg-logoBg text-2xl tracking-tighter font-semibold rounded-lg border border-solid border-offgold"
    >
      <Link to={`/menus/${props.menu._id}`}>
        <h2 className="px-3 py-1">{props.menu.title}</h2>
      </Link>
    </article>
  );
}
