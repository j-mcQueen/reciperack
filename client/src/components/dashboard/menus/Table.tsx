import TableRow from "./TableRow";

export default function Table({ ...props }) {
  const day = props.activeDay.toLowerCase();
  const dayRecipes = props.menu[day];

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
          recipe={dayRecipes[0]}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Lunch"}
          recipe={dayRecipes[1]}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />

        <TableRow
          meal={"Dinner"}
          recipe={dayRecipes[2]}
          activeDay={props.activeDay}
          setAddModal={props.setAddModal}
          setActiveMeal={props.setActiveMeal}
        />
      </tbody>
    </table>
  );
}
