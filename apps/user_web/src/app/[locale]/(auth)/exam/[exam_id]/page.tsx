import { getExam } from "@/app/_presets/_repositories/adminFirestore";
import ExamAnswerHistory from "./_components/ExamAnswerHistory";
import ExamIndex from "./_components/ExamIndex";
import ExamIndexItem from "./_components/ExamIndex/ExamIndexItem";
import ExamLayout from "./_components/ExamLayout";
import ExamQuestionList from "./_components/ExamQuestionList";
import ExamQuestionListItem from "./_components/ExamQuestionList/ExamQuestionListItem";
import ExamAnswerSubmit from "./_components/ExamAnswerSubmit";

import { routing } from "@/_lib/i18n/routing";
import { Metadata } from "next";
import { getVercelOrigin } from "@/app/_presets/_utils/url";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { QuestionType } from "@/app/_shared";

type Props = {
  params: { locale: string; exam_id: string };
};

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async (
  props: Props
): Promise<Metadata | undefined> => {
  const exam = await getExam(props.params.exam_id);
  if (!exam) return undefined;

  const locale = props.params.locale;
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;
  const path = examRoutePath(exam.id);

  return {
    title: exam?.shortTitle,
    alternates: {
      canonical: `${getVercelOrigin()}/${defaultLocale}/${path}`,
      languages: {
        ...Object.fromEntries(
          locales
            .filter((_locale) => _locale !== locale)
            .map((_locale) => [
              _locale,
              `${getVercelOrigin()}/${_locale}/${path}`,
            ])
        ),
        "x-default": `${getVercelOrigin()}/${defaultLocale}/${path}`,
      },
    },
  };
};

export default async function ExamPage(props: Props) {
  setRequestLocale(props.params.locale);
  const exam = await getExam(props.params.exam_id);
  if (!exam) notFound();

  const isSelectQuestion = (question: QuestionType) => {
    return (
      question.type === "multi_select" || question.type === "single_select"
    );
  };

  return (
    <ExamLayout
      left={
        <ExamIndex>
          {exam.questions.map((question, index) => (
            <ExamIndexItem
              key={index}
              id={`${index}`}
              number={index + 1}
              title={question.title}
            />
          ))}
        </ExamIndex>
      }
      right={<ExamAnswerHistory examId={props.params.exam_id} />}
    >
      <form className="flex flex-col h-full">
        <div className="flex-grow">
          <ExamQuestionList>
            {exam.questions.map((question, index) => (
              <ExamQuestionListItem
                key={index}
                mode="edit"
                number={index + 1}
                type={question.type}
                title={question.title}
                description={question.description}
                options={
                  isSelectQuestion(question)
                    ? question.options.map((option) => option.text)
                    : []
                }
              />
            ))}
          </ExamQuestionList>
        </div>
        <div className="flex mt-4 self-end">
          <ExamAnswerSubmit exam={exam} />
        </div>
      </form>
    </ExamLayout>
  );
}
