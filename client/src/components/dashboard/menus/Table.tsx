import TableRow from "./TableRow";

export default function Table({ ...props }) {
  return (
    <table className="font-manrope table-fixed m-10 border border-solid border-offmain rounded-lg">
      <caption>{props.activeDay} recipes</caption>

      {/* <thead>
          <tr>
            <th colSpan={2}>{props.meal}</th>
          </tr>
        </thead> */}

      <tbody>
        <TableRow
          meal={"Breakfast"}
          day={props.day}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Lunch"}
          day={props.day}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Dinner"}
          day={props.day}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />
      </tbody>
    </table>
  );
}
