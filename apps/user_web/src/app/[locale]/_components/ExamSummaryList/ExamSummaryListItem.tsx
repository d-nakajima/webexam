import { Link } from "@/_lib/i18n/routing";
import ColoredScore from "../ColoredScore";

type Props = {
  id: string;
  title: string;
  url: string;
  score?: number;
};

export default function ExamSummaryListItem(props: Props) {
  return (
    <Link href="#" className="flex items-center w-full hover:opacity-75">
      <div className="flex-grow">
        <div className="text-sm leading-tight">{props.title}</div>
        <div className="text-xs opacity-75 leading-tight">{props.url}</div>
      </div>
      <div className="">
        {props.score && (
          <ColoredScore score={props.score} className="font-bold" />
        )}
      </div>
    </Link>
  );
}
