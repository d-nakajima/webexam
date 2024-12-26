import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { cacheGetAnswer } from "@/app/_presets/_utils/cache";
import PageContent from "../_components/PageContent";
import { Suspense } from "react";
import ClientPageContent from "../_components/PageContent/ClientPageContent";
import ExamSkeletonLayout from "../_components/ExamLayout/ExamSkeletonLayout";

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

  if (answer.isPublish) return <PageContent answer={answer} />;

  return (
    // <Suspense>
    <ClientPageContent answerId={answer.id} />
    // </Suspense>
  );
}
