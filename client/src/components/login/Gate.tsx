import Login from "./Login";
import SignUp from "./Signup";
import { useState } from "react";

export default function Gate() {
  const [form, setForm] = useState(0);

  return (
    <main className="xl:grid xl:grid-cols-2 flex justify-center items-center h-screen">
      {form === 0 ? <Login setForm={setForm} /> : <SignUp setForm={setForm} />}
    </main>
  );
}
