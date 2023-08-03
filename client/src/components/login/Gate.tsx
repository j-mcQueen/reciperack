import Login from "./Login";
import SignUp from "./Signup";
import { useState } from "react";

export default function Gate() {
  const [form, setForm] = useState(0);

  return (
    <main className="grid grid-cols-2 items-center h-screen">
      {form === 0 ? <Login setForm={setForm} /> : <SignUp setForm={setForm} />}

      <section className="shadow-inner"></section>
    </main>
  );
}
