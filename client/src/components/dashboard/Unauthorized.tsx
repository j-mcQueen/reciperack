import Warning from "../../assets/icons/Warning";

export default function Unauthorized() {
  return (
    <dialog
      open
      className="font-manrope bg-main border border-solid border-offmain rounded-lg text-txt1"
    >
      <div className="flex items-center justify-center gap-3">
        <Warning className="w-10 h-10 fill-red" />
        <h3 className="text-3xl font-bold">401 Forbidden!</h3>
      </div>

      <div className="text-lg text-txt2 p-2">
        <p>Uh oh! It appears one of your requests has been refused.</p>

        <div className="py-2">
          <p>
            The most common cause of this issue is that your access has expired.
          </p>
          <p>
            We expire access after a set amount of time to help protect our
            users' data.
          </p>
        </div>

        <p>
          You will be redirected in 5 seconds. Please log in to continue using
          Reciperack.
        </p>
      </div>
    </dialog>
  );
}
