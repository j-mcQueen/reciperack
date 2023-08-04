import AddIcon from "../../../assets/icons/Add";

export default function TableButton({ ...props }) {
  return (
    <td className="p-3">
      <button
        type="button"
        value={props.activeDay}
        onClick={() => {
          props.setActiveMeal(props.meal);
          props.setAddModal(true);
        }}
        className="flex justify-center items-center bg-offgreen border-solid border-green border rounded-lg w-full p-3 gap-2"
      >
        <AddIcon className="w-5 h-5 fill-txt1" />
        Add Recipe
      </button>
    </td>
  );
}
