import { ReactElement } from "react";
import ExamAnswerHistoryItem from "./ExamAnswerHistoryItem";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/app/_shadcn/components/ui/select";
import { HistoryIcon } from "lucide-react";

type Props = {
  children:
    | ReactElement<typeof ExamAnswerHistoryItem>
    | Array<ReactElement<typeof ExamAnswerHistoryItem>>;
};

export default function ExamAnswerHistory(props: Props) {
  return (
    <Select>
      <SelectTrigger hideIcon className="flex justify-center gap-2 p-2">
        <div className="text-xs">過去の回答</div>
        <HistoryIcon size="16" />
      </SelectTrigger>
      <SelectContent className="px-0 py-1">
        <div className="px-2">{props.children}</div>
      </SelectContent>
    </Select>
  );
}
