const GameExitIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size + 1}
    fill="none"
    viewBox="0 0 24 25"
  >
    <g clipPath="url(#clip0_307_394)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M16.25 3H3.75v17.5a2.5 2.5 0 0 0 2.5 2.5h10m1.25-6.25L21.25 13m0 0L17.5 9.25M21.25 13H8.75"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_307_394">
        <path fill="#fff" d="M0 .5h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default GameExitIcon;
