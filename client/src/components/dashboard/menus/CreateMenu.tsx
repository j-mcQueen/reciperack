import axios from "axios";
import { useState } from "react";
import CloseIcon from "../../../assets/icons/Close";

export default function CreateMenu({ ...props }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/menus", {
        title,
      });

      if (response) {
        console.log(response);
        props.setMenus([...props.menus, response.data]);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  // tab index of 0 set on h2 to ensure a user using assistive technology lands at a descriptive point on the modal when opened
  return (
    <div className="absolute bg-logoBg font-manrope flex flex-col items-center p-5 border-solid border-offmain border rounded-lg">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl" tabIndex={0}>
          Create a new menu
        </h2>

        <button
          className="border border-solid border-gold rounded-lg p-1 hover:bg-offgold hover:transition-colors transition-colors"
          type="button"
          onClick={() => props.setAddMenuActive(false)}
        >
          <CloseIcon className="w-5 h-5 fill-txt2" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          props.setAddMenuActive(false);
        }}
        className="flex flex-col gap-5 py-3"
      >
        <label>
          Title
          <input
            className="block mt-2 bg-logoBg border border-solid rounded-lg border-offmain p-3 focus:border-gold focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
            name="title"
            placeholder="Enter a title for your menu"
          />
        </label>

        <button
          className="font-semibold tracking-tighter bg-offgreen border-green border-solid border rounded-lg py-3"
          type="submit"
        >
          Create Menu
        </button>
      </form>
    </div>
  );
}
