export default function SignUp({ ...props }) {
  return (
    <section className="font-manrope mx-44">
      <h1 className="font-logo text-3xl self-start">reciperack</h1>
      <h2 className="text-5xl tracking-tighter py-5">Sign up for reciperack</h2>
      <p className="text-txt2">Add valid credentials to get started.</p>

      <form className="flex flex-col gap-5 py-5">
        <label className="text-green">
          Email
          <input
            className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
            type="email"
            name="email"
            placeholder="Enter a valid email address"
          />
        </label>

        <fieldset className="flex flex-col gap-5">
          <label className="text-green">
            Password
            <input
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="pwd"
              placeholder="Create a valid password"
            />
          </label>

          <label className="text-green">
            Confirm
            <input
              className="w-full text-txt1 block bg-main border border-solid border-offmain mt-2 p-4 rounded-lg focus:outline-none focus:border-offgold"
              type="password"
              name="cpwd"
              placeholder="Confirm your password"
            />
          </label>
        </fieldset>

        <button
          className="bg-offgreen border border-solid border-green py-3 rounded-lg hover:bg-green hover:transition-colors transition-colors"
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
