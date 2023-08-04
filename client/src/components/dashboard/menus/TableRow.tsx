import axios from "axios";
import TableButton from "./TableButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TableRow({ ...props }) {
  const [rowRecipe, setRowRecipe] = useState({ _id: "", title: "" });

  useEffect(() => {
    let ignore = false;

    const renderRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${props.recipe}`
        );

        if (response && !ignore) {
          setRowRecipe(response.data);
        }
      } catch (err) {
        if (err instanceof Error) console.log(err);
      }
    };
    if (props.recipe !== undefined) renderRecipe();

    return () => {
      ignore = true;
    };
  }, [props.recipe]);

  return (
    <tr>
      <td className="p-3 font-manrope font-semibold text-txt2 tracking-tighter text-xl text-center align-middle border border-solid border-offmain">
        {props.meal}
      </td>

      {props.recipe ? (
        <td className="border border-solid border-offmain p-3">
          <Link
            className="flex text-black justify-center items-center border border-solid border-offgold bg-offgold rounded-lg p-3"
            to={`/recipes/${rowRecipe._id}`}
          >
            {rowRecipe.title}
          </Link>
        </td>
      ) : (
        <TableButton
          setActiveMeal={props.setActiveMeal}
          setAddModal={props.setAddModal}
          activeDay={props.activeDay}
          meal={props.meal}
        />
      )}
    </tr>
  );
}
