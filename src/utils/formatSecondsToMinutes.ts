export const formatSecondsToMinutes = (seconds: number) => {
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsString = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${minutesString}:${secondsString}`;
};
