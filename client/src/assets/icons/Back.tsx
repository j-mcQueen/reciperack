export default function BackIcon({ ...props }) {
  return (
    <svg
      aria-labelledby="backTitle backDesc"
      role="img"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#CECECE"
    >
      <title id="backTitle">{props.title}</title>
      <desc id="backDesc">
        A left facing arrow icon denoting the previous page capability
      </desc>
      <path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z" />
    </svg>
  );
}
