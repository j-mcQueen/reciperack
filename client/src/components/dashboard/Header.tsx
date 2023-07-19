import addIcon from "../../../src/assets/icons/add.svg";

export default function Header({ ...props }) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="font-manrope font-bold tracking-tighter text-5xl">
        {props.title}
      </h1>

      <button
        className="font-manrope font-bold tracking-tighter text-main bg-gold rounded flex gap-1 items-center px-3 py-3"
        type="button"
        onClick={() => props.setActive(true)}
      >
        <img className="w-5 h-5" src={addIcon} alt="A magnifying glass icon" />{" "}
        {props.addItem}
      </button>
    </header>
  );
}
