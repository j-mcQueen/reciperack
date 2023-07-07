export default function Highlight({ ...props }) {
  return (
    <div className="grid grid-cols-features items-center justify-center gap-8">
      <div className="flex flex-col justify-center">
        <h2 className="font-headingtext text-4xl py-3 tracking-tighter">
          {props.highlightTitle}
        </h2>

        <p className="font-subtext text-xl text-txt2 pr-20">
          {props.highlightText}
        </p>
      </div>

      <div className="flex flex-col items-center border-solid border-green border rounded-lg shadow-primary">
        <div className="flex flex-col items-center gap-10 p-5">
          <h3 className="font-headingtext text-2xl tracking-tighter">
            {props.cardTitle}
          </h3>

          <div className="border-gold border border-solid rounded-full p-4 shadow-primary">
            {props.cardImg}
          </div>

          <p className="font-subtext text-txt2 text-lg text-center">
            {props.cardText}
          </p>
        </div>
      </div>
    </div>
  );
}
