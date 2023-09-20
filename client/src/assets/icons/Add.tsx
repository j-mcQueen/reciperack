export default function AddIcon({ ...props }) {
  return (
    <svg
      aria-labelledby={props.needsLabel ? "addTitle addDesc" : undefined}
      role="img"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#282828"
    >
      {props.needsLabel ? (
        // icon is not surrounded by descriptive text, therefore needs supplementary a11y information
        <>
          <title id="addTitle">{props.title}</title>
          <desc id="addDesc">A plus icon denoting the add capability</desc>
        </>
      ) : null}
      <path d="M479.825-200Q467-200 458.5-208.625T450-230v-220H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-510h220v-220q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-730v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-450H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z" />
    </svg>
  );
}
