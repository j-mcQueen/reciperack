export default function LogoutIcon({ ...props }) {
  return (
    <svg
      aria-labelledby="logoutTitle logoutDesc"
      role="img"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <title id="logoutTitle">{props.title}</title>
      <desc id="logoutDesc">An exit icon denoting the logout capability</desc>
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h269q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T449-780H180v600h269q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T449-120H180Zm545-330H390q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T390-510h333l-81-81q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l133 133q9 9 9 21t-9 21L687-326q-8.8 9-20.9 8.5-12.1-.5-21.491-9.5Q636-336 636-348.5t9-21.5l80-80Z" />
    </svg>
  );
}
