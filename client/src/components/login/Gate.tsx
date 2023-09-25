import Login from "./Login";
import SignUp from "./Signup";
import { useState } from "react";

export default function Gate() {
  const [form, setForm] = useState(0);
  const [spinner, setSpinner] = useState(false);

  return (
    <main
      className={
        form === 0
          ? "xl:grid xl:grid-cols-2 flex justify-center items-center h-screen"
          : "xl:grid xl:grid-cols-2 my-10"
      }
    >
      {form === 0 ? (
        <Login spinner={spinner} setSpinner={setSpinner} setForm={setForm} />
      ) : (
        <SignUp spinner={spinner} setSpinner={setSpinner} setForm={setForm} />
      )}
    </main>
  );
}
