const InformationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
  >
    <g filter="url(#filter0_d_680_11249)">
      <rect
        width="24"
        height="24"
        x="3"
        y="1"
        fill="url(#paint0_linear_680_11249)"
        rx="12"
        shapeRendering="crispEdges"
      ></rect>
      <rect
        width="25"
        height="25"
        x="2.5"
        y="0.5"
        stroke="#065BAF"
        strokeOpacity="0.4"
        rx="12.5"
        shapeRendering="crispEdges"
      ></rect>
      <g filter="url(#filter1_d_680_11249)">
        <path
          fill="#fff"
          d="M15.917 18h-1.824v-6.708h1.824zm.168-8.58q0 .504-.3.792-.288.288-.792.288t-.792-.288q-.276-.288-.276-.792 0-.492.276-.792.288-.3.792-.3t.792.3q.3.3.3.792"
        ></path>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_680_11249"
        width="30"
        height="30"
        x="0"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="2"></feOffset>
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.219608 0 0 0 0 0.552941 0 0 0 0 0.890196 0 0 0 0.2 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_680_11249"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_680_11249"
          result="shape"
        ></feBlend>
      </filter>
      <filter
        id="filter1_d_680_11249"
        width="6.16"
        height="13.672"
        x="11.925"
        y="8.328"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="2"></feOffset>
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.219608 0 0 0 0 0.552941 0 0 0 0 0.890196 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_680_11249"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_680_11249"
          result="shape"
        ></feBlend>
      </filter>
      <linearGradient
        id="paint0_linear_680_11249"
        x1="15"
        x2="15"
        y1="1"
        y2="25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#50A7FE"></stop>
        <stop offset="0.697" stopColor="#378CE1"></stop>
        <stop offset="1" stopColor="#065BAF"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default InformationIcon;
