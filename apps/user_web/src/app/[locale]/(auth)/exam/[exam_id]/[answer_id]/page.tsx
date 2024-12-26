import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { cacheGetAnswer } from "@/app/_presets/_utils/cache";
import AnswerPageContent from "../_components/AnswerPageContent";
import PrivateAnswerPageContent from "../_components/AnswerPageContent/PrivateAnswerPageContent";

type Props = {
  params: { locale: string; exam_id: string; answer_id: string };
};

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

export default async function AnswerPage(props: Props) {
  setRequestLocale(props.params.locale);
  const answer = await cacheGetAnswer(props.params.answer_id);
  if (!answer) return notFound();

  return answer.isPublish ? (
    <AnswerPageContent answer={answer} />
  ) : (
    <PrivateAnswerPageContent
      answerId={answer.id}
      ownerUserId={answer.userId}
      examId={answer.examId}
    />
  );
}
