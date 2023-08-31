import axios from "axios";
import CloseIcon from "../../../assets/icons/Close";
import Warning from "../../../assets/icons/Warning";
import { useNavigate } from "react-router-dom";

export default function DeleteMenu({ ...props }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/menus/${props.menu._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-5 bg-main border-solid border rounded-lg border-gold p-5 mx-3 xl:mx-0 xl:w-1/4">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-manrope font-semibold text-2xl tracking-tighter">
          Delete: {props.menu.title}
        </h3>

        <button
          type="button"
          className="self-start border-solid border border-offgreen rounded-lg p-2 hover:bg-offgreen hover:transition-colors transition-colors"
          onClick={() => props.setDeleteMenuActive(false)}
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
          <p>Are you sure you want to remove this menu?</p>

          <p className="text-txt2">
            <strong>This action cannot be undone.</strong>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="font-manrope bg-offred border border-solid border-red p-3 w-full rounded-lg hover:bg-transred hover:transition-colors transition-colors"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}
