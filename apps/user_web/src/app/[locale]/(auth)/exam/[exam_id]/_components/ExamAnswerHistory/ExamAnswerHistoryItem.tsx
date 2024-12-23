import ColoredScore from "@/app/[locale]/_components/ColoredScore";
import { formatDate } from "date-fns";

type Props = {
  date: Date;
  score: number;
};

export default function ExamAnswerHistoryItem(props: Props) {
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="opacity-80">{formatDate(props.date, "yyyy.MM.dd")}</div>
      <ColoredScore className={`font-bold text-sm`} score={10} />
    </div>
  );
}
