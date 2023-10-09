import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpinnerIcon from "../../assets/icons/Spinner";

export default function SignUp({ ...props }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCpasswordError] = useState(false);

  const [usernameTakenError, setUsernameTakenError] = useState(false);
  const [emailTakenError, setEmailTakenError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    props.setSpinner(true);

    // clean up any residual validation or authentication errors
    if (usernameError) setUsernameError(false);
    if (emailError) setEmailError(false);
    if (passwordError) setPasswordError(false);
    if (cpasswordError) setCpasswordError(false);
    if (usernameTakenError) setUsernameTakenError(false);
    if (emailTakenError) setEmailTakenError(false);

    try {
      const response = await axios.post(
        // "https://reciperack-api.vercel.app/signup",
        "http://localhost:3000/signup",
        {
          username,
          email,
          password,
          cpassword,
        }
      );

      if (response.data.errors) {
        // validation errors
        for (const item of response.data.errors) {
          if (item.path === "username") setUsernameError(item.msg);
          if (item.path === "email") setEmailError(item.msg);
          if (item.path === "password") setPasswordError(item.msg);
          if (item.path === "cpassword") setCpasswordError(item.msg);
        }
        return;
      }

      if (response.data.usernameTaken) {
        setUsernameTakenError(response.data.message);
        return;
      } else if (response.data.emailTaken) {
        setEmailTakenError(response.data.message);
        return;
      } else if (response.status === 200) {
        localStorage.setItem("token", response.data);
        return navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };

  return (
    <section className="font-manrope xl:mx-44 mx-5">
      <h1 className="font-logo text-3xl">
        <Link
          to="/"
          className="bg-offgold border border-solid border-gold xl:transition-colors xl:hover:transition-colors rounded-lg px-3"
        >
          reciperack
        </Link>
      </h1>

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
          ) : usernameTakenError ? (
            <span className="text-red">{usernameTakenError}</span>
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
          {emailError ? (
            <span className="text-red">{emailError}</span>
          ) : emailTakenError ? (
            <span className="text-red">{emailTakenError}</span>
          ) : null}
        </label>

        <fieldset className="flex flex-col gap-5">
          <label className="text-green">
            Password <span className="text-red">*</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="password"
              placeholder="Create a valid password"
              required
            />
            {passwordError ? (
              <span className="text-red">{passwordError}</span>
            ) : null}
          </label>

          <label className="text-green">
            Confirm <span className="text-red">*</span>
            <input
              onChange={(e) => setCpassword(e.target.value)}
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="cpassword"
              placeholder="Re-enter your password"
              required
            />
            {cpasswordError ? (
              <span className="text-red">{cpasswordError}</span>
            ) : null}
          </label>
        </fieldset>

        <button
          className="flex justify-center items-center bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-transgreen hover:transition-colors transition-colors"
          type="submit"
        >
          {props.spinner ? (
            <SpinnerIcon className="w-6 h-6 fill-txt1" />
          ) : (
            "Sign Up"
          )}
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
