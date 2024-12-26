import { ReactNode } from "react";
import PageLayout from "../../_components/PageLayout";
import { getExam } from "@/app/_presets/_repositories/adminFirestore";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type Props = {
  children: ReactNode;
  params: { locale: string; exam_id: string };
};

export default async function ExamRootLayout(props: Props) {
  setRequestLocale(props.params.locale);
  const exam = await getExam(props.params.exam_id);
  if (!exam) return notFound();

  return (
    <PageLayout
      title={exam.title}
      subtitle={exam.url}
      shortTitle={exam.shortTitle}
    >
      {props.children}
    </PageLayout>
  );
}
