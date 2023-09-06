import AddIcon from "../../../assets/icons/Add";

export default function BlockButton({ ...props }) {
  return (
    <button
      type="button"
      value={props.vals.activeDay}
      onClick={() => {
        props.setters.setModalAction("add");
        props.setters.setActiveMeal(props.vals.meal);
        props.setters.setMenuModal(true);
      }}
      className="flex justify-center items-center bg-offgreen border-solid border-green border rounded-lg w-full p-3 gap-2 hover:bg-transgreen hover:transition-colors transition-colors"
    >
      <AddIcon className="w-5 h-5 fill-txt1" />
      Add Recipe
    </button>
  );
}
