// 100 => 01:40
export function formatAsTime(value: number) {
  const minutes = String(Math.floor(value / 60));
  const seconds = String(value % 60);

  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
