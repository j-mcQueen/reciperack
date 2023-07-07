export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-[200px] gap-5">
      <h1 className="font-headingtext text-7xl tracking-tighter">
        The hub of accessible recipes
      </h1>
      <p className="font-subtext text-txt2 text-3xl">
        Your recipes. All in one place.
      </p>

      <button
        className="font-logotext px-6 py-2 text-text1 text-lg bg-logoBg border-gold border-solid border rounded-lg transition-colors hover:bg-gold hover:transition-colors hover:text-main"
        type="button"
      >
        sign up
      </button>
    </section>
  );
}
