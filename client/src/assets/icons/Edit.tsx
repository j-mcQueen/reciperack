export default function EditIcon({ ...props }) {
  return (
    <svg
      aria-labelledby="editTitle editDesc"
      role="img"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <title id="editTitle">{props.title}</title>
      <desc id="editDesc">A pencil icon denoting the update capability</desc>
      <path d="M794-666 666-794l42-42q17-17 42.5-16.5T793-835l43 43q17 17 17 42t-17 42l-42 42ZM150-120q-13 0-21.5-8.5T120-150v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z" />
    </svg>
  );
}
