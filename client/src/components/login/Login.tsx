import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../assets/icons/Spinner";

export default function Login({ ...props }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    props.setSpinner(true);
    if (authError) setAuthError("");

    try {
      const response = await axios.post(
        "https://reciperack-api.vercel.app/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // no sensitive user data is stored in token, therefore tradeoff of storing tokens in localStorage is permissible
        localStorage.setItem("token", response.data);
        return navigate("/dashboard");
      }
    } catch (err) {
      props.setSpinner(false);

      if (err instanceof AxiosError) {
        if (err.response !== undefined) {
          // above conditional acts as additional type checking for err
          setAuthError(
            "Incorrect username or password. Please check your credentials and try again."
          );
        }
      }
    }
  };

  return (
    <section className="font-manrope xl:mx-44">
      <h1 className="font-logo text-3xl">
        <Link
          to="/"
          className="bg-offgold border border-solid border-gold rounded-lg px-3"
        >
          reciperack
        </Link>
      </h1>

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
        </label>

        {authError !== "" ? (
          <span className="text-red">{authError}</span>
        ) : null}

        <button
          className="flex justify-center items-center bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-transgreen hover:transition-colors transition-colors"
          type="submit"
        >
          {props.spinner ? (
            <SpinnerIcon className="w-6 h-6 fill-txt1" />
          ) : (
            "Login"
          )}
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
