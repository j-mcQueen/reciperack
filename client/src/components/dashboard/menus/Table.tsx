import TableRow from "./TableRow";

export default function Table({ ...props }) {
  const day = props.activeDay.toLowerCase();
  const dayRecipes = props.menu[day];

  return (
    <table className="font-manrope table-fixed border-collapse m-10">
      <caption className="text-3xl tracking-tighter p-3 border border-solid border-offmain">
        {props.activeDay} recipes
      </caption>

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
