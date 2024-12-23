import {
  getExam,
  listUserExamAnswerHistory,
} from "@/app/_presets/_repositories/adminFirestore";
import ExamAnswerHistory from "./_components/ExamAnswerHistory";
import ExamIndex from "./_components/ExamIndex";
import ExamIndexItem from "./_components/ExamIndex/ExamIndexItem";
import ExamLayout from "./_components/ExamLayout";
import ExamQuestionList from "./_components/ExamQuestionList";
import ExamQuestionListItem from "./_components/ExamQuestionList/ExamQuestionListItem";
import { notFound } from "next/navigation";
import ExamAnswerSubmit from "./_components/ExamAnswerSubmit";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";
import { unstable_cache } from "next/cache";
import { userExamAnswerHistoryCacheTag } from "@/app/_presets/_utils/cache";

type Props = {
  params: { locale: string; exam_id: string };
};

export const revalidate = 600;

export default async function ExamPage(props: Props) {
  const auth = await getServerAuthUser();
  if (!auth) return notFound();

  const exam = await getExam(props.params.exam_id);
  const cacheListUserExamAnswerHistory = unstable_cache(
    (userId: string, examId: string) =>
      listUserExamAnswerHistory(userId, examId),
    [],
    {
      tags: [userExamAnswerHistoryCacheTag(auth.uid, props.params.exam_id)],
    }
  );

  const userExamAnswerHistory = await cacheListUserExamAnswerHistory(
    auth.uid,
    props.params.exam_id
  );

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
