import closeIcon from "../../assets/icons/close.svg";
export default function DeleteRecipe({ ...props }) {
  const handleDelete = async () => {
    //
  };
  return (
    <div className="flex flex-col gap-10 bg-main border-solid border rounded-lg border-gold p-5 w-1/4">
      <div className="flex items-center gap-5">
        <div>
          <h3 className="font-manrope font-semibold text-2xl tracking-tighter pb-5">
            Delete: {props.recipe.title}
          </h3>
          <p className="font-manrope">
            Are you sure you want to remove this recipe?
          </p>
          <p className="font-manrope text-txt2">
            This action cannot be undone.
          </p>
        </div>

        <button
          type="button"
          className="self-start border-solid border border-offgreen rounded-lg p-2 hover:bg-offgreen hover:transition-colors transition-colors"
          onClick={() => props.setDeleteRecipeActive(false)}
        >
          <img src={closeIcon} alt="A cross icon" />
        </button>
      </div>

      <button
        className="font-manrope bg-red p-3 w-full rounded-lg"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}
