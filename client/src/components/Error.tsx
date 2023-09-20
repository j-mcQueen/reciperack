import Warning from "../assets/icons/Warning";
export default function Error() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="font-manrope tracking-tighter">
        <article>
          <div className="flex items-center gap-5">
            <Warning className="w-10 xl:w-14 h-10 xl:h-14 fill-txt1 bg-offred border border-solid border-red rounded-lg p-2" />
            <h1 className="text-6xl font-extrabold"> Whoops!</h1>
          </div>

          <p className="text-txt2 py-2">
            Something went wrong. You may be trying to access a page that
            doesn't exist.
          </p>
          <p className="text-txt2">
            Press the back button in your browser to get back to where you
            started.
          </p>
        </article>
      </section>
    </main>
  );
}
