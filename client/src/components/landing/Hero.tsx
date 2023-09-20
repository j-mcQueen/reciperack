import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="font-manrope flex flex-col items-center justify-center py-[100px] xl:py-[200px] gap-5">
      <h1 className="text-6xl tracking-tighter text-center">
        The hub of accessible recipes<span className="text-green">.</span>
      </h1>
      <p className="tracking-tighter text-xl text-txt2">
        Your recipes. All in one place.
      </p>

      <Link
        className="font-bold tracking-tighter px-6 py-2 text-text1 text-lg lg:text-xl bg-offgreen border-green border-solid border rounded-lg transition-colors xl:hover:bg-transgreen xl:hover:transition-colors"
        to="/gate"
      >
        Get Started
      </Link>
    </section>
  );
}
