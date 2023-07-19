export default function Header() {
  return (
    <header className="flex justify-center p-6">
      <div className="absolute left-0 bg-logoBg ml-4 border-gold border-solid borderrounded-lgshadow-sky-600 font-logo leading-nonepx-4py-3">
        reciperack
      </div>

      <nav>
        <ul className="flex gap-5 font-subtext">
          <li className="font-body ">
            <a
              href=""
              className="hover:text-gold transition-colors hover:transition-colors"
            >
              Browse
            </a>
          </li>

          <li>
            <a
              href=""
              className="hover:text-gold transition-colors hover:transition-colors"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
