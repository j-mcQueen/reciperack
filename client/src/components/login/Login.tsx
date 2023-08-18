import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ ...props }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameError) setUsernameError(false);
    if (passwordError) setPasswordError(false);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.data.errors) {
        for (const error of response.data.errors) {
          if (error.path === "username") setUsernameError(error.msg);
          if (error.path === "password") setPasswordError(error.msg);
        }
        return;
      } else {
        if (response.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
          navigate("/dashboard");
        }
      }

      if (response) console.log(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response !== undefined) {
          // above conditional acts as additional type checking for err
          // err.response.data should only contain 1 item (deliberately tested with both username and password errors)
          // these nested conditionals ensure that only one error message is visible at a time

          const errorMessage = err.response.data[0];
          if (errorMessage.includes("username")) {
            setUsernameError(errorMessage);
          } else if (errorMessage.includes("password")) {
            setPasswordError(errorMessage);
          }
        }
      }
    }
  };

  return (
    <section className="font-manrope mx-44">
      <h1 className="font-logo text-3xl self-start">reciperack</h1>
      <h2 className="text-5xl tracking-tighter py-5">Welcome back!</h2>
      <p className="text-txt2">
        Enter your credentials to view your recipehub.
      </p>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-5 py-5"
      >
        <label className="text-green">
          Username <span className="text-red">*</span>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
          />
          {usernameError ? (
            <span className="text-red">{usernameError}</span>
          ) : null}
        </label>

        <label className="text-green">
          Password <span className="text-red">*</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          {passwordError ? (
            <span className="text-red">{passwordError}</span>
          ) : null}
        </label>

        <button
          className="bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-transgreen hover:transition-colors transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="flex justify-center items-center gap-2 text-sm">
        <p className="text-txt2">Don't have an account?</p>

        <button
          className="text-sm bg-offblue py-1 px-2 border border-solid border-blue rounded-lg hover:bg-blue hover:transition-colors transition-colors"
          type="button"
          onClick={() => props.setForm(1)}
        >
          Sign Up
        </button>
      </div>
    </section>
  );
}
