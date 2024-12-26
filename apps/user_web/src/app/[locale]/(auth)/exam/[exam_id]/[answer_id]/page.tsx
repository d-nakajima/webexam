import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { cacheGetAnswer } from "@/app/_presets/_utils/cache";
import PageContent from "../_components/PageContent";
import ClientPageContent from "../_components/PageContent/ClientPageContent";

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
    <PageContent answer={answer} />
  ) : (
    <ClientPageContent answerId={answer.id} />
  );
}
