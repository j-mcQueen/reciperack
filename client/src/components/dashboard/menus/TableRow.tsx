import TableButton from "./TableButton";

export default function TableRow({ ...props }) {
  return (
    <tr>
      <td className="font-manrope font-semibold text-txt2 tracking-tighter text-xl text-center align-middle border border-solid border-offmain">
        {props.meal}
      </td>

      <TableButton
        setActiveMeal={props.setActiveMeal}
        setAddModal={props.setAddModal}
        day={props.day}
        meal={props.meal}
      />
    </tr>
  );
}
