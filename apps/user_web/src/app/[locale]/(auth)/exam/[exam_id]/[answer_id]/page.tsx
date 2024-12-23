import { getAnswer } from "@/app/_presets/_repositories/adminFirestore";
import ExamLayout from "../_components/ExamLayout";
import { notFound } from "next/navigation";
import ExamAnswerHistory from "../_components/ExamAnswerHistory";
import ExamAnswerHistoryItem from "../_components/ExamAnswerHistory/ExamAnswerHistoryItem";
import ExamIndex from "../_components/ExamIndex";
import ExamIndexItem from "../_components/ExamIndex/ExamIndexItem";
import ExamQuestionList from "../_components/ExamQuestionList";
import ExamQuestionListItem from "../_components/ExamQuestionList/ExamQuestionListItem";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/_lib/shadcn/components/ui/card";
import RefreshOnGraded from "./_components/RefreshOnGraded";
import {
  answerRoutePath,
  examRoutePath,
} from "@/app/_presets/_utils/route_builder";

type Props = {
  params: { locale: string; exam_id: string; answer_id: string };
};

export default async function AnswerPage(props: Props) {
  const auth = await getServerAuthUser();
  if (!auth) return notFound();

  const cacheGetAnswer = unstable_cache(
    (examId: string) => getAnswer(examId),
    [],
    {
      tags: [props.params.answer_id],
    }
  );

  async function revalidateAnswerCache() {
    "use server";
    revalidateTag(props.params.answer_id);
  }

  const answer = await cacheGetAnswer(props.params.answer_id);
  if (!answer) return notFound();
  if (answer.userId !== auth.uid && !answer.isPublish) return notFound();

  return (
    <RefreshOnGraded
      answerId={props.params.answer_id}
      revalidateAnswerCache={revalidateAnswerCache}
    >
      <ExamLayout
        left={
          <ExamIndex>
            {answer.examData.questions.map((question, index) => {
              const grades = answer.grades[index];
              return (
                <ExamIndexItem
                  key={index}
                  id={`${index}`}
                  number={index + 1}
                  title={question.title}
                  gradeRate={grades?.rate}
                />
              );
            })}
          </ExamIndex>
        }
        right={
          <ExamAnswerHistory>
            <ExamAnswerHistoryItem date={new Date()} score={10} />
            <ExamAnswerHistoryItem date={new Date()} score={10} />
          </ExamAnswerHistory>
        }
      >
        <div className="flex flex-col h-full">
          <Card className="mb-6 text-sm">
            <CardHeader>【{answer.examData.title}】</CardHeader>
            <CardContent>{answer.examData.abstract}</CardContent>
          </Card>
          <div className="flex-grow">
            <ExamQuestionList>
              {answer.examData.questions.map((question, index) => {
                const thisAnswer = answer.content[index];
                const props: Record<string, unknown> = {};
                if (question.type === "single_select") {
                  props["answerIndex"] = Number(thisAnswer);
                  props["correctAnswerIndex"] = Number(question.answer);
                } else if (question.type === "multi_select") {
                  props["answerIndexes"] = thisAnswer.split(",").map(Number);
                  props["correctAnswerIndexes"] = question.answer
                    .split(",")
                    .map(Number);
                } else {
                  props["answer"] = thisAnswer;
                  props["correctAnswer"] = question.answer;
                }

                return (
                  <ExamQuestionListItem
                    key={index}
                    mode="view"
                    number={index + 1}
                    type={question.type}
                    title={question.title}
                    description={question.description}
                    options={
                      question.options?.map((option, index) => option.text) ||
                      []
                    }
                    gradeRate={answer.grades[index]?.rate}
                    {...props}
                    comment={answer.grades[index]?.comment}
                  />
                );
              })}
            </ExamQuestionList>
          </div>
        </div>
      </ExamLayout>
    </RefreshOnGraded>
  );
}
