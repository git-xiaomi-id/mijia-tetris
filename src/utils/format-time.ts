export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds
  )}`;
}
