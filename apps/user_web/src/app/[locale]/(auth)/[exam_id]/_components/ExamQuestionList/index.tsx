import { ReactElement } from "react";
import ExamQuestionListItem from "./ExamQuestionListItem";

type Props = {
  children:
    | ReactElement<typeof ExamQuestionListItem>
    | Array<ReactElement<typeof ExamQuestionListItem>>;
};

export default function ExamQuestionList(props: Props) {
  return <div className="flex flex-col gap-2">{props.children}</div>;
}
