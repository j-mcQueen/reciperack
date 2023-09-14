import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import Warning from "../../../assets/icons/Warning";

export default function ClearMenu({ ...props }) {
  const handleRemove = async () => {
    try {
      const day: string = props.vals.activeDay.toLowerCase();
      const updatedMenu = { ...props.vals.menu, [day]: [] };

      const response = await axios.put(
        `http://localhost:3000/user/${props.vals.userId}`,
        { updatedMenu, target: "menu" },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        props.setters.setMenu(response.data.menu);
        props.setters.setBreakfast({});
        props.setters.setLunch({});
        props.setters.setDinner({});
        props.setters.setClearModalActive(false);
      }
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-5 bg-main border-solid border rounded-lg border-offmain p-5 mx-3 xl:mx-0 xl:w-1/4">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-manrope font-semibold text-2xl tracking-tighter">
          Clear {props.vals.activeDay} recipes
        </h3>

        <button
          type="button"
          className="self-start border-solid border border-offgold rounded-lg p-2 hover:bg-transgold hover:transition-colors transition-colors"
          onClick={() => props.setters.setClearModalActive(false)}
        >
          <CloseIcon
            title="Close create menu modal"
            className="w-5 h-5 fill-txt2"
          />
        </button>
      </div>

      <div className="font-inter flex items-center gap-5 tracking-tighter text-lg">
        <Warning title="Delete warning" className="w-12 h-12 fill-red" />

        <div>
          <p>
            Are you sure you want to clear all recipes from your{" "}
            {props.vals.activeDay} menu?
          </p>

          <p className="text-txt2">
            <strong>This action cannot be undone.</strong>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="font-manrope bg-offred border border-solid border-red p-3 w-full rounded-lg hover:bg-transred hover:transition-colors transition-colors"
        onClick={() => handleRemove()}
      >
        Remove
      </button>
    </div>
  );
}
