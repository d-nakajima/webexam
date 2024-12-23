import { getExam } from "@/app/_presets/_repositories/adminFirestore";
import ExamAnswerHistory from "./_components/ExamAnswerHistory";
import ExamAnswerHistoryItem from "./_components/ExamAnswerHistory/ExamAnswerHistoryItem";
import ExamIndex from "./_components/ExamIndex";
import ExamIndexItem from "./_components/ExamIndex/ExamIndexItem";
import ExamLayout from "./_components/ExamLayout";
import ExamQuestionList from "./_components/ExamQuestionList";
import ExamQuestionListItem from "./_components/ExamQuestionList/ExamQuestionListItem";
import { notFound } from "next/navigation";
import ExamAnswerSubmit from "./_components/ExamAnswerSubmit";

type Props = {
  params: { locale: string; exam_id: string };
};

export const revalidate = 600;

export default async function ExamPage(props: Props) {
  const exam = await getExam(props.params.exam_id);
  if (!exam) return notFound();

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
      right={
        <ExamAnswerHistory>
          <ExamAnswerHistoryItem date={new Date()} score={10} />
          <ExamAnswerHistoryItem date={new Date()} score={10} />
        </ExamAnswerHistory>
      }
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
                options={question.options?.map((option) => option.text) || []}
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
