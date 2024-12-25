import { Link } from "@/_lib/i18n/routing";
import { answerRoutePath } from "@/app/_presets/_utils/route_builder";
import ColoredScore from "../ColoredScore";
import { format } from "date-fns";
import { DialogTrigger } from "@/app/_shadcn/components/ui/dialog";

type Props = {
  id: string;
  examId: string;
  title: string;
  date: Date;
  abstract: string;
  score?: number;
};

export default function SearchResultItem(props: Props) {
  return (
    <DialogTrigger asChild>
      <Link href={answerRoutePath(props.examId, props.id)}>
        <div className="min-w-0 w-full grid grid-cols-[1fr_auto_auto] grid-rows-[auto_auto]">
          <div className="text-sm font-bold col-start-1 col-span-1 text-ellipsis">
            {props.title}
          </div>
          <div className="text-[12px] text-gray-500 col-start-2 col-span-2 text-right">
            {format(props.date, "yyyy-MM-dd")}
          </div>
          <div className="text-[12px] col-start-1 col-span-2 text-ellipsis line-clamp-2 my-1">
            {props.abstract}
          </div>
          <ColoredScore
            score={props.score}
            className="col-start-3 self-center font-bold"
          />
        </div>
      </Link>
    </DialogTrigger>
  );
}
