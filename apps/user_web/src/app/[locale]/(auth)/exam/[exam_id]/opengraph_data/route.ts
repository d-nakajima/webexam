import { getExam } from "@/app/_presets/_repositories/adminFirestore";
import { NextResponse } from "next/server";

type Props = {
  params: {
    locale: string;
    exam_id: string;
  };
};

export async function GET(_request: Request, props: Props) {
  const exam = await getExam(props.params.exam_id);
  if (!exam) return NextResponse.error();

  return NextResponse.json({
    title: exam.title,
    shortTitle: exam.shortTitle,
  });
}
