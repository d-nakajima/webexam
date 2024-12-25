import ExamLayout from "../_components/ExamLayout";
import { notFound } from "next/navigation";
import ExamAnswerHistory from "../_components/ExamAnswerHistory";
import ExamIndex from "../_components/ExamIndex";
import ExamIndexItem from "../_components/ExamIndex/ExamIndexItem";
import ExamQuestionList from "../_components/ExamQuestionList";
import ExamQuestionListItem from "../_components/ExamQuestionList/ExamQuestionListItem";
import { getServerAuthUser } from "@/_lib/firebase/FirebaseAdminAuth";
import { revalidateTag } from "next/cache";
import { Card, CardContent } from "@/_lib/shadcn/components/ui/card";
import RefreshOnGraded from "./_components/RefreshOnGraded";
import {
  answerCacheTag,
  cacheGetAnswer,
  userAnswersCacheTag,
  userExamAnswerHistoryCacheTag,
} from "@/app/_presets/_utils/cache";
import PageLayout from "../../../_components/PageLayout";
import ShareAnswerDialogContent from "./_components/ShareAnswerDialogContent";
import { examRoutePath } from "@/app/_presets/_utils/route_builder";
import { Link } from "@/_lib/i18n/routing";
import { Button } from "@/app/_shadcn/components/ui/button";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string; exam_id: string; answer_id: string };
};

export default async function AnswerPage(props: Props) {
  setRequestLocale(props.params.locale);
  const auth = await getServerAuthUser();
  if (!auth) return notFound();

  const answer = await cacheGetAnswer(props.params.answer_id)(
    props.params.answer_id
  );
  if (!answer) return notFound();
  if (answer.userId !== auth.uid && !answer.isPublish) return notFound();

  async function revalidateAnswerCache() {
    "use server";
    const auth = await getServerAuthUser();
    if (!auth) return notFound();

    revalidateTag(answerCacheTag(props.params.answer_id));
    revalidateTag(
      userExamAnswerHistoryCacheTag(auth.uid, props.params.exam_id)
    );
    revalidateTag(userAnswersCacheTag(auth.uid));
  }

  return (
    <RefreshOnGraded
      answerId={props.params.answer_id}
      revalidateAnswerCache={revalidateAnswerCache}
    >
      <PageLayout
        title={answer.examData.title}
        shortTitle={answer.examData.shortTitle}
        subtitle={answer.examData.url}
        sharedDialogContent={
          <ShareAnswerDialogContent
            id={props.params.answer_id}
            examId={props.params.exam_id}
            isPublish={answer.isPublish}
          />
        }
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
            <div className="flex flex-col gap-4">
              <ExamAnswerHistory examId={props.params.exam_id} />
              <Link
                href={examRoutePath(props.params.exam_id)}
                className="w-full"
              >
                <Button className="w-full text-xs">もう一度回答する</Button>
              </Link>
            </div>
          }
        >
          <div className="flex flex-col h-full">
            <Card className="mb-6 text-sm">
              <CardContent className="p-6">
                {answer.examData.abstract}
              </CardContent>
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
                        question.options?.map((option) => option.text) || []
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
      </PageLayout>
    </RefreshOnGraded>
  );
}
