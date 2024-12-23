import { Link } from "@/_lib/i18n/routing";
import { getGradeIconFromRate } from "../../_utils/getGradeIcon";

type Props = {
  id: string;
  number: number;
  title: string;
  gradeRate?: number;
};

export default function ExamIndexItem(props: Props) {
  const gradeIcon =
    props.gradeRate !== undefined
      ? getGradeIconFromRate(props.gradeRate)
      : null;
  return (
    <div className="flex text-xs my-1">
      {gradeIcon && <div className="w-4 mr-2">{gradeIcon}</div>}
      <span className="w-4 shrink-0">{`${props.number}.`}</span>
      <Link
        href={`#${props.id}`}
        className="whitespace-pre-wrap break-words overflow-hidden"
      >
        {props.title}
      </Link>
    </div>
  );
}
