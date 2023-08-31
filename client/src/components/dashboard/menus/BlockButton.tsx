import AddIcon from "../../../assets/icons/Add";

export default function BlockButton({ ...props }) {
  return (
    <button
      type="button"
      value={props.activeDay}
      onClick={() => {
        props.setModalAction("add");
        props.setActiveMeal(props.meal);
        props.setMenuModal(true);
      }}
      className="flex justify-center items-center bg-offgreen border-solid border-green border rounded-lg w-full p-3 gap-2 hover:bg-transgreen hover:transition-colors transition-colors"
    >
      <AddIcon className="w-5 h-5 fill-txt1" />
      Add Recipe
    </button>
  );
}
