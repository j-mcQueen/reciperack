import Features from "./Features";
import Header from "./Header";
import Hero from "./Hero";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="px-[15%] pb-[50px]">
        <Hero />
        <Features />
      </main>
    </>
  );
}
