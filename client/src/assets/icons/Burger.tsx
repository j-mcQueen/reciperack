export default function Burger({ ...props }) {
  return (
    <svg
      aria-labelledby="burgerTitle burgerDesc"
      role="img"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <title id="burgerTitle">{props.title}</title>
      <desc id="burgerDesc">
        A icon with three lines denoting the toggle menu capability
      </desc>
      <path d="M150-240q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-300h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-240H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-510h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-450H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-720h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-660H150Z" />
    </svg>
  );
}
