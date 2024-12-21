import { formatDate } from "date-fns";

type Props = {
  date: Date;
  score: number;
};

export default function ExamAnswerHistoryItem(props: Props) {
  let scoreColor: string;
  if (props.score >= 8) {
    scoreColor = "text-green-500";
  } else if (props.score >= 6) {
    scoreColor = "text-yellow-500";
  } else {
    scoreColor = "text-red-500";
  }
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="opacity-80">{formatDate(props.date, "yyyy.MM.dd")}</div>
      <div className={`font-bold text-sm ${scoreColor}`}>10</div>
    </div>
  );
}
