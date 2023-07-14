export default function Header() {
  return (
    <header className="flex justify-center p-6">
      <div className="absolute left-0">
        <span
          className="bg-logoBg
                 ml-4 
                 border-gold 
                 border-solid 
                 border
                 rounded-lg
                 shadow-sky-600 
                 font-logo 
                 leading-none
                 px-4
                 py-3
                 "
        >
          reciperack
        </span>
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
