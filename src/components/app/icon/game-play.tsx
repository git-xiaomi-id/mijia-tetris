const GamePlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size + 1}
    fill="none"
    viewBox="0 0 24 25"
  >
    <g clipPath="url(#clip0_307_392)">
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M19.64 10.594c1.852 1.07 1.852 3.742 0 4.812L7.138 22.623c-1.851 1.07-4.167-.266-4.167-2.405V5.782c0-2.139 2.316-3.475 4.167-2.405z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_307_392">
        <path fill="#fff" d="M0 .5h24v24H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default GamePlayIcon;
