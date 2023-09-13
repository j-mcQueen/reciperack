import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-[100px] xl:py-[200px] gap-5">
      <h1 className="font-manrope text-6xl xl:text-8xl tracking-tighter text-center">
        The hub of accessible recipes
      </h1>
      <p className="font-inter tracking-tighter text-xl text-txt2 lg:text-3xl">
        Your recipes. All in one place.
      </p>

      <Link
        className="font-manrope tracking-tighter px-6 py-2 text-text1 text-lg lg:text-xl bg-offgreen border-green border-solid border rounded-lg transition-colors xl:hover:bg-transgreen xl:hover:transition-colors"
        to="/gate"
      >
        Get Started
      </Link>
    </section>
  );
}
