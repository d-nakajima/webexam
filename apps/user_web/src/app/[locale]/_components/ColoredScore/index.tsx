"use client";
import ReactLoading from "react-loading";
type Props = {
  score?: number;
  className?: string;
};

export default function ColoredScore(props: Props) {
  let scoreColor: string;
  if (props.score === undefined)
    return <ReactLoading type="spin" color="#000" width="14" height="14" />;

  if (props.score >= 8) {
    scoreColor = "text-green-500";
  } else if (props.score >= 6) {
    scoreColor = "text-yellow-500";
  } else {
    scoreColor = "text-red-500";
  }
  return (
    <div className={`${scoreColor} ${props.className}`}>
      {props.score.toPrecision(2).substring(0, 3)}
    </div>
  );
}
