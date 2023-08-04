import axios from "axios";
import TableButton from "./TableButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../assets/icons/Delete";
import EditIcon from "../../../assets/icons/Edit";

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
    <tr className="border border-solid border-offmain">
      <th
        scope="row"
        className="py-3 px-6 font-manrope font-semibold text-txt2 tracking-tighter text-xl text-center align-middle border border-solid border-offmain"
      >
        {props.meal}
      </th>

      {props.recipe ? (
        <>
          <td className="p-3">
            <Link
              className="flex text-lg justify-center items-center border border-solid border-offgold bg-offgold rounded-lg p-3 hover:bg-transgold hover:transition-colors transition-colors"
              to={`/recipes/${rowRecipe._id}`}
            >
              {rowRecipe.title}
            </Link>
          </td>

          <td className="align-middle border border-solid border-offmain">
            <button type="button" className="p-4">
              <EditIcon
                title="Update Menu Recipe"
                className="w-5 h-5 fill-blue"
              />
            </button>
          </td>

          <td className="align-middle border border-solid border-offmain">
            <button
              type="button"
              className="p-4"
              onClick={() => {
                props.setActiveMeal(props.meal);
                props.setDeleteMenuRecipeActive(true);
              }}
            >
              <DeleteIcon
                title="Delete Menu Recipe"
                className="w-5 h-5 fill-red"
              />
            </button>
          </td>
        </>
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
