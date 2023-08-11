import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ ...props }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [cpwdError, setCpwdError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        pwd,
        cpwd,
      });

      if (response.data.errors) {
        for (const item of response.data.errors) {
          if (item.path === "username") setUsernameError(item.msg);
          if (item.path === "email") setEmailError(item.msg);
          if (item.path === "pwd") setPwdError(item.msg);
          if (item.path === "cpwd") setCpwdError(item.msg);
        }
      } else if (response.status === 200) {
        navigate("/dashboard", { state: { user: response.data } });
      }
      // location.replace("http://localhost:5173/dashboard");
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };

  return (
    <section className="font-manrope mx-44">
      <h1 className="font-logo text-3xl self-start">reciperack</h1>
      <h2 className="text-5xl tracking-tighter py-5">Sign up for reciperack</h2>
      <p className="text-txt2">Add valid credentials to get started.</p>

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
            placeholder="Enter a username"
            minLength={5}
            required
          />
          {usernameError ? (
            <span className="text-red">{usernameError}</span>
          ) : null}
        </label>

        <label className="text-green">
          Email <span className="text-red">*</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="email"
            name="email"
            placeholder="Enter a valid email address"
            required
          />
          {emailError ? <span className="text-red">{emailError}</span> : null}
        </label>

        <fieldset className="flex flex-col gap-5">
          <label className="text-green">
            Password <span className="text-red">*</span>
            <input
              onChange={(e) => setPwd(e.target.value)}
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="pwd"
              placeholder="Create a valid password"
              required
            />
            {pwdError ? <span className="text-red">{pwdError}</span> : null}
          </label>

          <label className="text-green">
            Confirm <span className="text-red">*</span>
            <input
              onChange={(e) => setCpwd(e.target.value)}
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="cpwd"
              placeholder="Confirm your password"
              required
            />
            {cpwdError ? <span className="text-red">{cpwdError}</span> : null}
          </label>
        </fieldset>

        <button
          className="bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-transgreen hover:transition-colors transition-colors"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <div className="flex justify-center items-center gap-2 text-sm">
        <p className="text-txt2">Already have an account?</p>

        <button
          className="text-sm bg-offblue py-1 px-2 border border-solid border-blue rounded-lg hover:bg-blue hover:transition-colors transition-colors"
          type="button"
          onClick={() => props.setForm(0)}
        >
          Sign In
        </button>
      </div>
    </section>
  );
}
