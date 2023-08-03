export default function Login({ ...props }) {
  return (
    <section className="font-manrope mx-44">
      <h1 className="font-logo text-3xl self-start">reciperack</h1>
      <h2 className="text-5xl tracking-tighter py-5">Welcome back!</h2>
      <p className="text-txt2">
        Enter your credentials to view your recipehub.
      </p>

      <form className="flex flex-col gap-5 py-5">
        <label className="text-green">
          Email
          <input
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
        </label>

        <label className="text-green">
          Password
          <input
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="password"
            name="pwd"
            placeholder="Enter your password"
          />
        </label>

        <button
          className="bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-green hover:transition-colors transition-colors"
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
