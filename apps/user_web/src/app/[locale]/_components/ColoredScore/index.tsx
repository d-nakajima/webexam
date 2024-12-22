type Props = {
  score: number;
  className?: string;
};

export default function ColoredScore(props: Props) {
  let scoreColor: string;
  if (props.score >= 8) {
    scoreColor = "text-green-500";
  } else if (props.score >= 6) {
    scoreColor = "text-yellow-500";
  } else {
    scoreColor = "text-red-500";
  }
  return (
    <div className={`${scoreColor} ${props.className}`}>{props.score}</div>
  );
}
