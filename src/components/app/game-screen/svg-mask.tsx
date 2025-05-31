export default function SvgMask() {
  return (
    <svg width="0" height="0">
      <mask id="double-rect-mask" x="0" y="0" width="100%" height="100%">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <rect x="120" y="160" width="60" height="200" fill="black" />
        <rect x="300" y="100" width="80" height="80" fill="black" />
      </mask>
    </svg>
  );
}
