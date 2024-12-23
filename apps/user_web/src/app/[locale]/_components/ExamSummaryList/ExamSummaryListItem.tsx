import ColoredScore from "../ColoredScore";

type Props = {
  id: string;
  title: string;
  url: string;
  score?: number;
};

export default function ExamSummaryListItem(props: Props) {
  return (
    <div className="flex items-center w-full gap-2 hover:opacity-75">
      <div className="flex-grow min-w-0">
        <div className="text-sm leading-tight">{props.title}</div>
        <div className="text-xs opacity-75 leading-tight text-ellipsis overflow-hidden ">
          {props.url}
        </div>
      </div>
      <div className="shrink-0">
        <ColoredScore score={props.score} className="font-bold" />
      </div>
    </div>
  );
}
