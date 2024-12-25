import { getAnswer } from "@/app/_presets/_repositories/adminFirestore";
import { NextResponse } from "next/server";
import { AnswerDataResponseType } from "./type";

type Props = {
  params: {
    locale: string;
    exam_id: string;
    answer_id: string;
  };
};

export async function GET(_request: Request, props: Props) {
  const answer = await getAnswer(props.params.answer_id);
  if (!answer) return NextResponse.error();
  if (!answer.isPublish) return NextResponse.error();
  const exam = answer.examData;

  return NextResponse.json<AnswerDataResponseType>({
    examData: {
      title: exam.title,
      shortTitle: exam.shortTitle,
    },
    score: answer.score,
  });
}
