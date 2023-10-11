import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import Warning from "../../../assets/icons/Warning";
import { useNavigate } from "react-router-dom";

export default function ClearMenu({ ...props }) {
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      const day: string = props.vals.activeDay.toLowerCase();
      let updatedMenu;

      if (props.vals.intent === 1) {
        // reset entire week
        updatedMenu = {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        };
      } else {
        // clear day recipes
        updatedMenu = { ...props.vals.menu, [day]: [] };
      }

      const response = await axios.put(
        `https://reciperack-api.vercel.app/user/${props.vals.userId}`,
        { updatedMenu },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        props.setters.setMenu(response.data);
        props.setters.setBreakfast({});
        props.setters.setLunch({});
        props.setters.setDinner({});
        props.setters.setClearModalActive(false);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        props.setters.setUnauthorized(true);
        localStorage.removeItem("token");

        setTimeout(() => {
          return navigate("/gate");
        }, 5000);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 bg-main border-solid border rounded-lg border-offmain p-5 mx-3 xl:mx-0 xl:w-1/3">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-manrope font-semibold text-2xl tracking-tighter">
          {props.vals.intent === 0
            ? `Clear ${props.vals.activeDay} recipes`
            : `Clear all recipes from menu`}
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

      <div className="font-manrope flex items-center gap-5 tracking-tighter">
        <Warning title="Delete warning" className="w-12 h-12 fill-red" />

        <div className="tracking-tighter">
          <p className="text-lg">
            {props.vals.intent === 0
              ? `Are you sure you want to remove all recipes from your
            ${props.vals.activeDay} menu?`
              : `Are you sure you want to reset the entire menu?`}
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
