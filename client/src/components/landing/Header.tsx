import { Link } from "react-router-dom";
import Login from "../../assets/icons/Login";

export default function Header() {
  const Links = () => {
    return (
      <ul className="flex items-center gap-10 font-subtext">
        <li className="bg-offgold border-gold border-solid border rounded-lg shadow-sky-600 font-logo leading-none py-2 p-3 text-xl">
          <Link to="/">reciperack</Link>
        </li>

        <li>
          <Link
            className="flex flex-col items-center transition-colors hover:text-gold hover:transition-colors text-sm sm:text-lg text-txt2"
            to="/gate"
          >
            <Login className="w-5 h-5 fill-green" />
            Login
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <header className="font-manrope flex justify-center items-center p-6">
      <nav>{Links()}</nav>
    </header>
  );
}
