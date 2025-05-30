const GameRestartIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size + 1}
    fill="none"
    viewBox="0 0 24 25"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M12 3.5a9 9 0 1 1-5.657 2"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M3 5h4v4"
    ></path>
  </svg>
);

export default GameRestartIcon;
