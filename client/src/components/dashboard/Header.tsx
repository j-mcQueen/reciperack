import Burger from "../../assets/icons/Burger.tsx";

export default function Header({ ...props }) {
  const viewport = window.matchMedia("(max-width: 1080px)");
  return (
    <header className="flex justify-between items-center bg-main rounded-lg p-5 xl:mr-5 mb-3 xl:mb-5">
      {viewport.matches === true ? (
        <button
          onClick={() => props.setMobileLinksActive(!props.mobileLinksActive)}
          className="bg-offgold p-2 border border-solid border-gold rounded-lg "
          type="button"
        >
          <Burger title="Toggle menu" className="w-5 h-5 fill-txt1" />
        </button>
      ) : null}

      <h1 className="font-manrope font-bold tracking-tighter text-2xl xl:text-5xl">
        {props.source}
      </h1>
    </header>
  );
}
