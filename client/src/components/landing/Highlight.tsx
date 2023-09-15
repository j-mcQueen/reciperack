export default function Highlight({ ...props }) {
  return (
    <article className="xl:grid xl:grid-cols-features xl:items-center xl:justify-center xl:gap-8">
      <div className="flex flex-col justify-center">
        <h2 className="font-manrope text-center xl:text-left text-3xl xl:text-4xl py-3 tracking-tighter">
          {props.highlightTitle}
        </h2>

        <p className="font-manrope tracking-tighter text-xl text-txt2 xl:pr-20 pb-5">
          {props.highlightText}
        </p>
      </div>

      <div className="flex flex-col items-center border-solid border-green border rounded-lg shadow-primary">
        <div className="flex flex-col items-center gap-6 py-5 px-3">
          <h3 className="font-manrope text-2xl tracking-tighter">
            {props.cardTitle}
          </h3>

          <div className="border-gold border border-solid rounded-full p-4 shadow-primary">
            {props.cardImg}
          </div>

          <p className="font-inter tracking-tighter text-txt2 text-xl text-center">
            {props.cardText}
          </p>
        </div>
      </div>
    </article>
  );
}
